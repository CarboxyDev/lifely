import type { CrimeType, CrimeSeverity, DiceModifier } from '../types';
import { rollDice, checkSuccess, contestedRoll } from '../utils/dice-system';
import { randint } from '../utils/game-utils';

export interface CrimeDefinition {
  type: CrimeType;
  severity: CrimeSeverity;
  name: string;
  description: string;
  minFine: number;
  maxFine: number;
  minJailTime: number; // months
  maxJailTime: number; // months
  catchRate: number; // 0-1, probability of getting caught
  karmaLoss: number;
  moraleImpact: number; // negative impact on morale if caught
}

export const crimeDefinitions: CrimeDefinition[] = [
  // Minor crimes
  {
    type: 'vandalism',
    severity: 'minor',
    name: 'Vandalism',
    description: 'Defaced public property',
    minFine: 500,
    maxFine: 2000,
    minJailTime: 0,
    maxJailTime: 1,
    catchRate: 0.4,
    karmaLoss: 5,
    moraleImpact: -10,
  },
  {
    type: 'theft',
    severity: 'minor',
    name: 'Petty Theft',
    description: 'Stole items from a store',
    minFine: 300,
    maxFine: 1500,
    minJailTime: 0,
    maxJailTime: 2,
    catchRate: 0.5,
    karmaLoss: 8,
    moraleImpact: -15,
  },

  // Moderate crimes
  {
    type: 'drug-possession',
    severity: 'moderate',
    name: 'Drug Possession',
    description: 'Caught with illegal substances',
    minFine: 1000,
    maxFine: 5000,
    minJailTime: 1,
    maxJailTime: 6,
    catchRate: 0.6,
    karmaLoss: 12,
    moraleImpact: -20,
  },
  {
    type: 'drunk-driving',
    severity: 'moderate',
    name: 'DUI',
    description: 'Driving under the influence',
    minFine: 2000,
    maxFine: 8000,
    minJailTime: 1,
    maxJailTime: 3,
    catchRate: 0.7,
    karmaLoss: 15,
    moraleImpact: -25,
  },
  {
    type: 'assault',
    severity: 'moderate',
    name: 'Assault',
    description: 'Physical altercation resulting in injury',
    minFine: 1500,
    maxFine: 6000,
    minJailTime: 2,
    maxJailTime: 12,
    catchRate: 0.8,
    karmaLoss: 20,
    moraleImpact: -30,
  },

  // Serious crimes
  {
    type: 'fraud',
    severity: 'serious',
    name: 'Fraud',
    description: 'Financial fraud and deception',
    minFine: 5000,
    maxFine: 50000,
    minJailTime: 6,
    maxJailTime: 24,
    catchRate: 0.65,
    karmaLoss: 30,
    moraleImpact: -40,
  },
  {
    type: 'theft',
    severity: 'serious',
    name: 'Grand Theft',
    description: 'Stole valuable property',
    minFine: 3000,
    maxFine: 20000,
    minJailTime: 6,
    maxJailTime: 36,
    catchRate: 0.7,
    karmaLoss: 25,
    moraleImpact: -35,
  },

  // Felonies
  {
    type: 'tax-evasion',
    severity: 'felony',
    name: 'Tax Evasion',
    description: 'Deliberately avoided paying taxes',
    minFine: 10000,
    maxFine: 100000,
    minJailTime: 12,
    maxJailTime: 60,
    catchRate: 0.5,
    karmaLoss: 40,
    moraleImpact: -50,
  },
  {
    type: 'embezzlement',
    severity: 'felony',
    name: 'Embezzlement',
    description: 'Stole money from employer',
    minFine: 20000,
    maxFine: 500000,
    minJailTime: 24,
    maxJailTime: 120,
    catchRate: 0.7,
    karmaLoss: 50,
    moraleImpact: -60,
  },
  {
    type: 'cybercrime',
    severity: 'serious',
    name: 'Cybercrime',
    description: 'Hacking and computer fraud',
    minFine: 5000,
    maxFine: 150000,
    minJailTime: 12,
    maxJailTime: 84,
    catchRate: 0.4,
    karmaLoss: 35,
    moraleImpact: -45,
  },
  {
    type: 'identity-theft',
    severity: 'serious',
    name: 'Identity Theft',
    description: 'Stole someone\'s identity',
    minFine: 10000,
    maxFine: 75000,
    minJailTime: 18,
    maxJailTime: 60,
    catchRate: 0.6,
    karmaLoss: 40,
    moraleImpact: -50,
  },
  {
    type: 'insider-trading',
    severity: 'felony',
    name: 'Insider Trading',
    description: 'Used confidential information for stock trading',
    minFine: 50000,
    maxFine: 1000000,
    minJailTime: 24,
    maxJailTime: 120,
    catchRate: 0.55,
    karmaLoss: 45,
    moraleImpact: -55,
  },
  {
    type: 'burglary',
    severity: 'serious',
    name: 'Burglary',
    description: 'Broke into a property',
    minFine: 3000,
    maxFine: 25000,
    minJailTime: 12,
    maxJailTime: 48,
    catchRate: 0.65,
    karmaLoss: 30,
    moraleImpact: -40,
  },
  {
    type: 'robbery',
    severity: 'violent-felony',
    name: 'Robbery',
    description: 'Theft with threat of force',
    minFine: 5000,
    maxFine: 50000,
    minJailTime: 36,
    maxJailTime: 180,
    catchRate: 0.75,
    karmaLoss: 60,
    moraleImpact: -70,
  },
  {
    type: 'money-laundering',
    severity: 'felony',
    name: 'Money Laundering',
    description: 'Concealed illegal money sources',
    minFine: 25000,
    maxFine: 500000,
    minJailTime: 24,
    maxJailTime: 240,
    catchRate: 0.5,
    karmaLoss: 50,
    moraleImpact: -55,
  },
  {
    type: 'extortion',
    severity: 'felony',
    name: 'Extortion',
    description: 'Obtained money through threats',
    minFine: 10000,
    maxFine: 100000,
    minJailTime: 24,
    maxJailTime: 144,
    catchRate: 0.7,
    karmaLoss: 55,
    moraleImpact: -65,
  },
  {
    type: 'bribery',
    severity: 'serious',
    name: 'Bribery',
    description: 'Offered bribes to officials',
    minFine: 15000,
    maxFine: 200000,
    minJailTime: 18,
    maxJailTime: 84,
    catchRate: 0.45,
    karmaLoss: 40,
    moraleImpact: -50,
  },
  {
    type: 'racketeering',
    severity: 'felony',
    name: 'Racketeering',
    description: 'Organized crime activities',
    minFine: 50000,
    maxFine: 1000000,
    minJailTime: 60,
    maxJailTime: 360,
    catchRate: 0.6,
    karmaLoss: 70,
    moraleImpact: -80,
  },
  {
    type: 'perjury',
    severity: 'moderate',
    name: 'Perjury',
    description: 'Lied under oath',
    minFine: 5000,
    maxFine: 25000,
    minJailTime: 6,
    maxJailTime: 36,
    catchRate: 0.8,
    karmaLoss: 25,
    moraleImpact: -35,
  },
  {
    type: 'arson',
    severity: 'violent-felony',
    name: 'Arson',
    description: 'Intentionally set fire to property',
    minFine: 20000,
    maxFine: 250000,
    minJailTime: 48,
    maxJailTime: 240,
    catchRate: 0.7,
    karmaLoss: 65,
    moraleImpact: -75,
  },
  {
    type: 'kidnapping',
    severity: 'violent-felony',
    name: 'Kidnapping',
    description: 'Abducted a person',
    minFine: 50000,
    maxFine: 500000,
    minJailTime: 120,
    maxJailTime: 600,
    catchRate: 0.85,
    karmaLoss: 90,
    moraleImpact: -95,
  },
  {
    type: 'manslaughter',
    severity: 'violent-felony',
    name: 'Manslaughter',
    description: 'Unlawful killing without malice',
    minFine: 0,
    maxFine: 100000,
    minJailTime: 84,
    maxJailTime: 360,
    catchRate: 0.9,
    karmaLoss: 95,
    moraleImpact: -100,
  },
];

/**
 * Calculate jail time reduction if player has a lawyer
 */
export function calculateLawyerBenefit(
  originalJailTime: number,
  hasLawyer: boolean
): number {
  if (!hasLawyer) return originalJailTime;

  // Lawyer reduces sentence by 30-50%
  const reductionPercent = 0.3 + Math.random() * 0.2;
  const reducedTime = Math.ceil(originalJailTime * (1 - reductionPercent));

  return Math.max(0, reducedTime);
}

/**
 * Calculate fine reduction if player has a lawyer
 */
export function calculateFineReduction(
  originalFine: number,
  hasLawyer: boolean
): number {
  if (!hasLawyer) return originalFine;

  // Lawyer reduces fine by 20-40%
  const reductionPercent = 0.2 + Math.random() * 0.2;
  const reducedFine = Math.ceil(originalFine * (1 - reductionPercent));

  return Math.max(0, reducedFine);
}

/**
 * Determine if crime results in getting caught
 */
export function willGetCaught(crime: CrimeDefinition): boolean {
  return Math.random() < crime.catchRate;
}

/**
 * Get crime description based on type and severity
 */
export function getCrimeDescription(
  type: CrimeType,
  severity: CrimeSeverity
): string {
  const crime = crimeDefinitions.find(
    (c) => c.type === type && c.severity === severity
  );
  return crime ? crime.description : 'Committed a crime';
}

/**
 * Calculate random jail time within crime's range
 */
export function calculateJailTime(
  crime: CrimeDefinition,
  hasLawyer: boolean
): number {
  const baseTime =
    crime.minJailTime +
    Math.floor(Math.random() * (crime.maxJailTime - crime.minJailTime + 1));

  return calculateLawyerBenefit(baseTime, hasLawyer);
}

/**
 * Calculate random fine within crime's range
 */
export function calculateFine(
  crime: CrimeDefinition,
  hasLawyer: boolean
): number {
  const baseFine =
    crime.minFine + Math.floor(Math.random() * (crime.maxFine - crime.minFine + 1));

  return calculateFineReduction(baseFine, hasLawyer);
}

/**
 * Get impact on job prospects based on criminal record
 */
export function getCriminalRecordJobImpact(recordLength: number): {
  salaryPenalty: number; // percentage reduction
  hiringDifficulty: number; // 0-1, chance of rejection
} {
  // Each crime on record reduces salary by 5% and increases rejection chance
  const salaryPenalty = Math.min(50, recordLength * 5); // Max 50% reduction
  const hiringDifficulty = Math.min(0.8, recordLength * 0.15); // Max 80% rejection

  return { salaryPenalty, hiringDifficulty };
}

/**
 * Check if player can commit crime (not already in jail)
 */
export function canCommitCrime(isJailed: boolean): boolean {
  return !isJailed;
}

/**
 * Court trial with dice-based outcome
 */
export function conductTrial(
  crime: CrimeDefinition,
  hasLawyer: boolean,
  lawyerQuality: number, // 0-100
  evidenceQuality: number, // 0-100 (higher = stronger prosecution)
  intellect: number,
  karma: number,
  luck: number
): {
  outcome: import('../types').TrialOutcome;
  sentenceMonths: number;
  sentenceType: import('../types').SentenceType;
  fine: number;
  message: string;
} {
  const modifiers: DiceModifier[] = [];

  // Lawyer quality
  if (hasLawyer) {
    modifiers.push({ name: 'Defense Attorney', value: Math.floor(lawyerQuality / 12), source: 'professional' });
  }

  // Defendant's intellect (can defend self better)
  modifiers.push({ name: 'Intellect', value: Math.floor(intellect / 20), source: 'stat' });

  // Karma affects jury sympathy
  if (karma > 50) {
    modifiers.push({ name: 'Good Character', value: Math.floor((karma - 50) / 15), source: 'character' });
  } else if (karma < 30) {
    modifiers.push({ name: 'Poor Reputation', value: -Math.floor((30 - karma) / 10), source: 'character' });
  }

  // Evidence strength (prosecution advantage)
  const prosecutionBonus = Math.floor(evidenceQuality / 15);

  // Defense vs Prosecution contested roll
  const defenseRoll = rollDice('d20', modifiers, luck);
  const prosecutionRoll = rollDice('d20', [{ name: 'Evidence', value: prosecutionBonus, source: 'evidence' }], 50);

  let outcome: import('../types').TrialOutcome;
  let sentenceMonths = 0;
  let sentenceType: import('../types').SentenceType = 'jail';
  let fine = 0;
  let message = '';

  // Critical success = not guilty
  if (defenseRoll.criticalSuccess || defenseRoll.modifiedRoll > prosecutionRoll.modifiedRoll + 8) {
    outcome = 'not-guilty';
    message = 'NOT GUILTY! You were acquitted of all charges.';
  }
  // Critical failure = harsh sentence
  else if (defenseRoll.criticalFailure || prosecutionRoll.modifiedRoll > defenseRoll.modifiedRoll + 10) {
    outcome = 'guilty';
    sentenceMonths = crime.maxJailTime;
    fine = crime.maxFine;
    sentenceType = 'jail';
    message = 'GUILTY! Maximum sentence imposed.';
  }
  // Very close = hung jury
  else if (Math.abs(defenseRoll.modifiedRoll - prosecutionRoll.modifiedRoll) <= 2) {
    outcome = 'hung-jury';
    message = 'Hung jury - mistrial declared. Retrial pending.';
  }
  // Defense wins
  else if (defenseRoll.modifiedRoll > prosecutionRoll.modifiedRoll) {
    // Might still be guilty but lighter sentence
    const margin = defenseRoll.modifiedRoll - prosecutionRoll.modifiedRoll;
    if (margin >= 5) {
      outcome = 'not-guilty';
      message = 'NOT GUILTY! Strong defense overcame prosecution.';
    } else {
      outcome = 'plea-deal';
      sentenceMonths = Math.round(crime.minJailTime * 0.5);
      fine = Math.round(crime.minFine * 0.7);
      sentenceType = crime.severity === 'minor' ? 'probation' : 'community-service';
      message = 'Plea deal accepted. Reduced charges and lighter sentence.';
    }
  }
  // Prosecution wins
  else {
    outcome = 'guilty';
    const sentencePercent = 0.5 + (prosecutionRoll.modifiedRoll - defenseRoll.modifiedRoll) / 20;
    sentenceMonths = Math.round(crime.minJailTime + (crime.maxJailTime - crime.minJailTime) * sentencePercent);
    fine = Math.round(crime.minFine + (crime.maxFine - crime.minFine) * sentencePercent);

    // Determine sentence type
    if (crime.severity === 'minor' || crime.severity === 'moderate') {
      const typeRoll = randint(1, 100);
      if (typeRoll > 70) {
        sentenceType = 'probation';
        sentenceMonths = 0;
      } else if (typeRoll > 40) {
        sentenceType = 'community-service';
        sentenceMonths = Math.round(sentenceMonths * 0.5);
      } else {
        sentenceType = 'jail';
      }
    } else {
      sentenceType = 'jail';
    }

    message = `GUILTY! Sentenced to ${sentenceMonths} months ${sentenceType} and $${fine.toLocaleString()} fine.`;
  }

  return { outcome, sentenceMonths, sentenceType, fine, message };
}

/**
 * Plea bargain negotiation
 */
export function negotiatePleaBargain(
  crime: CrimeDefinition,
  hasLawyer: boolean,
  lawyerQuality: number,
  evidenceAgainst: number,
  priorConvictions: number,
  luck: number
): {
  accepted: boolean;
  sentenceReduction: number; // percentage
  chargeReduced: boolean;
  newSentenceMonths: number;
  newFine: number;
  message: string;
} {
  const modifiers: DiceModifier[] = [];

  if (hasLawyer) {
    modifiers.push({ name: 'Lawyer Negotiation', value: Math.floor(lawyerQuality / 10), source: 'professional' });
  }

  // Strong evidence makes plea less favorable
  modifiers.push({ name: 'Evidence Strength', value: -Math.floor(evidenceAgainst / 20), source: 'evidence' });

  // Prior convictions make DA less willing to deal
  if (priorConvictions > 0) {
    modifiers.push({ name: 'Criminal History', value: -priorConvictions, source: 'history' });
  }

  const result = checkSuccess('d20', 12, modifiers, luck);

  let accepted = result.success;
  let sentenceReduction = 0;
  let chargeReduced = false;
  let newSentenceMonths = 0;
  let newFine = 0;
  let message = '';

  if (result.criticalSuccess) {
    accepted = true;
    sentenceReduction = randint(60, 80);
    chargeReduced = true;
    newSentenceMonths = Math.round(crime.minJailTime * (1 - sentenceReduction / 100));
    newFine = Math.round(crime.minFine * 0.3);
    message = 'Excellent plea deal! Charges reduced significantly.';
  } else if (accepted) {
    sentenceReduction = randint(30, 50);
    chargeReduced = randint(1, 100) > 60;
    newSentenceMonths = Math.round((crime.minJailTime + crime.maxJailTime) / 2 * (1 - sentenceReduction / 100));
    newFine = Math.round((crime.minFine + crime.maxFine) / 2 * 0.6);
    message = `Plea deal accepted. ${sentenceReduction}% sentence reduction.`;
  } else if (result.criticalFailure) {
    accepted = false;
    message = 'DA rejected plea bargain outright. Going to trial.';
  } else {
    accepted = false;
    message = 'Plea bargain rejected. Prepare for trial.';
  }

  return {
    accepted,
    sentenceReduction,
    chargeReduced,
    newSentenceMonths,
    newFine,
    message,
  };
}

/**
 * Parole hearing (dice-based)
 */
export function paroleHearing(
  monthsServed: number,
  totalSentence: number,
  goodBehavior: boolean,
  prisonViolations: number,
  crimeType: CrimeType,
  luck: number
): {
  granted: boolean;
  monthsReduced: number;
  restrictions: string[];
  message: string;
} {
  // Must serve at least 50% of sentence for parole eligibility
  if (monthsServed < totalSentence * 0.5) {
    return {
      granted: false,
      monthsReduced: 0,
      restrictions: [],
      message: 'Not yet eligible for parole. Must serve at least 50% of sentence.',
    };
  }

  const modifiers: DiceModifier[] = [];

  if (goodBehavior) {
    modifiers.push({ name: 'Good Behavior', value: 5, source: 'behavior' });
  }

  if (prisonViolations > 0) {
    modifiers.push({ name: 'Prison Violations', value: -prisonViolations * 3, source: 'behavior' });
  }

  // Percent of sentence served
  const percentServed = (monthsServed / totalSentence) * 100;
  if (percentServed > 75) {
    modifiers.push({ name: 'Time Served', value: 3, source: 'time' });
  }

  // Violent crimes harder to get parole
  if (crimeType === 'robbery' || crimeType === 'assault' || crimeType === 'kidnapping' || crimeType === 'arson' || crimeType === 'manslaughter') {
    modifiers.push({ name: 'Violent Crime', value: -4, source: 'crime-type' });
  }

  const result = checkSuccess('d20', 13, modifiers, luck);

  if (!result.success) {
    return {
      granted: false,
      monthsReduced: 0,
      restrictions: [],
      message: 'Parole denied. Better luck next hearing.',
    };
  }

  const monthsRemaining = totalSentence - monthsServed;
  const reductionPercent = result.criticalSuccess ? randint(80, 100) : randint(50, 75);
  const monthsReduced = Math.round(monthsRemaining * (reductionPercent / 100));

  const restrictions = [
    'Regular check-ins with parole officer',
    'No leaving state without permission',
  ];

  if (randint(1, 100) > 50) restrictions.push('Drug testing required');
  if (randint(1, 100) > 60) restrictions.push('Curfew: 10 PM - 6 AM');
  if (randint(1, 100) > 70) restrictions.push('Cannot associate with known criminals');

  return {
    granted: true,
    monthsReduced,
    restrictions,
    message: result.criticalSuccess
      ? `Parole granted! Early release. ${restrictions.length} conditions apply.`
      : `Parole approved. Released early with supervision.`,
  };
}

/**
 * Probation violation check
 */
export function probationViolationCheck(
  onProbation: boolean,
  violationType: 'failed-drug-test' | 'missed-checkin' | 'new-crime' | 'curfew-violation',
  priorViolations: number,
  luck: number
): {
  caught: boolean;
  consequence: 'warning' | 'extended-probation' | 'jail-time';
  additionalMonths: number;
  message: string;
} {
  if (!onProbation) {
    return {
      caught: false,
      consequence: 'warning',
      additionalMonths: 0,
      message: '',
    };
  }

  const violationDetectionRate: Record<typeof violationType, number> = {
    'failed-drug-test': 95,
    'missed-checkin': 100,
    'new-crime': 85,
    'curfew-violation': 60,
  };

  const detectionRoll = rollDice('d100', [], luck);
  const caught = detectionRoll.modifiedRoll <= violationDetectionRate[violationType];

  if (!caught) {
    return {
      caught: false,
      consequence: 'warning',
      additionalMonths: 0,
      message: 'Violation not detected... got lucky.',
    };
  }

  let consequence: 'warning' | 'extended-probation' | 'jail-time';
  let additionalMonths = 0;
  let message = '';

  if (violationType === 'new-crime') {
    consequence = 'jail-time';
    additionalMonths = randint(12, 36);
    message = 'New crime while on probation! Probation revoked, jail time imposed.';
  } else if (priorViolations >= 2) {
    consequence = 'jail-time';
    additionalMonths = randint(6, 18);
    message = 'Multiple probation violations. Probation revoked.';
  } else if (priorViolations === 1) {
    consequence = 'extended-probation';
    additionalMonths = randint(3, 12);
    message = 'Probation extended due to violation.';
  } else {
    consequence = 'warning';
    additionalMonths = 0;
    message = 'Official warning issued. Next violation will have consequences.';
  }

  return {
    caught,
    consequence,
    additionalMonths,
    message,
  };
}

/**
 * Expungement eligibility and application
 */
export function applyForExpungement(
  crime: CrimeDefinition,
  yearsSinceCrime: number,
  subsequentCrimes: number,
  hasCompletedSentence: boolean,
  hasLawyer: boolean,
  luck: number
): {
  eligible: boolean;
  approved: boolean;
  cost: number;
  message: string;
} {
  // Violent felonies cannot be expunged
  if (crime.severity === 'violent-felony') {
    return {
      eligible: false,
      approved: false,
      cost: 0,
      message: 'Violent felonies cannot be expunged.',
    };
  }

  // Must have completed sentence
  if (!hasCompletedSentence) {
    return {
      eligible: false,
      approved: false,
      cost: 0,
      message: 'Must complete full sentence before applying for expungement.',
    };
  }

  // Waiting period requirements
  const waitingPeriod: Record<CrimeSeverity, number> = {
    'minor': 3,
    'moderate': 5,
    'serious': 7,
    'felony': 10,
    'violent-felony': 999, // Not eligible
  };

  if (yearsSinceCrime < waitingPeriod[crime.severity]) {
    return {
      eligible: false,
      approved: false,
      cost: 0,
      message: `Must wait ${waitingPeriod[crime.severity]} years after conviction to apply.`,
    };
  }

  // No subsequent crimes
  if (subsequentCrimes > 0) {
    return {
      eligible: false,
      approved: false,
      cost: 0,
      message: 'Cannot expunge record with subsequent criminal convictions.',
    };
  }

  // Eligible - now determine if approved
  const cost = hasLawyer ? randint(2000, 5000) : randint(500, 1500);

  const modifiers: DiceModifier[] = [];
  if (hasLawyer) {
    modifiers.push({ name: 'Legal Representation', value: 6, source: 'professional' });
  }

  const difficultyByServity: Record<CrimeSeverity, number> = {
    'minor': 10,
    'moderate': 13,
    'serious': 16,
    'felony': 18,
    'violent-felony': 25,
  };

  const result = checkSuccess('d20', difficultyByServity[crime.severity], modifiers, luck);

  return {
    eligible: true,
    approved: result.success,
    cost,
    message: result.success
      ? 'Expungement approved! Crime removed from record.'
      : 'Expungement denied. Can reapply in 1 year.',
  };
}

/**
 * Three strikes law check
 */
export function checkThreeStrikes(
  felonyCount: number,
  newCrime: CrimeDefinition
): {
  triggersThreeStrikes: boolean;
  mandatorySentence: number; // months
  message: string;
} {
  // Only applies to felonies
  if (newCrime.severity !== 'felony' && newCrime.severity !== 'violent-felony') {
    return {
      triggersThreeStrikes: false,
      mandatorySentence: 0,
      message: '',
    };
  }

  if (felonyCount >= 2) {
    // Third strike
    return {
      triggersThreeStrikes: true,
      mandatorySentence: 300, // 25 years minimum
      message: 'THREE STRIKES LAW TRIGGERED! Mandatory 25-year sentence.',
    };
  }

  return {
    triggersThreeStrikes: false,
    mandatorySentence: 0,
    message: '',
  };
}
