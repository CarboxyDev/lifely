import type { Perk } from '../types';

/**
 * BIRTH TRAITS - Assigned at character creation
 * These are traits the character is born with
 */

// POSITIVE BIRTH TRAITS
export const positiveBirthTraits: Perk[] = [
  {
    id: 'athletic-genetics',
    name: 'Athletic Genetics',
    description: 'Born with natural athletic ability. Gym activities are more effective.',
    category: 'physical',
    rarity: 'uncommon',
    isPositive: true,
    effects: {
      statModifiers: { health: 10 },
      multipliers: { gymEffectiveness: 1.25 },
    },
  },
  {
    id: 'photographic-memory',
    name: 'Photographic Memory',
    description: 'Exceptional memory allows faster learning and better retention.',
    category: 'mental',
    rarity: 'rare',
    isPositive: true,
    effects: {
      statModifiers: { intellect: 15 },
      multipliers: { learningSpeed: 1.5 },
      special: { photogenicMemory: true },
    },
  },
  {
    id: 'natural-charm',
    name: 'Natural Charm',
    description: 'Naturally charismatic and likeable. Social interactions go better.',
    category: 'social',
    rarity: 'uncommon',
    isPositive: true,
    effects: {
      statModifiers: { looks: 10 },
      multipliers: { socialSuccess: 1.3, relationshipGain: 1.2 },
      special: { charismaBoost: true },
    },
  },
  {
    id: 'lucky-soul',
    name: 'Lucky Soul',
    description: 'Born under a lucky star. Good things happen more often.',
    category: 'luck',
    rarity: 'rare',
    isPositive: true,
    effects: {
      multipliers: { positiveEventChance: 1.4, negativeEventChance: 0.7 },
      special: { luckyEvents: true },
    },
  },
  {
    id: 'quick-learner',
    name: 'Quick Learner',
    description: 'Picks up new skills faster than others.',
    category: 'mental',
    rarity: 'common',
    isPositive: true,
    effects: {
      statModifiers: { intellect: 5 },
      multipliers: { learningSpeed: 1.25, skillGain: 1.2 },
    },
  },
  {
    id: 'beautiful-genes',
    name: 'Beautiful Genes',
    description: 'Blessed with exceptional physical attractiveness.',
    category: 'physical',
    rarity: 'uncommon',
    isPositive: true,
    effects: {
      statModifiers: { looks: 20 },
      multipliers: { socialSuccess: 1.15 },
    },
  },
  {
    id: 'iron-stomach',
    name: 'Iron Stomach',
    description: 'Resistant to illness and poisoning. Rarely gets sick.',
    category: 'health',
    rarity: 'common',
    isPositive: true,
    effects: {
      statModifiers: { health: 10 },
      special: { diseaseResistance: true },
    },
  },
  {
    id: 'silver-tongue',
    name: 'Silver Tongue',
    description: 'Exceptional persuasion skills. Can talk your way out of trouble.',
    category: 'social',
    rarity: 'rare',
    isPositive: true,
    effects: {
      multipliers: { negotiationBonus: 1.5, crimeDetection: 0.7 },
    },
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'More productive during night hours. Better focus late at night.',
    category: 'mental',
    rarity: 'common',
    isPositive: true,
    effects: {
      multipliers: { nightProductivity: 1.3 },
    },
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Morning person with high energy in early hours.',
    category: 'physical',
    rarity: 'common',
    isPositive: true,
    effects: {
      multipliers: { morningProductivity: 1.3 },
      statModifiers: { morale: 5 },
    },
  },
  {
    id: 'thick-skinned',
    name: 'Thick Skinned',
    description: 'Criticism and setbacks affect you less emotionally.',
    category: 'mental',
    rarity: 'uncommon',
    isPositive: true,
    effects: {
      multipliers: { moraleRecovery: 1.4, stressResistance: 1.3 },
    },
  },
  {
    id: 'born-leader',
    name: 'Born Leader',
    description: 'Natural leadership qualities. Faster career advancement.',
    category: 'career',
    rarity: 'rare',
    isPositive: true,
    effects: {
      multipliers: { promotionChance: 1.5, salaryMultiplier: 1.15 },
    },
  },
  {
    id: 'frugal-mind',
    name: 'Frugal Mind',
    description: 'Naturally good with money. Lower expenses, better savings.',
    category: 'financial',
    rarity: 'common',
    isPositive: true,
    effects: {
      multipliers: { expenseReduction: 0.85, savingsGain: 1.2 },
    },
  },
  {
    id: 'resilient',
    name: 'Resilient',
    description: 'Bounces back quickly from physical and mental setbacks.',
    category: 'health',
    rarity: 'uncommon',
    isPositive: true,
    effects: {
      statModifiers: { health: 10, morale: 10 },
      multipliers: { recoverySpeed: 1.5 },
    },
  },
  {
    id: 'ambitious',
    name: 'Ambitious',
    description: 'Driven to succeed. Work harder, achieve more.',
    category: 'career',
    rarity: 'common',
    isPositive: true,
    effects: {
      multipliers: { careerProgress: 1.3, skillGain: 1.15 },
      statModifiers: { morale: -5 }, // Trade-off: stress
    },
  },
];

// NEGATIVE BIRTH TRAITS (Flaws)
export const negativeBirthTraits: Perk[] = [
  {
    id: 'unlucky',
    name: 'Unlucky',
    description: 'Born under an unlucky star. Bad things happen more often.',
    category: 'luck',
    rarity: 'uncommon',
    isPositive: false,
    effects: {
      multipliers: { positiveEventChance: 0.6, negativeEventChance: 1.4 },
      special: { unluckyEvents: true },
    },
  },
  {
    id: 'slow-learner',
    name: 'Slow Learner',
    description: 'Takes longer to learn new skills and information.',
    category: 'mental',
    rarity: 'common',
    isPositive: false,
    effects: {
      statModifiers: { intellect: -10 },
      multipliers: { learningSpeed: 0.7, skillGain: 0.8 },
    },
  },
  {
    id: 'sickly',
    name: 'Sickly',
    description: 'Weak immune system. Gets sick more often and takes longer to recover.',
    category: 'health',
    rarity: 'common',
    isPositive: false,
    effects: {
      statModifiers: { health: -15 },
      multipliers: { diseaseChance: 1.5, recoverySpeed: 0.7 },
    },
  },
  {
    id: 'socially-awkward',
    name: 'Socially Awkward',
    description: 'Struggles in social situations. Harder to make friends and connections.',
    category: 'social',
    rarity: 'common',
    isPositive: false,
    effects: {
      statModifiers: { looks: -5 },
      multipliers: { socialSuccess: 0.7, relationshipGain: 0.8 },
    },
  },
  {
    id: 'addictive-personality',
    name: 'Addictive Personality',
    description: 'More susceptible to addictions of all kinds.',
    category: 'health',
    rarity: 'uncommon',
    isPositive: false,
    effects: {
      multipliers: { addictionChance: 2.0 },
      statModifiers: { morale: -5 },
    },
  },
  {
    id: 'lazy',
    name: 'Lazy',
    description: 'Lacks motivation. Work and activities are less effective.',
    category: 'career',
    rarity: 'common',
    isPositive: false,
    effects: {
      multipliers: { careerProgress: 0.75, skillGain: 0.8, activityEffectiveness: 0.85 },
      statModifiers: { morale: 5 }, // Trade-off: less stress
    },
  },
  {
    id: 'bad-temper',
    name: 'Bad Temper',
    description: 'Quick to anger. Damages relationships and gets into conflicts.',
    category: 'social',
    rarity: 'common',
    isPositive: false,
    effects: {
      multipliers: { conflictChance: 1.5, relationshipLoss: 1.3 },
      statModifiers: { morale: -10 },
    },
  },
  {
    id: 'anxious',
    name: 'Anxious',
    description: 'Chronic anxiety affects daily life and decision making.',
    category: 'mental',
    rarity: 'uncommon',
    isPositive: false,
    effects: {
      statModifiers: { morale: -15 },
      multipliers: { stressGain: 1.4, negativeEventImpact: 1.2 },
    },
  },
  {
    id: 'weak-constitution',
    name: 'Weak Constitution',
    description: 'Physically frail. Exercise and physical activities are less effective.',
    category: 'physical',
    rarity: 'common',
    isPositive: false,
    effects: {
      statModifiers: { health: -10 },
      multipliers: { gymEffectiveness: 0.7, physicalActivityBonus: 0.8 },
    },
  },
  {
    id: 'spendthrift',
    name: 'Spendthrift',
    description: 'Poor money management. Higher expenses, impulse purchases.',
    category: 'financial',
    rarity: 'common',
    isPositive: false,
    effects: {
      multipliers: { expenseIncrease: 1.3, impulseSpending: 1.5 },
    },
  },
  {
    id: 'insomnia',
    name: 'Insomnia',
    description: 'Chronic sleep problems. Lower energy and focus.',
    category: 'health',
    rarity: 'uncommon',
    isPositive: false,
    effects: {
      statModifiers: { health: -10, morale: -10 },
      multipliers: { energyRecovery: 0.7 },
    },
  },
  {
    id: 'tone-deaf',
    name: 'Tone Deaf',
    description: 'Cannot carry a tune or appreciate music properly.',
    category: 'social',
    rarity: 'common',
    isPositive: false,
    effects: {
      special: { cannotLearnMusic: true },
      statModifiers: { morale: -3 },
    },
  },
  {
    id: 'clumsy',
    name: 'Clumsy',
    description: 'Prone to accidents and mishaps. Higher injury chance.',
    category: 'physical',
    rarity: 'common',
    isPositive: false,
    effects: {
      multipliers: { accidentChance: 1.5, injuryChance: 1.3 },
    },
  },
  {
    id: 'forgetful',
    name: 'Forgetful',
    description: 'Poor memory. Harder to retain information and skills.',
    category: 'mental',
    rarity: 'common',
    isPositive: false,
    effects: {
      statModifiers: { intellect: -5 },
      multipliers: { skillRetention: 0.8, learningSpeed: 0.9 },
    },
  },
  {
    id: 'cowardly',
    name: 'Cowardly',
    description: 'Easily frightened. Avoids risks and confrontations.',
    category: 'mental',
    rarity: 'common',
    isPositive: false,
    effects: {
      multipliers: { riskTakingPenalty: 0.5, courageRequired: 1.5 },
      statModifiers: { morale: -5 },
    },
  },
];

/**
 * UNLOCKABLE PERKS - Earned through gameplay
 */

export const unlockablePerks: Perk[] = [
  {
    id: 'iron-will',
    name: 'Iron Will',
    description: 'Developed incredible mental fortitude through hardship.',
    category: 'mental',
    rarity: 'rare',
    isPositive: true,
    effects: {
      statModifiers: { morale: 20 },
      multipliers: { stressResistance: 1.5 },
      special: { immuneToAddiction: true },
    },
    unlockCondition: {
      achievementRequired: 'survive-5-major-setbacks',
    },
  },
  {
    id: 'street-smart',
    name: 'Street Smart',
    description: 'Learned to navigate life through experience, not books.',
    category: 'social',
    rarity: 'uncommon',
    isPositive: true,
    effects: {
      multipliers: { crimeDetection: 0.6, streetWiseBonus: 1.4 },
      statModifiers: { intellect: -5, looks: 5 },
    },
    unlockCondition: {
      randomChance: 0.1,
      ageRequired: 10950, // 30 years in days
    },
  },
  {
    id: 'workaholic',
    name: 'Workaholic',
    description: 'Obsessed with work. Career progresses faster but at a cost.',
    category: 'career',
    rarity: 'uncommon',
    isPositive: true,
    effects: {
      multipliers: { salaryMultiplier: 1.3, careerProgress: 1.5 },
      statModifiers: { morale: -10, health: -5 },
    },
    unlockCondition: {
      achievementRequired: 'work-10-years-no-break',
    },
  },
  {
    id: 'wealthy-connections',
    name: 'Wealthy Connections',
    description: 'Built a network of wealthy and influential contacts.',
    category: 'financial',
    rarity: 'rare',
    isPositive: true,
    effects: {
      multipliers: { investmentReturns: 1.3, businessSuccess: 1.25 },
    },
    unlockCondition: {
      wealthRequired: 1000000,
      fameRequired: 40,
    },
  },
  {
    id: 'celebrity-status',
    name: 'Celebrity Status',
    description: 'Achieved fame and recognition. Doors open everywhere.',
    category: 'social',
    rarity: 'legendary',
    isPositive: true,
    effects: {
      multipliers: { salaryMultiplier: 1.5, socialSuccess: 1.5 },
      special: { unlockCareer: 'celebrity-influencer' },
    },
    unlockCondition: {
      fameRequired: 80,
    },
  },
  {
    id: 'master-negotiator',
    name: 'Master Negotiator',
    description: 'Perfected the art of negotiation through years of practice.',
    category: 'career',
    rarity: 'rare',
    isPositive: true,
    effects: {
      multipliers: { salaryMultiplier: 1.25, negotiationBonus: 1.6 },
    },
    unlockCondition: {
      achievementRequired: 'successful-negotiations-50',
    },
  },
  {
    id: 'martial-artist',
    name: 'Martial Artist',
    description: 'Mastered martial arts through dedicated training.',
    category: 'physical',
    rarity: 'rare',
    isPositive: true,
    effects: {
      statModifiers: { health: 20, looks: 5 },
      special: { combatBonus: true },
    },
    unlockCondition: {
      achievementRequired: 'gym-500-times',
    },
  },
  {
    id: 'scholar',
    name: 'Scholar',
    description: 'Deep knowledge from years of study and research.',
    category: 'mental',
    rarity: 'rare',
    isPositive: true,
    effects: {
      statModifiers: { intellect: 25 },
      multipliers: { learningSpeed: 1.4 },
      special: { unlockCareer: 'professor' },
    },
    unlockCondition: {
      achievementRequired: 'library-1000-times',
    },
  },
  {
    id: 'investor-mindset',
    name: 'Investor Mindset',
    description: 'Learned to make money work for you through smart investments.',
    category: 'financial',
    rarity: 'uncommon',
    isPositive: true,
    effects: {
      multipliers: { investmentReturns: 1.4, passiveIncomeBonus: 1.3 },
    },
    unlockCondition: {
      wealthRequired: 500000,
    },
  },
  {
    id: 'philanthropist',
    name: 'Philanthropist',
    description: 'Dedicated to giving back to society. Respected and admired.',
    category: 'social',
    rarity: 'rare',
    isPositive: true,
    effects: {
      multipliers: { karmaGain: 2.0, reputationGain: 1.5 },
      statModifiers: { morale: 15 },
    },
    unlockCondition: {
      achievementRequired: 'donate-1-million',
    },
  },
  {
    id: 'survivor',
    name: 'Survivor',
    description: 'Survived against all odds. Nothing can break you now.',
    category: 'health',
    rarity: 'legendary',
    isPositive: true,
    effects: {
      statModifiers: { health: 30, morale: 20 },
      multipliers: { recoverySpeed: 2.0 },
      special: { deathResistance: true },
    },
    unlockCondition: {
      achievementRequired: 'survive-death-3-times',
    },
  },
  {
    id: 'smooth-criminal',
    name: 'Smooth Criminal',
    description: 'Mastered the art of crime without getting caught.',
    category: 'luck',
    rarity: 'rare',
    isPositive: true,
    effects: {
      multipliers: { crimeDetection: 0.4, crimeSuccess: 1.5 },
    },
    unlockCondition: {
      achievementRequired: 'crimes-50-no-arrest',
    },
  },
  {
    id: 'zen-master',
    name: 'Zen Master',
    description: 'Achieved inner peace through meditation and mindfulness.',
    category: 'mental',
    rarity: 'rare',
    isPositive: true,
    effects: {
      statModifiers: { morale: 30 },
      multipliers: { stressResistance: 2.0, moraleRecovery: 1.5 },
    },
    unlockCondition: {
      achievementRequired: 'meditation-365-days',
    },
  },
  {
    id: 'fitness-guru',
    name: 'Fitness Guru',
    description: 'Peak physical condition maintained for years.',
    category: 'physical',
    rarity: 'uncommon',
    isPositive: true,
    effects: {
      statModifiers: { health: 25, looks: 10 },
      multipliers: { gymEffectiveness: 1.5 },
    },
    unlockCondition: {
      achievementRequired: 'maintain-100-health-3-years',
    },
  },
  {
    id: 'polyglot',
    name: 'Polyglot',
    description: 'Master of multiple languages. Global opportunities open up.',
    category: 'mental',
    rarity: 'rare',
    isPositive: true,
    effects: {
      statModifiers: { intellect: 15 },
      multipliers: { careerProgress: 1.2, socialSuccess: 1.2 },
      special: { unlockInternationalJobs: true },
    },
    unlockCondition: {
      achievementRequired: 'learn-5-languages',
    },
  },
  {
    id: 'renaissance-person',
    name: 'Renaissance Person',
    description: 'Jack of all trades, master of many. Exceptional versatility.',
    category: 'mental',
    rarity: 'legendary',
    isPositive: true,
    effects: {
      statModifiers: { intellect: 20, looks: 10, health: 10 },
      multipliers: { skillGain: 1.5, learningSpeed: 1.5 },
    },
    unlockCondition: {
      achievementRequired: 'master-10-skills',
    },
  },
  {
    id: 'entrepreneurial-spirit',
    name: 'Entrepreneurial Spirit',
    description: 'Natural talent for business and innovation.',
    category: 'career',
    rarity: 'rare',
    isPositive: true,
    effects: {
      multipliers: { businessSuccess: 1.6, investmentReturns: 1.3 },
      special: { unlockCareer: 'entrepreneur' },
    },
    unlockCondition: {
      wealthRequired: 250000,
      achievementRequired: 'start-3-businesses',
    },
  },
  {
    id: 'political-insider',
    name: 'Political Insider',
    description: 'Deep connections in political circles. Influence and power.',
    category: 'social',
    rarity: 'rare',
    isPositive: true,
    effects: {
      multipliers: { politicalInfluence: 1.5 },
      special: { unlockPoliticalOffices: true },
    },
    unlockCondition: {
      fameRequired: 60,
      achievementRequired: 'win-election',
    },
  },
  {
    id: 'family-oriented',
    name: 'Family Oriented',
    description: 'Strong family bonds bring happiness and support.',
    category: 'social',
    rarity: 'common',
    isPositive: true,
    effects: {
      statModifiers: { morale: 15 },
      multipliers: { relationshipGain: 1.3, familySupport: 1.5 },
    },
    unlockCondition: {
      achievementRequired: 'married-10-years',
    },
  },
  {
    id: 'adrenaline-junkie',
    name: 'Adrenaline Junkie',
    description: 'Thrives on danger and excitement.',
    category: 'physical',
    rarity: 'uncommon',
    isPositive: true,
    effects: {
      statModifiers: { morale: 10, health: -5 },
      multipliers: { extremeSportsBonus: 1.5, riskReward: 1.3 },
    },
    unlockCondition: {
      achievementRequired: 'extreme-activities-50',
    },
  },
  {
    id: 'beloved-icon',
    name: 'Beloved Icon',
    description: 'Universally loved and admired by the public.',
    category: 'social',
    rarity: 'legendary',
    isPositive: true,
    effects: {
      multipliers: { reputationGain: 2.0, socialSuccess: 1.8, salaryMultiplier: 1.4 },
      statModifiers: { morale: 20 },
    },
    unlockCondition: {
      fameRequired: 95,
      achievementRequired: 'no-scandals-20-years',
    },
  },
  {
    id: 'prodigy',
    name: 'Prodigy',
    description: 'Recognized as a generational talent in your field.',
    category: 'career',
    rarity: 'legendary',
    isPositive: true,
    effects: {
      statModifiers: { intellect: 30 },
      multipliers: { careerProgress: 2.0, salaryMultiplier: 1.6 },
    },
    unlockCondition: {
      ageRequired: 7300, // Achieve before 20 years
      achievementRequired: 'career-level-10-before-20',
    },
  },
  {
    id: 'old-soul',
    name: 'Old Soul',
    description: 'Wisdom beyond your years. Makes better life decisions.',
    category: 'mental',
    rarity: 'uncommon',
    isPositive: true,
    effects: {
      multipliers: { decisionQuality: 1.4, negativeEventChance: 0.8 },
      statModifiers: { intellect: 10, morale: 5 },
    },
    unlockCondition: {
      randomChance: 0.05,
      ageRequired: 18250, // 50 years
    },
  },
  {
    id: 'feared-reputation',
    name: 'Feared Reputation',
    description: 'Your name strikes fear into others. Respect through intimidation.',
    category: 'social',
    rarity: 'rare',
    isPositive: true,
    effects: {
      multipliers: { intimidationBonus: 1.8, crimeSuccess: 1.3 },
      statModifiers: { morale: -10 }, // Trade-off: feared, not loved
    },
    unlockCondition: {
      achievementRequired: 'commit-violent-crimes-20',
    },
  },
  {
    id: 'fashionista',
    name: 'Fashionista',
    description: 'Impeccable style and fashion sense. Always look your best.',
    category: 'social',
    rarity: 'uncommon',
    isPositive: true,
    effects: {
      statModifiers: { looks: 15 },
      multipliers: { socialSuccess: 1.2, firstImpressions: 1.4 },
    },
    unlockCondition: {
      achievementRequired: 'spend-100k-appearance',
    },
  },
  // UNLOCKABLE NEGATIVE PERKS (Acquired through bad choices/events)
  {
    id: 'paranoid',
    name: 'Paranoid',
    description: 'Constant suspicion and distrust of others.',
    category: 'mental',
    rarity: 'uncommon',
    isPositive: false,
    effects: {
      statModifiers: { morale: -15 },
      multipliers: { relationshipGain: 0.6, stressGain: 1.4 },
    },
    unlockCondition: {
      achievementRequired: 'betrayed-3-times',
    },
  },
  {
    id: 'burned-out',
    name: 'Burned Out',
    description: 'Chronic exhaustion from overwork. Everything feels harder.',
    category: 'health',
    rarity: 'common',
    isPositive: false,
    effects: {
      statModifiers: { health: -15, morale: -15 },
      multipliers: { activityEffectiveness: 0.7 },
    },
    unlockCondition: {
      achievementRequired: 'overwork-burnout',
    },
  },
  {
    id: 'gambling-addiction',
    name: 'Gambling Addiction',
    description: 'Compulsive gambling problem. Can\'t resist the urge.',
    category: 'financial',
    rarity: 'uncommon',
    isPositive: false,
    effects: {
      multipliers: { gamblingLosses: 1.8, impulseSpending: 1.5 },
      statModifiers: { morale: -10 },
    },
    unlockCondition: {
      achievementRequired: 'gamble-100-times',
    },
  },
  {
    id: 'alcoholic',
    name: 'Alcoholic',
    description: 'Severe alcohol dependency. Affects all aspects of life.',
    category: 'health',
    rarity: 'uncommon',
    isPositive: false,
    effects: {
      statModifiers: { health: -25, morale: -15, intellect: -10 },
      multipliers: { expenseIncrease: 1.3, relationshipLoss: 1.3 },
    },
    unlockCondition: {
      achievementRequired: 'drink-heavy-365-days',
    },
  },
  {
    id: 'criminal-record',
    name: 'Criminal Record',
    description: 'Past crimes haunt your opportunities and reputation.',
    category: 'social',
    rarity: 'common',
    isPositive: false,
    effects: {
      multipliers: { careerProgress: 0.6, jobOpportunities: 0.5 },
      statModifiers: { morale: -10 },
    },
    unlockCondition: {
      achievementRequired: 'convicted-felony',
    },
  },
  {
    id: 'depressed',
    name: 'Depressed',
    description: 'Clinical depression affects motivation and happiness.',
    category: 'mental',
    rarity: 'uncommon',
    isPositive: false,
    effects: {
      statModifiers: { morale: -30 },
      multipliers: { activityEffectiveness: 0.6, moraleRecovery: 0.5 },
    },
    unlockCondition: {
      achievementRequired: 'low-morale-2-years',
    },
  },
  {
    id: 'obese',
    name: 'Obese',
    description: 'Severe weight problem affects health and mobility.',
    category: 'physical',
    rarity: 'common',
    isPositive: false,
    effects: {
      statModifiers: { health: -20, looks: -15 },
      multipliers: { diseaseChance: 1.5, activityEffectiveness: 0.7 },
    },
    unlockCondition: {
      achievementRequired: 'neglect-health-3-years',
    },
  },
  {
    id: 'chronic-pain',
    name: 'Chronic Pain',
    description: 'Persistent pain from injury. Reduces quality of life.',
    category: 'health',
    rarity: 'uncommon',
    isPositive: false,
    effects: {
      statModifiers: { health: -15, morale: -15 },
      multipliers: { physicalActivityBonus: 0.6 },
    },
    unlockCondition: {
      achievementRequired: 'severe-injury',
    },
  },
  {
    id: 'notorious',
    name: 'Notorious',
    description: 'Infamous reputation. Everyone knows your misdeeds.',
    category: 'social',
    rarity: 'rare',
    isPositive: false,
    effects: {
      multipliers: { socialSuccess: 0.5, jobOpportunities: 0.4 },
      statModifiers: { morale: -20 },
    },
    unlockCondition: {
      achievementRequired: 'major-scandal',
    },
  },
  {
    id: 'ptsd',
    name: 'PTSD',
    description: 'Traumatic experiences cause lasting psychological damage.',
    category: 'mental',
    rarity: 'rare',
    isPositive: false,
    effects: {
      statModifiers: { morale: -25, health: -10 },
      multipliers: { stressGain: 1.8, negativeEventImpact: 1.5 },
    },
    unlockCondition: {
      achievementRequired: 'traumatic-event',
    },
  },
];

/**
 * Get random birth traits for new character
 */
export function getRandomBirthTraits(): {
  positiveTraits: Perk[];
  negativeTraits: Perk[];
} {
  const positiveCount = Math.random() < 0.3 ? 2 : 1; // 30% chance of 2 positive, 70% of 1
  const negativeCount = Math.random() < 0.4 ? 2 : Math.random() < 0.7 ? 1 : 0; // 40% = 2, 30% = 1, 30% = 0

  const shuffledPositive = [...positiveBirthTraits].sort(() => Math.random() - 0.5);
  const shuffledNegative = [...negativeBirthTraits].sort(() => Math.random() - 0.5);

  return {
    positiveTraits: shuffledPositive.slice(0, positiveCount),
    negativeTraits: shuffledNegative.slice(0, negativeCount),
  };
}

/**
 * Check if player qualifies for unlockable perk
 */
export function checkUnlockablePerk(
  perk: Perk,
  playerData: {
    age: number; // in days
    wealth: number;
    fame: number;
    achievements: string[];
  }
): boolean {
  if (!perk.unlockCondition) return false;

  const { ageRequired, wealthRequired, fameRequired, achievementRequired, randomChance } = perk.unlockCondition;

  // Check all required conditions
  if (ageRequired !== undefined && playerData.age < ageRequired) return false;
  if (wealthRequired !== undefined && playerData.wealth < wealthRequired) return false;
  if (fameRequired !== undefined && playerData.fame < fameRequired) return false;
  if (achievementRequired && !playerData.achievements.includes(achievementRequired)) return false;
  if (randomChance !== undefined && Math.random() > randomChance) return false;

  return true;
}

/**
 * Apply perk effects to base stats
 */
export function applyPerkEffects(
  baseStats: {
    health: number;
    morale: number;
    intellect: number;
    looks: number;
  },
  perks: Perk[]
): {
  health: number;
  morale: number;
  intellect: number;
  looks: number;
} {
  let stats = { ...baseStats };

  for (const perk of perks) {
    if (perk.effects.statModifiers) {
      const { health, morale, intellect, looks } = perk.effects.statModifiers;
      if (health) stats.health += health;
      if (morale) stats.morale += morale;
      if (intellect) stats.intellect += intellect;
      if (looks) stats.looks += looks;
    }
  }

  return stats;
}

/**
 * Get multiplier from perks for specific attribute
 */
export function getPerkMultiplier(perks: Perk[], attribute: string): number {
  let multiplier = 1.0;

  for (const perk of perks) {
    if (perk.effects.multipliers) {
      const value = (perk.effects.multipliers as any)[attribute];
      if (value !== undefined) {
        multiplier *= value;
      }
    }
  }

  return multiplier;
}

/**
 * Check if player has special perk ability
 */
export function hasSpecialPerkAbility(perks: Perk[], ability: string): boolean {
  return perks.some(perk =>
    perk.effects.special && (perk.effects.special as any)[ability] === true
  );
}
