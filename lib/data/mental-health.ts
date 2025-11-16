import type {
  MentalHealthCondition,
  MentalHealthSeverity,
  TherapyType,
} from '../types';

/**
 * Mental health system - conditions, therapy, crisis management
 */

export interface MentalHealthConditionDefinition {
  condition: MentalHealthCondition;
  name: string;
  description: string;
  prevalence: number; // percentage of population (0-100)
  moraleImpact: number; // impact on morale at severe level
  healthImpact: number; // physical health impact
  productivityImpact: number; // job performance penalty
  relationshipStrain: number; // relationship impact
  commonTriggers: string[];
}

export const mentalHealthConditions: Record<
  MentalHealthCondition,
  MentalHealthConditionDefinition
> = {
  depression: {
    condition: 'depression',
    name: 'Major Depressive Disorder',
    description: 'Persistent low mood and loss of interest',
    prevalence: 7,
    moraleImpact: 30,
    healthImpact: 5,
    productivityImpact: 25,
    relationshipStrain: 15,
    commonTriggers: ['job loss', 'relationship breakup', 'death of loved one', 'chronic stress'],
  },
  anxiety: {
    condition: 'anxiety',
    name: 'Generalized Anxiety Disorder',
    description: 'Excessive worry and fear',
    prevalence: 6,
    moraleImpact: 20,
    healthImpact: 8,
    productivityImpact: 20,
    relationshipStrain: 10,
    commonTriggers: ['work stress', 'financial problems', 'major life changes', 'health issues'],
  },
  ptsd: {
    condition: 'ptsd',
    name: 'Post-Traumatic Stress Disorder',
    description: 'Trauma-related stress symptoms',
    prevalence: 4,
    moraleImpact: 25,
    healthImpact: 10,
    productivityImpact: 30,
    relationshipStrain: 25,
    commonTriggers: ['traumatic event', 'reminders of trauma', 'anniversaries', 'sudden stress'],
  },
  bipolar: {
    condition: 'bipolar',
    name: 'Bipolar Disorder',
    description: 'Alternating periods of mania and depression',
    prevalence: 3,
    moraleImpact: 25,
    healthImpact: 7,
    productivityImpact: 30,
    relationshipStrain: 20,
    commonTriggers: ['sleep disruption', 'stress', 'seasonal changes', 'medication non-compliance'],
  },
  ocd: {
    condition: 'ocd',
    name: 'Obsessive-Compulsive Disorder',
    description: 'Intrusive thoughts and compulsive behaviors',
    prevalence: 2,
    moraleImpact: 15,
    healthImpact: 3,
    productivityImpact: 20,
    relationshipStrain: 12,
    commonTriggers: ['stress', 'major life transitions', 'contamination fears', 'uncertainty'],
  },
  'eating-disorder': {
    condition: 'eating-disorder',
    name: 'Eating Disorder',
    description: 'Unhealthy relationship with food and body image',
    prevalence: 3,
    moraleImpact: 20,
    healthImpact: 15,
    productivityImpact: 15,
    relationshipStrain: 18,
    commonTriggers: ['body image issues', 'social pressure', 'stress', 'control needs'],
  },
  adhd: {
    condition: 'adhd',
    name: 'Attention Deficit Hyperactivity Disorder',
    description: 'Difficulty with attention and impulse control',
    prevalence: 5,
    moraleImpact: 10,
    healthImpact: 2,
    productivityImpact: 25,
    relationshipStrain: 15,
    commonTriggers: ['unstructured environments', 'boring tasks', 'sleep deprivation', 'stress'],
  },
};

export interface TherapyDefinition {
  type: TherapyType;
  name: string;
  description: string;
  monthlyCost: number;
  sessionsPerMonth: number;
  effectivenessRating: number; // 0-100
  bestFor: MentalHealthCondition[];
  timeToEffect: number; // months before seeing results
}

export const therapyTypes: Record<TherapyType, TherapyDefinition> = {
  cbt: {
    type: 'cbt',
    name: 'Cognitive Behavioral Therapy',
    description: 'Evidence-based talk therapy focusing on thought patterns',
    monthlyCost: 400,
    sessionsPerMonth: 4,
    effectivenessRating: 85,
    bestFor: ['depression', 'anxiety', 'ocd', 'eating-disorder'],
    timeToEffect: 2,
  },
  psychotherapy: {
    type: 'psychotherapy',
    name: 'Psychotherapy',
    description: 'General talk therapy exploring emotions and experiences',
    monthlyCost: 350,
    sessionsPerMonth: 4,
    effectivenessRating: 75,
    bestFor: ['depression', 'anxiety', 'ptsd'],
    timeToEffect: 3,
  },
  medication: {
    type: 'medication',
    name: 'Psychiatric Medication',
    description: 'Medication prescribed by psychiatrist',
    monthlyCost: 200,
    sessionsPerMonth: 1,
    effectivenessRating: 80,
    bestFor: ['depression', 'anxiety', 'bipolar', 'adhd'],
    timeToEffect: 2,
  },
  'group-therapy': {
    type: 'group-therapy',
    name: 'Group Therapy',
    description: 'Therapy sessions with others facing similar challenges',
    monthlyCost: 150,
    sessionsPerMonth: 4,
    effectivenessRating: 65,
    bestFor: ['depression', 'anxiety', 'ptsd', 'eating-disorder'],
    timeToEffect: 2,
  },
  emdr: {
    type: 'emdr',
    name: 'EMDR Therapy',
    description: 'Eye Movement Desensitization for trauma processing',
    monthlyCost: 450,
    sessionsPerMonth: 2,
    effectivenessRating: 90,
    bestFor: ['ptsd'],
    timeToEffect: 1,
  },
};

/**
 * Calculate risk of developing mental health condition
 */
export function calculateMentalHealthRisk(
  condition: MentalHealthCondition,
  morale: number,
  stress: number,
  recentTrauma: boolean,
  familyHistory: boolean,
  supportNetwork: number
): {
  riskLevel: 'low' | 'moderate' | 'high';
  riskScore: number;
  factors: string[];
} {
  let riskScore = 0;
  const factors: string[] = [];

  const definition = mentalHealthConditions[condition];

  // Base prevalence risk
  riskScore += definition.prevalence;

  // Mental state factors
  if (morale < 30) {
    riskScore += 25;
    factors.push('Very low morale');
  } else if (morale < 50) {
    riskScore += 15;
    factors.push('Low morale');
  }

  if (stress > 80) {
    riskScore += 30;
    factors.push('Extreme stress');
  } else if (stress > 60) {
    riskScore += 20;
    factors.push('High stress');
  }

  // Trauma
  if (recentTrauma) {
    riskScore += 25;
    factors.push('Recent traumatic event');
  }

  // Genetic factors
  if (familyHistory) {
    riskScore += 15;
    factors.push('Family history');
  }

  // Protective factors
  if (supportNetwork > 70) {
    riskScore -= 15;
    factors.push('Strong support system (protective)');
  } else if (supportNetwork < 30) {
    riskScore += 15;
    factors.push('Weak support system');
  }

  // Determine risk level
  let riskLevel: 'low' | 'moderate' | 'high';
  if (riskScore >= 60) {
    riskLevel = 'high';
  } else if (riskScore >= 35) {
    riskLevel = 'moderate';
  } else {
    riskLevel = 'low';
  }

  return { riskLevel, riskScore, factors };
}

/**
 * Calculate therapy effectiveness
 */
export function calculateTherapyEffectiveness(
  therapy: TherapyType,
  condition: MentalHealthCondition,
  monthsInTherapy: number,
  compliance: number, // 0-100
  supportNetwork: number
): {
  improvementRate: number; // percentage improvement per month
  totalImprovement: number; // cumulative improvement (0-100)
} {
  const therapyDef = therapyTypes[therapy];

  // Base effectiveness
  let effectiveness = therapyDef.effectivenessRating / 100;

  // Check if therapy is well-suited for condition
  if (therapyDef.bestFor.includes(condition)) {
    effectiveness *= 1.2; // 20% bonus
  } else {
    effectiveness *= 0.7; // 30% penalty
  }

  // Compliance factor
  effectiveness *= compliance / 100;

  // Support network helps
  effectiveness *= 0.8 + (supportNetwork / 100) * 0.4; // 80-120%

  // Time to effect (slower improvement initially)
  let timeMultiplier = 1.0;
  if (monthsInTherapy < therapyDef.timeToEffect) {
    timeMultiplier = monthsInTherapy / therapyDef.timeToEffect;
  }

  const improvementRate = effectiveness * timeMultiplier * 5; // 0-5% per month

  // Diminishing returns over time (harder to improve beyond 80%)
  const totalImprovement = Math.min(
    90,
    improvementRate * monthsInTherapy * (1 - monthsInTherapy * 0.005)
  );

  return {
    improvementRate: Math.round(improvementRate * 100) / 100,
    totalImprovement: Math.round(totalImprovement),
  };
}

/**
 * Calculate monthly impact of mental health condition
 */
export function calculateMentalHealthImpact(
  condition: MentalHealthCondition,
  severity: MentalHealthSeverity,
  inTreatment: boolean
): {
  moraleLoss: number;
  healthLoss: number;
  productivityPenalty: number;
  relationshipStrain: number;
} {
  const definition = mentalHealthConditions[condition];

  const severityMultiplier = {
    none: 0,
    mild: 0.3,
    moderate: 0.6,
    severe: 1.0,
  }[severity];

  let moraleLoss = Math.round(definition.moraleImpact * severityMultiplier);
  let healthLoss = Math.round(definition.healthImpact * severityMultiplier);
  let productivityPenalty = Math.round(definition.productivityImpact * severityMultiplier);
  let relationshipStrain = Math.round(definition.relationshipStrain * severityMultiplier);

  // Treatment reduces impact by 40%
  if (inTreatment) {
    moraleLoss *= 0.6;
    healthLoss *= 0.6;
    productivityPenalty *= 0.6;
    relationshipStrain *= 0.6;
  }

  return {
    moraleLoss: Math.round(moraleLoss),
    healthLoss: Math.round(healthLoss),
    productivityPenalty: Math.round(productivityPenalty),
    relationshipStrain: Math.round(relationshipStrain),
  };
}

/**
 * Determine if crisis intervention is needed
 */
export function checkCrisisIntervention(
  morale: number,
  stress: number,
  conditions: { condition: MentalHealthCondition; severity: MentalHealthSeverity }[],
  inTreatment: boolean
): {
  crisisLevel: 'none' | 'low' | 'moderate' | 'high';
  requiresIntervention: boolean;
  message: string;
  recommendations: string[];
} {
  let crisisScore = 0;

  // Morale factor
  if (morale < 10) {
    crisisScore += 40;
  } else if (morale < 25) {
    crisisScore += 25;
  } else if (morale < 40) {
    crisisScore += 10;
  }

  // Stress factor
  if (stress > 90) {
    crisisScore += 30;
  } else if (stress > 75) {
    crisisScore += 15;
  }

  // Severe conditions increase crisis risk
  const severeConditions = conditions.filter((c) => c.severity === 'severe').length;
  crisisScore += severeConditions * 15;

  // Not in treatment increases risk
  if (!inTreatment && conditions.length > 0) {
    crisisScore += 20;
  }

  // Determine crisis level
  let crisisLevel: 'none' | 'low' | 'moderate' | 'high';
  let requiresIntervention = false;
  let message = '';
  const recommendations: string[] = [];

  if (crisisScore >= 70) {
    crisisLevel = 'high';
    requiresIntervention = true;
    message = 'IMMEDIATE CRISIS: You are in immediate danger. Please seek help now.';
    recommendations.push(
      'Call 988 (Suicide & Crisis Lifeline)',
      'Go to emergency room immediately',
      'Contact a trusted friend or family member',
      'Do not be alone'
    );
  } else if (crisisScore >= 50) {
    crisisLevel = 'moderate';
    requiresIntervention = true;
    message = 'You are at significant risk. Please seek help urgently.';
    recommendations.push(
      'Schedule emergency therapy appointment',
      'Call your therapist or psychiatrist',
      'Reach out to support network',
      'Consider crisis counseling'
    );
  } else if (crisisScore >= 30) {
    crisisLevel = 'low';
    message = 'Your mental health requires attention.';
    recommendations.push(
      'Schedule therapy appointment',
      'Practice self-care',
      'Talk to someone you trust',
      'Consider starting treatment'
    );
  } else {
    crisisLevel = 'none';
    message = 'Mental health status is concerning but not critical.';
    recommendations.push('Continue monitoring', 'Practice stress management', 'Maintain support connections');
  }

  return { crisisLevel, requiresIntervention, message, recommendations };
}

/**
 * Calculate stress level based on life factors
 */
export function calculateStressLevel(
  jobStress: number,
  financialStress: number,
  relationshipStress: number,
  healthStress: number
): {
  totalStress: number;
  primaryStressor: string;
} {
  const stressors = {
    job: jobStress,
    financial: financialStress,
    relationship: relationshipStress,
    health: healthStress,
  };

  // Weighted average
  const totalStress = Math.min(
    100,
    Math.round((jobStress * 0.3 + financialStress * 0.3 + relationshipStress * 0.2 + healthStress * 0.2))
  );

  // Find primary stressor
  const primaryStressor = Object.entries(stressors).reduce((a, b) => (a[1] > b[1] ? a : b))[0];

  return { totalStress, primaryStressor };
}

/**
 * Calculate benefit of mental health day
 */
export function calculateMentalHealthDayBenefit(
  currentStress: number,
  currentMorale: number
): {
  stressReduction: number;
  moraleGain: number;
  message: string;
} {
  // Higher stress = more benefit from day off
  const stressReduction = Math.min(25, Math.round(currentStress * 0.3));
  const moraleGain = Math.min(15, Math.round((100 - currentMorale) * 0.2));

  let message = '';
  if (stressReduction > 15) {
    message = 'The mental health day provided much-needed relief from stress';
  } else if (stressReduction > 8) {
    message = 'Taking time for yourself helped reduce stress';
  } else {
    message = 'A day of rest helped you recharge';
  }

  return { stressReduction, moraleGain, message };
}

/**
 * Get self-care recommendations
 */
export function getSelfCareRecommendations(
  stress: number,
  morale: number,
  copingSkills: number
): string[] {
  const recommendations: string[] = [];

  if (stress > 60) {
    recommendations.push('Practice deep breathing exercises');
    recommendations.push('Try meditation or mindfulness');
    recommendations.push('Take regular breaks from work');
  }

  if (morale < 50) {
    recommendations.push('Engage in activities you enjoy');
    recommendations.push('Connect with friends and family');
    recommendations.push('Get adequate sleep (7-9 hours)');
  }

  if (copingSkills < 50) {
    recommendations.push('Learn stress management techniques');
    recommendations.push('Consider therapy to develop coping skills');
    recommendations.push('Practice self-compassion');
  }

  // General recommendations
  recommendations.push('Exercise regularly');
  recommendations.push('Maintain a healthy diet');
  recommendations.push('Limit alcohol and caffeine');
  recommendations.push('Spend time in nature');

  return recommendations;
}
