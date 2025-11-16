import type { DisasterType, DisasterSeverity, Disaster, DiceModifier } from '../types';
import { rollDice, checkSuccess } from '../utils/dice-system';
import { randint } from '../utils/game-utils';

/**
 * Natural disasters system - random catastrophic events with dice-driven outcomes
 */

export interface DisasterDefinition {
  type: DisasterType;
  name: string;
  description: string;
  baseOccurrenceChance: number; // per year percentage
  averageDamage: number;
  injuryChance: number; // 0-100
  propertyDestructionChance: number; // 0-100
  commonRegions: string[];
}

export const disasterDefinitions: Record<DisasterType, DisasterDefinition> = {
  earthquake: {
    type: 'earthquake',
    name: 'Earthquake',
    description: 'Seismic activity causing ground shaking',
    baseOccurrenceChance: 2, // 2% per year
    averageDamage: 15000,
    injuryChance: 30,
    propertyDestructionChance: 40,
    commonRegions: ['California', 'Japan', 'Chile', 'Turkey', 'Indonesia'],
  },
  hurricane: {
    type: 'hurricane',
    name: 'Hurricane',
    description: 'Powerful tropical storm with high winds and flooding',
    baseOccurrenceChance: 5,
    averageDamage: 25000,
    injuryChance: 20,
    propertyDestructionChance: 60,
    commonRegions: ['Florida', 'Louisiana', 'Texas', 'Caribbean', 'Southeast Asia'],
  },
  tornado: {
    type: 'tornado',
    name: 'Tornado',
    description: 'Violently rotating column of air',
    baseOccurrenceChance: 3,
    averageDamage: 20000,
    injuryChance: 35,
    propertyDestructionChance: 70,
    commonRegions: ['Oklahoma', 'Kansas', 'Texas', 'Nebraska', 'Midwest USA'],
  },
  flood: {
    type: 'flood',
    name: 'Flood',
    description: 'Overflow of water submerging land',
    baseOccurrenceChance: 8, // Most common
    averageDamage: 12000,
    injuryChance: 10,
    propertyDestructionChance: 50,
    commonRegions: ['Bangladesh', 'Netherlands', 'Venice', 'New Orleans', 'Pakistan'],
  },
  wildfire: {
    type: 'wildfire',
    name: 'Wildfire',
    description: 'Uncontrolled fire spreading through vegetation',
    baseOccurrenceChance: 4,
    averageDamage: 35000,
    injuryChance: 15,
    propertyDestructionChance: 80,
    commonRegions: ['California', 'Australia', 'Greece', 'Portugal', 'Amazon'],
  },
  blizzard: {
    type: 'blizzard',
    name: 'Blizzard',
    description: 'Severe snowstorm with high winds',
    baseOccurrenceChance: 6,
    averageDamage: 5000,
    injuryChance: 12,
    propertyDestructionChance: 15,
    commonRegions: ['Alaska', 'Canada', 'Russia', 'Northern Europe', 'Montana'],
  },
  tsunami: {
    type: 'tsunami',
    name: 'Tsunami',
    description: 'Giant ocean wave caused by underwater earthquake',
    baseOccurrenceChance: 0.5, // Rare but devastating
    averageDamage: 100000,
    injuryChance: 60,
    propertyDestructionChance: 95,
    commonRegions: ['Japan', 'Indonesia', 'Chile', 'Philippines', 'Pacific Islands'],
  },
  'volcanic-eruption': {
    type: 'volcanic-eruption',
    name: 'Volcanic Eruption',
    description: 'Explosive release of lava and ash',
    baseOccurrenceChance: 1, // Rare
    averageDamage: 50000,
    injuryChance: 40,
    propertyDestructionChance: 85,
    commonRegions: ['Hawaii', 'Iceland', 'Indonesia', 'Philippines', 'Italy'],
  },
};

/**
 * Check if disaster occurs this month (dice-based)
 */
export function checkForDisaster(
  currentRegion: string,
  month: number, // 0-11
  hasDisasterInsurance: boolean,
  luck: number
): {
  disasterOccurs: boolean;
  disasterType: DisasterType | null;
} {
  // Some disasters are seasonal
  const seasonalMultipliers: Record<string, Record<number, number>> = {
    hurricane: { 6: 2, 7: 3, 8: 3, 9: 2 }, // July-Oct
    tornado: { 3: 2, 4: 2.5, 5: 2 }, // April-June
    wildfire: { 6: 2, 7: 2.5, 8: 2 }, // Summer
    blizzard: { 11: 2, 0: 2.5, 1: 2 }, // Winter
  };

  // Roll for each disaster type
  for (const [type, definition] of Object.entries(disasterDefinitions)) {
    let chance = definition.baseOccurrenceChance / 12; // Monthly chance

    // Seasonal adjustment
    const seasonalMult = seasonalMultipliers[type]?.[month] || 1;
    chance *= seasonalMult;

    // Region adjustment
    if (definition.commonRegions.some(r => currentRegion.includes(r))) {
      chance *= 3; // 3x more likely in common regions
    }

    // Insurance reduces occurrence slightly (better preparation)
    if (hasDisasterInsurance) {
      chance *= 0.8;
    }

    // Dice roll
    const roll = rollDice('d100', [], luck);
    if (roll.modifiedRoll <= chance) {
      return {
        disasterOccurs: true,
        disasterType: type as DisasterType,
      };
    }
  }

  return { disasterOccurs: false, disasterType: null };
}

/**
 * Simulate disaster with dice-driven outcomes
 */
export function simulateDisaster(
  disasterType: DisasterType,
  region: string,
  hasInsurance: boolean,
  hasEmergencyFund: boolean,
  propertyValue: number,
  health: number,
  luck: number
): {
  severity: DisasterSeverity;
  damageAmount: number;
  injuries: boolean;
  hospitalDays: number;
  propertyDestroyed: boolean;
  evacuated: boolean;
  insuranceCovered: number;
  survived: boolean;
  message: string;
} {
  const definition = disasterDefinitions[disasterType];

  // Determine severity with dice
  const severityRoll = rollDice('d20', [], luck);
  let severity: DisasterSeverity;

  if (severityRoll.criticalFailure) {
    severity = 'catastrophic';
  } else if (severityRoll.modifiedRoll >= 18) {
    severity = 'minor';
  } else if (severityRoll.modifiedRoll >= 12) {
    severity = 'moderate';
  } else if (severityRoll.modifiedRoll >= 6) {
    severity = 'major';
  } else {
    severity = 'catastrophic';
  }

  // Severity multipliers
  const severityMult = {
    minor: 0.3,
    moderate: 0.7,
    major: 1.5,
    catastrophic: 3.0,
  }[severity];

  // Calculate damage
  let damageAmount = Math.round(definition.averageDamage * severityMult * (0.5 + Math.random()));

  // Property destruction check
  const propCheck = rollDice('d100', [], luck);
  const propertyDestroyed = propCheck.modifiedRoll <= definition.propertyDestructionChance * severityMult;

  if (propertyDestroyed) {
    damageAmount += Math.round(propertyValue * (0.3 + Math.random() * 0.6)); // 30-90% of property value
  }

  // Injury check
  const injuryCheck = rollDice('d100', [], luck);
  const injuries = injuryCheck.modifiedRoll <= definition.injuryChance * severityMult;

  let hospitalDays = 0;
  if (injuries) {
    hospitalDays = severity === 'catastrophic' ? randint(14, 60) :
                   severity === 'major' ? randint(7, 30) :
                   severity === 'moderate' ? randint(2, 14) :
                   randint(1, 5);
  }

  // Survival check for catastrophic disasters
  const modifiers: DiceModifier[] = [
    { name: 'Health', value: Math.floor(health / 15), source: 'stat' },
    { name: 'Emergency Prep', value: hasEmergencyFund ? 3 : 0, source: 'preparation' },
  ];

  const survivalCheck = checkSuccess('d20', severity === 'catastrophic' ? 15 : 8, modifiers, luck);
  const survived = survivalCheck.success || severity !== 'catastrophic';

  // Evacuation
  const evacuated = severity === 'major' || severity === 'catastrophic';

  // Insurance coverage
  let insuranceCovered = 0;
  if (hasInsurance) {
    const coveragePercent = severity === 'catastrophic' ? 0.7 :
                            severity === 'major' ? 0.8 :
                            severity === 'moderate' ? 0.85 :
                            0.9;
    insuranceCovered = Math.round(damageAmount * coveragePercent);
  }

  // Message
  let message = '';
  if (!survived) {
    message = `FATAL: You did not survive the ${severity} ${definition.name}.`;
  } else if (severity === 'catastrophic') {
    message = `CATASTROPHIC ${definition.name}! Massive destruction. `;
    if (propertyDestroyed) message += 'Your property was destroyed. ';
    if (injuries) message += `Severely injured - ${hospitalDays} days in hospital. `;
    message += survived ? 'You barely survived!' : '';
  } else if (severity === 'major') {
    message = `Major ${definition.name} hit your area. Significant damage and disruption.`;
  } else if (severity === 'moderate') {
    message = `Moderate ${definition.name}. Some damage and inconvenience.`;
  } else {
    message = `Minor ${definition.name}. Limited damage.`;
  }

  return {
    severity,
    damageAmount,
    injuries,
    hospitalDays,
    propertyDestroyed,
    evacuated,
    insuranceCovered,
    survived,
    message,
  };
}

/**
 * Calculate disaster insurance premium
 */
export function calculateDisasterInsurance(
  region: string,
  propertyValue: number
): {
  monthlyCost: number;
  coverageAmount: number;
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
} {
  // Check how many disaster types are common in region
  let riskScore = 0;
  for (const definition of Object.values(disasterDefinitions)) {
    if (definition.commonRegions.some(r => region.includes(r))) {
      riskScore += definition.baseOccurrenceChance;
    }
  }

  let riskLevel: 'low' | 'medium' | 'high' | 'extreme';
  let rateMultiplier: number;

  if (riskScore >= 20) {
    riskLevel = 'extreme';
    rateMultiplier = 0.025; // 2.5% of property value annually
  } else if (riskScore >= 12) {
    riskLevel = 'high';
    rateMultiplier = 0.015; // 1.5%
  } else if (riskScore >= 6) {
    riskLevel = 'medium';
    rateMultiplier = 0.008; // 0.8%
  } else {
    riskLevel = 'low';
    rateMultiplier = 0.004; // 0.4%
  }

  const annualCost = propertyValue * rateMultiplier;
  const monthlyCost = Math.round(annualCost / 12);
  const coverageAmount = Math.round(propertyValue * 0.9); // 90% coverage

  return {
    monthlyCost,
    coverageAmount,
    riskLevel,
  };
}

/**
 * Emergency preparedness impact
 */
export function emergencyPreparednessBonus(
  hasEmergencyFund: boolean,
  hasInsurance: boolean,
  emergencySupplies: boolean
): {
  damageReduction: number; // percentage
  survivalBonus: number; // +modifier to survival roll
} {
  let damageReduction = 0;
  let survivalBonus = 0;

  if (hasEmergencyFund) {
    damageReduction += 10;
    survivalBonus += 2;
  }

  if (hasInsurance) {
    survivalBonus += 1; // Better preparation
  }

  if (emergencySupplies) {
    damageReduction += 15;
    survivalBonus += 3;
  }

  return {
    damageReduction: Math.min(30, damageReduction),
    survivalBonus: Math.min(5, survivalBonus),
  };
}
