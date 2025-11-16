/**
 * SKILL TREE SYSTEM
 * Multiple skill trees for deep character progression
 * Skills provide passive bonuses and unlock new abilities
 */

export type SkillTreeType = 'combat' | 'social' | 'mental' | 'financial' | 'health' | 'career';

export interface SkillNode {
  id: string;
  name: string;
  description: string;
  tree: SkillTreeType;
  tier: number; // 1-5, higher tiers are more powerful
  icon: string; // emoji

  // Cost to unlock
  skillPointCost: number;

  // Prerequisites
  requires: {
    skillIds?: string[]; // Must have these skills unlocked
    level?: number; // Character level requirement
    stat?: {
      attribute: 'health' | 'morale' | 'intellect' | 'looks';
      threshold: number;
    };
  };

  // Effects when unlocked
  effects: {
    statModifiers?: {
      health?: number;
      morale?: number;
      intellect?: number;
      looks?: number;
    };
    multipliers?: {
      [key: string]: number; // Matches perk multipliers
    };
    special?: {
      [key: string]: boolean | string | number;
    };
  };
}

/**
 * COMBAT SKILL TREE
 * For physical conflicts, defense, and martial abilities
 */
export const combatSkills: SkillNode[] = [
  // TIER 1
  {
    id: 'basic-defense',
    name: 'Basic Defense',
    description: 'Learn to protect yourself in conflicts',
    tree: 'combat',
    tier: 1,
    icon: '🛡️',
    skillPointCost: 1,
    requires: {},
    effects: {
      multipliers: {
        damageReduction: 1.1,
      },
    },
  },
  {
    id: 'street-fighting',
    name: 'Street Fighting',
    description: 'Brawling basics for self-defense',
    tree: 'combat',
    tier: 1,
    icon: '👊',
    skillPointCost: 1,
    requires: {},
    effects: {
      multipliers: {
        combatSuccess: 1.15,
      },
    },
  },

  // TIER 2
  {
    id: 'boxing',
    name: 'Boxing',
    description: 'Disciplined combat training',
    tree: 'combat',
    tier: 2,
    icon: '🥊',
    skillPointCost: 2,
    requires: {
      skillIds: ['street-fighting'],
    },
    effects: {
      statModifiers: { health: 10 },
      multipliers: {
        combatSuccess: 1.25,
        gymEffectiveness: 1.2,
      },
    },
  },
  {
    id: 'dodge-training',
    name: 'Evasion',
    description: 'Learn to dodge attacks effectively',
    tree: 'combat',
    tier: 2,
    icon: '💨',
    skillPointCost: 2,
    requires: {
      skillIds: ['basic-defense'],
    },
    effects: {
      multipliers: {
        dodgeChance: 1.3,
        accidentAvoidance: 1.2,
      },
    },
  },

  // TIER 3
  {
    id: 'martial-arts',
    name: 'Martial Arts',
    description: 'Master a martial art discipline',
    tree: 'combat',
    tier: 3,
    icon: '🥋',
    skillPointCost: 3,
    requires: {
      skillIds: ['boxing', 'dodge-training'],
    },
    effects: {
      statModifiers: { health: 20, morale: 10 },
      multipliers: {
        combatSuccess: 1.5,
      },
      special: {
        combatMaster: true,
      },
    },
  },

  // TIER 4
  {
    id: 'combat-veteran',
    name: 'Combat Veteran',
    description: 'Years of experience make you formidable',
    tree: 'combat',
    tier: 4,
    icon: '⚔️',
    skillPointCost: 4,
    requires: {
      skillIds: ['martial-arts'],
    },
    effects: {
      statModifiers: { health: 30 },
      multipliers: {
        combatSuccess: 1.75,
        intimidation: 1.5,
      },
    },
  },

  // TIER 5
  {
    id: 'combat-legend',
    name: 'Legend',
    description: 'Your combat prowess is legendary',
    tree: 'combat',
    tier: 5,
    icon: '👑',
    skillPointCost: 5,
    requires: {
      skillIds: ['combat-veteran'],
      stat: { attribute: 'health', threshold: 90 },
    },
    effects: {
      statModifiers: { health: 50, morale: 20 },
      multipliers: {
        combatSuccess: 2.0,
      },
      special: {
        legendaryFighter: true,
      },
    },
  },
];

/**
 * SOCIAL SKILL TREE
 * For relationships, persuasion, and social success
 */
export const socialSkills: SkillNode[] = [
  // TIER 1
  {
    id: 'small-talk',
    name: 'Small Talk',
    description: 'Master casual conversation',
    tree: 'social',
    tier: 1,
    icon: '💬',
    skillPointCost: 1,
    requires: {},
    effects: {
      multipliers: {
        socialSuccess: 1.1,
      },
    },
  },
  {
    id: 'first-impressions',
    name: 'First Impressions',
    description: 'Make great first impressions',
    tree: 'social',
    tier: 1,
    icon: '🤝',
    skillPointCost: 1,
    requires: {},
    effects: {
      multipliers: {
        firstImpressions: 1.3,
      },
    },
  },

  // TIER 2
  {
    id: 'active-listening',
    name: 'Active Listening',
    description: 'People feel heard and understood',
    tree: 'social',
    tier: 2,
    icon: '👂',
    skillPointCost: 2,
    requires: {
      skillIds: ['small-talk'],
    },
    effects: {
      statModifiers: { morale: 10 },
      multipliers: {
        relationshipGain: 1.3,
      },
    },
  },
  {
    id: 'persuasion',
    name: 'Persuasion',
    description: 'Convince others to see your point',
    tree: 'social',
    tier: 2,
    icon: '🗣️',
    skillPointCost: 2,
    requires: {
      skillIds: ['first-impressions'],
    },
    effects: {
      multipliers: {
        negotiationBonus: 1.25,
        persuasionSuccess: 1.3,
      },
    },
  },

  // TIER 3
  {
    id: 'charisma',
    name: 'Charisma',
    description: 'Natural magnetic personality',
    tree: 'social',
    tier: 3,
    icon: '✨',
    skillPointCost: 3,
    requires: {
      skillIds: ['active-listening', 'persuasion'],
    },
    effects: {
      statModifiers: { looks: 15, morale: 15 },
      multipliers: {
        socialSuccess: 1.5,
        charismaBonus: 1.4,
      },
    },
  },

  // TIER 4
  {
    id: 'master-manipulator',
    name: 'Master Manipulator',
    description: 'Bend others to your will (morally gray)',
    tree: 'social',
    tier: 4,
    icon: '🎭',
    skillPointCost: 4,
    requires: {
      skillIds: ['charisma'],
    },
    effects: {
      multipliers: {
        persuasionSuccess: 1.75,
        manipulation: 1.8,
      },
      special: {
        masterManipulator: true,
      },
    },
  },

  // TIER 5
  {
    id: 'social-genius',
    name: 'Social Genius',
    description: 'Understand and influence anyone',
    tree: 'social',
    tier: 5,
    icon: '🧠',
    skillPointCost: 5,
    requires: {
      skillIds: ['master-manipulator'],
      stat: { attribute: 'looks', threshold: 85 },
    },
    effects: {
      statModifiers: { morale: 30 },
      multipliers: {
        socialSuccess: 2.0,
        leadershipBonus: 1.5,
      },
      special: {
        socialGenius: true,
      },
    },
  },
];

/**
 * MENTAL SKILL TREE
 * For learning, problem-solving, and intellectual pursuits
 */
export const mentalSkills: SkillNode[] = [
  // TIER 1
  {
    id: 'speed-reading',
    name: 'Speed Reading',
    description: 'Read faster and retain more',
    tree: 'mental',
    tier: 1,
    icon: '📖',
    skillPointCost: 1,
    requires: {},
    effects: {
      multipliers: {
        learningSpeed: 1.15,
      },
    },
  },
  {
    id: 'critical-thinking',
    name: 'Critical Thinking',
    description: 'Analyze situations logically',
    tree: 'mental',
    tier: 1,
    icon: '🤔',
    skillPointCost: 1,
    requires: {},
    effects: {
      statModifiers: { intellect: 5 },
      multipliers: {
        problemSolving: 1.2,
      },
    },
  },

  // TIER 2
  {
    id: 'memory-techniques',
    name: 'Memory Palace',
    description: 'Advanced memory techniques',
    tree: 'mental',
    tier: 2,
    icon: '🧠',
    skillPointCost: 2,
    requires: {
      skillIds: ['speed-reading'],
    },
    effects: {
      statModifiers: { intellect: 10 },
      multipliers: {
        memoryRetention: 1.4,
        skillRetention: 1.3,
      },
    },
  },
  {
    id: 'strategic-thinking',
    name: 'Strategic Thinking',
    description: 'Plan ahead and anticipate outcomes',
    tree: 'mental',
    tier: 2,
    icon: '♟️',
    skillPointCost: 2,
    requires: {
      skillIds: ['critical-thinking'],
    },
    effects: {
      multipliers: {
        decisionQuality: 1.3,
        businessSuccess: 1.2,
      },
    },
  },

  // TIER 3
  {
    id: 'genius-intellect',
    name: 'Genius Intellect',
    description: 'Exceptional mental capacity',
    tree: 'mental',
    tier: 3,
    icon: '🎓',
    skillPointCost: 3,
    requires: {
      skillIds: ['memory-techniques', 'strategic-thinking'],
    },
    effects: {
      statModifiers: { intellect: 25 },
      multipliers: {
        learningSpeed: 1.5,
      },
    },
  },

  // TIER 4
  {
    id: 'polymath',
    name: 'Polymath',
    description: 'Master of many subjects',
    tree: 'mental',
    tier: 4,
    icon: '🌟',
    skillPointCost: 4,
    requires: {
      skillIds: ['genius-intellect'],
    },
    effects: {
      statModifiers: { intellect: 35 },
      multipliers: {
        skillGain: 1.5,
        careerSuccess: 1.3,
      },
    },
  },

  // TIER 5
  {
    id: 'transcendent-mind',
    name: 'Transcendent Mind',
    description: 'Your intellect knows no bounds',
    tree: 'mental',
    tier: 5,
    icon: '🌌',
    skillPointCost: 5,
    requires: {
      skillIds: ['polymath'],
      stat: { attribute: 'intellect', threshold: 95 },
    },
    effects: {
      statModifiers: { intellect: 50, morale: 20 },
      multipliers: {
        learningSpeed: 2.0,
      },
      special: {
        transcendentMind: true,
      },
    },
  },
];

/**
 * FINANCIAL SKILL TREE
 * For wealth building, investing, and business
 */
export const financialSkills: SkillNode[] = [
  // TIER 1
  {
    id: 'budgeting',
    name: 'Budgeting',
    description: 'Track and manage your spending',
    tree: 'financial',
    tier: 1,
    icon: '💵',
    skillPointCost: 1,
    requires: {},
    effects: {
      multipliers: {
        expenseReduction: 0.9,
      },
    },
  },
  {
    id: 'saving',
    name: 'Saving Habits',
    description: 'Build wealth through saving',
    tree: 'financial',
    tier: 1,
    icon: '🏦',
    skillPointCost: 1,
    requires: {},
    effects: {
      multipliers: {
        savingsGain: 1.2,
      },
    },
  },

  // TIER 2
  {
    id: 'investing-basics',
    name: 'Basic Investing',
    description: 'Learn to invest in stocks and bonds',
    tree: 'financial',
    tier: 2,
    icon: '📈',
    skillPointCost: 2,
    requires: {
      skillIds: ['saving'],
    },
    effects: {
      multipliers: {
        investmentReturns: 1.2,
      },
    },
  },
  {
    id: 'negotiation',
    name: 'Negotiation',
    description: 'Get better deals everywhere',
    tree: 'financial',
    tier: 2,
    icon: '🤝',
    skillPointCost: 2,
    requires: {
      skillIds: ['budgeting'],
    },
    effects: {
      multipliers: {
        negotiationBonus: 1.3,
        salaryMultiplier: 1.1,
      },
    },
  },

  // TIER 3
  {
    id: 'advanced-investing',
    name: 'Advanced Investing',
    description: 'Master complex investment strategies',
    tree: 'financial',
    tier: 3,
    icon: '💎',
    skillPointCost: 3,
    requires: {
      skillIds: ['investing-basics', 'negotiation'],
    },
    effects: {
      multipliers: {
        investmentReturns: 1.5,
        passiveIncomeBonus: 1.3,
      },
    },
  },

  // TIER 4
  {
    id: 'business-tycoon',
    name: 'Business Tycoon',
    description: 'Build and manage successful businesses',
    tree: 'financial',
    tier: 4,
    icon: '🏢',
    skillPointCost: 4,
    requires: {
      skillIds: ['advanced-investing'],
    },
    effects: {
      multipliers: {
        businessSuccess: 1.75,
        entrepreneurshipBonus: 1.5,
      },
      special: {
        canStartBusiness: true,
      },
    },
  },

  // TIER 5
  {
    id: 'wealth-empire',
    name: 'Wealth Empire',
    description: 'Build a financial dynasty',
    tree: 'financial',
    tier: 5,
    icon: '👑',
    skillPointCost: 5,
    requires: {
      skillIds: ['business-tycoon'],
    },
    effects: {
      multipliers: {
        passiveIncomeBonus: 2.0,
        wealthMultiplier: 1.5,
      },
      special: {
        wealthEmpire: true,
      },
    },
  },
];

/**
 * ALL SKILL TREES
 */
export const allSkillNodes: SkillNode[] = [
  ...combatSkills,
  ...socialSkills,
  ...mentalSkills,
  ...financialSkills,
];

/**
 * Get skills by tree
 */
export function getSkillsByTree(tree: SkillTreeType): SkillNode[] {
  return allSkillNodes.filter(skill => skill.tree === tree);
}

/**
 * Get skill by ID
 */
export function getSkillById(id: string): SkillNode | undefined {
  return allSkillNodes.filter(skill => skill.id === id)[0];
}

/**
 * Check if player meets skill requirements
 */
export function meetsSkillRequirements(
  skill: SkillNode,
  playerData: {
    unlockedSkills: string[];
    level: number;
    health: number;
    morale: number;
    intellect: number;
    looks: number;
  }
): boolean {
  // Check skill prerequisites
  if (skill.requires.skillIds) {
    const hasAllPrereqs = skill.requires.skillIds.every(reqId =>
      playerData.unlockedSkills.includes(reqId)
    );
    if (!hasAllPrereqs) return false;
  }

  // Check level requirement
  if (skill.requires.level && playerData.level < skill.requires.level) {
    return false;
  }

  // Check stat requirement
  if (skill.requires.stat) {
    const statValue = playerData[skill.requires.stat.attribute];
    if (statValue < skill.requires.stat.threshold) {
      return false;
    }
  }

  return true;
}
