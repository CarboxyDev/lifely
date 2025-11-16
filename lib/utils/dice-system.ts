import type { DiceType, DiceRoll, DiceModifier } from '../types';
import { randint } from './game-utils';

/**
 * Core dice rolling mechanic integrated throughout the game
 * Used for: job applications, random events, hobbies, gambling, relationships, etc.
 */

/**
 * Roll a dice with modifiers
 */
export function rollDice(
  diceType: DiceType,
  modifiers: DiceModifier[] = [],
  luck: number = 50 // 0-100 luck stat
): {
  baseRoll: number;
  modifiedRoll: number;
  totalModifier: number;
  criticalSuccess: boolean;
  criticalFailure: boolean;
  maxPossible: number;
} {
  const maxValues: Record<DiceType, number> = {
    d4: 4,
    d6: 6,
    d8: 8,
    d10: 10,
    d12: 12,
    d20: 20,
    d100: 100,
  };

  const maxPossible = maxValues[diceType];
  const baseRoll = randint(1, maxPossible);

  // Calculate total modifier
  let totalModifier = 0;
  for (const mod of modifiers) {
    totalModifier += mod.value;
  }

  // Luck affects rolls (±5 based on luck stat)
  const luckBonus = Math.round(((luck - 50) / 50) * 5);
  totalModifier += luckBonus;

  const modifiedRoll = Math.max(1, Math.min(maxPossible + 20, baseRoll + totalModifier));

  // Critical success/failure
  const criticalSuccess = baseRoll === maxPossible;
  const criticalFailure = baseRoll === 1;

  return {
    baseRoll,
    modifiedRoll,
    totalModifier,
    criticalSuccess,
    criticalFailure,
    maxPossible,
  };
}

/**
 * Roll multiple dice and sum them (e.g., 3d6)
 */
export function rollMultipleDice(
  count: number,
  diceType: DiceType,
  modifiers: DiceModifier[] = [],
  luck: number = 50
): {
  individualRolls: number[];
  total: number;
  totalModifier: number;
  average: number;
} {
  const individualRolls: number[] = [];
  let baseTotal = 0;

  for (let i = 0; i < count; i++) {
    const roll = rollDice(diceType, [], luck);
    individualRolls.push(roll.baseRoll);
    baseTotal += roll.baseRoll;
  }

  // Apply modifiers once to total
  let totalModifier = 0;
  for (const mod of modifiers) {
    totalModifier += mod.value;
  }

  const luckBonus = Math.round(((luck - 50) / 50) * 5);
  totalModifier += luckBonus;

  const total = baseTotal + totalModifier;
  const average = baseTotal / count;

  return {
    individualRolls,
    total,
    totalModifier,
    average: Math.round(average * 10) / 10,
  };
}

/**
 * Advantage/disadvantage system (roll twice, take best/worst)
 */
export function rollWithAdvantage(
  diceType: DiceType,
  advantage: boolean,
  disadvantage: boolean,
  modifiers: DiceModifier[] = [],
  luck: number = 50
): {
  rolls: number[];
  selectedRoll: number;
  modifiedRoll: number;
  wasAdvantage: boolean;
} {
  const roll1 = rollDice(diceType, modifiers, luck);
  const roll2 = rollDice(diceType, modifiers, luck);

  let selectedRoll: number;
  let wasAdvantage = false;

  if (advantage && !disadvantage) {
    selectedRoll = Math.max(roll1.modifiedRoll, roll2.modifiedRoll);
    wasAdvantage = true;
  } else if (disadvantage && !advantage) {
    selectedRoll = Math.min(roll1.modifiedRoll, roll2.modifiedRoll);
    wasAdvantage = false;
  } else {
    // Normal roll or cancel out
    selectedRoll = roll1.modifiedRoll;
  }

  return {
    rolls: [roll1.baseRoll, roll2.baseRoll],
    selectedRoll: roll1.baseRoll,
    modifiedRoll: selectedRoll,
    wasAdvantage,
  };
}

/**
 * Check if roll succeeds against difficulty class
 */
export function checkSuccess(
  diceType: DiceType,
  difficultyClass: number,
  modifiers: DiceModifier[] = [],
  luck: number = 50
): {
  roll: number;
  success: boolean;
  criticalSuccess: boolean;
  criticalFailure: boolean;
  margin: number; // How much over/under DC
} {
  const result = rollDice(diceType, modifiers, luck);

  const success = result.modifiedRoll >= difficultyClass;
  const margin = result.modifiedRoll - difficultyClass;

  return {
    roll: result.modifiedRoll,
    success,
    criticalSuccess: result.criticalSuccess,
    criticalFailure: result.criticalFailure,
    margin,
  };
}

/**
 * Contested roll (two entities rolling against each other)
 */
export function contestedRoll(
  entity1DiceType: DiceType,
  entity1Modifiers: DiceModifier[],
  entity1Luck: number,
  entity2DiceType: DiceType,
  entity2Modifiers: DiceModifier[],
  entity2Luck: number
): {
  entity1Roll: number;
  entity2Roll: number;
  winner: 1 | 2 | 'tie';
  margin: number;
} {
  const roll1 = rollDice(entity1DiceType, entity1Modifiers, entity1Luck);
  const roll2 = rollDice(entity2DiceType, entity2Modifiers, entity2Luck);

  let winner: 1 | 2 | 'tie';
  if (roll1.modifiedRoll > roll2.modifiedRoll) {
    winner = 1;
  } else if (roll2.modifiedRoll > roll1.modifiedRoll) {
    winner = 2;
  } else {
    winner = 'tie';
  }

  const margin = Math.abs(roll1.modifiedRoll - roll2.modifiedRoll);

  return {
    entity1Roll: roll1.modifiedRoll,
    entity2Roll: roll2.modifiedRoll,
    winner,
    margin,
  };
}

/**
 * Get difficulty class description
 */
export function getDifficultyDescription(dc: number): string {
  if (dc <= 5) return 'Trivial';
  if (dc <= 10) return 'Easy';
  if (dc <= 15) return 'Moderate';
  if (dc <= 20) return 'Hard';
  if (dc <= 25) return 'Very Hard';
  if (dc <= 30) return 'Extremely Hard';
  return 'Nearly Impossible';
}

/**
 * Calculate luck modifier from various life factors
 */
export function calculateLuckModifiers(
  karma: number,
  recentFailures: number,
  recentSuccesses: number,
  hasBlessing: boolean,
  hasCurse: boolean
): number {
  let baseLuck = 50;

  // Karma affects luck (±20 based on karma)
  baseLuck += (karma / 100) * 20;

  // Streaks affect luck
  if (recentSuccesses > 5) {
    baseLuck += 10; // Hot streak
  } else if (recentFailures > 5) {
    baseLuck -= 10; // Cold streak
  }

  // Blessings and curses
  if (hasBlessing) baseLuck += 15;
  if (hasCurse) baseLuck -= 15;

  return Math.max(0, Math.min(100, baseLuck));
}

/**
 * Random event triggered by dice roll
 */
export function triggerRandomEvent(
  luck: number
): {
  triggered: boolean;
  eventType: 'fortune' | 'misfortune' | 'neutral' | null;
  severity: 'minor' | 'moderate' | 'major' | null;
} {
  const roll = rollDice('d100', [], luck);

  // Critical success = major fortune
  if (roll.criticalSuccess) {
    return { triggered: true, eventType: 'fortune', severity: 'major' };
  }

  // Critical failure = major misfortune
  if (roll.criticalFailure) {
    return { triggered: true, eventType: 'misfortune', severity: 'major' };
  }

  // Normal probability distribution
  if (roll.modifiedRoll >= 95) {
    return { triggered: true, eventType: 'fortune', severity: 'moderate' };
  } else if (roll.modifiedRoll >= 85) {
    return { triggered: true, eventType: 'fortune', severity: 'minor' };
  } else if (roll.modifiedRoll <= 5) {
    return { triggered: true, eventType: 'misfortune', severity: 'moderate' };
  } else if (roll.modifiedRoll <= 15) {
    return { triggered: true, eventType: 'misfortune', severity: 'minor' };
  } else if (roll.modifiedRoll >= 70 && roll.modifiedRoll <= 75) {
    return { triggered: true, eventType: 'neutral', severity: 'minor' };
  }

  return { triggered: false, eventType: null, severity: null };
}

/**
 * Determine job interview success with dice
 */
export function jobInterviewRoll(
  intellect: number,
  looks: number,
  relevantSkillLevel: number,
  luck: number
): {
  roll: number;
  success: boolean;
  performance: 'poor' | 'average' | 'good' | 'excellent';
  reason: string;
} {
  const modifiers: DiceModifier[] = [
    { name: 'Intellect', value: Math.floor(intellect / 10), source: 'stat' },
    { name: 'Looks', value: Math.floor(looks / 20), source: 'stat' },
    { name: 'Skill', value: Math.floor(relevantSkillLevel / 10), source: 'skill' },
  ];

  const result = rollDice('d20', modifiers, luck);
  const roll = result.modifiedRoll;

  let success: boolean;
  let performance: 'poor' | 'average' | 'good' | 'excellent';
  let reason: string;

  if (result.criticalSuccess) {
    success = true;
    performance = 'excellent';
    reason = 'You absolutely nailed the interview! They want to hire you immediately.';
  } else if (result.criticalFailure) {
    success = false;
    performance = 'poor';
    reason = 'The interview was a disaster. You completely bombed it.';
  } else if (roll >= 20) {
    success = true;
    performance = 'excellent';
    reason = 'Outstanding interview performance!';
  } else if (roll >= 15) {
    success = true;
    performance = 'good';
    reason = 'Strong interview - they were impressed.';
  } else if (roll >= 10) {
    success = true;
    performance = 'average';
    reason = 'Decent interview, good enough to get the job.';
  } else if (roll >= 5) {
    success = false;
    performance = 'average';
    reason = 'Interview went okay, but not good enough.';
  } else {
    success = false;
    performance = 'poor';
    reason = 'Poor interview performance.';
  }

  return { roll, success, performance, reason };
}

/**
 * Social interaction roll (making friends, dating, networking)
 */
export function socialInteractionRoll(
  looks: number,
  morale: number,
  charismaSkill: number,
  luck: number,
  difficultyClass: number = 12
): {
  roll: number;
  success: boolean;
  quality: 'awkward' | 'okay' | 'good' | 'great';
} {
  const modifiers: DiceModifier[] = [
    { name: 'Looks', value: Math.floor(looks / 15), source: 'stat' },
    { name: 'Morale', value: Math.floor(morale / 20), source: 'stat' },
    { name: 'Charisma', value: Math.floor(charismaSkill / 10), source: 'skill' },
  ];

  const result = checkSuccess('d20', difficultyClass, modifiers, luck);

  let quality: 'awkward' | 'okay' | 'good' | 'great';
  if (result.criticalSuccess || result.margin >= 10) {
    quality = 'great';
  } else if (result.margin >= 5) {
    quality = 'good';
  } else if (result.margin >= 0) {
    quality = 'okay';
  } else {
    quality = 'awkward';
  }

  return {
    roll: result.roll,
    success: result.success,
    quality,
  };
}

/**
 * Investment/business decision roll
 */
export function businessDecisionRoll(
  intellect: number,
  businessSkill: number,
  marketConditions: 'good' | 'normal' | 'bad',
  luck: number
): {
  roll: number;
  outcome: 'failure' | 'break-even' | 'modest-profit' | 'good-profit' | 'huge-profit';
  multiplier: number;
} {
  const marketMod: Record<'good' | 'normal' | 'bad', number> = {
    good: 5,
    normal: 0,
    bad: -5,
  };

  const modifiers: DiceModifier[] = [
    { name: 'Intellect', value: Math.floor(intellect / 12), source: 'stat' },
    { name: 'Business Skill', value: Math.floor(businessSkill / 8), source: 'skill' },
    { name: 'Market', value: marketMod[marketConditions], source: 'environment' },
  ];

  const result = rollDice('d20', modifiers, luck);
  const roll = result.modifiedRoll;

  let outcome: 'failure' | 'break-even' | 'modest-profit' | 'good-profit' | 'huge-profit';
  let multiplier: number;

  if (result.criticalFailure) {
    outcome = 'failure';
    multiplier = -0.8; // Lose 80%
  } else if (roll < 8) {
    outcome = 'failure';
    multiplier = -0.4; // Lose 40%
  } else if (roll < 12) {
    outcome = 'break-even';
    multiplier = 0; // No gain/loss
  } else if (roll < 16) {
    outcome = 'modest-profit';
    multiplier = 0.15; // 15% profit
  } else if (roll < 20 || !result.criticalSuccess) {
    outcome = 'good-profit';
    multiplier = 0.4; // 40% profit
  } else {
    outcome = 'huge-profit';
    multiplier = 1.5; // 150% profit
  }

  return { roll, outcome, multiplier };
}
