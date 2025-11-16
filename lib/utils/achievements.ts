import type {
  User,
  GameStats,
  AchievementState,
  Achievement,
  RelationshipState,
  CreditState,
  InvestmentState,
  VehicleState,
  HousingState,
} from '../types';
import { allAchievements } from '../data/achievements-expanded';

interface GameState {
  user: User;
  stats: GameStats;
  money: number;
  bankBalance: number;
  achievements: AchievementState;
  relationships: RelationshipState;
  credit: CreditState;
  investments: InvestmentState;
  vehicles: VehicleState;
  housing: HousingState;
}

export function checkAndUnlockAchievements(state: GameState): {
  newAchievements: Achievement[];
  updatedState: AchievementState;
} {
  const newlyUnlocked: Achievement[] = [];
  const alreadyUnlocked = new Set(state.achievements.unlockedAchievements.map((a) => a.achievementId));

  // Check each achievement
  for (const def of allAchievements) {
    if (alreadyUnlocked.has(def.id)) continue;

    let shouldUnlock = false;

    // Financial achievements
    const totalWealth = state.money + state.bankBalance + state.investments.totalValue;
    if (def.id === 'first-dollar' && totalWealth >= 1) shouldUnlock = true;
    if (def.id === 'thousandaire' && totalWealth >= 1000) shouldUnlock = true;
    if (def.id === 'ten-thousandaire' && totalWealth >= 10000) shouldUnlock = true;
    if (def.id === 'hundred-thousandaire' && totalWealth >= 100000) shouldUnlock = true;
    if (def.id === 'millionaire' && totalWealth >= 1000000) shouldUnlock = true;
    if (def.id === 'multi-millionaire' && totalWealth >= 10000000) shouldUnlock = true;
    if (def.id === 'investor' && state.investments.portfolio.length > 0) shouldUnlock = true;
    if (def.id === 'debt-free' && state.credit.activeLoans.length === 0 && state.credit.loanHistory.length > 0) shouldUnlock = true;
    if (def.id === 'homeowner' && state.housing.currentProperty !== null) shouldUnlock = true;

    // Career achievements
    if (def.id === 'first-job' && state.user.job.name !== 'Unemployed') shouldUnlock = true;
    if (def.id === 'career-changer' && state.user.job.previousJobs.length >= 5) shouldUnlock = true;
    if (def.id === 'long-service' && state.user.job.duration >= 120) shouldUnlock = true; // 10 years
    if (def.id === 'six-figure-salary' && state.user.job.salary >= 100000) shouldUnlock = true;

    // Education achievements
    if (def.id === 'high-school-graduate') {
      const hasHighSchool = state.user.education.degrees.some((d) => d.level === 'high-school');
      if (hasHighSchool) shouldUnlock = true;
    }
    if (def.id === 'college-graduate') {
      const hasCollege = state.user.education.degrees.some(
        (d) => d.level === 'college' || d.level === 'university'
      );
      if (hasCollege) shouldUnlock = true;
    }
    if (def.id === 'masters-degree') {
      const hasMasters = state.user.education.degrees.some((d) => d.level === 'graduate');
      if (hasMasters) shouldUnlock = true;
    }
    if (def.id === 'doctorate') {
      const hasPhD = state.user.education.degrees.some((d) => d.level === 'phd');
      if (hasPhD) shouldUnlock = true;
    }
    if (def.id === 'straight-a-student') {
      const has4GPA = state.user.education.degrees.some((d) => d.gpa === 4.0);
      if (has4GPA) shouldUnlock = true;
    }

    // Relationship achievements
    if (def.id === 'first-friend') {
      const hasFriend = state.relationships.relationships.some((r) => r.type === 'friend');
      if (hasFriend) shouldUnlock = true;
    }
    if (def.id === 'social-butterfly') {
      const friendCount = state.relationships.relationships.filter((r) => r.type === 'friend').length;
      if (friendCount >= 10) shouldUnlock = true;
    }
    if (def.id === 'married' && state.relationships.hasSpouse) shouldUnlock = true;
    if (def.id === 'golden-anniversary') {
      const spouse = state.relationships.relationships.find((r) => r.id === state.relationships.spouseId);
      if (spouse && spouse.yearsKnown >= 50) shouldUnlock = true;
    }
    if (def.id === 'parent' && state.relationships.children > 0) shouldUnlock = true;

    // Health achievements
    if (def.id === 'fitness-enthusiast' && state.stats.health >= 90) shouldUnlock = true;
    if (def.id === 'centenarian' && state.user.age >= 100 * 12) shouldUnlock = true; // 100 years in months

    // Lifestyle achievements
    if (def.id === 'car-owner' && state.vehicles.currentVehicle !== null) shouldUnlock = true;
    if (def.id === 'luxury-lifestyle') {
      const hasLuxuryCar = state.vehicles.currentVehicle?.type === 'luxury' || state.vehicles.currentVehicle?.type === 'supercar';
      const hasMansion = state.housing.currentProperty?.type === 'mansion';
      if (hasLuxuryCar && hasMansion) shouldUnlock = true;
    }

    // Special achievements
    if (def.id === 'perfect-credit' && state.credit.score >= 850) shouldUnlock = true;
    if (def.id === 'overachiever' && state.achievements.unlockedAchievements.length >= 50) shouldUnlock = true;

    // If should unlock, add to newly unlocked
    if (shouldUnlock) {
      newlyUnlocked.push(def);
    }
  }

  // Create UnlockedAchievement entries for newly unlocked achievements
  const newUnlockedEntries = newlyUnlocked.map(ach => ({
    achievementId: ach.id,
    unlockedAt: state.user.age,
    rewardsClaimed: false,
  }));

  // Calculate new total points (achievements don't have points property in the new system)
  const newTotalPoints = state.achievements.totalPoints + newlyUnlocked.length;

  const updatedState: AchievementState = {
    ...state.achievements,
    unlockedAchievements: [...state.achievements.unlockedAchievements, ...newUnlockedEntries],
    totalPoints: newTotalPoints,
    totalAchievements: state.achievements.totalAchievements + newlyUnlocked.length,
  };

  return {
    newAchievements: newlyUnlocked,
    updatedState,
  };
}
