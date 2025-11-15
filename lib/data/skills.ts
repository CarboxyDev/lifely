import type { SkillCategory, Training } from '../types';

export interface SkillDefinition {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  usefulFor: string[];
}

export const availableSkills: SkillDefinition[] = [
  // Technical Skills
  {
    id: 'programming',
    name: 'Programming',
    category: 'technical',
    description: 'Ability to write and understand code',
    usefulFor: ['Software Engineer', 'Data Scientist', 'Web Developer'],
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    category: 'technical',
    description: 'Interpret and analyze data',
    usefulFor: ['Data Analyst', 'Business Analyst', 'Researcher'],
  },
  {
    id: 'engineering',
    name: 'Engineering',
    category: 'technical',
    description: 'Design and build systems',
    usefulFor: ['Engineer', 'Architect', 'Designer'],
  },

  // Creative Skills
  {
    id: 'design',
    name: 'Design',
    category: 'creative',
    description: 'Create visual and aesthetic solutions',
    usefulFor: ['Graphic Designer', 'UX Designer', 'Artist'],
  },
  {
    id: 'writing',
    name: 'Writing',
    category: 'creative',
    description: 'Compose clear and engaging text',
    usefulFor: ['Writer', 'Journalist', 'Content Creator'],
  },
  {
    id: 'music',
    name: 'Music',
    category: 'creative',
    description: 'Create and perform music',
    usefulFor: ['Musician', 'Producer', 'Teacher'],
  },

  // Business Skills
  {
    id: 'management',
    name: 'Management',
    category: 'business',
    description: 'Lead and organize teams',
    usefulFor: ['Manager', 'Director', 'Executive'],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    category: 'business',
    description: 'Promote and sell products/services',
    usefulFor: ['Marketing Manager', 'Sales', 'Business Development'],
  },
  {
    id: 'finance',
    name: 'Finance',
    category: 'business',
    description: 'Manage money and investments',
    usefulFor: ['Financial Analyst', 'Accountant', 'Banker'],
  },

  // Social Skills
  {
    id: 'communication',
    name: 'Communication',
    category: 'social',
    description: 'Express ideas effectively',
    usefulFor: ['Sales', 'Teacher', 'Manager'],
  },
  {
    id: 'leadership',
    name: 'Leadership',
    category: 'social',
    description: 'Inspire and guide others',
    usefulFor: ['Manager', 'CEO', 'Team Lead'],
  },
  {
    id: 'negotiation',
    name: 'Negotiation',
    category: 'social',
    description: 'Reach beneficial agreements',
    usefulFor: ['Lawyer', 'Sales', 'Manager'],
  },

  // Physical Skills
  {
    id: 'athletics',
    name: 'Athletics',
    category: 'physical',
    description: 'Physical fitness and sports',
    usefulFor: ['Athlete', 'Coach', 'Personal Trainer'],
  },
  {
    id: 'craftsmanship',
    name: 'Craftsmanship',
    category: 'physical',
    description: 'Create things with your hands',
    usefulFor: ['Carpenter', 'Mechanic', 'Artist'],
  },

  // Academic Skills
  {
    id: 'research',
    name: 'Research',
    category: 'academic',
    description: 'Investigate and discover knowledge',
    usefulFor: ['Scientist', 'Professor', 'Analyst'],
  },
  {
    id: 'teaching',
    name: 'Teaching',
    category: 'academic',
    description: 'Educate and instruct others',
    usefulFor: ['Teacher', 'Professor', 'Trainer'],
  },
];

export const trainingPrograms: Training[] = [
  // Technical Training
  {
    id: 'coding-bootcamp',
    name: 'Coding Bootcamp',
    skillId: 'programming',
    cost: 5000,
    duration: 3,
    experienceGain: 30,
    requirements: { minIntellect: 40 },
  },
  {
    id: 'advanced-programming',
    name: 'Advanced Programming Course',
    skillId: 'programming',
    cost: 8000,
    duration: 6,
    experienceGain: 50,
    requirements: { minLevel: 20, minIntellect: 60 },
  },
  {
    id: 'data-science-course',
    name: 'Data Science Course',
    skillId: 'data-analysis',
    cost: 6000,
    duration: 4,
    experienceGain: 35,
    requirements: { minIntellect: 50 },
  },
  {
    id: 'engineering-workshop',
    name: 'Engineering Workshop',
    skillId: 'engineering',
    cost: 4000,
    duration: 3,
    experienceGain: 25,
    requirements: { minIntellect: 45 },
  },

  // Creative Training
  {
    id: 'design-fundamentals',
    name: 'Design Fundamentals',
    skillId: 'design',
    cost: 3000,
    duration: 2,
    experienceGain: 20,
    requirements: {},
  },
  {
    id: 'advanced-design',
    name: 'Advanced Design Course',
    skillId: 'design',
    cost: 5000,
    duration: 4,
    experienceGain: 40,
    requirements: { minLevel: 15 },
  },
  {
    id: 'creative-writing',
    name: 'Creative Writing Workshop',
    skillId: 'writing',
    cost: 2000,
    duration: 2,
    experienceGain: 25,
    requirements: {},
  },
  {
    id: 'music-lessons',
    name: 'Music Lessons',
    skillId: 'music',
    cost: 1500,
    duration: 3,
    experienceGain: 20,
    requirements: {},
  },

  // Business Training
  {
    id: 'management-training',
    name: 'Management Training',
    skillId: 'management',
    cost: 7000,
    duration: 4,
    experienceGain: 35,
    requirements: { minIntellect: 50 },
  },
  {
    id: 'marketing-course',
    name: 'Marketing Course',
    skillId: 'marketing',
    cost: 4000,
    duration: 3,
    experienceGain: 30,
    requirements: { minIntellect: 40 },
  },
  {
    id: 'finance-certification',
    name: 'Finance Certification',
    skillId: 'finance',
    cost: 6000,
    duration: 5,
    experienceGain: 40,
    requirements: { minIntellect: 55 },
  },

  // Social Training
  {
    id: 'public-speaking',
    name: 'Public Speaking Course',
    skillId: 'communication',
    cost: 1500,
    duration: 1,
    experienceGain: 20,
    requirements: {},
  },
  {
    id: 'leadership-workshop',
    name: 'Leadership Workshop',
    skillId: 'leadership',
    cost: 5000,
    duration: 3,
    experienceGain: 30,
    requirements: { minIntellect: 45 },
  },
  {
    id: 'negotiation-training',
    name: 'Negotiation Training',
    skillId: 'negotiation',
    cost: 3000,
    duration: 2,
    experienceGain: 25,
    requirements: {},
  },

  // Physical Training
  {
    id: 'athletic-training',
    name: 'Athletic Training Program',
    skillId: 'athletics',
    cost: 2000,
    duration: 3,
    experienceGain: 25,
    requirements: {},
  },
  {
    id: 'craftsmanship-apprenticeship',
    name: 'Craftsmanship Apprenticeship',
    skillId: 'craftsmanship',
    cost: 3000,
    duration: 6,
    experienceGain: 40,
    requirements: {},
  },

  // Academic Training
  {
    id: 'research-methods',
    name: 'Research Methods Course',
    skillId: 'research',
    cost: 4000,
    duration: 3,
    experienceGain: 30,
    requirements: { minIntellect: 50 },
  },
  {
    id: 'teaching-certification',
    name: 'Teaching Certification',
    skillId: 'teaching',
    cost: 5000,
    duration: 4,
    experienceGain: 35,
    requirements: { minIntellect: 45 },
  },
];

export function getSkillById(skillId: string): SkillDefinition | undefined {
  return availableSkills.find((s) => s.id === skillId);
}

export function getTrainingForSkill(skillId: string): Training[] {
  return trainingPrograms.filter((t) => t.skillId === skillId);
}

export function getSkillLevel(experience: number): number {
  // Experience to level conversion (0-100)
  return Math.min(100, Math.floor(experience / 10));
}

export function getSkillLevelName(level: number): string {
  if (level >= 90) return 'Master';
  if (level >= 75) return 'Expert';
  if (level >= 60) return 'Advanced';
  if (level >= 40) return 'Intermediate';
  if (level >= 20) return 'Beginner';
  return 'Novice';
}

export function getCategoryColor(category: SkillCategory): string {
  switch (category) {
    case 'technical':
      return '#3b82f6'; // blue
    case 'creative':
      return '#a855f7'; // purple
    case 'business':
      return '#10b981'; // green
    case 'social':
      return '#ec4899'; // pink
    case 'physical':
      return '#f59e0b'; // amber
    case 'academic':
      return '#06b6d4'; // cyan
  }
}
