import type {
  Will,
  Trust,
  Inheritance,
  Beneficiary,
  TrustType,
  BeneficiaryType,
  DiceModifier
} from '../types';
import { rollDice, checkSuccess } from '../utils/dice-system';
import { randint } from '../utils/game-utils';

/**
 * Estate planning, inheritance, wills, and trusts system
 */

export interface WillCreationCost {
  basic: number;
  standard: number;
  comprehensive: number;
  trust: number;
}

export const willCreationCosts: WillCreationCost = {
  basic: 500, // Simple will
  standard: 1500, // Standard will with multiple beneficiaries
  comprehensive: 5000, // Complex estate plan
  trust: 10000, // Trust creation
};

/**
 * Calculate estate tax (federal)
 * Based on US estate tax brackets (2024)
 */
export function calculateEstateTax(estateValue: number): {
  taxableAmount: number;
  taxOwed: number;
  effectiveRate: number;
  exemptionUsed: number;
} {
  // 2024 federal estate tax exemption: $13.61 million
  const federalExemption = 13610000;

  if (estateValue <= federalExemption) {
    return {
      taxableAmount: 0,
      taxOwed: 0,
      effectiveRate: 0,
      exemptionUsed: estateValue,
    };
  }

  const taxableAmount = estateValue - federalExemption;

  // Estate tax is flat 40% on amount over exemption
  const taxOwed = Math.round(taxableAmount * 0.40);
  const effectiveRate = (taxOwed / estateValue) * 100;

  return {
    taxableAmount,
    taxOwed,
    effectiveRate: Math.round(effectiveRate * 100) / 100,
    exemptionUsed: federalExemption,
  };
}

/**
 * Calculate inheritance tax for beneficiary (state-level)
 * Varies by state and relationship
 */
export function calculateInheritanceTax(
  inheritanceAmount: number,
  relationship: BeneficiaryType
): {
  taxRate: number;
  taxOwed: number;
  netInheritance: number;
} {
  // Relationship-based exemptions and rates
  const taxRates: Record<BeneficiaryType, number> = {
    spouse: 0, // Spouses are exempt in all states
    child: 0.05, // 5% (some states exempt, others charge)
    parent: 0.05,
    sibling: 0.10, // 10%
    friend: 0.15, // 15%
    charity: 0, // Charities exempt
    organization: 0.08,
  };

  const taxRate = taxRates[relationship];
  const taxOwed = Math.round(inheritanceAmount * taxRate);
  const netInheritance = inheritanceAmount - taxOwed;

  return {
    taxRate: taxRate * 100,
    taxOwed,
    netInheritance,
  };
}

/**
 * Create a will
 */
export function createWill(
  currentAge: number,
  totalAssets: number,
  beneficiaries: Beneficiary[],
  complexity: 'basic' | 'standard' | 'comprehensive'
): {
  will: Omit<Will, 'id'>;
  cost: number;
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Validate beneficiary percentages sum to 100
  const totalPercentage = beneficiaries.reduce((sum, b) => sum + b.sharePercentage, 0);
  if (Math.abs(totalPercentage - 100) > 0.01) {
    issues.push(`Beneficiary shares must total 100% (currently ${totalPercentage}%)`);
  }

  // Check for conflicting conditions
  const conditionalBeneficiaries = beneficiaries.filter(b => b.conditional);
  if (conditionalBeneficiaries.length > beneficiaries.length * 0.5) {
    issues.push('Too many conditional beneficiaries may complicate execution');
  }

  const cost = willCreationCosts[complexity];
  const valid = issues.length === 0;

  const will: Omit<Will, 'id'> = {
    createdAge: currentAge,
    lastUpdatedAge: currentAge,
    executor: beneficiaries[0]?.name || 'Not assigned',
    beneficiaries,
    distributionMethod: complexity === 'basic' ? 'equal-split' : 'weighted',
    charitableDonations: [],
    specialInstructions: [],
    witnessed: true,
    legallyValid: valid,
  };

  return { will, cost, valid, issues };
}

/**
 * Create a trust
 */
export function createTrust(
  type: TrustType,
  principal: number,
  beneficiaries: string[],
  trustee: string,
  currentAge: number
): {
  trust: Omit<Trust, 'id'>;
  setupCost: number;
  annualMaintenanceCost: number;
  taxBenefit: number;
} {
  const setupCosts: Record<TrustType, number> = {
    'revocable-living': 3000,
    'irrevocable-life': 5000,
    'testamentary': 2000,
    'charitable-remainder': 8000,
    'special-needs': 6000,
  };

  const annualMaintenance: Record<TrustType, number> = {
    'revocable-living': 500,
    'irrevocable-life': 1000,
    'testamentary': 400,
    'charitable-remainder': 1200,
    'special-needs': 800,
  };

  // Tax benefits (annual savings as % of principal)
  const taxBenefitRates: Record<TrustType, number> = {
    'revocable-living': 0.005, // 0.5%
    'irrevocable-life': 0.015, // 1.5%
    'testamentary': 0.003, // 0.3%
    'charitable-remainder': 0.025, // 2.5%
    'special-needs': 0.008, // 0.8%
  };

  const setupCost = setupCosts[type];
  const annualMaintenanceCost = annualMaintenance[type];
  const taxBenefit = Math.round(principal * taxBenefitRates[type]);

  const trust: Omit<Trust, 'id'> = {
    type,
    createdAge: currentAge,
    principal,
    currentValue: principal,
    beneficiaries,
    trustee,
    yearsActive: 0,
    taxBenefit,
  };

  return { trust, setupCost, annualMaintenanceCost, taxBenefit };
}

/**
 * Simulate receiving inheritance from a deceased relative
 */
export function receiveInheritance(
  deceased: string,
  relationship: BeneficiaryType,
  deceasedWealth: number,
  yourSharePercentage: number,
  currentAge: number,
  hasWill: boolean,
  luck: number
): {
  inheritance: Omit<Inheritance, 'id'>;
  contested: boolean;
  delayedMonths: number;
  message: string;
} {
  // Calculate total inheritance before taxes
  const totalValue = Math.round(deceasedWealth * (yourSharePercentage / 100));

  // Asset breakdown
  const cashPercentage = 0.3 + Math.random() * 0.2; // 30-50%
  const propertyPercentage = 0.3 + Math.random() * 0.2; // 30-50%
  const investmentPercentage = 1 - cashPercentage - propertyPercentage;

  const cash = Math.round(totalValue * cashPercentage);
  const property = Math.round(totalValue * propertyPercentage);
  const investments = Math.round(totalValue * investmentPercentage);

  // Calculate taxes
  const estateTax = calculateEstateTax(deceasedWealth);
  const inheritanceTax = calculateInheritanceTax(totalValue, relationship);

  // Taxes are proportional to share
  const yourEstateTax = Math.round(estateTax.taxOwed * (yourSharePercentage / 100));
  const totalTaxes = yourEstateTax + inheritanceTax.taxOwed;
  const netReceived = totalValue - totalTaxes;

  // Will contest check (dice-based)
  let contested = false;
  let delayedMonths = 0;
  let message = '';

  if (!hasWill) {
    // No will = higher contest risk
    const contestRoll = rollDice('d100', [], luck);
    if (contestRoll.modifiedRoll <= 30) {
      contested = true;
      delayedMonths = randint(6, 24); // 6 months to 2 years
      message = `Inheritance contested! Estate in probate for ${delayedMonths} months.`;
    }
  } else {
    // Will exists but still small contest risk
    const contestRoll = rollDice('d100', [], luck);
    if (contestRoll.modifiedRoll <= 8) {
      contested = true;
      delayedMonths = randint(3, 12);
      message = `Will contested by another heir. Delayed ${delayedMonths} months.`;
    }
  }

  if (!contested) {
    if (totalValue > 1000000) {
      message = `You inherited $${netReceived.toLocaleString()} from ${deceased}. Life-changing wealth!`;
    } else if (totalValue > 100000) {
      message = `You inherited $${netReceived.toLocaleString()} from ${deceased}. Significant windfall!`;
    } else {
      message = `You inherited $${netReceived.toLocaleString()} from ${deceased}.`;
    }
  }

  const inheritance: Omit<Inheritance, 'id'> = {
    receivedAge: currentAge,
    fromWho: deceased,
    relationship,
    totalValue,
    cash,
    property,
    investments,
    taxes: totalTaxes,
    netReceived,
  };

  return { inheritance, contested, delayedMonths, message };
}

/**
 * Will contest resolution (dice-based)
 */
export function resolveWillContest(
  willAge: number,
  hasLawyer: boolean,
  willComplexity: 'basic' | 'standard' | 'comprehensive',
  claimantRelationship: BeneficiaryType,
  luck: number
): {
  contestSuccessful: boolean;
  originalShareKept: number; // Percentage of original inheritance kept
  legalCosts: number;
  settlementMonths: number;
  outcome: string;
} {
  const modifiers: DiceModifier[] = [];

  // Lawyer helps
  if (hasLawyer) {
    modifiers.push({ name: 'Legal Representation', value: 5, source: 'professional' });
  }

  // Comprehensive will is harder to contest
  if (willComplexity === 'comprehensive') {
    modifiers.push({ name: 'Thorough Documentation', value: 4, source: 'preparation' });
  } else if (willComplexity === 'basic') {
    modifiers.push({ name: 'Basic Will', value: -3, source: 'preparation' });
  }

  // Old wills are easier to contest
  if (willAge > 15) {
    modifiers.push({ name: 'Outdated Will', value: -3, source: 'age' });
  }

  // Immediate family has stronger claim
  if (claimantRelationship === 'spouse' || claimantRelationship === 'child') {
    modifiers.push({ name: 'Close Family', value: 3, source: 'relationship' });
  }

  // Contest resolution roll
  const result = checkSuccess('d20', 14, modifiers, luck);

  let contestSuccessful = false;
  let originalShareKept = 100;
  let legalCosts = hasLawyer ? randint(20000, 80000) : randint(5000, 25000);
  let settlementMonths = 0;
  let outcome = '';

  if (result.criticalSuccess) {
    // Claimant loses completely
    contestSuccessful = false;
    originalShareKept = 100;
    settlementMonths = 3;
    outcome = 'Contest dismissed quickly. You keep 100% of your inheritance.';
    legalCosts = Math.round(legalCosts * 0.5); // Lower legal costs
  } else if (result.success) {
    // Favorable settlement
    contestSuccessful = false;
    originalShareKept = randint(85, 95);
    settlementMonths = randint(6, 12);
    outcome = `Settled out of court. You keep ${originalShareKept}% of inheritance.`;
  } else if (result.criticalFailure) {
    // Major loss
    contestSuccessful = true;
    originalShareKept = randint(20, 40);
    settlementMonths = randint(18, 36);
    outcome = `Contest successful. You lose ${100 - originalShareKept}% of inheritance.`;
    legalCosts = Math.round(legalCosts * 1.5); // Higher costs
  } else {
    // Partial loss
    contestSuccessful = true;
    originalShareKept = randint(60, 75);
    settlementMonths = randint(12, 24);
    outcome = `Partial contest success. You keep ${originalShareKept}% of inheritance.`;
  }

  return {
    contestSuccessful,
    originalShareKept,
    legalCosts,
    settlementMonths,
    outcome,
  };
}

/**
 * Trust growth calculation (annual)
 */
export function calculateTrustGrowth(
  trust: Trust,
  marketReturn: number // From stock market condition
): {
  growthAmount: number;
  newValue: number;
  taxBenefitThisYear: number;
} {
  // Conservative trust investments (60% stock, 40% bonds)
  const bondReturn = 0.04; // 4% bonds
  const blendedReturn = (marketReturn * 0.6) + (bondReturn * 0.4);

  const growthAmount = Math.round(trust.currentValue * blendedReturn);
  const newValue = trust.currentValue + growthAmount;
  const taxBenefitThisYear = trust.taxBenefit;

  return {
    growthAmount,
    newValue,
    taxBenefitThisYear,
  };
}

/**
 * Estimate total estate value for planning
 */
export function estimateEstateValue(
  cash: number,
  bankBalance: number,
  investments: number,
  propertyValue: number,
  businessValue: number,
  lifeInsurance: number,
  debts: number
): {
  grossEstate: number;
  netEstate: number;
  estimatedTax: number;
  heritageValue: number; // What heirs actually get
} {
  const grossEstate = cash + bankBalance + investments + propertyValue + businessValue + lifeInsurance;
  const netEstate = grossEstate - debts;

  const estateTax = calculateEstateTax(netEstate);
  const estimatedTax = estateTax.taxOwed;
  const heritageValue = netEstate - estimatedTax;

  return {
    grossEstate,
    netEstate,
    estimatedTax,
    heritageValue,
  };
}

/**
 * Generate inheritance event from random relative
 */
export function generateRandomInheritance(
  playerAge: number,
  playerWealth: number,
  luck: number
): {
  occurs: boolean;
  amount: number;
  from: string;
  relationship: string;
} {
  // Low chance, more likely as you age (relatives pass away)
  const baseChance = 1 + (playerAge / 1200); // ~1% at 18, ~5% at 70

  const roll = rollDice('d100', [], luck);

  if (roll.modifiedRoll > baseChance) {
    return { occurs: false, amount: 0, from: '', relationship: '' };
  }

  // Generate inheritance
  const relatives = [
    { name: 'Aunt Martha', relationship: 'aunt', wealth: randint(50000, 300000) },
    { name: 'Uncle Joe', relationship: 'uncle', wealth: randint(80000, 500000) },
    { name: 'Grandma Rose', relationship: 'grandparent', wealth: randint(100000, 800000) },
    { name: 'Distant Cousin', relationship: 'cousin', wealth: randint(20000, 150000) },
    { name: 'Great Uncle', relationship: 'great-uncle', wealth: randint(200000, 2000000) },
  ];

  const relative = relatives[randint(0, relatives.length - 1)];

  // Your share (not always 100%)
  const sharePercent = randint(20, 100);
  const amount = Math.round(relative.wealth * (sharePercent / 100));

  return {
    occurs: true,
    amount,
    from: relative.name,
    relationship: relative.relationship,
  };
}
