import type {
  FameLevel,
  ReputationType,
  MediaType,
  ScandalType,
  MediaAppearance,
  Endorsement,
  PublicScandal,
  Award,
  DiceModifier,
} from '../types';
import { rollDice, checkSuccess } from '../utils/dice-system';
import { randint } from '../utils/game-utils';

/**
 * Reputation and fame system - celebrity status, public recognition, media coverage
 */

export interface FameLevelThresholds {
  level: FameLevel;
  minPoints: number;
  recognitionRate: number; // % chance recognized in public
  paparazziLevel: number; // 0-10
  description: string;
  benefits: string[];
  drawbacks: string[];
}

export const fameLevels: FameLevelThresholds[] = [
  {
    level: 'unknown',
    minPoints: 0,
    recognitionRate: 0,
    paparazziLevel: 0,
    description: 'Nobody knows who you are',
    benefits: ['Privacy', 'Normal life'],
    drawbacks: ['No influence', 'No perks'],
  },
  {
    level: 'local-celebrity',
    minPoints: 50,
    recognitionRate: 15,
    paparazziLevel: 1,
    description: 'Known in your local community',
    benefits: ['Free coffee sometimes', 'Local influence'],
    drawbacks: ['Occasionally recognized', 'Local gossip'],
  },
  {
    level: 'regional',
    minPoints: 150,
    recognitionRate: 30,
    paparazziLevel: 2,
    description: 'Known across your region/state',
    benefits: ['VIP treatment', 'Local media attention', 'Small endorsements'],
    drawbacks: ['Privacy concerns', 'Public scrutiny'],
  },
  {
    level: 'national',
    minPoints: 400,
    recognitionRate: 60,
    paparazziLevel: 5,
    description: 'Famous nationwide',
    benefits: ['Major endorsements', 'Red carpet events', 'First class treatment'],
    drawbacks: ['Constant paparazzi', 'Scandal risk', 'Fake friends'],
  },
  {
    level: 'international',
    minPoints: 800,
    recognitionRate: 80,
    paparazziLevel: 8,
    description: 'World-famous celebrity',
    benefits: ['Massive endorsements', 'Global influence', 'Elite access'],
    drawbacks: ['No privacy', 'Security threats', 'Intense pressure'],
  },
  {
    level: 'superstar',
    minPoints: 1500,
    recognitionRate: 95,
    paparazziLevel: 10,
    description: 'A-list celebrity',
    benefits: ['Multi-million endorsements', 'Cultural icon', 'Unlimited opportunities'],
    drawbacks: ['Zero privacy', 'Bodyguards required', 'Constant media attention'],
  },
  {
    level: 'icon',
    minPoints: 3000,
    recognitionRate: 100,
    paparazziLevel: 10,
    description: 'Living legend',
    benefits: ['Legendary status', 'Historical significance', 'Immortal legacy'],
    drawbacks: ['Every move scrutinized', 'Impossible expectations', 'Target for controversy'],
  },
];

/**
 * Calculate fame level from points
 */
export function calculateFameLevel(famePoints: number): FameLevelThresholds {
  const levels = [...fameLevels].reverse();
  for (const level of levels) {
    if (famePoints >= level.minPoints) {
      return level;
    }
  }
  return fameLevels[0]; // unknown
}

/**
 * Ways to gain fame
 */
export function gainFameFrom(
  source:
    | 'career-achievement'
    | 'social-media-viral'
    | 'scandal'
    | 'award'
    | 'media-appearance'
    | 'political-office'
    | 'sports'
    | 'business-success'
    | 'heroic-act'
    | 'artistic-work',
  magnitude: 'small' | 'medium' | 'large' | 'massive',
  luck: number
): {
  fameGained: number;
  reputationChange: number;
  message: string;
} {
  const baseFameByMagnitude = {
    small: 10,
    medium: 30,
    large: 100,
    massive: 300,
  };

  const sourceMultiplier: Record<typeof source, number> = {
    'career-achievement': 1.0,
    'social-media-viral': 1.5,
    scandal: 1.2,
    award: 1.3,
    'media-appearance': 0.8,
    'political-office': 1.4,
    sports: 1.6,
    'business-success': 1.1,
    'heroic-act': 1.7,
    'artistic-work': 1.2,
  };

  const reputationImpact: Record<typeof source, number> = {
    'career-achievement': 15,
    'social-media-viral': 5,
    scandal: -20,
    award: 25,
    'media-appearance': 10,
    'political-office': 20,
    sports: 18,
    'business-success': 12,
    'heroic-act': 30,
    'artistic-work': 15,
  };

  // Dice roll for bonus fame
  const roll = rollDice('d20', [], luck);
  const bonusMultiplier = roll.criticalSuccess ? 2.0 : roll.criticalFailure ? 0.5 : 1.0;

  const baseFame = baseFameByMagnitude[magnitude];
  const fameGained = Math.round(baseFame * sourceMultiplier[source] * bonusMultiplier);
  const reputationChange = Math.round(reputationImpact[source] * (magnitude === 'massive' ? 2 : magnitude === 'large' ? 1.5 : 1));

  const messages: Record<typeof source, string> = {
    'career-achievement': `Career achievement gained ${fameGained} fame!`,
    'social-media-viral': `Went viral! ${fameGained} fame gained.`,
    scandal: `Scandal! Notorious fame +${fameGained}, but reputation suffers.`,
    award: `Award win! +${fameGained} fame and great reputation boost.`,
    'media-appearance': `Media appearance gained ${fameGained} fame.`,
    'political-office': `Political office gained ${fameGained} fame and recognition.`,
    sports: `Sports achievement! +${fameGained} fame.`,
    'business-success': `Business success brought ${fameGained} fame.`,
    'heroic-act': `Heroic act! Major fame (+${fameGained}) and reputation boost!`,
    'artistic-work': `Artistic achievement gained ${fameGained} fame.`,
  };

  return {
    fameGained,
    reputationChange,
    message: messages[source],
  };
}

/**
 * Media appearance offer based on fame level
 */
export function getMediaAppearanceOffer(
  fameLevel: FameLevel,
  currentFame: number,
  reputation: number,
  luck: number
): {
  hasOffer: boolean;
  mediaType: MediaType | null;
  outlet: string;
  topic: string;
  payment: number;
  reach: number;
} {
  // Higher fame = more offers
  const offerChance: Record<FameLevel, number> = {
    unknown: 1,
    'local-celebrity': 10,
    regional: 25,
    national: 50,
    international: 70,
    superstar: 85,
    icon: 95,
  };

  const roll = rollDice('d100', [], luck);
  if (roll.modifiedRoll > offerChance[fameLevel]) {
    return {
      hasOffer: false,
      mediaType: null,
      outlet: '',
      topic: '',
      payment: 0,
      reach: 0,
    };
  }

  // Determine media type based on fame level
  const mediaTypes: MediaType[] = ['news', 'magazine', 'tv', 'radio', 'podcast'];
  if (fameLevel === 'national' || fameLevel === 'international' || fameLevel === 'superstar' || fameLevel === 'icon') {
    mediaTypes.push('documentary');
  }
  if (fameLevel === 'icon' || fameLevel === 'superstar') {
    mediaTypes.push('biography');
  }

  const mediaType = mediaTypes[randint(0, mediaTypes.length - 1)];

  const outlets: Record<MediaType, string[]> = {
    news: ['CNN', 'BBC', 'Fox News', 'Local News', 'Reuters'],
    magazine: ['Time', 'People', 'Vogue', 'GQ', 'Rolling Stone', 'Vanity Fair'],
    tv: ['The Tonight Show', 'Good Morning America', 'Ellen', 'Late Night', '60 Minutes'],
    radio: ['NPR', 'Local Radio', 'BBC Radio', 'Sirius XM'],
    podcast: ['Joe Rogan Experience', 'How Did This Get Made', 'Serial', 'Popular Podcast'],
    documentary: ['Netflix', 'HBO', 'National Geographic', 'Discovery'],
    biography: ['Biography Channel', 'E! True Hollywood Story'],
  };

  const outlet = outlets[mediaType][randint(0, outlets[mediaType].length - 1)];

  const topics = [
    'Your life story',
    'Recent achievements',
    'Career journey',
    'Personal philosophy',
    'Upcoming projects',
    'Industry insights',
    'Charity work',
    'Controversial topic',
    'Success secrets',
    'Future plans',
  ];

  const topic = topics[randint(0, topics.length - 1)];

  // Payment based on fame and media type
  const basePayment: Record<MediaType, number> = {
    news: 1000,
    magazine: 5000,
    tv: 25000,
    radio: 2000,
    podcast: 3000,
    documentary: 100000,
    biography: 500000,
  };

  const fameMult = Math.max(1, currentFame / 100);
  const repMult = Math.max(0.5, 1 + reputation / 200);
  const payment = Math.round(basePayment[mediaType] * fameMult * repMult);

  // Reach based on outlet and fame
  const baseReach: Record<MediaType, number> = {
    news: 100000,
    magazine: 500000,
    tv: 5000000,
    radio: 50000,
    podcast: 200000,
    documentary: 10000000,
    biography: 20000000,
  };

  const reach = Math.round(baseReach[mediaType] * (0.5 + fameMult / 10));

  return {
    hasOffer: true,
    mediaType,
    outlet,
    topic,
    payment,
    reach,
  };
}

/**
 * Endorsement deal offer
 */
export function getEndorsementOffer(
  fameLevel: FameLevel,
  famePoints: number,
  reputation: number,
  niche: string // Industry/specialty
): {
  hasOffer: boolean;
  brand: string;
  category: string;
  annualPay: number;
  duration: number; // months
  fameRequired: number;
} {
  if (famePoints < 100) {
    return {
      hasOffer: false,
      brand: '',
      category: '',
      annualPay: 0,
      duration: 0,
      fameRequired: 100,
    };
  }

  const brands = [
    { name: 'Nike', category: 'Sports', basePay: 500000, fameReq: 400 },
    { name: 'Coca-Cola', category: 'Beverage', basePay: 1000000, fameReq: 600 },
    { name: 'Apple', category: 'Tech', basePay: 2000000, fameReq: 800 },
    { name: 'Rolex', category: 'Luxury', basePay: 1500000, fameReq: 700 },
    { name: 'BMW', category: 'Auto', basePay: 800000, fameReq: 500 },
    { name: 'Adidas', category: 'Sports', basePay: 400000, fameReq: 350 },
    { name: 'Samsung', category: 'Tech', basePay: 750000, fameReq: 450 },
    { name: 'Pepsi', category: 'Beverage', basePay: 600000, fameReq: 400 },
    { name: 'Calvin Klein', category: 'Fashion', basePay: 900000, fameReq: 550 },
    { name: 'L\'Oréal', category: 'Beauty', basePay: 700000, fameReq: 500 },
  ];

  // Filter brands by fame requirement
  const eligible = brands.filter((b) => famePoints >= b.fameReq);

  if (eligible.length === 0) {
    const minRequired = Math.min(...brands.map((b) => b.fameReq));
    return {
      hasOffer: false,
      brand: '',
      category: '',
      annualPay: 0,
      duration: 0,
      fameRequired: minRequired,
    };
  }

  const brand = eligible[randint(0, eligible.length - 1)];

  // Reputation multiplier
  const repMult = Math.max(0.5, 1 + reputation / 150);
  const annualPay = Math.round(brand.basePay * repMult);
  const duration = randint(12, 36); // 1-3 years

  return {
    hasOffer: true,
    brand: brand.name,
    category: brand.category,
    annualPay,
    duration,
    fameRequired: brand.fameReq,
  };
}

/**
 * Random scandal generation (dice-based)
 */
export function checkForScandal(
  fameLevel: FameLevel,
  reputation: number,
  karma: number,
  hasPublicist: boolean,
  luck: number
): {
  scandalOccurs: boolean;
  scandal: Omit<PublicScandal, 'id'> | null;
} {
  // Higher fame = higher scandal risk
  const fameRisk: Record<FameLevel, number> = {
    unknown: 0,
    'local-celebrity': 2,
    regional: 5,
    national: 12,
    international: 18,
    superstar: 25,
    icon: 30,
  };

  const baseRisk = fameRisk[fameLevel];

  const modifiers: DiceModifier[] = [];

  // Good reputation reduces risk
  if (reputation > 50) {
    modifiers.push({ name: 'Good Reputation', value: Math.floor(reputation / 20), source: 'reputation' });
  }

  // Bad karma increases risk
  if (karma < 30) {
    modifiers.push({ name: 'Bad Karma', value: -Math.floor((30 - karma) / 10), source: 'character' });
  }

  // Publicist helps manage scandals
  if (hasPublicist) {
    modifiers.push({ name: 'Publicist', value: 5, source: 'professional' });
  }

  const roll = rollDice('d100', modifiers, luck);

  if (roll.modifiedRoll > baseRisk) {
    return { scandalOccurs: false, scandal: null };
  }

  // Scandal occurs - determine type and severity
  const types: ScandalType[] = ['personal', 'professional', 'legal', 'financial', 'relationship', 'health'];
  const type = types[randint(0, types.length - 1)];

  const severityRoll = rollDice('d10', [], luck);
  const severity = severityRoll.modifiedRoll;

  const descriptions: Record<ScandalType, string[]> = {
    personal: ['Caught in compromising situation', 'Private photos leaked', 'Secret revealed', 'Inappropriate behavior'],
    professional: ['Plagiarism accusations', 'Contract dispute', 'Fired from project', 'Ethics violation'],
    legal: ['Lawsuit filed', 'Arrest', 'Court case', 'Legal troubles'],
    financial: ['Tax issues', 'Bankruptcy rumors', 'Fraud allegations', 'Money scandal'],
    relationship: ['Affair exposed', 'Messy breakup', 'Family drama', 'Relationship scandal'],
    health: ['Substance abuse rumors', 'Health crisis', 'Rehabilitation', 'Mental health issues'],
  };

  const description = descriptions[type][randint(0, descriptions[type].length - 1)];

  const fameImpact = -(severity * 5); // Negative impact
  const publicityGained = severity * 10; // Even bad press is press

  return {
    scandalOccurs: true,
    scandal: {
      type,
      severity,
      occurredAge: 0, // Set by caller
      description,
      fameImpact,
      publicityGained,
      resolved: false,
    },
  };
}

/**
 * Award nomination and winning (dice-based)
 */
export function awardNomination(
  field: string, // career field
  achievements: number, // career achievements
  fameLevel: FameLevel,
  reputation: number,
  luck: number
): {
  nominated: boolean;
  won: boolean;
  award: Omit<Award, 'id' | 'receivedAge'> | null;
} {
  // Need minimum fame for award consideration
  if (fameLevel === 'unknown' || fameLevel === 'local-celebrity') {
    return { nominated: false, won: false, award: null };
  }

  const modifiers: DiceModifier[] = [
    { name: 'Achievements', value: Math.floor(achievements / 5), source: 'career' },
    { name: 'Reputation', value: Math.floor(reputation / 25), source: 'reputation' },
  ];

  const nominationResult = checkSuccess('d20', 14, modifiers, luck);

  if (!nominationResult.success) {
    return { nominated: false, won: false, award: null };
  }

  // Nominated! Now check if won
  const winResult = checkSuccess('d20', 17, modifiers, luck);

  const awards = [
    { name: 'Academy Award', category: 'Entertainment', prestige: 100, fameGain: 200 },
    { name: 'Grammy Award', category: 'Music', prestige: 95, fameGain: 180 },
    { name: 'Nobel Prize', category: 'Science/Peace', prestige: 100, fameGain: 250 },
    { name: 'Olympic Gold Medal', category: 'Sports', prestige: 100, fameGain: 220 },
    { name: 'Pulitzer Prize', category: 'Literature/Journalism', prestige: 90, fameGain: 150 },
    { name: 'Emmy Award', category: 'Television', prestige: 85, fameGain: 140 },
    { name: 'Tony Award', category: 'Theater', prestige: 80, fameGain: 120 },
    { name: 'Golden Globe', category: 'Film/TV', prestige: 85, fameGain: 160 },
    { name: 'Humanitarian Award', category: 'Charity', prestige: 75, fameGain: 100 },
    { name: 'Lifetime Achievement', category: 'Career', prestige: 95, fameGain: 180 },
  ];

  const award = awards[randint(0, awards.length - 1)];

  return {
    nominated: true,
    won: winResult.success,
    award: {
      name: award.name,
      category: award.category,
      prestige: award.prestige,
      fameGained: award.fameGain,
    },
  };
}

/**
 * Public recognition event (benefits and drawbacks)
 */
export function publicRecognitionEvent(
  fameLevel: FameLevel,
  recognitionRate: number,
  luck: number
): {
  recognized: boolean;
  eventType: 'positive' | 'negative' | 'neutral';
  description: string;
  impact: string;
} {
  const roll = rollDice('d100', [], luck);

  if (roll.modifiedRoll > recognitionRate) {
    return {
      recognized: false,
      eventType: 'neutral',
      description: '',
      impact: '',
    };
  }

  // Recognized!
  const eventTypeRoll = randint(1, 100);
  let eventType: 'positive' | 'negative' | 'neutral';

  if (eventTypeRoll > 75) {
    eventType = 'negative';
  } else if (eventTypeRoll > 25) {
    eventType = 'positive';
  } else {
    eventType = 'neutral';
  }

  const events = {
    positive: [
      {
        description: 'Fan asked for autograph - made their day',
        impact: 'Morale +5, Good feeling',
      },
      {
        description: 'Restaurant gave you free meal',
        impact: 'Free meal worth $100',
      },
      {
        description: 'Upgraded to first class for free',
        impact: 'VIP treatment',
      },
      {
        description: 'Fan gave you heartfelt thank you letter',
        impact: 'Morale +10, Wholesome moment',
      },
    ],
    negative: [
      {
        description: 'Paparazzi ambushed you, intrusive photos taken',
        impact: 'Morale -10, Privacy invasion',
      },
      {
        description: 'Heckler yelled insults in public',
        impact: 'Morale -5, Embarrassing',
      },
      {
        description: 'Stalker followed you home',
        impact: 'Morale -15, Security concern',
      },
      {
        description: 'Forced to leave restaurant due to crowd',
        impact: 'Inconvenience, Morale -8',
      },
    ],
    neutral: [
      {
        description: 'Someone recognized you, nodded politely',
        impact: 'Neutral interaction',
      },
      {
        description: 'Asked for photo, obliged quickly',
        impact: 'Brief fan interaction',
      },
    ],
  };

  const event = events[eventType][randint(0, events[eventType].length - 1)];

  return {
    recognized: true,
    eventType,
    description: event.description,
    impact: event.impact,
  };
}

/**
 * Calculate reputation type based on fame and reputation score
 */
export function calculateReputationType(reputation: number, scandals: number): ReputationType {
  if (scandals >= 3) return 'controversial';
  if (reputation >= 50) return 'positive';
  if (reputation <= -30) return 'negative';
  return 'neutral';
}

/**
 * Generate public perception description
 */
export function generatePublicPerception(
  fameLevel: FameLevel,
  reputation: number,
  reputationType: ReputationType,
  scandals: number
): string {
  if (fameLevel === 'unknown') {
    return 'Nobody knows who you are.';
  }

  const perceptions: Record<ReputationType, string[]> = {
    positive: [
      'Beloved public figure',
      'Role model and inspiration',
      'Respected and admired',
      'Fan favorite',
      'National treasure',
    ],
    negative: [
      'Controversial figure',
      'Widely criticized',
      'Polarizing personality',
      'Fallen from grace',
      'Scandal-ridden',
    ],
    controversial: [
      'Love them or hate them',
      'Constantly in tabloids',
      'Provocative public figure',
      'Divided public opinion',
      'Drama magnet',
    ],
    neutral: [
      'Known but unremarkable',
      'Fading relevance',
      'Middle-of-the-road celebrity',
      'Decent reputation',
      'Moderately popular',
    ],
  };

  const basePerception = perceptions[reputationType][randint(0, perceptions[reputationType].length - 1)];

  if (scandals > 5) {
    return `${basePerception} - plagued by scandals`;
  }

  return basePerception;
}
