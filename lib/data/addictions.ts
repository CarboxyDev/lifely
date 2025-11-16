import type { AddictionType, AddictionLevel, Addiction, RecoveryProgram } from '../types';

/**
 * Addiction and recovery system
 */

export interface AddictionDefinition {
  type: AddictionType;
  name: string;
  description: string;
  monthlyBaseCost: number;
  healthImpact: number; // per month at severe level
  moraleImpact: number; // per month at severe level
  relationshipImpact: number; // percentage decrease
  jobPerformanceImpact: number; // percentage decrease
  withdrawalSeverity: number; // 0-100
}

export const addictionDefinitions: Record<AddictionType, AddictionDefinition> = {
  alcohol: {
    type: 'alcohol',
    name: 'Alcohol Addiction',
    description: 'Dependency on alcoholic beverages',
    monthlyBaseCost: 300,
    healthImpact: 5,
    moraleImpact: 3,
    relationshipImpact: 15,
    jobPerformanceImpact: 20,
    withdrawalSeverity: 70,
  },
  drugs: {
    type: 'drugs',
    name: 'Drug Addiction',
    description: 'Dependency on illicit substances',
    monthlyBaseCost: 800,
    healthImpact: 10,
    moraleImpact: 8,
    relationshipImpact: 30,
    jobPerformanceImpact: 35,
    withdrawalSeverity: 90,
  },
  gambling: {
    type: 'gambling',
    name: 'Gambling Addiction',
    description: 'Compulsive gambling behavior',
    monthlyBaseCost: 1000,
    healthImpact: 2,
    moraleImpact: 10,
    relationshipImpact: 25,
    jobPerformanceImpact: 15,
    withdrawalSeverity: 50,
  },
  shopping: {
    type: 'shopping',
    name: 'Shopping Addiction',
    description: 'Compulsive buying disorder',
    monthlyBaseCost: 600,
    healthImpact: 1,
    moraleImpact: 5,
    relationshipImpact: 10,
    jobPerformanceImpact: 5,
    withdrawalSeverity: 40,
  },
  internet: {
    type: 'internet',
    name: 'Internet/Gaming Addiction',
    description: 'Excessive internet or gaming use',
    monthlyBaseCost: 100,
    healthImpact: 3,
    moraleImpact: 4,
    relationshipImpact: 20,
    jobPerformanceImpact: 25,
    withdrawalSeverity: 45,
  },
  work: {
    type: 'work',
    name: 'Workaholism',
    description: 'Obsessive work patterns',
    monthlyBaseCost: 0, // Actually earns money
    healthImpact: 4,
    moraleImpact: 6,
    relationshipImpact: 35,
    jobPerformanceImpact: -10, // Initially improves performance
    withdrawalSeverity: 55,
  },
};

export const recoveryPrograms: RecoveryProgram[] = [
  {
    id: 'inpatient-rehab',
    type: 'rehab',
    name: '30-Day Inpatient Rehab',
    cost: 15000,
    duration: 1,
    successRate: 70,
  },
  {
    id: 'extended-rehab',
    type: 'rehab',
    name: '90-Day Extended Rehab',
    cost: 35000,
    duration: 3,
    successRate: 85,
  },
  {
    id: 'outpatient',
    type: 'outpatient',
    name: 'Outpatient Treatment Program',
    cost: 500,
    duration: 6,
    successRate: 55,
  },
  {
    id: 'aa-na',
    type: 'support-group',
    name: 'AA/NA Support Groups',
    cost: 0,
    duration: 12,
    successRate: 45,
  },
  {
    id: 'therapy',
    type: 'therapy',
    name: 'Individual Therapy',
    cost: 300,
    duration: 12,
    successRate: 60,
  },
  {
    id: 'group-therapy',
    type: 'therapy',
    name: 'Group Therapy',
    cost: 150,
    duration: 6,
    successRate: 50,
  },
];

/**
 * Calculate risk of developing addiction
 */
export function calculateAddictionRisk(
  addictionType: AddictionType,
  frequency: number, // times engaged per month
  morale: number,
  stress: number, // 0-100
  hasHistory: boolean,
  geneticRisk: number = 50 // 0-100
): {
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  riskScore: number;
  warnings: string[];
} {
  let riskScore = 0;
  const warnings: string[] = [];

  // Frequency factor
  if (frequency > 20) {
    riskScore += 40;
    warnings.push('Excessive frequency of use');
  } else if (frequency > 10) {
    riskScore += 25;
    warnings.push('High frequency of use');
  } else if (frequency > 5) {
    riskScore += 15;
  }

  // Mental health factors
  if (morale < 40) {
    riskScore += 25;
    warnings.push('Low morale increases addiction risk');
  } else if (morale < 60) {
    riskScore += 15;
  }

  if (stress > 70) {
    riskScore += 20;
    warnings.push('High stress increases risk');
  } else if (stress > 50) {
    riskScore += 10;
  }

  // History factor
  if (hasHistory) {
    riskScore += 30;
    warnings.push('History of addiction significantly increases risk');
  }

  // Genetic predisposition
  riskScore += (geneticRisk / 100) * 20;

  // Determine risk level
  let riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  if (riskScore >= 80) {
    riskLevel = 'critical';
  } else if (riskScore >= 60) {
    riskLevel = 'high';
  } else if (riskScore >= 40) {
    riskLevel = 'moderate';
  } else {
    riskLevel = 'low';
  }

  return { riskLevel, riskScore, warnings };
}

/**
 * Progress addiction level based on behavior
 */
export function progressAddiction(
  currentLevel: AddictionLevel,
  monthsActive: number,
  inTreatment: boolean
): {
  newLevel: AddictionLevel;
  message: string;
} {
  if (inTreatment) {
    // Treatment can reduce severity
    const reductionChance = 0.3; // 30% per month
    if (Math.random() < reductionChance) {
      const levels: AddictionLevel[] = ['none', 'mild', 'moderate', 'severe', 'critical'];
      const currentIndex = levels.indexOf(currentLevel);
      if (currentIndex > 0) {
        return {
          newLevel: levels[currentIndex - 1],
          message: 'Treatment is helping - addiction severity decreased',
        };
      }
    }
    return { newLevel: currentLevel, message: 'Continuing treatment' };
  }

  // Addiction typically progresses over time
  if (monthsActive > 24 && currentLevel === 'severe') {
    return {
      newLevel: 'critical',
      message: 'Addiction has reached critical levels - immediate intervention needed',
    };
  } else if (monthsActive > 12 && currentLevel === 'moderate') {
    return {
      newLevel: 'severe',
      message: 'Addiction has worsened to severe levels',
    };
  } else if (monthsActive > 6 && currentLevel === 'mild') {
    return {
      newLevel: 'moderate',
      message: 'Addiction has progressed to moderate levels',
    };
  } else if (monthsActive > 3 && currentLevel === 'none') {
    return {
      newLevel: 'mild',
      message: 'You may be developing an addiction',
    };
  }

  return { newLevel: currentLevel, message: '' };
}

/**
 * Calculate monthly impact of addiction
 */
export function calculateAddictionImpact(addiction: Addiction): {
  healthLoss: number;
  moraleLoss: number;
  moneyCost: number;
  relationshipDamage: number;
  jobPerformancePenalty: number;
  message: string;
} {
  const definition = addictionDefinitions[addiction.type];
  const levelMultiplier = {
    none: 0,
    mild: 0.3,
    moderate: 0.6,
    severe: 1.0,
    critical: 1.5,
  }[addiction.level];

  const healthLoss = Math.round(definition.healthImpact * levelMultiplier);
  const moraleLoss = Math.round(definition.moraleImpact * levelMultiplier);
  const moneyCost = Math.round(definition.monthlyBaseCost * levelMultiplier);
  const relationshipDamage = Math.round(definition.relationshipImpact * levelMultiplier);
  const jobPerformancePenalty = Math.round(definition.jobPerformanceImpact * levelMultiplier);

  let message = '';
  if (addiction.level === 'critical') {
    message = `${definition.name} is severely impacting your life`;
  } else if (addiction.level === 'severe') {
    message = `${definition.name} is causing significant problems`;
  } else if (addiction.level === 'moderate') {
    message = `${definition.name} is affecting your health and relationships`;
  } else if (addiction.level === 'mild') {
    message = `Early signs of ${definition.name}`;
  }

  return {
    healthLoss,
    moraleLoss,
    moneyCost,
    relationshipDamage,
    jobPerformancePenalty,
    message,
  };
}

/**
 * Calculate withdrawal effects
 */
export function calculateWithdrawalEffects(
  addictionType: AddictionType,
  addictionLevel: AddictionLevel,
  monthsClean: number
): {
  severity: 'none' | 'mild' | 'moderate' | 'severe';
  healthImpact: number;
  moraleImpact: number;
  symptoms: string[];
} {
  if (monthsClean > 6) {
    return {
      severity: 'none',
      healthImpact: 0,
      moraleImpact: 0,
      symptoms: ['Physical withdrawal symptoms have subsided'],
    };
  }

  const definition = addictionDefinitions[addictionType];
  const levelMultiplier = {
    none: 0,
    mild: 0.3,
    moderate: 0.6,
    severe: 1.0,
    critical: 1.2,
  }[addictionLevel];

  // Withdrawal peaks in first month, then gradually reduces
  const timeMultiplier = monthsClean === 0 ? 1.0 : monthsClean === 1 ? 0.7 : monthsClean <= 3 ? 0.4 : 0.2;

  const withdrawalScore = definition.withdrawalSeverity * levelMultiplier * timeMultiplier;

  let severity: 'none' | 'mild' | 'moderate' | 'severe';
  if (withdrawalScore >= 60) {
    severity = 'severe';
  } else if (withdrawalScore >= 40) {
    severity = 'moderate';
  } else if (withdrawalScore >= 20) {
    severity = 'mild';
  } else {
    severity = 'none';
  }

  const healthImpact = Math.round((withdrawalScore / 100) * 10);
  const moraleImpact = Math.round((withdrawalScore / 100) * 15);

  const symptoms: string[] = [];
  if (severity === 'severe') {
    symptoms.push('Severe cravings', 'Physical discomfort', 'Anxiety', 'Insomnia', 'Mood swings');
  } else if (severity === 'moderate') {
    symptoms.push('Strong cravings', 'Irritability', 'Difficulty concentrating', 'Restlessness');
  } else if (severity === 'mild') {
    symptoms.push('Occasional cravings', 'Mild discomfort', 'Slight mood changes');
  } else {
    symptoms.push('Withdrawal symptoms have largely subsided');
  }

  return { severity, healthImpact, moraleImpact, symptoms };
}

/**
 * Calculate relapse probability
 */
export function calculateRelapseProbability(
  addiction: Addiction,
  morale: number,
  stress: number,
  inTreatment: boolean,
  supportGroupAttendance: boolean
): {
  probability: number;
  protectiveFactors: string[];
  riskFactors: string[];
} {
  let baseProbability = 0.4; // 40% base relapse rate

  const protectiveFactors: string[] = [];
  const riskFactors: string[] = [];

  // Clean time reduces relapse probability
  if (addiction.cleanMonths > 12) {
    baseProbability -= 0.15;
    protectiveFactors.push('Over 1 year clean');
  } else if (addiction.cleanMonths > 6) {
    baseProbability -= 0.10;
    protectiveFactors.push('Over 6 months clean');
  } else if (addiction.cleanMonths > 3) {
    baseProbability -= 0.05;
  }

  // Treatment reduces relapse
  if (inTreatment) {
    baseProbability -= 0.20;
    protectiveFactors.push('Currently in treatment');
  }

  // Support groups help
  if (supportGroupAttendance) {
    baseProbability -= 0.15;
    protectiveFactors.push('Attending support groups');
  }

  // Mental health factors
  if (morale < 40) {
    baseProbability += 0.20;
    riskFactors.push('Low morale');
  } else if (morale > 80) {
    baseProbability -= 0.10;
    protectiveFactors.push('Good mental health');
  }

  if (stress > 70) {
    baseProbability += 0.15;
    riskFactors.push('High stress');
  }

  // Previous relapses increase risk
  if (addiction.relapseCount > 2) {
    baseProbability += 0.10;
    riskFactors.push('Multiple previous relapses');
  } else if (addiction.relapseCount > 0) {
    baseProbability += 0.05;
    riskFactors.push('Previous relapse');
  }

  const probability = Math.max(0.05, Math.min(0.90, baseProbability));

  return { probability, protectiveFactors, riskFactors };
}

/**
 * Get intervention message based on addiction severity
 */
export function getInterventionMessage(
  addictionType: AddictionType,
  level: AddictionLevel
): {
  urgency: 'low' | 'moderate' | 'high' | 'critical';
  message: string;
  recommendations: string[];
} {
  const definition = addictionDefinitions[addictionType];

  if (level === 'critical' || level === 'severe') {
    return {
      urgency: 'critical',
      message: `Your ${definition.name} has reached ${level} levels and requires immediate professional help.`,
      recommendations: [
        'Seek inpatient rehabilitation immediately',
        'Consult with an addiction specialist',
        'Inform family and seek their support',
        'Consider extended treatment program',
      ],
    };
  } else if (level === 'moderate') {
    return {
      urgency: 'high',
      message: `Your ${definition.name} is concerning and should be addressed.`,
      recommendations: [
        'Start outpatient treatment',
        'Attend support group meetings',
        'Consider individual therapy',
        'Identify and avoid triggers',
      ],
    };
  } else if (level === 'mild') {
    return {
      urgency: 'moderate',
      message: `Early signs of ${definition.name} detected.`,
      recommendations: [
        'Monitor your usage carefully',
        'Consider attending support groups',
        'Talk to a therapist',
        'Develop healthier coping mechanisms',
      ],
    };
  } else {
    return {
      urgency: 'low',
      message: 'No current addiction detected.',
      recommendations: [],
    };
  }
}

/**
 * Calculate recovery success for a program
 */
export function calculateRecoverySuccess(
  program: RecoveryProgram,
  addiction: Addiction,
  morale: number,
  familySupport: boolean
): {
  success: boolean;
  message: string;
} {
  let successChance = program.successRate / 100;

  // Morale affects success
  if (morale > 70) {
    successChance += 0.15;
  } else if (morale < 40) {
    successChance -= 0.15;
  }

  // Family support helps
  if (familySupport) {
    successChance += 0.10;
  }

  // Severity affects difficulty
  const severityPenalty = {
    none: 0,
    mild: 0,
    moderate: -0.05,
    severe: -0.10,
    critical: -0.20,
  }[addiction.level];
  successChance += severityPenalty;

  // Previous failures reduce success rate
  if (addiction.relapseCount > 0) {
    successChance -= addiction.relapseCount * 0.05;
  }

  const success = Math.random() < Math.max(0.10, Math.min(0.95, successChance));

  if (success) {
    return {
      success: true,
      message: `${program.name} was successful! You are now in recovery.`,
    };
  } else {
    return {
      success: false,
      message: `${program.name} did not lead to full recovery. Consider continuing treatment.`,
    };
  }
}
