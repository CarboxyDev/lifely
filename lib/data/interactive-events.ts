import type { EventCategory, EventSeverity } from '../types';
import { rollDice, rollWithAdvantage, rollWithDisadvantage, DiceType } from '../utils/dice-system';

/**
 * INTERACTIVE RPG-STYLE EVENTS
 * These events require player input: dice rolls, attribute checks, choices
 */

export interface AttributeCheck {
  attribute: 'health' | 'morale' | 'intellect' | 'looks';
  difficulty: number; // DC to beat
  successOutcome: {
    title: string;
    description: string;
    effects: any;
  };
  failureOutcome: {
    title: string;
    description: string;
    effects: any;
  };
}

export interface DiceChallenge {
  diceType: DiceType;
  rollCount: number; // How many dice to roll
  difficulty: number; // DC to beat
  hasAdvantage?: boolean;
  hasDisadvantage?: boolean;
  criticalSuccess?: {
    title: string;
    description: string;
    effects: any;
  };
  successOutcome: {
    title: string;
    description: string;
    effects: any;
  };
  failureOutcome: {
    title: string;
    description: string;
    effects: any;
  };
  criticalFailure?: {
    title: string;
    description: string;
    effects: any;
  };
}

export interface MultiStageEvent {
  stages: {
    prompt: string;
    choices: {
      text: string;
      nextStage?: number; // Index of next stage, or undefined if final
      outcome?: {
        title: string;
        description: string;
        effects: any;
      };
      requiresCheck?: AttributeCheck | DiceChallenge;
    }[];
  }[];
}

export interface InteractiveEvent {
  id: string;
  category: EventCategory;
  severity: EventSeverity;
  dailyChance: number;
  title: string;
  description: string;
  type: 'attribute-check' | 'dice-challenge' | 'multi-stage' | 'mini-game';

  // For attribute checks
  attributeCheck?: AttributeCheck;

  // For dice challenges
  diceChallenge?: DiceChallenge;

  // For multi-stage events
  multiStage?: MultiStageEvent;

  requirements?: {
    minAge?: number;
    maxAge?: number;
    minWealth?: number;
    minFame?: number;
    hasJob?: boolean;
    hasSpouse?: boolean;
    minHealth?: number;
    minIntellect?: number;
  };
}

/**
 * ATTRIBUTE CHECK EVENTS
 */
export const attributeCheckEvents: InteractiveEvent[] = [
  {
    id: 'street-fight',
    category: 'encounter',
    severity: 'moderate',
    dailyChance: 0.05,
    title: 'Street Altercation',
    description: 'Someone bumped into you and is looking for a fight. Your physical condition will determine the outcome.',
    type: 'attribute-check',
    attributeCheck: {
      attribute: 'health',
      difficulty: 60,
      successOutcome: {
        title: 'Victory',
        description: 'You defended yourself well. The aggressor backed down.',
        effects: { morale: 10, karma: 5 },
      },
      failureOutcome: {
        title: 'Beaten',
        description: 'You took a beating. Medical bills and bruised ego.',
        effects: { health: -20, morale: -15, money: -500 },
      },
    },
  },
  {
    id: 'job-interview-pressure',
    category: 'career',
    severity: 'moderate',
    dailyChance: 0.03,
    title: 'High-Pressure Interview',
    description: 'A prestigious company wants to interview you. Your intellect will be tested.',
    type: 'attribute-check',
    requirements: { minIntellect: 30 },
    attributeCheck: {
      attribute: 'intellect',
      difficulty: 70,
      successOutcome: {
        title: 'Job Offer',
        description: 'You impressed them! Received a lucrative job offer.',
        effects: { morale: 20, karma: 10, money: 5000 },
      },
      failureOutcome: {
        title: 'Rejected',
        description: 'You struggled with the technical questions. No offer.',
        effects: { morale: -10 },
      },
    },
  },
  {
    id: 'seduce-opportunity',
    category: 'romance',
    severity: 'minor',
    dailyChance: 0.1,
    title: 'Attractive Stranger',
    description: 'Someone attractive is clearly interested in you. Your looks will determine if you can capitalize.',
    type: 'attribute-check',
    attributeCheck: {
      attribute: 'looks',
      difficulty: 50,
      successOutcome: {
        title: 'Successful Flirtation',
        description: 'You charmed them! Got their number and a date planned.',
        effects: { morale: 15, looks: 2 },
      },
      failureOutcome: {
        title: 'Awkward Rejection',
        description: 'They politely declined. You feel embarrassed.',
        effects: { morale: -8, looks: -1 },
      },
    },
  },
  {
    id: 'negotiate-raise',
    category: 'career',
    severity: 'moderate',
    dailyChance: 0.02,
    title: 'Salary Negotiation',
    description: 'Your boss is open to discussing a raise. Your morale and confidence will determine success.',
    type: 'attribute-check',
    requirements: { hasJob: true },
    attributeCheck: {
      attribute: 'morale',
      difficulty: 65,
      successOutcome: {
        title: 'Raise Approved',
        description: 'Your confident negotiation paid off! 15% salary increase.',
        effects: { morale: 20, money: 3000 },
      },
      failureOutcome: {
        title: 'Denied',
        description: 'You lacked confidence. Request was denied.',
        effects: { morale: -12 },
      },
    },
  },
  {
    id: 'mountain-climb',
    category: 'opportunity',
    severity: 'major',
    dailyChance: 0.01,
    title: 'Mountain Climbing Expedition',
    description: 'Friends invited you on a challenging mountain climb. Your health determines if you can complete it.',
    type: 'attribute-check',
    attributeCheck: {
      attribute: 'health',
      difficulty: 75,
      successOutcome: {
        title: 'Summit Reached',
        description: 'You conquered the mountain! Feel accomplished and stronger.',
        effects: { health: 15, morale: 25, looks: 5 },
      },
      failureOutcome: {
        title: 'Exhausted',
        description: 'You had to turn back. Feel disappointed and exhausted.',
        effects: { health: -10, morale: -15 },
      },
    },
  },
  {
    id: 'debate-competition',
    category: 'social',
    severity: 'moderate',
    dailyChance: 0.02,
    title: 'Public Debate',
    description: 'You\'ve been challenged to a public debate. Your intellect will determine the winner.',
    type: 'attribute-check',
    attributeCheck: {
      attribute: 'intellect',
      difficulty: 65,
      successOutcome: {
        title: 'Debate Victory',
        description: 'You demolished their arguments! Audience applauds.',
        effects: { intellect: 5, morale: 15, karma: 10 },
      },
      failureOutcome: {
        title: 'Humiliated',
        description: 'You were outmatched. Public embarrassment.',
        effects: { morale: -20, intellect: -2 },
      },
    },
  },
];

/**
 * DICE CHALLENGE EVENTS
 */
export const diceChallengeEvents: InteractiveEvent[] = [
  {
    id: 'poker-tournament',
    category: 'opportunity',
    severity: 'major',
    dailyChance: 0.015,
    title: 'Underground Poker Tournament',
    description: 'A high-stakes poker game is happening tonight. Entry fee: $5,000. Roll to determine your luck.',
    type: 'dice-challenge',
    requirements: { minWealth: 5000 },
    diceChallenge: {
      diceType: 'd20',
      rollCount: 1,
      difficulty: 12,
      criticalSuccess: {
        title: 'Royal Flush!',
        description: 'Incredible luck! You won the entire pot and gained a reputation.',
        effects: { money: 50000, morale: 30, karma: -5 },
      },
      successOutcome: {
        title: 'Winner',
        description: 'You played well and walked away with significant winnings.',
        effects: { money: 20000, morale: 20 },
      },
      failureOutcome: {
        title: 'Lost',
        description: 'Bad luck. Lost your entry fee.',
        effects: { money: -5000, morale: -15 },
      },
      criticalFailure: {
        title: 'Cleaned Out',
        description: 'Terrible night. Lost even more than your entry fee trying to win it back.',
        effects: { money: -10000, morale: -25 },
      },
    },
  },
  {
    id: 'dodge-falling-debris',
    category: 'accident',
    severity: 'major',
    dailyChance: 0.008,
    title: 'Falling Debris!',
    description: 'A construction accident above! Debris is falling. Roll to dodge!',
    type: 'dice-challenge',
    diceChallenge: {
      diceType: 'd20',
      rollCount: 1,
      difficulty: 13,
      criticalSuccess: {
        title: 'Heroic Dodge',
        description: 'Not only did you dodge, you pushed others to safety! Local hero.',
        effects: { morale: 25, karma: 20, health: 5 },
      },
      successOutcome: {
        title: 'Dodged',
        description: 'Quick reflexes saved you. Heart pounding but unharmed.',
        effects: { morale: 10 },
      },
      failureOutcome: {
        title: 'Hit',
        description: 'Debris struck you. Hospitalized with injuries.',
        effects: { health: -30, money: -3000, morale: -20 },
      },
      criticalFailure: {
        title: 'Critically Injured',
        description: 'Direct hit. Severe injuries requiring surgery and long recovery.',
        effects: { health: -50, money: -15000, morale: -35 },
      },
    },
  },
  {
    id: 'investment-gamble',
    category: 'opportunity',
    severity: 'major',
    dailyChance: 0.02,
    title: 'Risky Investment Opportunity',
    description: 'A startup wants $10,000 investment. Could 10x or lose it all. Roll to see the outcome.',
    type: 'dice-challenge',
    requirements: { minWealth: 10000 },
    diceChallenge: {
      diceType: 'd100',
      rollCount: 1,
      difficulty: 60,
      criticalSuccess: {
        title: 'Unicorn Success!',
        description: 'The company went public! Your investment is now worth 20x!',
        effects: { money: 190000, morale: 40 },
      },
      successOutcome: {
        title: 'Profitable Exit',
        description: 'Company was acquired. You tripled your investment.',
        effects: { money: 20000, morale: 25 },
      },
      failureOutcome: {
        title: 'Company Failed',
        description: 'Startup went bankrupt. Investment lost.',
        effects: { money: -10000, morale: -20 },
      },
    },
  },
  {
    id: 'escape-mugger',
    category: 'misfortune',
    severity: 'moderate',
    dailyChance: 0.04,
    title: 'Mugging Attempt',
    description: 'Someone is trying to rob you! Roll to escape or fight back.',
    type: 'dice-challenge',
    diceChallenge: {
      diceType: 'd20',
      rollCount: 1,
      difficulty: 11,
      criticalSuccess: {
        title: 'Counterattack',
        description: 'You disarmed the mugger and they fled! Police recovered stolen goods from them.',
        effects: { morale: 20, karma: 15, money: 500 },
      },
      successOutcome: {
        title: 'Escaped',
        description: 'You ran and got away safely. Shaken but unharmed.',
        effects: { morale: -5 },
      },
      failureOutcome: {
        title: 'Robbed',
        description: 'They got your wallet and phone. Lost cash and valuables.',
        effects: { money: -800, morale: -15 },
      },
      criticalFailure: {
        title: 'Brutally Mugged',
        description: 'Resisted and got beaten badly. Hospitalized and robbed.',
        effects: { health: -25, money: -2000, morale: -25 },
      },
    },
  },
  {
    id: 'lottery-scratch',
    category: 'fortune',
    severity: 'minor',
    dailyChance: 0.3,
    title: 'Lottery Scratch Card',
    description: 'Bought a $5 scratch card. Let\'s see if luck is on your side!',
    type: 'dice-challenge',
    diceChallenge: {
      diceType: 'd100',
      rollCount: 1,
      difficulty: 85,
      criticalSuccess: {
        title: 'JACKPOT!',
        description: 'Won the top prize! $100,000!',
        effects: { money: 99995, morale: 50 },
      },
      successOutcome: {
        title: 'Winner',
        description: 'Won $50! Small but satisfying.',
        effects: { money: 45, morale: 8 },
      },
      failureOutcome: {
        title: 'No Win',
        description: 'Not a winner. Lost $5.',
        effects: { money: -5, morale: -1 },
      },
    },
  },
  {
    id: 'casino-roulette',
    category: 'opportunity',
    severity: 'moderate',
    dailyChance: 0.025,
    title: 'Roulette Spin',
    description: 'At the casino. Feeling lucky? Bet $1,000 on a roulette spin.',
    type: 'dice-challenge',
    requirements: { minWealth: 1000 },
    diceChallenge: {
      diceType: 'd20',
      rollCount: 1,
      difficulty: 14,
      criticalSuccess: {
        title: 'Hit the Number!',
        description: 'Direct number hit! 35:1 payout!',
        effects: { money: 35000, morale: 35 },
      },
      successOutcome: {
        title: 'Won',
        description: 'Color bet paid off! Doubled your money.',
        effects: { money: 1000, morale: 15 },
      },
      failureOutcome: {
        title: 'Lost',
        description: 'Ball landed on the wrong number. Lost your bet.',
        effects: { money: -1000, morale: -10 },
      },
      criticalFailure: {
        title: 'Chasing Losses',
        description: 'Kept betting to win it back. Lost much more.',
        effects: { money: -5000, morale: -25 },
      },
    },
  },
  {
    id: 'talent-audition',
    category: 'career',
    severity: 'major',
    dailyChance: 0.01,
    title: 'Talent Show Audition',
    description: 'Auditioning for a televised talent show. Roll to impress the judges!',
    type: 'dice-challenge',
    diceChallenge: {
      diceType: 'd20',
      rollCount: 1,
      difficulty: 15,
      hasAdvantage: true,
      criticalSuccess: {
        title: 'Golden Buzzer!',
        description: 'Standing ovation! You\'re going straight to the finals!',
        effects: { morale: 40, karma: 25, money: 10000 },
      },
      successOutcome: {
        title: 'Advanced',
        description: 'Judges loved it! You\'re moving to the next round.',
        effects: { morale: 25, karma: 15 },
      },
      failureOutcome: {
        title: 'Rejected',
        description: 'Not quite what they\'re looking for. Better luck next time.',
        effects: { morale: -15 },
      },
      criticalFailure: {
        title: 'Viral Disaster',
        description: 'Performance was so bad it went viral for all the wrong reasons.',
        effects: { morale: -30, karma: -20 },
      },
    },
  },
];

/**
 * MULTI-STAGE STORY EVENTS
 */
export const multiStageEvents: InteractiveEvent[] = [
  {
    id: 'mysterious-package',
    category: 'mystery',
    severity: 'moderate',
    dailyChance: 0.03,
    title: 'Mysterious Package',
    description: 'A package with no return address arrived at your door. What do you do?',
    type: 'multi-stage',
    multiStage: {
      stages: [
        {
          prompt: 'A suspicious package arrived. What do you do?',
          choices: [
            {
              text: 'Open it immediately',
              requiresCheck: {
                diceType: 'd20',
                rollCount: 1,
                difficulty: 10,
                successOutcome: {
                  title: 'Lucky Find',
                  description: 'Inside was $5,000 cash and a thank-you note from an anonymous benefactor!',
                  effects: { money: 5000, morale: 20 },
                },
                failureOutcome: {
                  title: 'Glitter Bomb',
                  description: 'It was a prank! Glitter everywhere. Took hours to clean.',
                  effects: { morale: -10 },
                },
              },
            },
            {
              text: 'Call the police',
              outcome: {
                title: 'Safe Choice',
                description: 'Police determined it was harmless - just a wrong address. Feel responsible.',
                effects: { morale: 5, karma: 10 },
              },
            },
            {
              text: 'Ignore it',
              nextStage: 1,
            },
          ],
        },
        {
          prompt: 'You ignored it for 3 days. Now what?',
          choices: [
            {
              text: 'Open it now',
              outcome: {
                title: 'Rotten Food',
                description: 'It was perishable food from a relative! Now spoiled and smelly.',
                effects: { morale: -8 },
              },
            },
            {
              text: 'Return to sender',
              outcome: {
                title: 'Wrong Address',
                description: 'It was for your neighbor. They thank you for returning it.',
                effects: { morale: 8, karma: 5 },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'lost-wallet-found',
    category: 'encounter',
    severity: 'minor',
    dailyChance: 0.08,
    title: 'Found Wallet',
    description: 'You found a wallet on the ground with $500 cash and ID inside.',
    type: 'multi-stage',
    multiStage: {
      stages: [
        {
          prompt: 'Found a wallet with $500. What do you do?',
          choices: [
            {
              text: 'Keep the money, ditch the wallet',
              outcome: {
                title: 'Stolen',
                description: 'You pocketed the cash. Feel guilty but richer.',
                effects: { money: 500, morale: -10, karma: -20 },
              },
            },
            {
              text: 'Return it to the owner',
              requiresCheck: {
                attribute: 'morale',
                difficulty: 40,
                successOutcome: {
                  title: 'Generous Reward',
                  description: 'Owner was so grateful they gave you $200 reward and praised your honesty!',
                  effects: { money: 200, morale: 20, karma: 30 },
                },
                failureOutcome: {
                  title: 'No Reward',
                  description: 'Owner just said thanks and left. Feel good but no reward.',
                  effects: { morale: 10, karma: 20 },
                },
              },
            },
            {
              text: 'Turn it in to police',
              outcome: {
                title: 'Good Citizen',
                description: 'Police thanked you. Local news featured your good deed!',
                effects: { morale: 15, karma: 25 },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'job-offer-dilemma',
    category: 'career',
    severity: 'major',
    dailyChance: 0.01,
    title: 'Competing Job Offers',
    description: 'Two companies made you offers: high-paying but stressful, or lower pay but great work-life balance.',
    type: 'multi-stage',
    requirements: { hasJob: true },
    multiStage: {
      stages: [
        {
          prompt: 'Choose your path:',
          choices: [
            {
              text: 'Take the high-paying job ($120k)',
              nextStage: 1,
            },
            {
              text: 'Take the balanced job ($80k)',
              outcome: {
                title: 'Work-Life Balance',
                description: 'You chose happiness over money. Better mental health and still good pay.',
                effects: { money: 15000, morale: 20, health: 10 },
              },
            },
            {
              text: 'Negotiate with both',
              requiresCheck: {
                attribute: 'intellect',
                difficulty: 70,
                successOutcome: {
                  title: 'Master Negotiator',
                  description: 'Got the high salary AND work-life balance! Best of both worlds.',
                  effects: { money: 25000, morale: 30, intellect: 5 },
                },
                failureOutcome: {
                  title: 'Lost Both Offers',
                  description: 'Both companies withdrew their offers. Came across as greedy.',
                  effects: { morale: -30 },
                },
              },
            },
          ],
        },
        {
          prompt: 'The high-stress job is demanding. How do you cope?',
          choices: [
            {
              text: 'Work long hours, prove yourself',
              requiresCheck: {
                attribute: 'health',
                difficulty: 65,
                successOutcome: {
                  title: 'Rising Star',
                  description: 'Your hard work paid off! Promoted within 6 months.',
                  effects: { money: 40000, morale: 25, health: -10 },
                },
                failureOutcome: {
                  title: 'Burned Out',
                  description: 'Overworked yourself into exhaustion and poor performance.',
                  effects: { health: -25, morale: -30 },
                },
              },
            },
            {
              text: 'Set boundaries, maintain balance',
              outcome: {
                title: 'Steady Progress',
                description: 'Respected for your boundaries. Solid performance and healthy.',
                effects: { money: 20000, morale: 15, health: 5 },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'inheritance-surprise',
    category: 'windfall',
    severity: 'major',
    dailyChance: 0.005,
    title: 'Unexpected Inheritance',
    description: 'A distant relative passed away and left you $50,000. But there\'s a condition...',
    type: 'multi-stage',
    multiStage: {
      stages: [
        {
          prompt: 'The will states you must donate at least 20% to charity to claim it. Do you accept?',
          choices: [
            {
              text: 'Accept and donate 20%',
              outcome: {
                title: 'Honored the Will',
                description: 'You received $40,000 and donated $10,000. Feel good about honoring their wishes.',
                effects: { money: 40000, morale: 15, karma: 30 },
              },
            },
            {
              text: 'Accept and donate 50%',
              outcome: {
                title: 'Generous Spirit',
                description: 'Your generosity was noticed. Local paper featured your charitable act.',
                effects: { money: 25000, morale: 25, karma: 50 },
              },
            },
            {
              text: 'Contest the will',
              requiresCheck: {
                diceType: 'd20',
                rollCount: 1,
                difficulty: 16,
                successOutcome: {
                  title: 'Will Overturned',
                  description: 'Court ruled in your favor! Got the full $50,000, but feel guilty.',
                  effects: { money: 50000, morale: -10, karma: -25 },
                },
                failureOutcome: {
                  title: 'Lost Everything',
                  description: 'Court upheld the will and you lost claim to ANY inheritance. Also $5k in legal fees.',
                  effects: { money: -5000, morale: -30, karma: -15 },
                },
              },
            },
          ],
        },
      ],
    },
  },
];

/**
 * Get all interactive events
 */
export const allInteractiveEvents: InteractiveEvent[] = [
  ...attributeCheckEvents,
  ...diceChallengeEvents,
  ...multiStageEvents,
];

/**
 * Check if an interactive event should trigger
 */
export function checkInteractiveEvent(
  playerData: {
    age: number; // in days
    wealth: number;
    fame: number;
    hasJob: boolean;
    hasSpouse: boolean;
    health: number;
    intellect: number;
  }
): InteractiveEvent | null {
  // Filter available events based on requirements
  const availableEvents = allInteractiveEvents.filter(event => {
    if (!event.requirements) return true;

    const req = event.requirements;
    if (req.minAge && playerData.age < req.minAge) return false;
    if (req.maxAge && playerData.age > req.maxAge) return false;
    if (req.minWealth && playerData.wealth < req.minWealth) return false;
    if (req.minFame && playerData.fame < req.minFame) return false;
    if (req.hasJob !== undefined && playerData.hasJob !== req.hasJob) return false;
    if (req.hasSpouse !== undefined && playerData.hasSpouse !== req.hasSpouse) return false;
    if (req.minHealth && playerData.health < req.minHealth) return false;
    if (req.minIntellect && playerData.intellect < req.minIntellect) return false;

    return true;
  });

  // Roll for each event
  for (const event of availableEvents) {
    const roll = Math.random() * 100;
    if (roll < event.dailyChance) {
      return event;
    }
  }

  return null;
}

/**
 * Perform attribute check
 */
export function performAttributeCheck(
  attributeValue: number,
  check: AttributeCheck
): 'success' | 'failure' {
  return attributeValue >= check.difficulty ? 'success' : 'failure';
}

/**
 * Perform dice challenge
 */
export function performDiceChallenge(
  challenge: DiceChallenge,
  luckModifier: number = 0
): {
  result: 'critical-success' | 'success' | 'failure' | 'critical-failure';
  roll: number;
} {
  let roll: number;

  if (challenge.hasAdvantage) {
    roll = rollWithAdvantage(challenge.diceType);
  } else if (challenge.hasDisadvantage) {
    roll = rollWithDisadvantage(challenge.diceType);
  } else {
    roll = rollDice(challenge.diceType, challenge.rollCount);
  }

  // Apply luck modifier
  roll += luckModifier;

  // Determine result
  const maxRoll = challenge.diceType === 'd4' ? 4 :
                  challenge.diceType === 'd6' ? 6 :
                  challenge.diceType === 'd8' ? 8 :
                  challenge.diceType === 'd10' ? 10 :
                  challenge.diceType === 'd12' ? 12 :
                  challenge.diceType === 'd20' ? 20 : 100;

  if (roll === maxRoll) return { result: 'critical-success', roll };
  if (roll === 1) return { result: 'critical-failure', roll };
  if (roll >= challenge.difficulty) return { result: 'success', roll };
  return { result: 'failure', roll };
}
