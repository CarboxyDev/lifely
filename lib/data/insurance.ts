import type { InsuranceType, InsuranceRiderType, InsuranceRider } from '../types';

/**
 * Life insurance system - premium calculation, policy management, and claims
 */

export interface InsuranceDefinition {
  type: InsuranceType;
  name: string;
  description: string;
  minCoverage: number;
  maxCoverage: number;
  hasCashValue: boolean;
  typicalTermMonths: number; // 0 for permanent insurance
  baseRatePerThousand: number; // base monthly premium per $1000 coverage
}

export const insuranceTypes: Record<InsuranceType, InsuranceDefinition> = {
  'term-life': {
    type: 'term-life',
    name: 'Term Life Insurance',
    description: 'Coverage for a specific term (10, 20, or 30 years). No cash value.',
    minCoverage: 50000,
    maxCoverage: 2000000,
    hasCashValue: false,
    typicalTermMonths: 240, // 20 years default
    baseRatePerThousand: 0.50, // $0.50 per $1000 coverage per month
  },
  'whole-life': {
    type: 'whole-life',
    name: 'Whole Life Insurance',
    description: 'Permanent coverage with guaranteed cash value growth.',
    minCoverage: 25000,
    maxCoverage: 1000000,
    hasCashValue: true,
    typicalTermMonths: 0, // Permanent
    baseRatePerThousand: 2.50, // More expensive but builds cash value
  },
  'universal-life': {
    type: 'universal-life',
    name: 'Universal Life Insurance',
    description: 'Flexible permanent coverage with investment component.',
    minCoverage: 50000,
    maxCoverage: 1500000,
    hasCashValue: true,
    typicalTermMonths: 0, // Permanent
    baseRatePerThousand: 2.00, // Mid-range with flexibility
  },
};

export const availableRiders: Record<InsuranceRiderType, Omit<InsuranceRider, 'monthlyCost' | 'benefit'>> = {
  'accidental-death': {
    type: 'accidental-death',
    description: 'Doubles payout if death is accidental',
  },
  'critical-illness': {
    type: 'critical-illness',
    description: 'Pays 25% of coverage if diagnosed with critical illness',
  },
  disability: {
    type: 'disability',
    description: 'Waives premiums if disabled and provides monthly income',
  },
  'waiver-of-premium': {
    type: 'waiver-of-premium',
    description: 'Waives premiums if you become disabled',
  },
};

/**
 * Calculate life insurance premium based on age, health, and other factors
 */
export function calculateLifeInsurancePremium(
  insuranceType: InsuranceType,
  coverageAmount: number,
  ageInMonths: number,
  health: number, // 0-100
  isSmoker: boolean = false,
  hasRiskyJob: boolean = false,
  riders: InsuranceRiderType[] = []
): {
  monthlyPremium: number;
  breakdown: {
    basePremium: number;
    ageAdjustment: number;
    healthAdjustment: number;
    smokerSurcharge: number;
    occupationSurcharge: number;
    ridersCost: number;
  };
} {
  const definition = insuranceTypes[insuranceType];
  const ageInYears = ageInMonths / 12;

  // Base premium (per $1000 of coverage)
  const coverageUnits = coverageAmount / 1000;
  let basePremium = coverageUnits * definition.baseRatePerThousand;

  // Age adjustment (premiums increase with age)
  let ageMultiplier = 1.0;
  if (ageInYears >= 60) {
    ageMultiplier = 3.0;
  } else if (ageInYears >= 50) {
    ageMultiplier = 2.0;
  } else if (ageInYears >= 40) {
    ageMultiplier = 1.5;
  } else if (ageInYears >= 30) {
    ageMultiplier = 1.2;
  }
  const ageAdjustment = basePremium * (ageMultiplier - 1);

  // Health adjustment (poor health = higher premiums)
  let healthMultiplier = 1.0;
  if (health < 50) {
    healthMultiplier = 2.0; // Very poor health
  } else if (health < 70) {
    healthMultiplier = 1.5; // Below average health
  } else if (health < 85) {
    healthMultiplier = 1.2; // Average health
  } else {
    healthMultiplier = 1.0; // Excellent health
  }
  const healthAdjustment = basePremium * (healthMultiplier - 1);

  // Smoking surcharge (50% increase)
  const smokerSurcharge = isSmoker ? basePremium * 0.5 : 0;

  // Risky occupation surcharge (30% increase)
  const occupationSurcharge = hasRiskyJob ? basePremium * 0.3 : 0;

  // Calculate riders cost
  let ridersCost = 0;
  for (const riderType of riders) {
    ridersCost += calculateRiderCost(riderType, coverageAmount);
  }

  // Total monthly premium
  const monthlyPremium = Math.round(
    basePremium +
      ageAdjustment +
      healthAdjustment +
      smokerSurcharge +
      occupationSurcharge +
      ridersCost
  );

  return {
    monthlyPremium,
    breakdown: {
      basePremium: Math.round(basePremium),
      ageAdjustment: Math.round(ageAdjustment),
      healthAdjustment: Math.round(healthAdjustment),
      smokerSurcharge: Math.round(smokerSurcharge),
      occupationSurcharge: Math.round(occupationSurcharge),
      ridersCost: Math.round(ridersCost),
    },
  };
}

/**
 * Calculate rider cost
 */
function calculateRiderCost(riderType: InsuranceRiderType, coverageAmount: number): number {
  switch (riderType) {
    case 'accidental-death':
      return Math.round(coverageAmount * 0.0001); // $0.10 per $1000
    case 'critical-illness':
      return Math.round(coverageAmount * 0.0003); // $0.30 per $1000
    case 'disability':
      return Math.round(coverageAmount * 0.0005); // $0.50 per $1000
    case 'waiver-of-premium':
      return Math.round(coverageAmount * 0.0002); // $0.20 per $1000
    default:
      return 0;
  }
}

/**
 * Calculate cash value for whole/universal life policies
 */
export function calculateCashValue(
  insuranceType: InsuranceType,
  coverageAmount: number,
  monthlyPremium: number,
  monthsActive: number
): number {
  if (insuranceType === 'term-life') {
    return 0; // Term life has no cash value
  }

  // Cash value accumulates over time
  // Typically 1-4% of premiums paid in early years, higher later
  let cashValueRate = 0;

  const yearsActive = monthsActive / 12;

  if (insuranceType === 'whole-life') {
    // Whole life: slow early growth, guaranteed
    if (yearsActive < 5) {
      cashValueRate = 0.20; // 20% of premiums
    } else if (yearsActive < 10) {
      cashValueRate = 0.40; // 40% of premiums
    } else if (yearsActive < 20) {
      cashValueRate = 0.60; // 60% of premiums
    } else {
      cashValueRate = 0.80; // 80% of premiums
    }
  } else if (insuranceType === 'universal-life') {
    // Universal life: more aggressive growth
    if (yearsActive < 5) {
      cashValueRate = 0.25; // 25% of premiums
    } else if (yearsActive < 10) {
      cashValueRate = 0.50; // 50% of premiums
    } else if (yearsActive < 20) {
      cashValueRate = 0.75; // 75% of premiums
    } else {
      cashValueRate = 1.00; // 100% of premiums
    }
  }

  const totalPremiumsPaid = monthlyPremium * monthsActive;
  const cashValue = Math.round(totalPremiumsPaid * cashValueRate);

  return cashValue;
}

/**
 * Determine if policy should lapse due to non-payment
 */
export function shouldPolicyLapse(
  lastPaymentAge: number,
  currentAge: number,
  cashValue: number,
  monthlyPremium: number
): boolean {
  const monthsSincePayment = currentAge - lastPaymentAge;

  // Grace period: 2 months
  if (monthsSincePayment <= 2) {
    return false;
  }

  // If there's cash value, it can cover premiums
  const monthsCashCanCover = Math.floor(cashValue / monthlyPremium);
  if (monthsSincePayment <= monthsCashCanCover + 2) {
    return false; // Cash value paying premiums
  }

  return true; // Policy lapses
}

/**
 * Calculate death benefit payout
 */
export function calculateDeathBenefit(
  coverageAmount: number,
  riders: InsuranceRiderType[],
  causeOfDeath: 'natural' | 'accident' | 'illness' | 'suicide'
): {
  payout: number;
  message: string;
} {
  let payout = coverageAmount;
  let message = `Life insurance payout: $${coverageAmount.toLocaleString()}`;

  // Check for accidental death rider
  if (causeOfDeath === 'accident' && riders.includes('accidental-death')) {
    payout = coverageAmount * 2;
    message = `Life insurance payout with accidental death benefit: $${payout.toLocaleString()} (2x coverage)`;
  }

  // Suicide clause (no payout in first 2 years)
  if (causeOfDeath === 'suicide') {
    payout = 0;
    message = 'Life insurance claim denied: death by suicide within policy contestability period';
  }

  return { payout, message };
}

/**
 * Calculate surrender value (cancelling policy early)
 */
export function calculateSurrenderValue(
  cashValue: number,
  monthsActive: number
): {
  surrenderValue: number;
  surrenderCharge: number;
} {
  // Early surrender charges
  let surrenderChargePercent = 0;
  const yearsActive = monthsActive / 12;

  if (yearsActive < 5) {
    surrenderChargePercent = 0.10; // 10% penalty
  } else if (yearsActive < 10) {
    surrenderChargePercent = 0.05; // 5% penalty
  } else {
    surrenderChargePercent = 0; // No penalty after 10 years
  }

  const surrenderCharge = Math.round(cashValue * surrenderChargePercent);
  const surrenderValue = cashValue - surrenderCharge;

  return { surrenderValue, surrenderCharge };
}

/**
 * Get insurance recommendations based on age, dependents, and income
 */
export function getInsuranceRecommendations(
  ageInMonths: number,
  annualIncome: number,
  hasDependents: boolean,
  hasDebt: boolean
): {
  recommended: boolean;
  recommendedType: InsuranceType;
  recommendedCoverage: number;
  reasoning: string;
} {
  const ageInYears = ageInMonths / 12;

  // Young, no dependents - low priority
  if (ageInYears < 25 && !hasDependents) {
    return {
      recommended: false,
      recommendedType: 'term-life',
      recommendedCoverage: 100000,
      reasoning: 'Low priority at your age without dependents, but consider small term policy',
    };
  }

  // Has dependents or debt - highly recommended
  if (hasDependents || hasDebt) {
    const coverageMultiplier = hasDependents ? 10 : 5;
    const recommendedCoverage = Math.min(2000000, annualIncome * coverageMultiplier);

    return {
      recommended: true,
      recommendedType: 'term-life',
      recommendedCoverage: Math.round(recommendedCoverage),
      reasoning: hasDependents
        ? 'Highly recommended to protect your family - 10x annual income coverage'
        : 'Recommended to cover debts - 5x annual income coverage',
    };
  }

  // Older age - build cash value
  if (ageInYears >= 40) {
    return {
      recommended: true,
      recommendedType: 'whole-life',
      recommendedCoverage: Math.min(500000, annualIncome * 5),
      reasoning: 'Consider whole life for estate planning and cash value accumulation',
    };
  }

  // Default recommendation
  return {
    recommended: true,
    recommendedType: 'term-life',
    recommendedCoverage: Math.min(1000000, annualIncome * 8),
    reasoning: 'Term life provides affordable protection during earning years',
  };
}

/**
 * Check critical illness claim eligibility
 */
export function checkCriticalIllnessClaim(
  disease: string,
  riders: InsuranceRiderType[],
  coverageAmount: number
): {
  eligible: boolean;
  payout: number;
  message: string;
} {
  if (!riders.includes('critical-illness')) {
    return {
      eligible: false,
      payout: 0,
      message: 'No critical illness rider on policy',
    };
  }

  // List of critical illnesses that qualify
  const criticalIllnesses = [
    'cancer',
    'heart attack',
    'stroke',
    'kidney failure',
    'major organ transplant',
    'paralysis',
  ];

  const isEligible = criticalIllnesses.some((illness) =>
    disease.toLowerCase().includes(illness)
  );

  if (isEligible) {
    const payout = Math.round(coverageAmount * 0.25); // 25% of coverage
    return {
      eligible: true,
      payout,
      message: `Critical illness claim approved: $${payout.toLocaleString()} (25% of coverage)`,
    };
  }

  return {
    eligible: false,
    payout: 0,
    message: 'Condition does not qualify as critical illness under policy terms',
  };
}
