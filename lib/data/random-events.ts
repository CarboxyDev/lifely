import type {
  EventCategory,
  EventSeverity,
  EventFrequency,
  RandomLifeEvent,
  EventChoice,
  DiceModifier,
} from '../types';
import { rollDice, checkSuccess } from '../utils/dice-system';
import { randint } from '../utils/game-utils';

/**
 * Random life events system - unexpected occurrences that add variety to gameplay
 */

export interface EventTemplate {
  category: EventCategory;
  severity: EventSeverity;
  frequency: EventFrequency;
  title: string;
  description: string;
  effects: RandomLifeEvent['effects'];
  choices?: Omit<EventChoice, 'id'>[];
  requirements?: {
    minAge?: number; // months
    maxAge?: number;
    minWealth?: number;
    minFame?: number;
    hasJob?: boolean;
    hasSpouse?: boolean;
  };
}

/**
 * Massive library of random events
 */
export const eventTemplates: EventTemplate[] = [
  // === FORTUNE EVENTS ===
  {
    category: 'fortune',
    severity: 'minor',
    frequency: 'common',
    title: 'Found Money',
    description: 'You found a $20 bill on the sidewalk.',
    effects: { money: 20, morale: 5 },
  },
  {
    category: 'fortune',
    severity: 'moderate',
    frequency: 'uncommon',
    title: 'Lottery Scratcher Win',
    description: 'You won $500 on a scratch-off lottery ticket!',
    effects: { money: 500, morale: 15, karma: -2 },
  },
  {
    category: 'fortune',
    severity: 'major',
    frequency: 'rare',
    title: 'Unexpected Inheritance',
    description: 'A distant relative you barely knew left you $25,000 in their will.',
    effects: { money: 25000, morale: 20 },
  },
  {
    category: 'fortune',
    severity: 'life-changing',
    frequency: 'very-rare',
    title: 'Lottery Jackpot',
    description: 'YOU WON THE LOTTERY! $10 MILLION jackpot!',
    effects: { money: 10000000, morale: 50, fame: 100 },
  },

  // === MISFORTUNE EVENTS ===
  {
    category: 'misfortune',
    severity: 'minor',
    frequency: 'common',
    title: 'Parking Ticket',
    description: 'You got a parking ticket.',
    effects: { money: -75, morale: -5 },
  },
  {
    category: 'misfortune',
    severity: 'moderate',
    frequency: 'uncommon',
    title: 'Phone Broken',
    description: 'You dropped your phone and shattered the screen.',
    effects: { money: -400, morale: -15 },
  },
  {
    category: 'misfortune',
    severity: 'major',
    frequency: 'rare',
    title: 'Identity Theft',
    description: 'Your identity was stolen. Credit cards maxed out, accounts drained.',
    effects: { money: -8000, morale: -30, health: -10 },
  },
  {
    category: 'misfortune',
    severity: 'catastrophic',
    frequency: 'very-rare',
    title: 'Ponzi Scheme Victim',
    description: 'You invested in what turned out to be a massive Ponzi scheme. Lost everything.',
    effects: { money: -100000, morale: -50, health: -20 },
  },

  // === OPPORTUNITY EVENTS ===
  {
    category: 'opportunity',
    severity: 'moderate',
    frequency: 'uncommon',
    title: 'Job Offer',
    description: 'A recruiter contacted you about a better job opportunity.',
    effects: { karma: 5 },
    requirements: { hasJob: true },
    choices: [
      {
        text: 'Take the new job',
        difficultyClass: 12,
        successOutcome: {
          description: 'You successfully transitioned to the new role with a $15k raise!',
          effects: { morale: 20, karma: 5 },
        },
        failureOutcome: {
          description: 'The new job fell through. You\'re stuck in your current position.',
          effects: { morale: -10 },
        },
      },
      {
        text: 'Stay at current job',
        difficultyClass: 8,
        successOutcome: {
          description: 'You negotiated a raise at your current job to match the offer!',
          effects: { morale: 10 },
        },
        failureOutcome: {
          description: 'Your current employer refused to match. You feel undervalued.',
          effects: { morale: -5 },
        },
      },
    ],
  },
  {
    category: 'opportunity',
    severity: 'major',
    frequency: 'rare',
    title: 'Investment Opportunity',
    description: 'A friend offers you a chance to invest in their promising startup.',
    requirements: { minWealth: 10000 },
    effects: {},
    choices: [
      {
        text: 'Invest $10,000',
        difficultyClass: 15,
        successOutcome: {
          description: 'The startup went public! Your investment is now worth $100,000!',
          effects: { money: 90000, morale: 40 },
        },
        failureOutcome: {
          description: 'The startup failed. You lost your entire investment.',
          effects: { money: -10000, morale: -30 },
        },
      },
      {
        text: 'Decline the offer',
        difficultyClass: 10,
        successOutcome: {
          description: 'Good call - the startup went bankrupt. You dodged a bullet!',
          effects: { morale: 10, intellect: 5 },
        },
        failureOutcome: {
          description: 'The startup became a unicorn. You missed out on millions...',
          effects: { morale: -20 },
        },
      },
    ],
  },
  {
    category: 'opportunity',
    severity: 'life-changing',
    frequency: 'very-rare',
    title: 'Hollywood Discovered You',
    description: 'A talent scout approached you about starring in a major film!',
    requirements: { minAge: 216, maxAge: 600 },
    effects: {},
    choices: [
      {
        text: 'Pursue acting career',
        difficultyClass: 18,
        successOutcome: {
          description: 'The movie was a blockbuster! You\'re now a Hollywood star!',
          effects: { money: 500000, fame: 500, reputation: 50, morale: 50 },
        },
        failureOutcome: {
          description: 'The movie flopped and you became a laughingstock.',
          effects: { fame: 50, reputation: -30, morale: -40 },
        },
      },
    ],
  },

  // === ENCOUNTER EVENTS ===
  {
    category: 'encounter',
    severity: 'minor',
    frequency: 'common',
    title: 'Friendly Stranger',
    description: 'A friendly stranger struck up a conversation and made your day.',
    effects: { morale: 10, karma: 5 },
  },
  {
    category: 'encounter',
    severity: 'moderate',
    frequency: 'uncommon',
    title: 'Celebrity Sighting',
    description: 'You met a famous celebrity at a coffee shop. They were surprisingly down to earth!',
    effects: { morale: 15, fame: 5 },
  },
  {
    category: 'encounter',
    severity: 'major',
    frequency: 'rare',
    title: 'Mentor Found',
    description: 'You met someone who could become a life-changing mentor.',
    effects: { intellect: 10, morale: 20, karma: 10 },
  },

  // === DISCOVERY EVENTS ===
  {
    category: 'discovery',
    severity: 'minor',
    frequency: 'uncommon',
    title: 'Hidden Talent',
    description: 'You discovered you have a natural talent for something you never tried before.',
    effects: { intellect: 5, morale: 15 },
  },
  {
    category: 'discovery',
    severity: 'moderate',
    frequency: 'rare',
    title: 'Rare Collectible',
    description: 'You found a valuable antique at a garage sale!',
    effects: { money: 5000, morale: 20 },
  },
  {
    category: 'discovery',
    severity: 'major',
    frequency: 'very-rare',
    title: 'Archaeological Find',
    description: 'While hiking, you discovered ancient artifacts! Museums are bidding for them.',
    effects: { money: 50000, fame: 100, intellect: 20 },
  },

  // === LOSS EVENTS ===
  {
    category: 'loss',
    severity: 'minor',
    frequency: 'common',
    title: 'Lost Wallet',
    description: 'You lost your wallet with $100 cash in it.',
    effects: { money: -100, morale: -10 },
  },
  {
    category: 'loss',
    severity: 'moderate',
    frequency: 'uncommon',
    title: 'Pet Passed Away',
    description: 'Your beloved pet passed away from old age.',
    effects: { morale: -40, health: -10 },
  },
  {
    category: 'loss',
    severity: 'major',
    frequency: 'rare',
    title: 'House Fire',
    description: 'A fire destroyed many of your possessions.',
    effects: { money: -20000, morale: -35, health: -15 },
  },

  // === WINDFALL EVENTS ===
  {
    category: 'windfall',
    severity: 'moderate',
    frequency: 'uncommon',
    title: 'Tax Refund',
    description: 'You got a larger than expected tax refund!',
    effects: { money: 2000, morale: 15 },
  },
  {
    category: 'windfall',
    severity: 'major',
    frequency: 'rare',
    title: 'Lawsuit Settlement',
    description: 'You won a class-action lawsuit settlement.',
    effects: { money: 15000, morale: 25 },
  },
  {
    category: 'windfall',
    severity: 'life-changing',
    frequency: 'very-rare',
    title: 'Crypto Investment Paid Off',
    description: 'That cryptocurrency you bought years ago skyrocketed in value!',
    effects: { money: 250000, morale: 50, intellect: 10 },
  },

  // === ACCIDENT EVENTS ===
  {
    category: 'accident',
    severity: 'minor',
    frequency: 'common',
    title: 'Tripped and Fell',
    description: 'You tripped and fell in public. Embarrassing but not serious.',
    effects: { health: -5, morale: -10, looks: -2 },
  },
  {
    category: 'accident',
    severity: 'moderate',
    frequency: 'uncommon',
    title: 'Car Accident',
    description: 'You were in a minor car accident. No serious injuries but car is damaged.',
    effects: { health: -15, money: -3000, morale: -20 },
  },
  {
    category: 'accident',
    severity: 'major',
    frequency: 'rare',
    title: 'Serious Injury',
    description: 'You suffered a serious injury that required hospitalization.',
    effects: { health: -40, money: -15000, morale: -30 },
  },

  // === MIRACLE EVENTS ===
  {
    category: 'miracle',
    severity: 'life-changing',
    frequency: 'very-rare',
    title: 'Perfect Stranger Donor',
    description: 'A perfect stranger donated a kidney to you, saving your life.',
    effects: { health: 50, morale: 50, karma: 50 },
  },
  {
    category: 'miracle',
    severity: 'life-changing',
    frequency: 'very-rare',
    title: 'Viral Good Deed',
    description: 'A video of you helping someone went viral. The internet loves you!',
    effects: { fame: 300, reputation: 50, morale: 40, karma: 30 },
  },

  // === BETRAYAL EVENTS ===
  {
    category: 'betrayal',
    severity: 'moderate',
    frequency: 'uncommon',
    title: 'Friend Borrowed Money',
    description: 'A friend borrowed $1,000 and never paid you back.',
    effects: { money: -1000, morale: -25, karma: -10 },
    requirements: { hasJob: true },
  },
  {
    category: 'betrayal',
    severity: 'major',
    frequency: 'rare',
    title: 'Business Partner Fraud',
    description: 'Your business partner embezzled funds and disappeared.',
    effects: { money: -50000, morale: -40, reputation: -20 },
  },

  // === ROMANCE EVENTS ===
  {
    category: 'romance',
    severity: 'minor',
    frequency: 'common',
    title: 'Coffee Shop Meet-Cute',
    description: 'You had a charming encounter with someone at a coffee shop.',
    effects: { morale: 15, looks: 5 },
  },
  {
    category: 'romance',
    severity: 'moderate',
    frequency: 'uncommon',
    title: 'Whirlwind Romance',
    description: 'You experienced an intense, passionate romance.',
    effects: { morale: 30, health: 10 },
  },
  {
    category: 'romance',
    severity: 'major',
    frequency: 'rare',
    title: 'Perfect Match',
    description: 'You met someone who seems like your perfect match!',
    effects: { morale: 40, health: 15 },
    requirements: { minAge: 216 },
  },

  // === CAREER EVENTS ===
  {
    category: 'career',
    severity: 'moderate',
    frequency: 'uncommon',
    title: 'Promotion',
    description: 'You got promoted at work!',
    effects: { morale: 25, reputation: 15, karma: 10 },
    requirements: { hasJob: true },
  },
  {
    category: 'career',
    severity: 'major',
    frequency: 'rare',
    title: 'Headhunted',
    description: 'You were headhunted for an executive position!',
    effects: { money: 50000, morale: 35, reputation: 25, fame: 20 },
    requirements: { hasJob: true, minAge: 300 },
  },
  {
    category: 'career',
    severity: 'life-changing',
    frequency: 'very-rare',
    title: 'Company Founder',
    description: 'Your side project turned into a successful company worth millions!',
    effects: { money: 2000000, fame: 200, reputation: 50, morale: 50 },
    requirements: { hasJob: true, minAge: 300 },
  },

  // === HEALTH EVENTS ===
  {
    category: 'health',
    severity: 'minor',
    frequency: 'common',
    title: 'Food Poisoning',
    description: 'You got food poisoning from questionable takeout.',
    effects: { health: -15, morale: -15 },
  },
  {
    category: 'health',
    severity: 'moderate',
    frequency: 'uncommon',
    title: 'Wellness Epiphany',
    description: 'You had an epiphany about your health and started taking better care of yourself.',
    effects: { health: 20, morale: 20 },
  },
  {
    category: 'health',
    severity: 'major',
    frequency: 'rare',
    title: 'Medical Breakthrough',
    description: 'A new treatment improved your chronic condition significantly!',
    effects: { health: 40, morale: 30, money: -5000 },
  },

  // === SOCIAL EVENTS ===
  {
    category: 'social',
    severity: 'minor',
    frequency: 'common',
    title: 'Made New Friend',
    description: 'You made a great new friend!',
    effects: { morale: 15, karma: 10 },
  },
  {
    category: 'social',
    severity: 'moderate',
    frequency: 'uncommon',
    title: 'Invited to Exclusive Party',
    description: 'You were invited to an exclusive high-society party.',
    effects: { morale: 20, reputation: 15, fame: 10 },
    requirements: { minFame: 100 },
  },
  {
    category: 'social',
    severity: 'major',
    frequency: 'rare',
    title: 'Went Viral',
    description: 'Something you did went viral on social media!',
    effects: { fame: 150, morale: 30 },
  },

  // === MYSTERY EVENTS ===
  {
    category: 'mystery',
    severity: 'moderate',
    frequency: 'rare',
    title: 'Anonymous Gift',
    description: 'Someone anonymously sent you an expensive gift.',
    effects: { money: 1000, morale: 15 },
  },
  {
    category: 'mystery',
    severity: 'major',
    frequency: 'very-rare',
    title: 'Secret Admirer',
    description: 'You have a secret admirer who\'s been leaving you mysterious gifts.',
    effects: { morale: 25, looks: 10 },
  },
];

/**
 * Calculate event occurrence chance based on frequency
 */
export function getEventOccurrenceChance(frequency: EventFrequency): number {
  const chances: Record<EventFrequency, number> = {
    frequent: 40, // 40% per month
    common: 20, // 20% per month
    uncommon: 10, // 10% per month
    rare: 4, // 4% per month
    'very-rare': 1, // 1% per month
  };
  return chances[frequency];
}

/**
 * Check if event should occur this month (dice-based)
 */
export function checkForRandomEvent(
  playerAge: number,
  playerWealth: number,
  playerFame: number,
  hasJob: boolean,
  hasSpouse: boolean,
  luck: number,
  eventHistory: string[] // IDs of events already experienced
): {
  eventOccurs: boolean;
  event: Omit<RandomLifeEvent, 'id' | 'occurredAge' | 'wasChoiceMade'> | null;
} {
  // Filter events by requirements
  const eligibleEvents = eventTemplates.filter((template) => {
    const req = template.requirements;
    if (!req) return true;

    if (req.minAge && playerAge < req.minAge) return false;
    if (req.maxAge && playerAge > req.maxAge) return false;
    if (req.minWealth && playerWealth < req.minWealth) return false;
    if (req.minFame && playerFame < req.minFame) return false;
    if (req.hasJob !== undefined && hasJob !== req.hasJob) return false;
    if (req.hasSpouse !== undefined && hasSpouse !== req.hasSpouse) return false;

    return true;
  });

  if (eligibleEvents.length === 0) {
    return { eventOccurs: false, event: null };
  }

  // Weight by frequency
  const weights: number[] = [];
  let totalWeight = 0;

  for (const template of eligibleEvents) {
    const weight = getEventOccurrenceChance(template.frequency);
    weights.push(weight);
    totalWeight += weight;
  }

  // Luck affects occurrence chance
  const luckModifiers: DiceModifier[] = [];
  const roll = rollDice('d100', luckModifiers, luck);

  // Calculate threshold based on total weight
  const threshold = totalWeight * 0.3; // 30% chance of something happening

  if (roll.modifiedRoll > threshold) {
    return { eventOccurs: false, event: null };
  }

  // Select random event based on weights
  const randomValue = Math.random() * totalWeight;
  let cumulativeWeight = 0;
  let selectedTemplate: EventTemplate | null = null;

  for (let i = 0; i < eligibleEvents.length; i++) {
    cumulativeWeight += weights[i];
    if (randomValue <= cumulativeWeight) {
      selectedTemplate = eligibleEvents[i];
      break;
    }
  }

  if (!selectedTemplate) {
    selectedTemplate = eligibleEvents[0]; // Fallback
  }

  // Build event from template
  const event: Omit<RandomLifeEvent, 'id' | 'occurredAge' | 'wasChoiceMade'> = {
    category: selectedTemplate.category,
    severity: selectedTemplate.severity,
    title: selectedTemplate.title,
    description: selectedTemplate.description,
    effects: selectedTemplate.effects,
    choices: selectedTemplate.choices?.map((choice, idx) => ({
      id: `choice-${idx}`,
      ...choice,
    })),
    choiceOutcome: undefined,
  };

  return { eventOccurs: true, event };
}

/**
 * Process event choice with dice roll
 */
export function processEventChoice(
  choice: EventChoice,
  playerIntellect: number,
  playerLooks: number,
  playerKarma: number,
  luck: number
): {
  success: boolean;
  outcome: import('../types').EventOutcome;
  roll: number;
  message: string;
} {
  const modifiers: DiceModifier[] = [
    { name: 'Intellect', value: Math.floor(playerIntellect / 20), source: 'stat' },
    { name: 'Karma', value: Math.floor(playerKarma / 25), source: 'character' },
  ];

  const result = checkSuccess('d20', choice.difficultyClass, modifiers, luck);

  const outcome = result.success ? choice.successOutcome : choice.failureOutcome;
  const message = result.criticalSuccess
    ? 'CRITICAL SUCCESS! ' + outcome.description
    : result.criticalFailure
    ? 'CRITICAL FAILURE! ' + outcome.description
    : outcome.description;

  return {
    success: result.success,
    outcome,
    roll: result.roll,
    message,
  };
}

/**
 * Calculate event impact score (for tracking best/worst)
 */
export function calculateEventImpactScore(event: RandomLifeEvent): number {
  const effects = event.effects;
  let score = 0;

  score += (effects.money || 0) / 100; // $100 = 1 point
  score += (effects.health || 0) * 2;
  score += (effects.morale || 0) * 2;
  score += (effects.intellect || 0) * 3;
  score += (effects.looks || 0) * 2;
  score += (effects.karma || 0) * 2;
  score += (effects.reputation || 0) * 3;
  score += (effects.fame || 0) * 1;

  return Math.round(score);
}

/**
 * Generate event summary for timeline
 */
export function generateEventSummary(event: RandomLifeEvent): string {
  const severity = event.severity;
  const category = event.category;

  const prefix =
    severity === 'catastrophic'
      ? '💀 CATASTROPHIC'
      : severity === 'life-changing'
      ? '⭐ LIFE-CHANGING'
      : severity === 'major'
      ? '❗ MAJOR'
      : severity === 'moderate'
      ? '📌'
      : '';

  return `${prefix} ${event.title}`;
}
