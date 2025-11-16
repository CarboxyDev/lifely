import type { Perk } from '../types';

/**
 * ACHIEVEMENT SYSTEM
 * Track player accomplishments and unlock perks
 */

export type AchievementCategory =
  | 'wealth'
  | 'career'
  | 'social'
  | 'health'
  | 'education'
  | 'family'
  | 'crime'
  | 'lifestyle'
  | 'special';

export type AchievementRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  icon: string; // emoji

  // Unlock condition
  condition: {
    type: 'stat' | 'count' | 'combo' | 'special';

    // For stat-based
    stat?: 'wealth' | 'age' | 'health' | 'morale' | 'intellect' | 'looks' | 'fame' | 'karma';
    threshold?: number;

    // For count-based
    eventId?: string;
    eventCount?: number;

    // For combo (multiple conditions)
    conditions?: Array<{
      stat?: string;
      threshold?: number;
      eventId?: string;
      eventCount?: number;
    }>;

    // For special checks
    customCheck?: string; // ID for custom checking logic
  };

  // Rewards
  rewards: {
    perkUnlock?: string; // Perk ID to unlock
    money?: number;
    statBoost?: {
      health?: number;
      morale?: number;
      intellect?: number;
      looks?: number;
    };
  };

  // Hidden until unlocked
  hidden?: boolean;
}

/**
 * WEALTH ACHIEVEMENTS
 */
export const wealthAchievements: Achievement[] = [
  {
    id: 'first-thousand',
    name: 'First Thousand',
    description: 'Earn your first $1,000',
    category: 'wealth',
    rarity: 'common',
    icon: '💵',
    condition: {
      type: 'stat',
      stat: 'wealth',
      threshold: 1000,
    },
    rewards: {
      money: 100,
    },
  },
  {
    id: 'ten-thousand',
    name: 'Five Figures',
    description: 'Accumulate $10,000',
    category: 'wealth',
    rarity: 'uncommon',
    icon: '💰',
    condition: {
      type: 'stat',
      stat: 'wealth',
      threshold: 10000,
    },
    rewards: {
      money: 500,
    },
  },
  {
    id: 'hundred-thousand',
    name: 'Six Figures',
    description: 'Reach $100,000 net worth',
    category: 'wealth',
    rarity: 'rare',
    icon: '💎',
    condition: {
      type: 'stat',
      stat: 'wealth',
      threshold: 100000,
    },
    rewards: {
      perkUnlock: 'investor-mindset',
      money: 5000,
    },
  },
  {
    id: 'millionaire',
    name: 'Millionaire',
    description: 'Become a millionaire',
    category: 'wealth',
    rarity: 'epic',
    icon: '🏆',
    condition: {
      type: 'stat',
      stat: 'wealth',
      threshold: 1000000,
    },
    rewards: {
      perkUnlock: 'wealthy-connections',
      statBoost: { morale: 20 },
    },
  },
  {
    id: 'ten-million',
    name: 'Multi-Millionaire',
    description: 'Accumulate $10,000,000',
    category: 'wealth',
    rarity: 'legendary',
    icon: '👑',
    condition: {
      type: 'stat',
      stat: 'wealth',
      threshold: 10000000,
    },
    rewards: {
      statBoost: { morale: 50, looks: 10 },
    },
  },
  {
    id: 'rags-to-riches',
    name: 'Rags to Riches',
    description: 'Go from broke ($0) to $1M',
    category: 'wealth',
    rarity: 'rare',
    icon: '📈',
    condition: {
      type: 'special',
      customCheck: 'rags-to-riches',
    },
    rewards: {
      perkUnlock: 'entrepreneurial-spirit',
    },
    hidden: true,
  },
];

/**
 * CAREER ACHIEVEMENTS
 */
export const careerAchievements: Achievement[] = [
  {
    id: 'first-job',
    name: 'First Job',
    description: 'Get your first job',
    category: 'career',
    rarity: 'common',
    icon: '💼',
    condition: {
      type: 'count',
      eventId: 'job-hired',
      eventCount: 1,
    },
    rewards: {
      money: 100,
    },
  },
  {
    id: 'job-hopper',
    name: 'Job Hopper',
    description: 'Have 5 different jobs',
    category: 'career',
    rarity: 'uncommon',
    icon: '🔄',
    condition: {
      type: 'count',
      eventId: 'job-hired',
      eventCount: 5,
    },
    rewards: {
      statBoost: { intellect: 5 },
    },
  },
  {
    id: 'career-master',
    name: 'Career Master',
    description: 'Work the same job for 10 years',
    category: 'career',
    rarity: 'rare',
    icon: '⭐',
    condition: {
      type: 'special',
      customCheck: 'same-job-10-years',
    },
    rewards: {
      perkUnlock: 'workaholic',
    },
  },
  {
    id: 'six-figure-salary',
    name: 'Six Figure Salary',
    description: 'Earn a salary of $100,000+',
    category: 'career',
    rarity: 'rare',
    icon: '💵',
    condition: {
      type: 'special',
      customCheck: 'salary-100k',
    },
    rewards: {
      perkUnlock: 'master-negotiator',
    },
  },
  {
    id: 'ceo',
    name: 'Corner Office',
    description: 'Become a CEO',
    category: 'career',
    rarity: 'epic',
    icon: '🏢',
    condition: {
      type: 'special',
      customCheck: 'job-ceo',
    },
    rewards: {
      perkUnlock: 'born-leader',
      statBoost: { morale: 30 },
    },
  },
];

/**
 * HEALTH & FITNESS ACHIEVEMENTS
 */
export const healthAchievements: Achievement[] = [
  {
    id: 'gym-rat',
    name: 'Gym Rat',
    description: 'Visit the gym 100 times',
    category: 'health',
    rarity: 'uncommon',
    icon: '💪',
    condition: {
      type: 'count',
      eventId: 'gym-visit',
      eventCount: 100,
    },
    rewards: {
      statBoost: { health: 10 },
    },
  },
  {
    id: 'fitness-guru',
    name: 'Fitness Guru',
    description: 'Visit the gym 500 times',
    category: 'health',
    rarity: 'rare',
    icon: '🏋️',
    condition: {
      type: 'count',
      eventId: 'gym-visit',
      eventCount: 500,
    },
    rewards: {
      perkUnlock: 'martial-artist',
      statBoost: { health: 20, looks: 10 },
    },
  },
  {
    id: 'peak-health',
    name: 'Peak Performance',
    description: 'Maintain 100 health for 1 year',
    category: 'health',
    rarity: 'rare',
    icon: '❤️',
    condition: {
      type: 'special',
      customCheck: 'maintain-100-health-365-days',
    },
    rewards: {
      perkUnlock: 'fitness-guru',
    },
  },
  {
    id: 'centenarian',
    name: 'Centenarian',
    description: 'Live to 100 years old',
    category: 'health',
    rarity: 'legendary',
    icon: '🎂',
    condition: {
      type: 'stat',
      stat: 'age',
      threshold: 36500, // 100 years in days
    },
    rewards: {
      perkUnlock: 'survivor',
      statBoost: { morale: 100 },
    },
  },
];

/**
 * EDUCATION ACHIEVEMENTS
 */
export const educationAchievements: Achievement[] = [
  {
    id: 'high-school-grad',
    name: 'High School Graduate',
    description: 'Graduate high school',
    category: 'education',
    rarity: 'common',
    icon: '🎓',
    condition: {
      type: 'special',
      customCheck: 'has-high-school',
    },
    rewards: {
      money: 500,
    },
  },
  {
    id: 'college-grad',
    name: 'College Graduate',
    description: 'Earn a college degree',
    category: 'education',
    rarity: 'uncommon',
    icon: '🎓',
    condition: {
      type: 'special',
      customCheck: 'has-college-degree',
    },
    rewards: {
      money: 2000,
      statBoost: { intellect: 10 },
    },
  },
  {
    id: 'bookworm',
    name: 'Bookworm',
    description: 'Visit the library 1000 times',
    category: 'education',
    rarity: 'rare',
    icon: '📚',
    condition: {
      type: 'count',
      eventId: 'library-visit',
      eventCount: 1000,
    },
    rewards: {
      perkUnlock: 'scholar',
      statBoost: { intellect: 25 },
    },
  },
  {
    id: 'phd',
    name: 'Doctor of Philosophy',
    description: 'Earn a PhD',
    category: 'education',
    rarity: 'epic',
    icon: '🔬',
    condition: {
      type: 'special',
      customCheck: 'has-phd',
    },
    rewards: {
      perkUnlock: 'prodigy',
      money: 10000,
    },
  },
];

/**
 * SOCIAL ACHIEVEMENTS
 */
export const socialAchievements: Achievement[] = [
  {
    id: 'first-friend',
    name: 'First Friend',
    description: 'Make your first friend',
    category: 'social',
    rarity: 'common',
    icon: '👥',
    condition: {
      type: 'special',
      customCheck: 'has-friend',
    },
    rewards: {
      statBoost: { morale: 10 },
    },
  },
  {
    id: 'social-butterfly',
    name: 'Social Butterfly',
    description: 'Have 10 friends',
    category: 'social',
    rarity: 'uncommon',
    icon: '🦋',
    condition: {
      type: 'special',
      customCheck: 'has-10-friends',
    },
    rewards: {
      perkUnlock: 'natural-charm',
    },
  },
  {
    id: 'married',
    name: 'Happily Married',
    description: 'Get married',
    category: 'family',
    rarity: 'uncommon',
    icon: '💍',
    condition: {
      type: 'special',
      customCheck: 'is-married',
    },
    rewards: {
      statBoost: { morale: 20 },
    },
  },
  {
    id: 'golden-anniversary',
    name: 'Golden Anniversary',
    description: 'Stay married for 50 years',
    category: 'family',
    rarity: 'legendary',
    icon: '💛',
    condition: {
      type: 'special',
      customCheck: 'married-50-years',
    },
    rewards: {
      perkUnlock: 'family-oriented',
      statBoost: { morale: 50 },
    },
  },
  {
    id: 'famous',
    name: 'Famous',
    description: 'Reach 50 fame',
    category: 'social',
    rarity: 'rare',
    icon: '⭐',
    condition: {
      type: 'stat',
      stat: 'fame',
      threshold: 50,
    },
    rewards: {
      statBoost: { morale: 15, looks: 5 },
    },
  },
  {
    id: 'celebrity',
    name: 'Celebrity Status',
    description: 'Reach 80 fame',
    category: 'social',
    rarity: 'epic',
    icon: '🌟',
    condition: {
      type: 'stat',
      stat: 'fame',
      threshold: 80,
    },
    rewards: {
      perkUnlock: 'celebrity-status',
    },
  },
];

/**
 * KARMA & MORALITY ACHIEVEMENTS
 */
export const karmaAchievements: Achievement[] = [
  {
    id: 'good-samaritan',
    name: 'Good Samaritan',
    description: 'Reach 100 karma',
    category: 'lifestyle',
    rarity: 'uncommon',
    icon: '😇',
    condition: {
      type: 'stat',
      stat: 'karma',
      threshold: 100,
    },
    rewards: {
      statBoost: { morale: 20 },
    },
  },
  {
    id: 'saint',
    name: 'Saint',
    description: 'Reach 500 karma',
    category: 'lifestyle',
    rarity: 'epic',
    icon: '👼',
    condition: {
      type: 'stat',
      stat: 'karma',
      threshold: 500,
    },
    rewards: {
      perkUnlock: 'philanthropist',
      statBoost: { morale: 30 },
    },
  },
  {
    id: 'troublemaker',
    name: 'Troublemaker',
    description: 'Reach -100 karma',
    category: 'crime',
    rarity: 'uncommon',
    icon: '😈',
    condition: {
      type: 'stat',
      stat: 'karma',
      threshold: -100,
    },
    rewards: {
      statBoost: { morale: -10 },
    },
  },
  {
    id: 'criminal-mastermind',
    name: 'Criminal Mastermind',
    description: 'Commit 50 crimes without getting caught',
    category: 'crime',
    rarity: 'rare',
    icon: '🎭',
    condition: {
      type: 'special',
      customCheck: 'crimes-50-no-arrest',
    },
    rewards: {
      perkUnlock: 'smooth-criminal',
    },
    hidden: true,
  },
];

/**
 * SPECIAL ACHIEVEMENTS
 */
export const specialAchievements: Achievement[] = [
  {
    id: 'jack-of-all-trades',
    name: 'Jack of All Trades',
    description: 'Have all stats above 75',
    category: 'special',
    rarity: 'epic',
    icon: '🎯',
    condition: {
      type: 'special',
      customCheck: 'all-stats-75',
    },
    rewards: {
      perkUnlock: 'renaissance-person',
      statBoost: { health: 10, morale: 10, intellect: 10, looks: 10 },
    },
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Have all stats at 100',
    category: 'special',
    rarity: 'legendary',
    icon: '💯',
    condition: {
      type: 'special',
      customCheck: 'all-stats-100',
    },
    rewards: {
      statBoost: { morale: 50 },
    },
    hidden: true,
  },
  {
    id: 'survivor',
    name: 'Survivor',
    description: 'Survive 3 near-death experiences',
    category: 'special',
    rarity: 'rare',
    icon: '🩹',
    condition: {
      type: 'count',
      eventId: 'near-death',
      eventCount: 3,
    },
    rewards: {
      perkUnlock: 'survivor',
    },
  },
  {
    id: 'zen-master',
    name: 'Zen Master',
    description: 'Meditate for 365 consecutive days',
    category: 'lifestyle',
    rarity: 'epic',
    icon: '🧘',
    condition: {
      type: 'special',
      customCheck: 'meditation-365-days',
    },
    rewards: {
      perkUnlock: 'zen-master',
    },
  },
];

/**
 * ALL ACHIEVEMENTS
 */
export const allAchievements: Achievement[] = [
  ...wealthAchievements,
  ...careerAchievements,
  ...healthAchievements,
  ...educationAchievements,
  ...socialAchievements,
  ...karmaAchievements,
  ...specialAchievements,
];

/**
 * Get achievement by ID
 */
export function getAchievementById(id: string): Achievement | undefined {
  return allAchievements.find(a => a.id === id);
}

/**
 * Get achievements by category
 */
export function getAchievementsByCategory(category: AchievementCategory): Achievement[] {
  return allAchievements.filter(a => a.category === category);
}

/**
 * Get achievements by rarity
 */
export function getAchievementsByRarity(rarity: AchievementRarity): Achievement[] {
  return allAchievements.filter(a => a.rarity === rarity);
}
