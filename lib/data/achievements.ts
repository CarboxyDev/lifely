import type { AchievementCategory } from '../types';

export interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  points: number;
}

export const achievements: AchievementDefinition[] = [
  // Financial Achievements
  {
    id: 'first-dollar',
    name: 'First Dollar',
    description: 'Earn your first dollar',
    category: 'financial',
    icon: '💵',
    rarity: 'common',
    points: 5,
  },
  {
    id: 'thousandaire',
    name: 'Thousandaire',
    description: 'Accumulate $1,000',
    category: 'financial',
    icon: '💰',
    rarity: 'common',
    points: 10,
  },
  {
    id: 'ten-thousandaire',
    name: 'Ten Thousandaire',
    description: 'Accumulate $10,000',
    category: 'financial',
    icon: '💸',
    rarity: 'uncommon',
    points: 25,
  },
  {
    id: 'hundred-thousandaire',
    name: 'Hundred Thousandaire',
    description: 'Accumulate $100,000',
    category: 'financial',
    icon: '🏦',
    rarity: 'rare',
    points: 50,
  },
  {
    id: 'millionaire',
    name: 'Millionaire',
    description: 'Become a millionaire',
    category: 'financial',
    icon: '👑',
    rarity: 'epic',
    points: 100,
  },
  {
    id: 'multi-millionaire',
    name: 'Multi-Millionaire',
    description: 'Accumulate $10,000,000',
    category: 'financial',
    icon: '💎',
    rarity: 'legendary',
    points: 250,
  },
  {
    id: 'investor',
    name: 'Investor',
    description: 'Make your first investment',
    category: 'financial',
    icon: '📈',
    rarity: 'uncommon',
    points: 15,
  },
  {
    id: 'debt-free',
    name: 'Debt Free',
    description: 'Pay off all loans',
    category: 'financial',
    icon: '🎉',
    rarity: 'uncommon',
    points: 20,
  },
  {
    id: 'homeowner',
    name: 'Homeowner',
    description: 'Purchase your first property',
    category: 'financial',
    icon: '🏡',
    rarity: 'uncommon',
    points: 30,
  },

  // Career Achievements
  {
    id: 'first-job',
    name: 'First Job',
    description: 'Get your first job',
    category: 'career',
    icon: '💼',
    rarity: 'common',
    points: 5,
  },
  {
    id: 'career-changer',
    name: 'Career Changer',
    description: 'Work in 5 different jobs',
    category: 'career',
    icon: '🔄',
    rarity: 'uncommon',
    points: 20,
  },
  {
    id: 'long-service',
    name: 'Long Service',
    description: 'Work at the same job for 10 years',
    category: 'career',
    icon: '🏅',
    rarity: 'rare',
    points: 40,
  },
  {
    id: 'six-figure-salary',
    name: 'Six Figure Salary',
    description: 'Earn $100,000+ per year',
    category: 'career',
    icon: '💸',
    rarity: 'rare',
    points: 50,
  },

  // Education Achievements
  {
    id: 'high-school-graduate',
    name: 'High School Graduate',
    description: 'Graduate from high school',
    category: 'education',
    icon: '🎓',
    rarity: 'common',
    points: 10,
  },
  {
    id: 'college-graduate',
    name: 'College Graduate',
    description: 'Earn a college degree',
    category: 'education',
    icon: '🎓',
    rarity: 'uncommon',
    points: 25,
  },
  {
    id: 'masters-degree',
    name: 'Masters Degree',
    description: 'Earn a Masters degree',
    category: 'education',
    icon: '🎯',
    rarity: 'rare',
    points: 40,
  },
  {
    id: 'doctorate',
    name: 'Doctorate',
    description: 'Earn a PhD',
    category: 'education',
    icon: '👨‍🎓',
    rarity: 'epic',
    points: 75,
  },
  {
    id: 'straight-a-student',
    name: 'Straight A Student',
    description: 'Graduate with 4.0 GPA',
    category: 'education',
    icon: '⭐',
    rarity: 'rare',
    points: 50,
  },

  // Relationship Achievements
  {
    id: 'first-friend',
    name: 'First Friend',
    description: 'Make your first friend',
    category: 'relationships',
    icon: '👋',
    rarity: 'common',
    points: 5,
  },
  {
    id: 'social-butterfly',
    name: 'Social Butterfly',
    description: 'Have 10+ friends',
    category: 'relationships',
    icon: '🦋',
    rarity: 'uncommon',
    points: 20,
  },
  {
    id: 'married',
    name: 'Married',
    description: 'Get married',
    category: 'relationships',
    icon: '💍',
    rarity: 'uncommon',
    points: 25,
  },
  {
    id: 'golden-anniversary',
    name: 'Golden Anniversary',
    description: 'Stay married for 50 years',
    category: 'relationships',
    icon: '💛',
    rarity: 'legendary',
    points: 200,
  },
  {
    id: 'parent',
    name: 'Parent',
    description: 'Have your first child',
    category: 'relationships',
    icon: '👶',
    rarity: 'uncommon',
    points: 30,
  },

  // Health Achievements
  {
    id: 'fitness-enthusiast',
    name: 'Fitness Enthusiast',
    description: 'Reach 90+ fitness level',
    category: 'health',
    icon: '💪',
    rarity: 'uncommon',
    points: 20,
  },
  {
    id: 'perfect-health',
    name: 'Perfect Health',
    description: 'Maintain 100 health for 1 year',
    category: 'health',
    icon: '❤️',
    rarity: 'rare',
    points: 40,
  },
  {
    id: 'centenarian',
    name: 'Centenarian',
    description: 'Live to 100 years old',
    category: 'health',
    icon: '🎂',
    rarity: 'legendary',
    points: 300,
  },

  // Lifestyle Achievements
  {
    id: 'world-traveler',
    name: 'World Traveler',
    description: 'Visit 10 countries',
    category: 'lifestyle',
    icon: '✈️',
    rarity: 'rare',
    points: 50,
  },
  {
    id: 'car-owner',
    name: 'Car Owner',
    description: 'Buy your first vehicle',
    category: 'lifestyle',
    icon: '🚗',
    rarity: 'common',
    points: 10,
  },
  {
    id: 'luxury-lifestyle',
    name: 'Luxury Lifestyle',
    description: 'Own a luxury car and mansion',
    category: 'lifestyle',
    icon: '👑',
    rarity: 'epic',
    points: 100,
  },

  // Special Achievements
  {
    id: 'early-retiree',
    name: 'Early Retiree',
    description: 'Retire before age 50',
    category: 'special',
    icon: '🏖️',
    rarity: 'epic',
    points: 150,
  },
  {
    id: 'perfect-credit',
    name: 'Perfect Credit',
    description: 'Achieve 850 credit score',
    category: 'special',
    icon: '⭐',
    rarity: 'rare',
    points: 50,
  },
  {
    id: 'overachiever',
    name: 'Overachiever',
    description: 'Unlock 50 achievements',
    category: 'special',
    icon: '🏆',
    rarity: 'legendary',
    points: 500,
  },
];

export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case 'common':
      return '#9ca3af';
    case 'uncommon':
      return '#10b981';
    case 'rare':
      return '#3b82f6';
    case 'epic':
      return '#8b5cf6';
    case 'legendary':
      return '#f59e0b';
    default:
      return '#6b7280';
  }
}

export function getRarityLabel(rarity: string): string {
  return rarity.charAt(0).toUpperCase() + rarity.slice(1);
}
