import type { CrimeType, CrimeSeverity } from '../types';

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
