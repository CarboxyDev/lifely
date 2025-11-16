/**
 * SKILL TREE UTILITY FUNCTIONS
 * Logic for unlocking skills, checking requirements, and applying bonuses
 */

import type { SkillTreeState, UnlockedSkill, GameStats } from '../types';
import { allSkillNodes, getSkillById, meetsSkillRequirements, type SkillNode } from '../data/skill-trees';

/**
 * Check if a skill can be unlocked
 */
export function canUnlockSkill(
  skillId: string,
  skillTreeState: SkillTreeState,
  playerData: {
    level: number;
    health: number;
    morale: number;
    intellect: number;
    looks: number;
  }
): { canUnlock: boolean; reason?: string } {
  const skill = getSkillById(skillId);
  if (!skill) {
    return { canUnlock: false, reason: 'Skill not found' };
  }

  // Check if already unlocked
  if (skillTreeState.unlockedSkills.some(s => s.skillId === skillId)) {
    return { canUnlock: false, reason: 'Already unlocked' };
  }

  // Check if enough skill points
  if (skillTreeState.availableSkillPoints < skill.skillPointCost) {
    return { canUnlock: false, reason: `Need ${skill.skillPointCost} skill points (have ${skillTreeState.availableSkillPoints})` };
  }

  // Check prerequisites
  const unlockedSkillIds = skillTreeState.unlockedSkills.map(s => s.skillId);
  const meetsRequirements = meetsSkillRequirements(skill, {
    unlockedSkills: unlockedSkillIds,
    level: playerData.level,
    health: playerData.health,
    morale: playerData.morale,
    intellect: playerData.intellect,
    looks: playerData.looks,
  });

  if (!meetsRequirements) {
    return { canUnlock: false, reason: 'Prerequisites not met' };
  }

  return { canUnlock: true };
}

/**
 * Unlock a skill and update state
 */
export function unlockSkill(
  skillId: string,
  skillTreeState: SkillTreeState,
  currentAgeInDays: number
): SkillTreeState {
  const skill = getSkillById(skillId);
  if (!skill) {
    throw new Error('Skill not found');
  }

  // Create unlocked skill entry
  const unlockedSkill: UnlockedSkill = {
    skillId: skill.id,
    unlockedAt: currentAgeInDays,
    tier: skill.tier,
    pointsSpent: skill.skillPointCost,
  };

  // Update state
  const newState: SkillTreeState = {
    ...skillTreeState,
    unlockedSkills: [...skillTreeState.unlockedSkills, unlockedSkill],
    availableSkillPoints: skillTreeState.availableSkillPoints - skill.skillPointCost,
    totalSkillPointsSpent: skillTreeState.totalSkillPointsSpent + skill.skillPointCost,
  };

  // Recalculate active bonuses
  return recalculateActiveBonuses(newState);
}

/**
 * Add skill points to the pool
 */
export function awardSkillPoints(
  skillTreeState: SkillTreeState,
  amount: number,
  source: 'levels' | 'achievements' | 'events' | 'other'
): SkillTreeState {
  const sourceKey = `from${source.charAt(0).toUpperCase() + source.slice(1)}` as keyof typeof skillTreeState.skillPointSources;

  return {
    ...skillTreeState,
    availableSkillPoints: skillTreeState.availableSkillPoints + amount,
    totalSkillPointsEarned: skillTreeState.totalSkillPointsEarned + amount,
    skillPointSources: {
      ...skillTreeState.skillPointSources,
      [sourceKey]: skillTreeState.skillPointSources[sourceKey] + amount,
    },
  };
}

/**
 * Recalculate all active bonuses from unlocked skills
 */
export function recalculateActiveBonuses(skillTreeState: SkillTreeState): SkillTreeState {
  const bonuses = {
    statModifiers: {
      health: 0,
      morale: 0,
      intellect: 0,
      looks: 0,
    },
    multipliers: {} as Record<string, number>,
    special: {} as Record<string, boolean | string | number>,
  };

  // Aggregate all bonuses from unlocked skills
  for (const unlockedSkill of skillTreeState.unlockedSkills) {
    const skill = getSkillById(unlockedSkill.skillId);
    if (!skill) continue;

    // Add stat modifiers
    if (skill.effects.statModifiers) {
      bonuses.statModifiers.health += skill.effects.statModifiers.health || 0;
      bonuses.statModifiers.morale += skill.effects.statModifiers.morale || 0;
      bonuses.statModifiers.intellect += skill.effects.statModifiers.intellect || 0;
      bonuses.statModifiers.looks += skill.effects.statModifiers.looks || 0;
    }

    // Merge multipliers (multiplicative stacking)
    if (skill.effects.multipliers) {
      for (const [key, value] of Object.entries(skill.effects.multipliers)) {
        if (bonuses.multipliers[key]) {
          bonuses.multipliers[key] *= value;
        } else {
          bonuses.multipliers[key] = value;
        }
      }
    }

    // Merge special effects
    if (skill.effects.special) {
      bonuses.special = { ...bonuses.special, ...skill.effects.special };
    }
  }

  return {
    ...skillTreeState,
    activeBonuses: bonuses,
  };
}

/**
 * Get skills available to unlock (prerequisites met, not yet unlocked)
 */
export function getAvailableSkills(
  skillTreeState: SkillTreeState,
  playerData: {
    level: number;
    health: number;
    morale: number;
    intellect: number;
    looks: number;
  }
): SkillNode[] {
  const unlockedSkillIds = skillTreeState.unlockedSkills.map(s => s.skillId);

  return allSkillNodes.filter(skill => {
    // Skip if already unlocked
    if (unlockedSkillIds.includes(skill.id)) {
      return false;
    }

    // Check if prerequisites are met
    return meetsSkillRequirements(skill, {
      unlockedSkills: unlockedSkillIds,
      level: playerData.level,
      health: playerData.health,
      morale: playerData.morale,
      intellect: playerData.intellect,
      looks: playerData.looks,
    });
  });
}

/**
 * Get locked skills (prerequisites not met)
 */
export function getLockedSkills(
  skillTreeState: SkillTreeState,
  playerData: {
    level: number;
    health: number;
    morale: number;
    intellect: number;
    looks: number;
  }
): SkillNode[] {
  const unlockedSkillIds = skillTreeState.unlockedSkills.map(s => s.skillId);

  return allSkillNodes.filter(skill => {
    // Skip if already unlocked
    if (unlockedSkillIds.includes(skill.id)) {
      return false;
    }

    // Return only if prerequisites NOT met
    return !meetsSkillRequirements(skill, {
      unlockedSkills: unlockedSkillIds,
      level: playerData.level,
      health: playerData.health,
      morale: playerData.morale,
      intellect: playerData.intellect,
      looks: playerData.looks,
    });
  });
}

/**
 * Apply skill tree bonuses to base stats
 */
export function applySkillTreeBonuses(
  baseStats: GameStats,
  skillTreeState: SkillTreeState
): GameStats {
  return {
    health: baseStats.health + skillTreeState.activeBonuses.statModifiers.health,
    morale: baseStats.morale + skillTreeState.activeBonuses.statModifiers.morale,
    intellect: baseStats.intellect + skillTreeState.activeBonuses.statModifiers.intellect,
    looks: baseStats.looks + skillTreeState.activeBonuses.statModifiers.looks,
    karma: baseStats.karma,
  };
}

/**
 * Get multiplier for a specific bonus type
 */
export function getSkillMultiplier(
  skillTreeState: SkillTreeState,
  multiplierKey: string
): number {
  return skillTreeState.activeBonuses.multipliers[multiplierKey] || 1.0;
}

/**
 * Check if a special effect is active
 */
export function hasSpecialEffect(
  skillTreeState: SkillTreeState,
  effectKey: string
): boolean {
  return !!skillTreeState.activeBonuses.special[effectKey];
}
