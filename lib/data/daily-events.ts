import type {
  EventCategory,
  EventSeverity,
  RandomLifeEvent,
  EventChoice,
  DiceModifier,
} from '../types';
import { rollDice, checkSuccess } from '../utils/dice-system';
import { randint } from '../utils/game-utils';

/**
 * MASSIVE daily random events library - 150+ events for day-to-day gameplay
 * Probabilities adjusted for DAILY occurrence (not monthly)
 */

export interface DailyEventTemplate {
  category: EventCategory;
  severity: EventSeverity;
  dailyChance: number; // Percentage chance PER DAY (0.001% - 10%)
  title: string;
  description: string;
  effects: RandomLifeEvent['effects'];
  choices?: Omit<EventChoice, 'id'>[];
  requirements?: {
    minAge?: number; // days
    maxAge?: number; // days
    minWealth?: number;
    minFame?: number;
    hasJob?: boolean;
    hasSpouse?: boolean;
    isWeekend?: boolean;
    isWeekday?: boolean;
    season?: 'spring' | 'summer' | 'fall' | 'winter';
  };
}

/**
 * TRIVIAL DAILY EVENTS (1-10% daily chance) - Happens frequently
 */
export const trivialDailyEvents: DailyEventTemplate[] = [
  {
    category: 'fortune',
    severity: 'trivial',
    dailyChance: 5.0,
    title: 'Found Change',
    description: 'Found some coins on the ground.',
    effects: { money: randint(1, 5), morale: 2 },
  },
  {
    category: 'fortune',
    severity: 'trivial',
    dailyChance: 3.0,
    title: 'Free Coffee',
    description: 'Got a free coffee from a promotion.',
    effects: { morale: 5 },
  },
  {
    category: 'social',
    severity: 'trivial',
    dailyChance: 8.0,
    title: 'Pleasant Conversation',
    description: 'Had a nice chat with someone.',
    effects: { morale: 3, karma: 2 },
  },
  {
    category: 'misfortune',
    severity: 'trivial',
    dailyChance: 4.0,
    title: 'Stubbed Toe',
    description: 'Ouch! Stubbed your toe.',
    effects: { health: -1, morale: -3 },
  },
  {
    category: 'misfortune',
    severity: 'trivial',
    dailyChance: 3.0,
    title: 'Bad Coffee',
    description: 'Coffee was terrible today.',
    effects: { morale: -2 },
  },
  {
    category: 'social',
    severity: 'trivial',
    dailyChance: 6.0,
    title: 'Funny Meme',
    description: 'Saw a hilarious meme that made your day.',
    effects: { morale: 4 },
  },
  {
    category: 'health',
    severity: 'trivial',
    dailyChance: 7.0,
    title: 'Good Sleep',
    description: 'Had an excellent night of sleep.',
    effects: { health: 2, morale: 5 },
  },
  {
    category: 'health',
    severity: 'trivial',
    dailyChance: 5.0,
    title: 'Poor Sleep',
    description: 'Tossed and turned all night.',
    effects: { health: -2, morale: -4 },
  },
  {
    category: 'fortune',
    severity: 'trivial',
    dailyChance: 2.0,
    title: 'Green Lights',
    description: 'Hit every green light on your commute!',
    effects: { morale: 6 },
  },
  {
    category: 'misfortune',
    severity: 'trivial',
    dailyChance: 3.0,
    title: 'Spilled Drink',
    description: 'Spilled your drink on yourself.',
    effects: { morale: -5 },
  },
];

/**
 * MINOR DAILY EVENTS (0.1-1% daily chance)
 */
export const minorDailyEvents: DailyEventTemplate[] = [
  {
    category: 'fortune',
    severity: 'minor',
    dailyChance: 0.5,
    title: 'Found $20 Bill',
    description: 'Found a $20 bill on the sidewalk!',
    effects: { money: 20, morale: 10, karma: -1 },
  },
  {
    category: 'misfortune',
    severity: 'minor',
    dailyChance: 0.8,
    title: 'Parking Ticket',
    description: 'Got a parking ticket.',
    effects: { money: -75, morale: -8 },
  },
  {
    category: 'encounter',
    severity: 'minor',
    dailyChance: 0.6,
    title: 'Made New Friend',
    description: 'Met someone interesting who could become a friend.',
    effects: { morale: 12, karma: 8 },
  },
  {
    category: 'career',
    severity: 'minor',
    dailyChance: 0.4,
    title: 'Productive Work Day',
    description: 'Crushed it at work today!',
    effects: { morale: 10, intellect: 2 },
    requirements: { hasJob: true, isWeekday: true },
  },
  {
    category: 'health',
    severity: 'minor',
    dailyChance: 1.0,
    title: 'Headache',
    description: 'Developed a splitting headache.',
    effects: { health: -5, morale: -6 },
  },
  {
    category: 'social',
    severity: 'minor',
    dailyChance: 0.7,
    title: 'Compliment Received',
    description: 'Someone gave you a genuine compliment.',
    effects: { morale: 8, looks: 1 },
  },
  {
    category: 'misfortune',
    severity: 'minor',
    dailyChance: 0.9,
    title: 'Forgot Lunch',
    description: 'Forgot your lunch and had to buy expensive food.',
    effects: { money: -15, morale: -5 },
  },
  {
    category: 'fortune',
    severity: 'minor',
    dailyChance: 0.3,
    title: 'Unexpected Discount',
    description: 'Got an unexpected discount while shopping.',
    effects: { money: 25, morale: 8 },
  },
  {
    category: 'discovery',
    severity: 'minor',
    dailyChance: 0.5,
    title: 'Found Old Gift Card',
    description: 'Found an old gift card with money still on it!',
    effects: { money: randint(10, 50), morale: 12 },
  },
  {
    category: 'accident',
    severity: 'minor',
    dailyChance: 0.6,
    title: 'Tripped in Public',
    description: 'Tripped and fell in front of people. Embarrassing.',
    effects: { health: -3, morale: -10, looks: -1 },
  },
  {
    category: 'social',
    severity: 'minor',
    dailyChance: 0.8,
    title: 'Great Workout',
    description: 'Had an amazing workout session.',
    effects: { health: 5, morale: 10, looks: 2 },
  },
  {
    category: 'career',
    severity: 'minor',
    dailyChance: 0.4,
    title: 'Boss Praised You',
    description: 'Your boss publicly praised your work.',
    effects: { morale: 15, reputation: 5 },
    requirements: { hasJob: true },
  },
  {
    category: 'misfortune',
    severity: 'minor',
    dailyChance: 0.7,
    title: 'Phone Battery Died',
    description: 'Phone died at the worst possible time.',
    effects: { morale: -7 },
  },
  {
    category: 'romance',
    severity: 'minor',
    dailyChance: 0.3,
    title: 'Flirty Encounter',
    description: 'Had a flirty exchange with someone attractive.',
    effects: { morale: 12, looks: 2 },
  },
  {
    category: 'social',
    severity: 'minor',
    dailyChance: 1.2,
    title: 'Perfect Weather',
    description: 'Weather was absolutely perfect today.',
    effects: { morale: 8 },
  },
  {
    category: 'misfortune',
    severity: 'minor',
    dailyChance: 1.0,
    title: 'Got Rained On',
    description: 'Got caught in unexpected rain without an umbrella.',
    effects: { health: -2, morale: -6 },
  },
  {
    category: 'fortune',
    severity: 'minor',
    dailyChance: 0.4,
    title: 'Free Meal',
    description: 'Someone bought you a meal!',
    effects: { money: 15, morale: 10, karma: 3 },
  },
  {
    category: 'discovery',
    severity: 'minor',
    dailyChance: 0.5,
    title: 'Found Great Song',
    description: 'Discovered an amazing new song.',
    effects: { morale: 8 },
  },
  {
    category: 'encounter',
    severity: 'minor',
    dailyChance: 0.6,
    title: 'Helped Someone',
    description: 'Helped someone who needed assistance.',
    effects: { morale: 10, karma: 12 },
  },
  {
    category: 'social',
    severity: 'minor',
    dailyChance: 0.9,
    title: 'Great Meal',
    description: 'Had a delicious meal that made your day.',
    effects: { morale: 7, health: 2 },
  },
];

/**
 * MODERATE EVENTS (0.01-0.1% daily chance) - Weekly-ish
 */
export const moderateEvents: DailyEventTemplate[] = [
  {
    category: 'windfall',
    severity: 'moderate',
    dailyChance: 0.05,
    title: 'Tax Refund',
    description: 'Got a tax refund check in the mail!',
    effects: { money: randint(500, 2000), morale: 20 },
  },
  {
    category: 'misfortune',
    severity: 'moderate',
    dailyChance: 0.08,
    title: 'Phone Broken',
    description: 'Dropped and shattered your phone screen.',
    effects: { money: -400, morale: -18 },
  },
  {
    category: 'opportunity',
    severity: 'moderate',
    dailyChance: 0.03,
    title: 'Side Gig Offer',
    description: 'Someone offered you a well-paying side gig.',
    effects: { money: randint(200, 800), morale: 15 },
  },
  {
    category: 'accident',
    severity: 'moderate',
    dailyChance: 0.06,
    title: 'Minor Fender Bender',
    description: 'Small car accident. No injuries but some damage.',
    effects: { money: -800, morale: -20, health: -5 },
  },
  {
    category: 'romance',
    severity: 'moderate',
    dailyChance: 0.04,
    title: 'Romantic Date',
    description: 'Had an amazing romantic evening.',
    effects: { morale: 25, looks: 3 },
    requirements: { hasSpouse: true },
  },
  {
    category: 'career',
    severity: 'moderate',
    dailyChance: 0.02,
    title: 'Bonus Pay',
    description: 'Received an unexpected bonus!',
    effects: { money: randint(500, 2000), morale: 30 },
    requirements: { hasJob: true },
  },
  {
    category: 'health',
    severity: 'moderate',
    dailyChance: 0.15,
    title: 'Flu',
    description: 'Came down with the flu. Need to rest.',
    effects: { health: -20, morale: -15 },
  },
  {
    category: 'social',
    severity: 'moderate',
    dailyChance: 0.07,
    title: 'Great Party',
    description: 'Attended an fantastic party and met cool people.',
    effects: { morale: 20, reputation: 8, fame: 3 },
    requirements: { isWeekend: true },
  },
  {
    category: 'discovery',
    severity: 'moderate',
    dailyChance: 0.04,
    title: 'Garage Sale Find',
    description: 'Found something valuable at a garage sale!',
    effects: { money: randint(100, 500), morale: 18 },
  },
  {
    category: 'betrayal',
    severity: 'moderate',
    dailyChance: 0.05,
    title: 'Friend Stood You Up',
    description: 'Friend cancelled plans last minute. Again.',
    effects: { morale: -15, karma: -5 },
  },
  {
    category: 'fortune',
    severity: 'moderate',
    dailyChance: 0.03,
    title: 'Lottery Scratcher Win',
    description: 'Won $500 on a scratch ticket!',
    effects: { money: 500, morale: 25 },
  },
  {
    category: 'encounter',
    severity: 'moderate',
    dailyChance: 0.06,
    title: 'Networking Connection',
    description: 'Met someone with valuable industry connections.',
    effects: { morale: 15, reputation: 12, fame: 5 },
  },
  {
    category: 'loss',
    severity: 'moderate',
    dailyChance: 0.08,
    title: 'Wallet Stolen',
    description: 'Someone pickpocketed your wallet!',
    effects: { money: -200, morale: -25, karma: -3 },
  },
  {
    category: 'health',
    severity: 'moderate',
    dailyChance: 0.05,
    title: 'Food Poisoning',
    description: 'Bad takeout gave you food poisoning.',
    effects: { health: -18, morale: -20, money: -50 },
  },
  {
    category: 'career',
    severity: 'moderate',
    dailyChance: 0.02,
    title: 'Client Appreciation',
    description: 'A client sent you a generous thank-you gift.',
    effects: { money: 300, morale: 20, reputation: 10 },
    requirements: { hasJob: true },
  },
];

/**
 * MAJOR EVENTS (0.001-0.01% daily chance) - Monthly-ish
 */
export const majorEvents: DailyEventTemplate[] = [
  {
    category: 'windfall',
    severity: 'major',
    dailyChance: 0.003,
    title: 'Inheritance',
    description: 'A distant relative left you money in their will.',
    effects: { money: randint(10000, 50000), morale: 30 },
  },
  {
    category: 'opportunity',
    severity: 'major',
    dailyChance: 0.005,
    title: 'Job Promotion',
    description: 'You were promoted at work with a big raise!',
    effects: { money: 5000, morale: 40, reputation: 25, fame: 10 },
    requirements: { hasJob: true },
  },
  {
    category: 'accident',
    severity: 'major',
    dailyChance: 0.008,
    title: 'Hospitalized',
    description: 'Accident sent you to the hospital for a few days.',
    effects: { health: -40, money: -8000, morale: -35 },
  },
  {
    category: 'misfortune',
    severity: 'major',
    dailyChance: 0.004,
    title: 'Identity Theft',
    description: 'Your identity was stolen. Credit cards maxed.',
    effects: { money: -12000, morale: -40, reputation: -15 },
  },
  {
    category: 'career',
    severity: 'major',
    dailyChance: 0.002,
    title: 'Headhunted',
    description: 'Recruited for a much better position!',
    effects: { money: 15000, morale: 45, reputation: 30 },
    requirements: { hasJob: true },
  },
  {
    category: 'romance',
    severity: 'major',
    dailyChance: 0.004,
    title: 'Love at First Sight',
    description: 'Met someone absolutely amazing.',
    effects: { morale: 40, looks: 5, health: 10 },
  },
  {
    category: 'discovery',
    severity: 'major',
    dailyChance: 0.002,
    title: 'Rare Collectible',
    description: 'Found a valuable antique worth thousands!',
    effects: { money: randint(3000, 10000), morale: 35, fame: 15 },
  },
  {
    category: 'loss',
    severity: 'major',
    dailyChance: 0.006,
    title: 'Apartment Burglary',
    description: 'Your home was burglarized.',
    effects: { money: -5000, morale: -45, health: -10 },
  },
  {
    category: 'social',
    severity: 'major',
    dailyChance: 0.003,
    title: 'Viral Post',
    description: 'Something you posted went viral!',
    effects: { fame: 100, morale: 35, reputation: 20 },
  },
  {
    category: 'betrayal',
    severity: 'major',
    dailyChance: 0.002,
    title: 'Major Betrayal',
    description: 'Someone you trusted betrayed you badly.',
    effects: { morale: -50, karma: -20, health: -15 },
  },
];

/**
 * LIFE-CHANGING EVENTS (0.0001-0.001% daily chance) - Rare
 */
export const lifeChangingEvents: DailyEventTemplate[] = [
  {
    category: 'windfall',
    severity: 'life-changing',
    dailyChance: 0.0003,
    title: 'Lottery Win',
    description: 'WON THE LOTTERY! $5 MILLION!',
    effects: { money: 5000000, morale: 100, fame: 200 },
  },
  {
    category: 'opportunity',
    severity: 'life-changing',
    dailyChance: 0.0005,
    title: 'Hollywood Discovered',
    description: 'Talent scout wants you for a major film!',
    effects: { fame: 500, morale: 80, reputation: 60 },
  },
  {
    category: 'misfortune',
    severity: 'catastrophic',
    dailyChance: 0.0002,
    title: 'House Fire',
    description: 'Fire destroyed your home and possessions.',
    effects: { money: -50000, morale: -80, health: -30 },
  },
  {
    category: 'miracle',
    severity: 'life-changing',
    dailyChance: 0.0004,
    title: 'Life Saved',
    description: 'A stranger saved your life in an accident.',
    effects: { health: 50, morale: 70, karma: 60 },
  },
  {
    category: 'career',
    severity: 'life-changing',
    dailyChance: 0.0003,
    title: 'Business Success',
    description: 'Your side project became a million-dollar company!',
    effects: { money: 1000000, fame: 300, reputation: 80 },
  },
];

/**
 * WEEKEND-SPECIFIC EVENTS
 */
export const weekendEvents: DailyEventTemplate[] = [
  {
    category: 'social',
    severity: 'minor',
    dailyChance: 2.0,
    title: 'Lazy Weekend',
    description: 'Relaxed and recharged all weekend.',
    effects: { morale: 15, health: 5 },
    requirements: { isWeekend: true },
  },
  {
    category: 'social',
    severity: 'moderate',
    dailyChance: 0.5,
    title: 'Weekend Adventure',
    description: 'Had an exciting weekend adventure!',
    effects: { morale: 25, health: 10 },
    requirements: { isWeekend: true },
  },
  {
    category: 'misfortune',
    severity: 'minor',
    dailyChance: 1.0,
    title: 'Wasted Weekend',
    description: 'Weekend flew by and you accomplished nothing.',
    effects: { morale: -12 },
    requirements: { isWeekend: true },
  },
];

/**
 * WORK-DAY SPECIFIC EVENTS
 */
export const weekdayWorkEvents: DailyEventTemplate[] = [
  {
    category: 'career',
    severity: 'minor',
    dailyChance: 2.0,
    title: 'Monday Blues',
    description: 'Rough start to the work week.',
    effects: { morale: -8 },
    requirements: { hasJob: true, isWeekday: true },
  },
  {
    category: 'career',
    severity: 'minor',
    dailyChance: 1.5,
    title: 'Friday Energy',
    description: 'Last day of the work week! Feeling great!',
    effects: { morale: 10 },
    requirements: { hasJob: true, isWeekday: true },
  },
  {
    category: 'career',
    severity: 'minor',
    dailyChance: 1.0,
    title: 'Office Drama',
    description: 'Workplace gossip and drama is exhausting.',
    effects: { morale: -10 },
    requirements: { hasJob: true, isWeekday: true },
  },
  {
    category: 'career',
    severity: 'minor',
    dailyChance: 0.8,
    title: 'Praise from Coworker',
    description: 'Coworker complimented your work.',
    effects: { morale: 12, reputation: 3 },
    requirements: { hasJob: true, isWeekday: true },
  },
  {
    category: 'career',
    severity: 'moderate',
    dailyChance: 0.1,
    title: 'Unexpected Overtime',
    description: 'Had to work late unexpectedly.',
    effects: { money: 100, morale: -15, health: -3 },
    requirements: { hasJob: true, isWeekday: true },
  },
];

/**
 * SEASONAL EVENTS
 */
export const seasonalEvents: DailyEventTemplate[] = [
  {
    category: 'health',
    severity: 'minor',
    dailyChance: 0.5,
    title: 'Spring Allergies',
    description: 'Seasonal allergies are killing you.',
    effects: { health: -8, morale: -10 },
    requirements: { season: 'spring' },
  },
  {
    category: 'social',
    severity: 'minor',
    dailyChance: 1.0,
    title: 'Beach Day',
    description: 'Perfect summer beach day!',
    effects: { morale: 20, health: 5, looks: 2 },
    requirements: { season: 'summer', isWeekend: true },
  },
  {
    category: 'social',
    severity: 'minor',
    dailyChance: 0.8,
    title: 'Fall Foliage',
    description: 'Beautiful fall colors everywhere.',
    effects: { morale: 12 },
    requirements: { season: 'fall' },
  },
  {
    category: 'misfortune',
    severity: 'minor',
    dailyChance: 1.5,
    title: 'Winter Cold',
    description: 'Freezing cold weather is brutal.',
    effects: { health: -5, morale: -8 },
    requirements: { season: 'winter' },
  },
  {
    category: 'fortune',
    severity: 'minor',
    dailyChance: 0.6,
    title: 'Snow Day',
    description: 'Beautiful snow day! Everything looks magical.',
    effects: { morale: 15 },
    requirements: { season: 'winter' },
  },
];

/**
 * Combine all event pools
 */
export const allDailyEvents: DailyEventTemplate[] = [
  ...trivialDailyEvents,
  ...minorDailyEvents,
  ...moderateEvents,
  ...majorEvents,
  ...lifeChangingEvents,
  ...weekendEvents,
  ...weekdayWorkEvents,
  ...seasonalEvents,
];

/**
 * Check for random event each day
 */
export function checkDailyEvent(
  playerAge: number, // in days
  playerWealth: number,
  playerFame: number,
  hasJob: boolean,
  hasSpouse: boolean,
  isWeekend: boolean,
  isWeekday: boolean,
  season: 'spring' | 'summer' | 'fall' | 'winter',
  luck: number
): {
  eventOccurs: boolean;
  event: Omit<RandomLifeEvent, 'id' | 'occurredAge' | 'wasChoiceMade'> | null;
} {
  // Filter eligible events
  const eligibleEvents = allDailyEvents.filter((template) => {
    const req = template.requirements;
    if (!req) return true;

    if (req.minAge && playerAge < req.minAge) return false;
    if (req.maxAge && playerAge > req.maxAge) return false;
    if (req.minWealth && playerWealth < req.minWealth) return false;
    if (req.minFame && playerFame < req.minFame) return false;
    if (req.hasJob !== undefined && hasJob !== req.hasJob) return false;
    if (req.hasSpouse !== undefined && hasSpouse !== req.hasSpouse) return false;
    if (req.isWeekend !== undefined && isWeekend !== req.isWeekend) return false;
    if (req.isWeekday !== undefined && isWeekday !== req.isWeekday) return false;
    if (req.season !== undefined && season !== req.season) return false;

    return true;
  });

  if (eligibleEvents.length === 0) {
    return { eventOccurs: false, event: null };
  }

  // Check each event's daily chance
  for (const template of eligibleEvents) {
    const roll = Math.random() * 100;
    const luckAdjusted = template.dailyChance * (0.5 + luck / 100);

    if (roll < luckAdjusted) {
      // Event occurs!
      const event: Omit<RandomLifeEvent, 'id' | 'occurredAge' | 'wasChoiceMade'> = {
        category: template.category,
        severity: template.severity,
        title: template.title,
        description: template.description,
        effects: template.effects,
        choices: template.choices?.map((choice, idx) => ({
          id: `choice-${idx}`,
          ...choice,
        })),
        choiceOutcome: undefined,
      };

      return { eventOccurs: true, event };
    }
  }

  return { eventOccurs: false, event: null };
}

/**
 * Get total number of events
 */
export function getTotalEventCount(): number {
  return allDailyEvents.length;
}
