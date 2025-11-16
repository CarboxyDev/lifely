/**
 * Aging effects system - handles attribute decline and aging-related consequences
 */

export interface AgingEffects {
  healthDecline: number;
  looksDecline: number;
  intellectChange: number; // can be positive (wisdom) or negative (decline)
  moraleChange: number;
  description: string;
}

/**
 * Calculate aging effects based on current age
 * Age is in months
 */
export function calculateAgingEffects(ageInMonths: number): AgingEffects {
  const ageInYears = ageInMonths / 12;

  let healthDecline = 0;
  let looksDecline = 0;
  let intellectChange = 0;
  let moraleChange = 0;
  let description = '';

  // Young adult (18-25): Peak condition
  if (ageInYears < 25) {
    healthDecline = 0;
    looksDecline = 0;
    intellectChange = 0.05; // Slight wisdom gain
    description = 'In your prime years';
  }
  // Adult (25-35): Stable
  else if (ageInYears < 35) {
    healthDecline = 0.02;
    looksDecline = 0.03;
    intellectChange = 0.1; // Gaining experience
    description = 'Building experience';
  }
  // Middle age (35-50): Gradual decline
  else if (ageInYears < 50) {
    healthDecline = 0.05;
    looksDecline = 0.1;
    intellectChange = 0.05; // Peak wisdom
    description = 'Middle-aged wisdom';
  }
  // Older adult (50-65): Noticeable decline
  else if (ageInYears < 65) {
    healthDecline = 0.1;
    looksDecline = 0.15;
    intellectChange = 0; // Stable wisdom
    moraleChange = -0.02; // Slight morale decline
    description = 'Aging gracefully';
  }
  // Senior (65-75): Significant decline
  else if (ageInYears < 75) {
    healthDecline = 0.15;
    looksDecline = 0.2;
    intellectChange = -0.05; // Mild cognitive decline
    moraleChange = -0.05;
    description = 'Golden years';
  }
  // Elderly (75-85): Major decline
  else if (ageInYears < 85) {
    healthDecline = 0.25;
    looksDecline = 0.25;
    intellectChange = -0.1;
    moraleChange = -0.1;
    description = 'Advanced age';
  }
  // Very elderly (85+): Severe decline
  else {
    healthDecline = 0.4;
    looksDecline = 0.3;
    intellectChange = -0.15;
    moraleChange = -0.15;
    description = 'Remarkably old';
  }

  return {
    healthDecline,
    looksDecline,
    intellectChange,
    moraleChange,
    description,
  };
}

/**
 * Calculate probability of death from old age
 * Returns a number between 0 and 1
 */
export function calculateDeathProbability(
  ageInMonths: number,
  health: number
): number {
  const ageInYears = ageInMonths / 12;

  let baseProbability = 0;

  // Under 60: Very low
  if (ageInYears < 60) {
    baseProbability = 0.0001;
  }
  // 60-70: Low
  else if (ageInYears < 70) {
    baseProbability = 0.001;
  }
  // 70-80: Moderate
  else if (ageInYears < 80) {
    baseProbability = 0.005;
  }
  // 80-90: High
  else if (ageInYears < 90) {
    baseProbability = 0.02;
  }
  // 90-100: Very high
  else if (ageInYears < 100) {
    baseProbability = 0.05;
  }
  // 100+: Extremely high
  else {
    baseProbability = 0.1;
  }

  // Health modifier: poor health increases death probability
  const healthModifier = (100 - health) / 100; // 0 to 1
  const finalProbability = baseProbability * (1 + healthModifier * 2);

  return Math.min(1, finalProbability);
}

/**
 * Get age-related life events/messages
 */
export function getAgeRelatedEvent(ageInMonths: number): string | null {
  const ageInYears = ageInMonths / 12;

  // Milestone birthdays
  if (ageInMonths % 12 === 0) {
    // It's a birthday
    if (ageInYears === 21) {
      return 'Happy 21st birthday! You can legally drink alcohol now.';
    } else if (ageInYears === 25) {
      return 'You turned 25. Your car insurance rates may decrease.';
    } else if (ageInYears === 30) {
      return 'You turned 30. The big 3-0!';
    } else if (ageInYears === 40) {
      return 'You turned 40. Life begins at 40!';
    } else if (ageInYears === 50) {
      return 'You turned 50. Half a century!';
    } else if (ageInYears === 65) {
      return 'You turned 65. You can now collect Social Security.';
    } else if (ageInYears === 100) {
      return 'You turned 100! Centenarian achievement!';
    } else if (ageInYears >= 18 && ageInYears % 10 === 0) {
      return `You turned ${ageInYears}. Another decade!`;
    }
  }

  return null;
}

/**
 * Calculate retirement eligibility and benefits
 */
export function calculateRetirementBenefits(
  ageInMonths: number,
  totalYearsWorked: number,
  averageAnnualSalary: number
): {
  eligible: boolean;
  monthlyBenefit: number;
  description: string;
} {
  const ageInYears = ageInMonths / 12;

  // Early retirement at 62, full at 65, max at 70
  if (ageInYears < 62) {
    return {
      eligible: false,
      monthlyBenefit: 0,
      description: 'Not yet eligible for retirement benefits',
    };
  }

  // Need at least 10 years of work
  if (totalYearsWorked < 10) {
    return {
      eligible: false,
      monthlyBenefit: 0,
      description: 'Insufficient work history (need 10+ years)',
    };
  }

  // Calculate benefit based on salary and age
  let benefitPercent = 0.35; // Base 35% of average salary

  if (ageInYears >= 70) {
    benefitPercent = 0.50; // 50% if retired at 70+
  } else if (ageInYears >= 65) {
    benefitPercent = 0.42; // 42% if retired at 65
  } else {
    benefitPercent = 0.35; // 35% if early retirement at 62-64
  }

  // Cap average salary at realistic social security max
  const cappedSalary = Math.min(averageAnnualSalary, 150000);
  const monthlyBenefit = Math.round((cappedSalary * benefitPercent) / 12);

  return {
    eligible: true,
    monthlyBenefit,
    description: `Receiving ${Math.round(benefitPercent * 100)}% of average salary`,
  };
}

/**
 * Get age-related health risks
 */
export function getAgeHealthRisks(ageInYears: number): string[] {
  const risks: string[] = [];

  if (ageInYears >= 40) {
    risks.push('Heart disease risk increases');
  }
  if (ageInYears >= 50) {
    risks.push('Higher cancer screening recommended');
  }
  if (ageInYears >= 60) {
    risks.push('Bone density concerns');
    risks.push('Increased fall risk');
  }
  if (ageInYears >= 70) {
    risks.push('Cognitive decline possible');
    risks.push('Chronic condition management important');
  }

  return risks;
}

/**
 * Apply aging effects to stats
 */
export function applyAgingToStats(
  currentStats: { health: number; looks: number; intellect: number; morale: number },
  ageInMonths: number
): { health: number; looks: number; intellect: number; morale: number } {
  const effects = calculateAgingEffects(ageInMonths);

  return {
    health: Math.max(0, Math.min(100, currentStats.health - effects.healthDecline)),
    looks: Math.max(0, Math.min(100, currentStats.looks - effects.looksDecline)),
    intellect: Math.max(
      0,
      Math.min(100, currentStats.intellect + effects.intellectChange)
    ),
    morale: Math.max(0, Math.min(100, currentStats.morale + effects.moraleChange)),
  };
}
