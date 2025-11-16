import type { Skill, JobData } from '../types';

/**
 * Calculate job performance based on player's skills
 * Returns a score from 0-100
 */
export function calculateJobPerformance(
  jobName: string,
  jobData: JobData | undefined,
  playerSkills: Skill[],
  basePerformance: number = 50
): number {
  if (!jobData) return basePerformance;

  const requiredSkills = jobData.requiredSkills || [];
  const recommendedSkills = jobData.recommendedSkills || [];
  const skillWeight = jobData.skillWeight || 0.3;

  // Base performance starts at 50
  let performance = basePerformance;

  // Check required skills - missing required skills is a major penalty
  const requiredSkillLevels: number[] = [];
  for (const reqSkillId of requiredSkills) {
    const skill = playerSkills.find((s) => s.id === reqSkillId);
    if (skill) {
      requiredSkillLevels.push(skill.level);
    } else {
      // Missing a required skill - significant penalty
      performance -= 15;
    }
  }

  // Average of required skills boosts performance
  if (requiredSkillLevels.length > 0) {
    const avgRequired = requiredSkillLevels.reduce((sum, lvl) => sum + lvl, 0) / requiredSkillLevels.length;
    performance += (avgRequired / 100) * 30; // Up to +30 from required skills
  }

  // Check recommended skills - bonus but not critical
  const recommendedSkillLevels: number[] = [];
  for (const recSkillId of recommendedSkills) {
    const skill = playerSkills.find((s) => s.id === recSkillId);
    if (skill) {
      recommendedSkillLevels.push(skill.level);
    }
  }

  // Average of recommended skills provides smaller boost
  if (recommendedSkillLevels.length > 0) {
    const avgRecommended =
      recommendedSkillLevels.reduce((sum, lvl) => sum + lvl, 0) / recommendedSkillLevels.length;
    performance += (avgRecommended / 100) * 20; // Up to +20 from recommended skills
  }

  // Apply skill weight modifier (some jobs depend more on skills than others)
  const skillBonus = (performance - basePerformance) * skillWeight;
  performance = basePerformance + skillBonus;

  return Math.max(0, Math.min(100, Math.round(performance)));
}

/**
 * Check if player is eligible for a promotion based on performance and duration
 */
export function isEligibleForPromotion(
  duration: number,
  performance: number,
  currentPromotions: number
): boolean {
  // Need at least 12 months in job
  if (duration < 12) return false;

  // Performance thresholds increase with each promotion
  const requiredPerformance = 60 + currentPromotions * 5;

  // Need high performance
  if (performance < requiredPerformance) return false;

  // Random chance based on performance (higher performance = higher chance)
  const promotionChance = (performance - requiredPerformance) / 100;
  return Math.random() < promotionChance;
}

/**
 * Calculate salary raise amount based on performance
 */
export function calculateRaise(
  currentSalary: number,
  performance: number,
  jobData: JobData | undefined
): number {
  if (!jobData) return 0;

  // Base raise is between minIncrement and maxIncrement
  const baseRaise = jobData.minIncrement + (jobData.maxIncrement - jobData.minIncrement) * 0.5;

  // Performance multiplier (0.5x to 1.5x)
  const performanceMultiplier = 0.5 + (performance / 100);

  const raise = Math.round(baseRaise * performanceMultiplier);

  return raise;
}

/**
 * Get skill recommendations for a specific job
 */
export function getJobSkillRecommendations(
  jobName: string,
  jobData: JobData | undefined,
  playerSkills: Skill[]
): {
  missingRequired: string[];
  lowRequired: { skillId: string; currentLevel: number }[];
  missingRecommended: string[];
} {
  if (!jobData) {
    return { missingRequired: [], lowRequired: [], missingRecommended: [] };
  }

  const requiredSkills = jobData.requiredSkills || [];
  const recommendedSkills = jobData.recommendedSkills || [];

  const missingRequired: string[] = [];
  const lowRequired: { skillId: string; currentLevel: number }[] = [];
  const missingRecommended: string[] = [];

  // Check required skills
  for (const reqSkillId of requiredSkills) {
    const skill = playerSkills.find((s) => s.id === reqSkillId);
    if (!skill) {
      missingRequired.push(reqSkillId);
    } else if (skill.level < 50) {
      // Skill exists but is low level
      lowRequired.push({ skillId: reqSkillId, currentLevel: skill.level });
    }
  }

  // Check recommended skills
  for (const recSkillId of recommendedSkills) {
    const skill = playerSkills.find((s) => s.id === recSkillId);
    if (!skill) {
      missingRecommended.push(recSkillId);
    }
  }

  return { missingRequired, lowRequired, missingRecommended };
}

/**
 * Check if player meets skill requirements for a job
 */
export function meetsSkillRequirements(
  jobData: JobData | undefined,
  playerSkills: Skill[]
): boolean {
  if (!jobData || !jobData.requiredSkills || jobData.requiredSkills.length === 0) {
    return true; // No skill requirements
  }

  // Must have all required skills at minimum level 20
  for (const reqSkillId of jobData.requiredSkills) {
    const skill = playerSkills.find((s) => s.id === reqSkillId);
    if (!skill || skill.level < 20) {
      return false;
    }
  }

  return true;
}

/**
 * Get performance review message based on performance score
 */
export function getPerformanceReviewMessage(performance: number): {
  rating: string;
  message: string;
  color: string;
} {
  if (performance >= 90) {
    return {
      rating: 'Exceptional',
      message: 'Your work has been outstanding. You exceed all expectations!',
      color: '#10b981', // green
    };
  } else if (performance >= 75) {
    return {
      rating: 'Excellent',
      message: 'You are performing very well and meeting all objectives.',
      color: '#3b82f6', // blue
    };
  } else if (performance >= 60) {
    return {
      rating: 'Good',
      message: 'Your work is satisfactory and you meet most expectations.',
      color: '#6b7280', // gray
    };
  } else if (performance >= 40) {
    return {
      rating: 'Needs Improvement',
      message: 'Your performance is below expectations. Consider improving your skills.',
      color: '#f59e0b', // orange
    };
  } else {
    return {
      rating: 'Poor',
      message: 'Your performance is significantly below expectations. Improvement is critical.',
      color: '#ef4444', // red
    };
  }
}
