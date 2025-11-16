import type { BusinessType } from '../types';

export interface BusinessDefinition {
  type: BusinessType;
  name: string;
  description: string;
  minStartupCost: number;
  maxStartupCost: number;
  monthlyExpenseRange: { min: number; max: number };
  monthlyRevenueRange: { min: number; max: number };
  requiredSkills: string[]; // skill IDs
  successProbability: number; // 0-1, base chance of success
  timeToBreakEven: number; // months
}

export const businessDefinitions: Record<BusinessType, BusinessDefinition> = {
  restaurant: {
    type: 'restaurant',
    name: 'Restaurant',
    description: 'Food service establishment',
    minStartupCost: 50000,
    maxStartupCost: 200000,
    monthlyExpenseRange: { min: 15000, max: 40000 },
    monthlyRevenueRange: { min: 10000, max: 60000 },
    requiredSkills: ['management', 'communication'],
    successProbability: 0.40, // 40% success rate
    timeToBreakEven: 18,
  },
  'retail-store': {
    type: 'retail-store',
    name: 'Retail Store',
    description: 'Physical retail location',
    minStartupCost: 30000,
    maxStartupCost: 100000,
    monthlyExpenseRange: { min: 8000, max: 25000 },
    monthlyRevenueRange: { min: 5000, max: 40000 },
    requiredSkills: ['marketing', 'management'],
    successProbability: 0.45,
    timeToBreakEven: 15,
  },
  'tech-startup': {
    type: 'tech-startup',
    name: 'Tech Startup',
    description: 'Technology company',
    minStartupCost: 10000,
    maxStartupCost: 500000,
    monthlyExpenseRange: { min: 5000, max: 50000 },
    monthlyRevenueRange: { min: 0, max: 100000 },
    requiredSkills: ['programming', 'data-analysis', 'management'],
    successProbability: 0.20, // Very risky but high reward
    timeToBreakEven: 24,
  },
  consulting: {
    type: 'consulting',
    name: 'Consulting Firm',
    description: 'Professional consulting services',
    minStartupCost: 5000,
    maxStartupCost: 50000,
    monthlyExpenseRange: { min: 2000, max: 15000 },
    monthlyRevenueRange: { min: 3000, max: 50000 },
    requiredSkills: ['communication', 'leadership', 'finance'],
    successProbability: 0.60, // Higher success rate, lower overhead
    timeToBreakEven: 8,
  },
  'real-estate': {
    type: 'real-estate',
    name: 'Real Estate Business',
    description: 'Property investment and management',
    minStartupCost: 100000,
    maxStartupCost: 1000000,
    monthlyExpenseRange: { min: 10000, max: 80000 },
    monthlyRevenueRange: { min: 8000, max: 120000 },
    requiredSkills: ['finance', 'negotiation', 'management'],
    successProbability: 0.50,
    timeToBreakEven: 36,
  },
  franchise: {
    type: 'franchise',
    name: 'Franchise',
    description: 'Franchised business location',
    minStartupCost: 80000,
    maxStartupCost: 300000,
    monthlyExpenseRange: { min: 12000, max: 35000 },
    monthlyRevenueRange: { min: 15000, max: 55000 },
    requiredSkills: ['management'],
    successProbability: 0.65, // Higher success due to established brand
    timeToBreakEven: 12,
  },
};

/**
 * Calculate business performance based on owner's skills
 */
export function calculateBusinessPerformance(
  businessType: BusinessType,
  ownerSkills: { id: string; level: number }[],
  monthsInBusiness: number
): {
  successRate: number;
  revenueMultiplier: number;
  expenseMultiplier: number;
} {
  const definition = businessDefinitions[businessType];
  const requiredSkills = definition.requiredSkills;

  // Check skill levels
  let skillBonus = 0;
  for (const requiredSkill of requiredSkills) {
    const skill = ownerSkills.find((s) => s.id === requiredSkill);
    if (skill) {
      skillBonus += skill.level / 100; // 0-1 per skill
    } else {
      skillBonus -= 0.3; // Penalty for missing required skill
    }
  }

  // Experience bonus (gets better over time)
  const experienceBonus = Math.min(0.5, monthsInBusiness / 100);

  // Success rate (0-100)
  const baseSuccess = definition.successProbability * 100;
  const successRate = Math.max(
    10,
    Math.min(95, baseSuccess + skillBonus * 20 + experienceBonus * 20)
  );

  // Revenue multiplier (better skills = more revenue)
  const revenueMultiplier = 1 + skillBonus * 0.5 + experienceBonus;

  // Expense multiplier (better skills = lower expenses through efficiency)
  const expenseMultiplier = Math.max(0.5, 1 - skillBonus * 0.2 - experienceBonus * 0.1);

  return {
    successRate: Math.round(successRate),
    revenueMultiplier,
    expenseMultiplier,
  };
}

/**
 * Simulate monthly business operations
 */
export function simulateMonthlyBusiness(
  business: {
    type: BusinessType;
    monthsOld: number;
    successRate: number;
    monthlyRevenue: number;
    monthlyExpenses: number;
  },
  ownerSkills: { id: string; level: number }[]
): {
  revenue: number;
  expenses: number;
  profit: number;
  eventMessage: string | null;
} {
  const definition = businessDefinitions[business.type];
  const performance = calculateBusinessPerformance(
    business.type,
    ownerSkills,
    business.monthsOld
  );

  // Random revenue within range, affected by performance
  const baseRevenue =
    definition.monthlyRevenueRange.min +
    Math.random() *
      (definition.monthlyRevenueRange.max - definition.monthlyRevenueRange.min);
  const revenue = Math.round(baseRevenue * performance.revenueMultiplier);

  // Random expenses within range, affected by performance
  const baseExpenses =
    definition.monthlyExpenseRange.min +
    Math.random() *
      (definition.monthlyExpenseRange.max - definition.monthlyExpenseRange.min);
  const expenses = Math.round(baseExpenses * performance.expenseMultiplier);

  const profit = revenue - expenses;

  // Random business events
  let eventMessage: string | null = null;
  const eventChance = Math.random();

  if (eventChance < 0.05) {
    // 5% chance of major event
    if (profit > 0) {
      eventMessage = `${definition.name}: Major contract secured! Revenue boost this month.`;
    } else {
      eventMessage = `${definition.name}: Equipment breakdown. Higher expenses this month.`;
    }
  } else if (eventChance < 0.15 && profit > 5000) {
    // 10% chance if profitable
    eventMessage = `${definition.name}: Business is thriving!`;
  } else if (eventChance < 0.15 && profit < -2000) {
    // Show losses
    eventMessage = `${definition.name}: Struggling this month.`;
  }

  return {
    revenue,
    expenses,
    profit,
    eventMessage,
  };
}

/**
 * Calculate business valuation for selling
 */
export function calculateBusinessValue(
  initialInvestment: number,
  monthlyRevenue: number,
  monthlyExpenses: number,
  monthsInBusiness: number
): number {
  const monthlyProfit = monthlyRevenue - monthlyExpenses;
  const annualProfit = monthlyProfit * 12;

  // Valuation is typically 2-5x annual profit for small businesses
  let multiple = 2;

  if (monthsInBusiness > 36) {
    multiple = 4; // Established business
  } else if (monthsInBusiness > 12) {
    multiple = 3; // Growing business
  }

  // If unprofitable, value is based on assets (fraction of initial investment)
  if (annualProfit <= 0) {
    return Math.max(0, Math.round(initialInvestment * 0.3)); // Liquidation value
  }

  const valuationFromProfit = Math.round(annualProfit * multiple);
  const minimumValue = Math.round(initialInvestment * 0.5); // At least 50% of investment

  return Math.max(minimumValue, valuationFromProfit);
}

/**
 * Determine if business should fail
 */
export function shouldBusinessFail(
  monthlyProfit: number,
  consecutiveLossMonths: number,
  successRate: number
): boolean {
  // Failed if 6 consecutive months of heavy losses
  if (consecutiveLossMonths >= 6 && monthlyProfit < -5000) {
    return true;
  }

  // Failed if 12 consecutive months of any loss and low success rate
  if (consecutiveLossMonths >= 12 && successRate < 30) {
    return true;
  }

  return false;
}
