import type { GameStats } from '../types';

export interface RandomEvent {
  id: string;
  message: string;
  effects: {
    money?: number;
    health?: number;
    morale?: number;
    intellect?: number;
    looks?: number;
  };
  probability: number; // 1-100
  conditions?: {
    minAge?: number;
    maxAge?: number;
    minMoney?: number;
    hasJob?: boolean;
  };
}

export const positiveEvents: RandomEvent[] = [
  { id: 'lottery-small', message: 'You won $500 in a small lottery!', effects: { money: 500, morale: 5 }, probability: 2 },
  { id: 'lottery-medium', message: 'You won $2000 in the lottery!', effects: { money: 2000, morale: 10 }, probability: 1 },
  { id: 'found-money', message: 'You found $100 on the street!', effects: { money: 100, morale: 3 }, probability: 3 },
  { id: 'tax-refund', message: 'You received a tax refund of $1000', effects: { money: 1000 }, probability: 5, conditions: { hasJob: true } },
  { id: 'promotion-bonus', message: 'You received a performance bonus at work!', effects: { money: 1500, morale: 10 }, probability: 4, conditions: { hasJob: true } },
  { id: 'good-day', message: 'You had an exceptionally good day!', effects: { morale: 10, health: 5 }, probability: 10 },
  { id: 'compliment', message: 'Someone complimented your appearance!', effects: { morale: 5, looks: 2 }, probability: 8 },
  { id: 'breakthrough', message: 'You had an intellectual breakthrough!', effects: { intellect: 5, morale: 5 }, probability: 5 },
  { id: 'gift', message: 'A friend gave you a thoughtful gift worth $200', effects: { money: 200, morale: 8 }, probability: 4 },
];

export const neutralEvents: RandomEvent[] = [
  { id: 'old-friend', message: 'You reconnected with an old friend', effects: { morale: 8 }, probability: 10 },
  { id: 'learned-skill', message: 'You learned something new today', effects: { intellect: 3 }, probability: 15 },
  { id: 'good-workout', message: 'You had a great workout session', effects: { health: 5, morale: 5 }, probability: 12 },
  { id: 'good-book', message: 'You read an inspiring book', effects: { intellect: 4, morale: 4 }, probability: 10 },
  { id: 'volunteered', message: 'You volunteered and felt fulfilled', effects: { morale: 10 }, probability: 5 },
  { id: 'hobby', message: 'You enjoyed your favorite hobby', effects: { morale: 7 }, probability: 15 },
];

export const negativeEvents: RandomEvent[] = [
  { id: 'parking-ticket', message: 'You got a parking ticket ($150)', effects: { money: -150, morale: -5 }, probability: 5 },
  { id: 'phone-broke', message: 'Your phone broke. Repair cost $300', effects: { money: -300, morale: -8 }, probability: 3 },
  { id: 'minor-injury', message: 'You sustained a minor injury', effects: { health: -10, morale: -5 }, probability: 4 },
  { id: 'bad-day', message: 'You had a particularly bad day', effects: { morale: -10 }, probability: 8 },
  { id: 'theft', message: 'Someone stole $200 from you', effects: { money: -200, morale: -15 }, probability: 2 },
  { id: 'argument', message: 'You had a stressful argument', effects: { morale: -8 }, probability: 6 },
  { id: 'car-repair', message: 'Your car needed unexpected repairs ($500)', effects: { money: -500, morale: -5 }, probability: 4 },
];

export const majorEvents: RandomEvent[] = [
  { id: 'inheritance', message: 'You received an inheritance of $10,000!', effects: { money: 10000, morale: 15 }, probability: 1 },
  { id: 'sued', message: 'You were sued and lost $5,000 in legal fees', effects: { money: -5000, morale: -20 }, probability: 1 },
  { id: 'accident', message: 'You were in an accident. Medical bills: $3,000', effects: { money: -3000, health: -20, morale: -15 }, probability: 2 },
  { id: 'windfall', message: 'You received an unexpected windfall of $20,000!', effects: { money: 20000, morale: 25 }, probability: 0.5 },
];

export function getRandomEvent(
  stats: GameStats,
  userAge: number,
  money: number,
  hasJob: boolean
): RandomEvent | null {
  // Combine all events
  const allEvents = [...positiveEvents, ...neutralEvents, ...negativeEvents, ...majorEvents];

  // Filter by conditions
  const eligibleEvents = allEvents.filter((event) => {
    if (!event.conditions) return true;

    if (event.conditions.minAge && userAge < event.conditions.minAge) return false;
    if (event.conditions.maxAge && userAge > event.conditions.maxAge) return false;
    if (event.conditions.minMoney && money < event.conditions.minMoney) return false;
    if (event.conditions.hasJob !== undefined && event.conditions.hasJob !== hasJob) return false;

    return true;
  });

  // Weighted random selection
  const totalProbability = eligibleEvents.reduce((sum, e) => sum + e.probability, 0);
  const rand = Math.random() * totalProbability;

  let cumulative = 0;
  for (const event of eligibleEvents) {
    cumulative += event.probability;
    if (rand <= cumulative) {
      return event;
    }
  }

  return null;
}
