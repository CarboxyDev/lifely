import type { DiceModifier } from '../types';
import { rollDice, checkSuccess } from '../utils/dice-system';
import { randint } from '../utils/game-utils';

/**
 * Comprehensive marriage and divorce system with realistic mechanics
 */

export interface MarriageProposal {
  success: boolean;
  accepted: boolean;
  reaction: string;
  relationshipChange: number;
}

export interface Wedding {
  type: 'elopement' | 'small' | 'medium' | 'large' | 'lavish';
  cost: number;
  guestCount: number;
  fameGain: number;
  reputationGain: number;
  description: string;
}

export interface Anniversary {
  years: number;
  traditionName: string;
  giftSuggestion: string;
  qualityBoost: number;
}

export interface MarriageQualityFactors {
  baseQuality: number; // From relationship quality
  financialStress: number; // -50 to +50
  workLifeBalance: number; // -30 to +30
  intimacy: number; // 0-100
  communication: number; // 0-100
  trust: number; // 0-100
  sharedGoals: number; // -20 to +20
  inLawRelations: number; // -30 to +30
  childrenStress: number; // -40 to 0
}

export interface DivorceSettlement {
  type: 'uncontested' | 'contested';
  assetDivision: number; // Percentage you keep (0-100)
  alimonyMonthly: number;
  alimonyDuration: number; // months
  childCustody?: 'sole' | 'joint' | 'lost';
  childSupport?: number; // monthly
  legalCosts: number;
  settlementTime: number; // months
  reputationImpact: number;
}

export interface PrenuptialAgreement {
  exists: boolean;
  cost: number; // To create
  assetProtection: number; // Percentage of assets protected (0-100)
  alimonyWaiver: boolean;
  effectiveUntil?: number; // age in months, null = forever
}

export interface MarriageCounseling {
  sessions: number;
  costPerSession: number;
  totalSpent: number;
  qualityImprovement: number;
  issues: string[];
  resolved: number; // Number of issues resolved
}

/**
 * Wedding types and costs
 */
export const weddingTypes: Record<Wedding['type'], Omit<Wedding, 'type'>> = {
  elopement: {
    cost: 500,
    guestCount: 2,
    fameGain: 0,
    reputationGain: -5, // Some people disapprove
    description: 'Eloped at city hall with just you two',
  },
  small: {
    cost: 5000,
    guestCount: 30,
    fameGain: 5,
    reputationGain: 5,
    description: 'Intimate ceremony with close family and friends',
  },
  medium: {
    cost: 20000,
    guestCount: 100,
    fameGain: 15,
    reputationGain: 15,
    description: 'Traditional wedding at a nice venue',
  },
  large: {
    cost: 50000,
    guestCount: 200,
    fameGain: 30,
    reputationGain: 25,
    description: 'Grand celebration with elegant reception',
  },
  lavish: {
    cost: 150000,
    guestCount: 300,
    fameGain: 100,
    reputationGain: 50,
    description: 'Extravagant destination wedding featured in magazines',
  },
};

/**
 * Marriage proposal (dice-based)
 */
export function proposeMarriage(
  partnerName: string,
  relationshipQuality: number,
  yearsKnown: number,
  wealthDifference: number, // Your wealth - partner wealth
  looks: number,
  karma: number,
  luck: number
): MarriageProposal {
  const modifiers: DiceModifier[] = [];

  // Relationship quality is key
  modifiers.push({ name: 'Relationship Quality', value: Math.floor(relationshipQuality / 10), source: 'relationship' });

  // Time known together
  if (yearsKnown >= 3) {
    modifiers.push({ name: 'Long Relationship', value: 3, source: 'time' });
  } else if (yearsKnown < 1) {
    modifiers.push({ name: 'Rushed', value: -4, source: 'time' });
  }

  // Looks matter a bit
  modifiers.push({ name: 'Attractiveness', value: Math.floor(looks / 25), source: 'stat' });

  // Karma
  if (karma > 50) {
    modifiers.push({ name: 'Good Person', value: 2, source: 'character' });
  } else if (karma < 20) {
    modifiers.push({ name: 'Bad Reputation', value: -3, source: 'character' });
  }

  // Wealth difference (gold digger concerns)
  if (wealthDifference < -500000) {
    modifiers.push({ name: 'Much Wealthier Partner', value: -2, source: 'finance' });
  }

  const result = checkSuccess('d20', 12, modifiers, luck);

  let accepted = false;
  let reaction = '';
  let relationshipChange = 0;

  if (result.criticalSuccess) {
    accepted = true;
    reaction = `${partnerName} burst into tears of joy and said YES immediately!`;
    relationshipChange = 20;
  } else if (result.success) {
    accepted = true;
    reaction = `${partnerName} smiled and happily accepted your proposal!`;
    relationshipChange = 15;
  } else if (result.criticalFailure) {
    accepted = false;
    reaction = `${partnerName} was shocked and said they need space. The relationship may be over.`;
    relationshipChange = -40;
  } else {
    accepted = false;
    reaction = `${partnerName} gently declined. They're not ready for marriage yet.`;
    relationshipChange = -15;
  }

  return {
    success: result.success,
    accepted,
    reaction,
    relationshipChange,
  };
}

/**
 * Anniversary gifts and traditions
 */
export const anniversaryTraditions: Anniversary[] = [
  { years: 1, traditionName: 'Paper', giftSuggestion: 'Love letter or tickets', qualityBoost: 5 },
  { years: 2, traditionName: 'Cotton', giftSuggestion: 'Bedding or clothing', qualityBoost: 4 },
  { years: 3, traditionName: 'Leather', giftSuggestion: 'Wallet or jacket', qualityBoost: 4 },
  { years: 4, traditionName: 'Fruit/Flowers', giftSuggestion: 'Plant or bouquet', qualityBoost: 3 },
  { years: 5, traditionName: 'Wood', giftSuggestion: 'Furniture or sculpture', qualityBoost: 6 },
  { years: 10, traditionName: 'Tin/Aluminum', giftSuggestion: 'Jewelry or decor', qualityBoost: 10 },
  { years: 15, traditionName: 'Crystal', giftSuggestion: 'Crystal glassware', qualityBoost: 12 },
  { years: 20, traditionName: 'China', giftSuggestion: 'China dinnerware', qualityBoost: 15 },
  { years: 25, traditionName: 'Silver', giftSuggestion: 'Silver jewelry', qualityBoost: 20 },
  { years: 30, traditionName: 'Pearl', giftSuggestion: 'Pearl necklace', qualityBoost: 22 },
  { years: 40, traditionName: 'Ruby', giftSuggestion: 'Ruby ring', qualityBoost: 25 },
  { years: 50, traditionName: 'Gold', giftSuggestion: 'Gold jewelry', qualityBoost: 30 },
  { years: 60, traditionName: 'Diamond', giftSuggestion: 'Diamond anniversary band', qualityBoost: 35 },
];

/**
 * Calculate overall marriage quality
 */
export function calculateMarriageQuality(factors: MarriageQualityFactors): {
  overallQuality: number; // 0-100
  satisfactionLevel: 'excellent' | 'good' | 'struggling' | 'crisis' | 'failing';
  divorceRisk: number; // 0-100
  issues: string[];
} {
  let quality = factors.baseQuality;

  // Apply all factors
  quality += factors.financialStress;
  quality += factors.workLifeBalance;
  quality += factors.intimacy * 0.3;
  quality += factors.communication * 0.4;
  quality += factors.trust * 0.5;
  quality += factors.sharedGoals;
  quality += factors.inLawRelations;
  quality += factors.childrenStress;

  const overallQuality = Math.max(0, Math.min(100, Math.round(quality / 3)));

  // Satisfaction level
  let satisfactionLevel: 'excellent' | 'good' | 'struggling' | 'crisis' | 'failing';
  if (overallQuality >= 80) satisfactionLevel = 'excellent';
  else if (overallQuality >= 60) satisfactionLevel = 'good';
  else if (overallQuality >= 40) satisfactionLevel = 'struggling';
  else if (overallQuality >= 20) satisfactionLevel = 'crisis';
  else satisfactionLevel = 'failing';

  // Divorce risk
  const divorceRisk = Math.max(0, Math.min(100, 100 - overallQuality));

  // Identify issues
  const issues: string[] = [];
  if (factors.financialStress < -20) issues.push('Financial problems causing stress');
  if (factors.workLifeBalance < -15) issues.push('Work-life balance issues');
  if (factors.intimacy < 30) issues.push('Lack of intimacy');
  if (factors.communication < 40) issues.push('Poor communication');
  if (factors.trust < 50) issues.push('Trust issues');
  if (factors.inLawRelations < -15) issues.push('In-law conflicts');
  if (factors.childrenStress < -20) issues.push('Parenting stress');

  return {
    overallQuality,
    satisfactionLevel,
    divorceRisk,
    issues,
  };
}

/**
 * Infidelity check (dice-based)
 */
export function checkForInfidelity(
  marriageQuality: number,
  morale: number,
  karma: number,
  temptation: number, // 0-100, based on fame, attractiveness, etc.
  luck: number
): {
  infidelityOccurs: boolean;
  caught: boolean;
  consequenceSeverity: 'minor' | 'moderate' | 'severe' | 'marriage-ending';
  message: string;
} {
  // Low marriage quality increases risk
  const qualityPenalty = Math.floor((100 - marriageQuality) / 10);
  const moralePenalty = Math.floor((100 - morale) / 15);

  const modifiers: DiceModifier[] = [
    { name: 'Marriage Quality', value: -qualityPenalty, source: 'relationship' },
    { name: 'Morale', value: -moralePenalty, source: 'stat' },
    { name: 'Karma', value: Math.floor(karma / 15), source: 'character' },
    { name: 'Temptation', value: -Math.floor(temptation / 12), source: 'situation' },
  ];

  const resistRoll = checkSuccess('d20', 14, modifiers, luck);

  if (resistRoll.success) {
    // Resisted temptation
    return {
      infidelityOccurs: false,
      caught: false,
      consequenceSeverity: 'minor',
      message: 'You remained faithful to your spouse.',
    };
  }

  // Infidelity occurred - check if caught
  const caughtRoll = rollDice('d100', [], luck);
  const caught = caughtRoll.modifiedRoll <= 60; // 60% chance of getting caught

  if (!caught) {
    return {
      infidelityOccurs: true,
      caught: false,
      consequenceSeverity: 'minor',
      message: 'You cheated on your spouse. They don\'t know... yet.',
    };
  }

  // Caught - determine consequences
  const severityRoll = rollDice('d20', [], luck);
  let consequenceSeverity: 'minor' | 'moderate' | 'severe' | 'marriage-ending';
  let message: string;

  if (severityRoll.criticalFailure || severityRoll.modifiedRoll <= 5) {
    consequenceSeverity = 'marriage-ending';
    message = 'Your spouse caught you cheating and filed for divorce immediately.';
  } else if (severityRoll.modifiedRoll <= 10) {
    consequenceSeverity = 'severe';
    message = 'Your spouse is devastated. Marriage is on the brink of collapse.';
  } else if (severityRoll.modifiedRoll <= 15) {
    consequenceSeverity = 'moderate';
    message = 'Your spouse is hurt and angry. Trust is severely damaged.';
  } else {
    consequenceSeverity = 'minor';
    message = 'Your spouse is upset but willing to try marriage counseling.';
  }

  return {
    infidelityOccurs: true,
    caught: true,
    consequenceSeverity,
    message,
  };
}

/**
 * Marriage counseling effectiveness
 */
export function attendMarriageCounseling(
  currentQuality: number,
  numberOfSessions: number,
  bothCommitted: boolean, // dice roll determines
  issuesCount: number,
  luck: number
): MarriageCounseling {
  const costPerSession = 150;
  const totalSpent = numberOfSessions * costPerSession;

  const modifiers: DiceModifier[] = [
    { name: 'Sessions', value: Math.min(5, Math.floor(numberOfSessions / 2)), source: 'effort' },
    { name: 'Both Committed', value: bothCommitted ? 5 : -3, source: 'commitment' },
    { name: 'Issue Count', value: -Math.min(5, issuesCount), source: 'difficulty' },
  ];

  const effectivenessRoll = rollDice('d20', modifiers, luck);

  // Quality improvement based on roll
  let qualityImprovement = 0;
  if (effectivenessRoll.criticalSuccess) {
    qualityImprovement = 40;
  } else if (effectivenessRoll.modifiedRoll >= 18) {
    qualityImprovement = 30;
  } else if (effectivenessRoll.modifiedRoll >= 14) {
    qualityImprovement = 20;
  } else if (effectivenessRoll.modifiedRoll >= 10) {
    qualityImprovement = 10;
  } else if (effectivenessRoll.modifiedRoll >= 6) {
    qualityImprovement = 5;
  } else {
    qualityImprovement = -5; // Made things worse
  }

  const issuesResolved = Math.max(0, Math.floor((qualityImprovement / 40) * issuesCount));

  const issues = [
    'Communication problems',
    'Financial disagreements',
    'Intimacy issues',
    'Trust problems',
    'Work-life balance',
    'In-law conflicts',
  ];

  return {
    sessions: numberOfSessions,
    costPerSession,
    totalSpent,
    qualityImprovement,
    issues: issues.slice(0, issuesCount),
    resolved: issuesResolved,
  };
}

/**
 * Divorce proceedings (dice-based)
 */
export function initiateDivorce(
  marriageYears: number,
  playerWealth: number,
  spouseWealth: number,
  hasChildren: boolean,
  hasPrenup: boolean,
  prenupProtection: number, // 0-100 if prenup exists
  faultBased: boolean, // cheating, abuse, etc.
  hasLawyer: boolean,
  lawyerQuality: number, // 0-100
  luck: number
): DivorceSettlement {
  // Determine if contested
  const wealthGap = Math.abs(playerWealth - spouseWealth);
  const contested = wealthGap > 50000 || hasChildren || faultBased;

  const modifiers: DiceModifier[] = [];

  if (hasLawyer) {
    modifiers.push({ name: 'Lawyer Quality', value: Math.floor(lawyerQuality / 12), source: 'professional' });
  }

  if (hasPrenup) {
    modifiers.push({ name: 'Prenup', value: 5, source: 'legal' });
  }

  if (faultBased && !hasLawyer) {
    modifiers.push({ name: 'At Fault', value: -4, source: 'legal' });
  }

  const negotiationRoll = rollDice('d20', modifiers, luck);

  // Asset division
  let assetDivision = 50; // Default 50/50

  if (hasPrenup) {
    assetDivision = prenupProtection;
  } else {
    // Negotiate
    if (negotiationRoll.criticalSuccess) {
      assetDivision = randint(75, 90);
    } else if (negotiationRoll.modifiedRoll >= 16) {
      assetDivision = randint(60, 75);
    } else if (negotiationRoll.modifiedRoll >= 12) {
      assetDivision = randint(50, 60);
    } else if (negotiationRoll.modifiedRoll >= 8) {
      assetDivision = randint(40, 50);
    } else {
      assetDivision = randint(25, 40);
    }

    // Fault-based adjustment
    if (faultBased) {
      assetDivision -= 15; // Penalized for being at fault
    }
  }

  // Alimony calculation
  let alimonyMonthly = 0;
  let alimonyDuration = 0;

  if (playerWealth > spouseWealth * 2 && !hasPrenup) {
    const wealthDiff = playerWealth - spouseWealth;
    alimonyMonthly = Math.round(wealthDiff * 0.0015); // 0.15% of difference per month
    alimonyDuration = Math.min(marriageYears * 12, 120); // Max 10 years
  }

  // Child custody and support
  let childCustody: 'sole' | 'joint' | 'lost' | undefined;
  let childSupport: number | undefined;

  if (hasChildren) {
    const custodyRoll = rollDice('d20', modifiers, luck);

    if (custodyRoll.modifiedRoll >= 16) {
      childCustody = 'sole';
      childSupport = 0; // You have custody
    } else if (custodyRoll.modifiedRoll >= 10) {
      childCustody = 'joint';
      childSupport = 500; // Shared expenses
    } else {
      childCustody = 'lost';
      childSupport = 1500; // Full child support
    }
  }

  // Legal costs
  const baseLegalCost = contested ? 15000 : 2000;
  const legalCosts = hasLawyer
    ? Math.round(baseLegalCost * (1 + lawyerQuality / 100))
    : Math.round(baseLegalCost * 0.6);

  // Settlement time
  const settlementTime = contested ? randint(6, 24) : randint(2, 6);

  // Reputation impact
  const reputationImpact = contested ? -20 : -10;

  return {
    type: contested ? 'contested' : 'uncontested',
    assetDivision,
    alimonyMonthly,
    alimonyDuration,
    childCustody,
    childSupport,
    legalCosts,
    settlementTime,
    reputationImpact,
  };
}

/**
 * Create prenuptial agreement
 */
export function createPrenup(
  wealth: number,
  hasLawyer: boolean,
  comprehensiveness: 'basic' | 'standard' | 'ironclad'
): PrenuptialAgreement {
  const baseCosts = {
    basic: 1500,
    standard: 5000,
    ironclad: 15000,
  };

  const assetProtectionLevels = {
    basic: 70, // 70% protected
    standard: 85, // 85% protected
    ironclad: 95, // 95% protected
  };

  const cost = hasLawyer ? baseCosts[comprehensiveness] : Math.round(baseCosts[comprehensiveness] * 1.5);
  const assetProtection = assetProtectionLevels[comprehensiveness];
  const alimonyWaiver = comprehensiveness === 'ironclad';

  return {
    exists: true,
    cost,
    assetProtection,
    alimonyWaiver,
  };
}

/**
 * Random marriage stress event
 */
export function randomMarriageStressEvent(
  marriageQuality: number,
  luck: number
): {
  eventOccurs: boolean;
  eventType: 'argument' | 'forgotten-anniversary' | 'family-drama' | 'financial-fight' | 'jealousy' | 'routine-boredom';
  qualityImpact: number;
  description: string;
} {
  // Higher quality = lower stress event chance
  const stressThreshold = 100 - marriageQuality;

  const roll = rollDice('d100', [], luck);

  if (roll.modifiedRoll > stressThreshold) {
    return {
      eventOccurs: false,
      eventType: 'argument',
      qualityImpact: 0,
      description: '',
    };
  }

  const eventTypes: Array<{
    type: 'argument' | 'forgotten-anniversary' | 'family-drama' | 'financial-fight' | 'jealousy' | 'routine-boredom';
    impact: number;
    description: string;
  }> = [
    {
      type: 'argument',
      impact: -10,
      description: 'Had a heated argument over something trivial.',
    },
    {
      type: 'forgotten-anniversary',
      impact: -20,
      description: 'You forgot your anniversary. Your spouse is hurt.',
    },
    {
      type: 'family-drama',
      impact: -15,
      description: 'In-law drama is causing tension in your marriage.',
    },
    {
      type: 'financial-fight',
      impact: -18,
      description: 'Major disagreement about finances.',
    },
    {
      type: 'jealousy',
      impact: -25,
      description: 'Jealousy and insecurity are creating problems.',
    },
    {
      type: 'routine-boredom',
      impact: -12,
      description: 'Marriage feels routine and boring. The spark is fading.',
    },
  ];

  const event = eventTypes[randint(0, eventTypes.length - 1)];

  return {
    eventOccurs: true,
    eventType: event.type,
    qualityImpact: event.impact,
    description: event.description,
  };
}
