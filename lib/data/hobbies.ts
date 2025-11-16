import type { HobbyDefinition, HobbyCategory, Hobby } from '../types';
import { rollDice, checkSuccess } from '../utils/dice-system';
import type { DiceModifier } from '../types';

/**
 * Hobbies system - activities that improve life quality and provide meaning
 * Integrates dice rolling for competitive/performance-based hobbies
 */

export const hobbyDefinitions: HobbyDefinition[] = [
  // Creative Hobbies
  {
    id: 'painting',
    name: 'Painting',
    category: 'creative',
    description: 'Express yourself through art',
    startupCost: 200,
    monthlyCost: 50,
    timePerSession: 3,
    statBenefits: { morale: 5, intellect: 2 },
    skillGained: 'creativity',
    requiresDiceRoll: true, // For exhibitions/competitions
  },
  {
    id: 'music',
    name: 'Playing Music',
    category: 'creative',
    description: 'Learn an instrument',
    startupCost: 500,
    monthlyCost: 30,
    timePerSession: 2,
    statBenefits: { morale: 6, intellect: 3 },
    skillGained: 'music',
    requiresDiceRoll: true, // For performances
  },
  {
    id: 'writing',
    name: 'Creative Writing',
    category: 'creative',
    description: 'Write stories, poetry, or novels',
    startupCost: 50,
    monthlyCost: 10,
    timePerSession: 4,
    statBenefits: { morale: 4, intellect: 5 },
    skillGained: 'writing',
    requiresDiceRoll: true, // For publishing success
  },
  {
    id: 'photography',
    name: 'Photography',
    category: 'creative',
    description: 'Capture the world through a lens',
    startupCost: 800,
    monthlyCost: 40,
    timePerSession: 3,
    statBenefits: { morale: 5, looks: 1 },
    skillGained: 'photography',
    requiresDiceRoll: true, // For contests
  },

  // Physical Hobbies
  {
    id: 'martial-arts',
    name: 'Martial Arts',
    category: 'physical',
    description: 'Train in combat disciplines',
    startupCost: 150,
    monthlyCost: 80,
    timePerSession: 2,
    statBenefits: { health: 6, morale: 3, looks: 2 },
    skillGained: 'self-defense',
    requiresDiceRoll: true, // For sparring/tournaments
  },
  {
    id: 'rock-climbing',
    name: 'Rock Climbing',
    category: 'physical',
    description: 'Scale walls and mountains',
    startupCost: 300,
    monthlyCost: 60,
    timePerSession: 3,
    statBenefits: { health: 7, morale: 5, looks: 3 },
    skillGained: 'climbing',
    requiresDiceRoll: true, // Risk of injury
  },
  {
    id: 'yoga',
    name: 'Yoga',
    category: 'physical',
    description: 'Mindful movement and meditation',
    startupCost: 100,
    monthlyCost: 40,
    timePerSession: 1.5,
    statBenefits: { health: 4, morale: 6, looks: 2 },
    skillGained: 'meditation',
    requiresDiceRoll: false,
  },
  {
    id: 'running',
    name: 'Running',
    category: 'physical',
    description: 'Long-distance running',
    startupCost: 100,
    monthlyCost: 20,
    timePerSession: 1,
    statBenefits: { health: 8, morale: 4, looks: 4 },
    skillGained: 'endurance',
    requiresDiceRoll: true, // For races
  },

  // Intellectual Hobbies
  {
    id: 'chess',
    name: 'Chess',
    category: 'intellectual',
    description: 'Master the game of kings',
    startupCost: 50,
    monthlyCost: 10,
    timePerSession: 2,
    statBenefits: { intellect: 7, morale: 3 },
    skillGained: 'strategy',
    requiresDiceRoll: true, // For matches
  },
  {
    id: 'language-learning',
    name: 'Learning Languages',
    category: 'intellectual',
    description: 'Become multilingual',
    startupCost: 100,
    monthlyCost: 30,
    timePerSession: 2,
    statBenefits: { intellect: 6, morale: 3 },
    skillGained: 'languages',
    requiresDiceRoll: false,
  },
  {
    id: 'astronomy',
    name: 'Astronomy',
    category: 'intellectual',
    description: 'Study the stars',
    startupCost: 600,
    monthlyCost: 20,
    timePerSession: 3,
    statBenefits: { intellect: 5, morale: 5 },
    skillGained: 'science',
    requiresDiceRoll: false,
  },
  {
    id: 'coding',
    name: 'Coding Projects',
    category: 'intellectual',
    description: 'Build software as a hobby',
    startupCost: 200,
    monthlyCost: 15,
    timePerSession: 4,
    statBenefits: { intellect: 8, morale: 2 },
    skillGained: 'programming',
    requiresDiceRoll: true, // For hackathons/competitions
  },

  // Social Hobbies
  {
    id: 'board-games',
    name: 'Board Gaming',
    category: 'social',
    description: 'Play strategic board games with friends',
    startupCost: 150,
    monthlyCost: 40,
    timePerSession: 3,
    statBenefits: { morale: 7, intellect: 3 },
    skillGained: 'social-skills',
    requiresDiceRoll: true, // For tournaments
  },
  {
    id: 'cooking',
    name: 'Gourmet Cooking',
    category: 'social',
    description: 'Master culinary arts',
    startupCost: 300,
    monthlyCost: 100,
    timePerSession: 2,
    statBenefits: { morale: 6, health: 2 },
    skillGained: 'cooking',
    requiresDiceRoll: true, // For competitions
  },
  {
    id: 'dancing',
    name: 'Dancing',
    category: 'social',
    description: 'Learn various dance styles',
    startupCost: 100,
    monthlyCost: 50,
    timePerSession: 2,
    statBenefits: { morale: 7, health: 4, looks: 3 },
    skillGained: 'dancing',
    requiresDiceRoll: true, // For performances/competitions
  },

  // Collecting Hobbies
  {
    id: 'coin-collecting',
    name: 'Coin Collecting',
    category: 'collecting',
    description: 'Build a valuable coin collection',
    startupCost: 200,
    monthlyCost: 150,
    timePerSession: 1,
    statBenefits: { morale: 3, intellect: 2 },
    skillGained: 'appraisal',
    requiresDiceRoll: true, // Finding rare coins
  },
  {
    id: 'vintage-cars',
    name: 'Vintage Car Restoration',
    category: 'collecting',
    description: 'Restore classic automobiles',
    startupCost: 5000,
    monthlyCost: 500,
    timePerSession: 8,
    statBenefits: { morale: 6, intellect: 4 },
    skillGained: 'mechanics',
    requiresDiceRoll: true, // For auctions/shows
  },

  // Gaming Hobbies
  {
    id: 'esports',
    name: 'Competitive Gaming',
    category: 'gaming',
    description: 'Compete in esports tournaments',
    startupCost: 1500,
    monthlyCost: 50,
    timePerSession: 4,
    statBenefits: { morale: 5, intellect: 2 },
    skillGained: 'gaming',
    requiresDiceRoll: true, // For tournaments
  },
  {
    id: 'tabletop-rpg',
    name: 'Tabletop RPGs',
    category: 'gaming',
    description: 'Play D&D and other RPGs',
    startupCost: 100,
    monthlyCost: 30,
    timePerSession: 4,
    statBenefits: { morale: 8, intellect: 3 },
    skillGained: 'storytelling',
    requiresDiceRoll: false, // Already uses dice in-game!
  },
];

/**
 * Practice a hobby and gain mastery
 */
export function practiceHobby(
  hobby: Hobby,
  hoursSpent: number,
  currentStats: { intellect: number; health: number },
  luck: number
): {
  levelGain: number;
  enjoymentChange: number;
  burnout: boolean;
  breakthrough: boolean;
  message: string;
} {
  const hobbyDef = hobbyDefinitions.find((h) => h.id === hobby.id);
  if (!hobbyDef) {
    return { levelGain: 0, enjoymentChange: 0, burnout: false, breakthrough: false, message: '' };
  }

  // Base level gain (diminishes with mastery)
  let baseLevelGain = Math.max(0.5, 10 - hobby.level / 10);
  baseLevelGain *= hoursSpent / hobbyDef.timePerSession;

  // Intelligence/health affects learning rate
  const statBonus = (currentStats.intellect + currentStats.health) / 200;
  baseLevelGain *= 1 + statBonus;

  let levelGain = baseLevelGain;
  let enjoymentChange = 0;
  let burnout = false;
  let breakthrough = false;
  let message = '';

  // Dice roll for breakthrough or setback (if hobby requires dice)
  if (hobbyDef.requiresDiceRoll) {
    const modifiers: DiceModifier[] = [
      { name: 'Mastery', value: Math.floor(hobby.level / 10), source: 'hobby' },
      { name: 'Enjoyment', value: Math.floor(hobby.enjoyment / 20), source: 'hobby' },
    ];

    const roll = rollDice('d20', modifiers, luck);

    if (roll.criticalSuccess) {
      breakthrough = true;
      levelGain *= 2;
      enjoymentChange = 10;
      message = 'BREAKTHROUGH! You had an incredible session and improved significantly!';
    } else if (roll.criticalFailure) {
      levelGain = 0;
      enjoymentChange = -10;
      message = 'Frustrating session. You felt like you made no progress.';
    } else if (roll.modifiedRoll >= 18) {
      levelGain *= 1.5;
      enjoymentChange = 5;
      message = 'Great practice session! You really got into the flow.';
    } else if (roll.modifiedRoll <= 5) {
      levelGain *= 0.5;
      enjoymentChange = -5;
      message = 'Difficult session. Progress was slow.';
    } else {
      message = 'Good practice session.';
    }
  } else {
    message = 'Enjoyable practice session.';
  }

  // Burnout check if practicing too much
  if (hoursSpent > hobbyDef.timePerSession * 2) {
    const burnoutRoll = rollDice('d20', [], luck);
    if (burnoutRoll.baseRoll <= 8) {
      burnout = true;
      enjoymentChange -= 15;
      message = 'You overdid it and feel burned out on this hobby.';
    }
  }

  // Natural enjoyment decay from repetition
  if (!breakthrough) {
    enjoymentChange -= 1;
  }

  return {
    levelGain: Math.round(levelGain * 10) / 10,
    enjoymentChange,
    burnout,
    breakthrough,
    message,
  };
}

/**
 * Compete in hobby competition/tournament
 */
export function competeInHobby(
  hobby: Hobby,
  competitionLevel: 'local' | 'regional' | 'national' | 'international',
  luck: number
): {
  placement: number; // 1st, 2nd, 3rd, etc
  totalCompetitors: number;
  prizeMoney: number;
  fameGain: number;
  message: string;
} {
  const competitionDifficulty = {
    local: 10,
    regional: 15,
    national: 20,
    international: 25,
  };

  const competitors = {
    local: 20,
    regional: 50,
    national: 200,
    international: 500,
  };

  const prizePool = {
    local: 500,
    regional: 2000,
    national: 10000,
    international: 50000,
  };

  const modifiers: DiceModifier[] = [
    { name: 'Mastery', value: Math.floor(hobby.level / 5), source: 'hobby' },
    { name: 'Experience', value: Math.floor(hobby.hoursSpent / 100), source: 'hobby' },
  ];

  const dc = competitionDifficulty[competitionLevel];
  const result = checkSuccess('d20', dc, modifiers, luck);

  let placement: number;
  let prizeMoney = 0;
  let fameGain = 0;
  let message = '';

  const totalCompetitors = competitors[competitionLevel];

  if (result.criticalSuccess) {
    placement = 1; // 1st place!
    prizeMoney = prizePool[competitionLevel];
    fameGain = competitionLevel === 'international' ? 20 : competitionLevel === 'national' ? 10 : 5;
    message = `CHAMPION! You won 1st place at the ${competitionLevel} competition!`;
  } else if (result.margin >= 10) {
    placement = 2; // 2nd place
    prizeMoney = Math.round(prizePool[competitionLevel] * 0.6);
    fameGain = competitionLevel === 'international' ? 12 : competitionLevel === 'national' ? 6 : 3;
    message = `Excellent performance! 2nd place at the ${competitionLevel} level.`;
  } else if (result.margin >= 5) {
    placement = 3; // 3rd place
    prizeMoney = Math.round(prizePool[competitionLevel] * 0.3);
    fameGain = competitionLevel === 'international' ? 8 : competitionLevel === 'national' ? 4 : 2;
    message = `Great job! 3rd place finish.`;
  } else if (result.success) {
    placement = Math.floor(totalCompetitors * 0.2); // Top 20%
    fameGain = 1;
    message = `Solid performance. Finished in the top 20%.`;
  } else if (result.margin >= -5) {
    placement = Math.floor(totalCompetitors * 0.5); // Middle of pack
    message = `Decent showing. Finished middle of the pack.`;
  } else {
    placement = Math.floor(totalCompetitors * 0.8); // Bottom 20%
    message = `Disappointing performance. Didn't place well.`;
  }

  return {
    placement,
    totalCompetitors,
    prizeMoney,
    fameGain,
    message,
  };
}

/**
 * Sell artwork/creation from creative hobby
 */
export function sellCreativeWork(
  hobby: Hobby,
  marketDemand: 'low' | 'medium' | 'high',
  luck: number
): {
  sold: boolean;
  salePrice: number;
  message: string;
} {
  const demandModifier = {
    low: -5,
    medium: 0,
    high: 5,
  };

  const modifiers: DiceModifier[] = [
    { name: 'Mastery', value: Math.floor(hobby.level / 5), source: 'hobby' },
    { name: 'Market', value: demandModifier[marketDemand], source: 'economy' },
  ];

  const result = rollDice('d20', modifiers, luck);

  let sold = result.modifiedRoll >= 10;
  let salePrice = 0;
  let message = '';

  if (sold) {
    // Price based on mastery and roll
    const basePrice = hobby.level * 10;
    const rollMultiplier = 1 + (result.modifiedRoll - 10) / 20;
    salePrice = Math.round(basePrice * rollMultiplier);

    if (result.criticalSuccess) {
      salePrice *= 3;
      message = `Incredible sale! A collector paid top dollar: $${salePrice}`;
    } else if (result.modifiedRoll >= 18) {
      salePrice *= 1.5;
      message = `Great sale! Sold for $${salePrice}`;
    } else {
      message = `Sold your work for $${salePrice}`;
    }
  } else {
    message = 'No buyers interested at this time.';
  }

  return { sold, salePrice, message };
}

/**
 * Get hobby recommendations based on player stats
 */
export function getHobbyRecommendations(
  currentStats: { health: number; morale: number; intellect: number },
  availableMoney: number,
  freeTimeHours: number
): HobbyDefinition[] {
  const recommendations: HobbyDefinition[] = [];

  for (const hobby of hobbyDefinitions) {
    // Can afford startup cost
    if (hobby.startupCost > availableMoney) continue;

    // Has enough free time
    if (hobby.timePerSession > freeTimeHours) continue;

    // Recommend based on needs
    if (currentStats.health < 50 && hobby.statBenefits.health && hobby.statBenefits.health >= 4) {
      recommendations.push(hobby);
    } else if (currentStats.morale < 50 && hobby.statBenefits.morale && hobby.statBenefits.morale >= 5) {
      recommendations.push(hobby);
    } else if (currentStats.intellect < 50 && hobby.statBenefits.intellect && hobby.statBenefits.intellect >= 4) {
      recommendations.push(hobby);
    }
  }

  return recommendations.slice(0, 5); // Top 5 recommendations
}
