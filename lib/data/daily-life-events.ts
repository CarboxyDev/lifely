import type { InteractiveEvent } from './interactive-events';

/**
 * DAILY LIFE EVENTS
 * Smaller, more frequent events that add realism and flavor
 * These are mundane, everyday occurrences that make the simulation feel alive
 */

export const dailyLifeEvents: InteractiveEvent[] = [
  // ===== SOCIAL ENCOUNTERS =====
  {
    id: 'compliment-received',
    category: 'social',
    severity: 'trivial',
    dailyChance: 0.2,
    title: 'Random Compliment',
    description: 'A stranger complimented your appearance today!',
    type: 'multi-stage',
    multiStage: {
      stages: [
        {
          prompt: 'How do you respond?',
          choices: [
            {
              text: 'Thank them warmly',
              outcome: {
                title: 'Made Their Day',
                description: 'Your kindness made them smile. You both feel good!',
                effects: { morale: 8, looks: 1, karma: 5 },
              },
            },
            {
              text: 'Just nod awkwardly',
              outcome: {
                title: 'Shy Response',
                description: 'You acknowledged it but felt awkward. Still nice though.',
                effects: { morale: 5 },
              },
            },
            {
              text: 'Ignore them',
              outcome: {
                title: 'Brushed Off',
                description: 'You ignored them. They looked hurt.',
                effects: { morale: -2, karma: -5 },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'old-friend-message',
    category: 'social',
    severity: 'minor',
    dailyChance: 0.08,
    title: 'Message From Old Friend',
    description: 'An old friend you haven\'t talked to in years reached out!',
    type: 'multi-stage',
    multiStage: {
      stages: [
        {
          prompt: 'Reply to them?',
          choices: [
            {
              text: 'Reply enthusiastically',
              outcome: {
                title: 'Rekindled Friendship',
                description: 'Great conversation! Planning to meet up soon.',
                effects: { morale: 15, karma: 10 },
              },
            },
            {
              text: 'Polite but brief reply',
              outcome: {
                title: 'Kept It Short',
                description: 'Replied politely but didn\'t commit to anything.',
                effects: { morale: 5 },
              },
            },
            {
              text: 'Leave on read',
              outcome: {
                title: 'Ghosted',
                description: 'You didn\'t reply. Feel slightly guilty.',
                effects: { morale: -3, karma: -5 },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'neighbor-argument',
    category: 'encounter',
    severity: 'minor',
    dailyChance: 0.04,
    title: 'Noisy Neighbors',
    description: 'Your neighbors are being extremely loud late at night.',
    type: 'multi-stage',
    multiStage: {
      stages: [
        {
          prompt: 'What do you do?',
          choices: [
            {
              text: 'Ask them politely to quiet down',
              requiresCheck: {
                attribute: 'morale',
                difficulty: 55,
                successOutcome: {
                  title: 'Understanding Neighbors',
                  description: 'They apologized and quieted down. Problem solved.',
                  effects: { morale: 8, karma: 10 },
                },
                failureOutcome: {
                  title: 'Argument Escalated',
                  description: 'They got defensive. Now there\'s tension.',
                  effects: { morale: -12, karma: -5 },
                },
              },
            },
            {
              text: 'Call the cops',
              outcome: {
                title: 'Police Called',
                description: 'Police came and warned them. They resent you now.',
                effects: { morale: -5, karma: -15 },
              },
            },
            {
              text: 'Suffer through it',
              outcome: {
                title: 'Lost Sleep',
                description: 'Couldn\'t sleep. Exhausted and frustrated.',
                effects: { health: -3, morale: -8 },
              },
            },
          ],
        },
      ],
    },
  },

  // ===== WORKPLACE EVENTS =====
  {
    id: 'coworker-lunch-invite',
    category: 'social',
    severity: 'trivial',
    dailyChance: 0.15,
    title: 'Lunch Invitation',
    description: 'Coworkers invited you to lunch.',
    type: 'multi-stage',
    requirements: { hasJob: true },
    multiStage: {
      stages: [
        {
          prompt: 'Join them?',
          choices: [
            {
              text: 'Go to lunch',
              outcome: {
                title: 'Team Bonding',
                description: 'Had a great time! Feel more connected to the team.',
                effects: { morale: 10, money: -15, karma: 5 },
              },
            },
            {
              text: 'Eat at desk (save money)',
              outcome: {
                title: 'Frugal Choice',
                description: 'Saved money but feel a bit isolated.',
                effects: { morale: -3, money: 5 },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'boss-praise',
    category: 'career',
    severity: 'minor',
    dailyChance: 0.06,
    title: 'Boss Recognition',
    description: 'Your boss publicly praised your recent work!',
    type: 'multi-stage',
    requirements: { hasJob: true },
    multiStage: {
      stages: [
        {
          prompt: 'How do you react?',
          choices: [
            {
              text: 'Accept graciously',
              outcome: {
                title: 'Humble Response',
                description: 'Team appreciated your humility. Boost to reputation.',
                effects: { morale: 18, karma: 15 },
              },
            },
            {
              text: 'Downplay it',
              outcome: {
                title: 'Too Modest',
                description: 'Downplayed your achievement. Felt good but missed opportunity.',
                effects: { morale: 8 },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'work-mistake',
    category: 'career',
    severity: 'moderate',
    dailyChance: 0.03,
    title: 'Work Error',
    description: 'You made a mistake at work. Boss noticed.',
    type: 'multi-stage',
    requirements: { hasJob: true },
    multiStage: {
      stages: [
        {
          prompt: 'How do you handle it?',
          choices: [
            {
              text: 'Own up immediately',
              outcome: {
                title: 'Accountability',
                description: 'Boss appreciated your honesty. Fixed the issue together.',
                effects: { morale: -5, karma: 20 },
              },
            },
            {
              text: 'Try to hide it',
              requiresCheck: {
                diceType: 'd20',
                rollCount: 1,
                difficulty: 14,
                successOutcome: {
                  title: 'Got Away With It',
                  description: 'Fixed it before anyone noticed the full extent.',
                  effects: { morale: -8, karma: -15 },
                },
                failureOutcome: {
                  title: 'Cover-Up Failed',
                  description: 'Boss found out you tried to hide it. Major trust damage.',
                  effects: { morale: -25, karma: -40 },
                },
              },
            },
            {
              text: 'Blame someone else',
              outcome: {
                title: 'Threw Under Bus',
                description: 'Saved yourself but ruined someone else\'s reputation. Can you live with this?',
                effects: { morale: -15, karma: -50 },
              },
            },
          ],
        },
      ],
    },
  },

  // ===== FINANCIAL EVENTS =====
  {
    id: 'unexpected-bill',
    category: 'misfortune',
    severity: 'minor',
    dailyChance: 0.1,
    title: 'Unexpected Bill',
    description: 'Received an unexpected bill for $150.',
    type: 'multi-stage',
    multiStage: {
      stages: [
        {
          prompt: 'How do you pay it?',
          choices: [
            {
              text: 'Pay immediately',
              outcome: {
                title: 'Paid',
                description: 'Dealt with it. Money gone but no stress.',
                effects: { money: -150, morale: 2 },
              },
            },
            {
              text: 'Ignore it',
              outcome: {
                title: 'Ignored',
                description: 'Ignoring it for now. Will bite you later...',
                effects: { morale: -5 },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'clearance-sale',
    category: 'opportunity',
    severity: 'trivial',
    dailyChance: 0.18,
    title: 'Store Sale',
    description: 'Your favorite store is having a huge sale!',
    type: 'multi-stage',
    multiStage: {
      stages: [
        {
          prompt: 'Go shopping?',
          choices: [
            {
              text: 'Buy something nice ($80)',
              outcome: {
                title: 'Treat Yourself',
                description: 'Bought something you wanted. Feel good!',
                effects: { money: -80, morale: 12, looks: 2 },
              },
            },
            {
              text: 'Just window shop',
              outcome: {
                title: 'Window Shopping',
                description: 'Looked around but didn\'t buy anything.',
                effects: { morale: 2 },
              },
            },
            {
              text: 'Skip it',
              outcome: {
                title: 'Stayed Home',
                description: 'Avoided temptation. Wallet safe.',
                effects: { morale: -1 },
              },
            },
          ],
        },
      ],
    },
  },

  // ===== HEALTH & LIFESTYLE =====
  {
    id: 'forgot-gym',
    category: 'health',
    severity: 'trivial',
    dailyChance: 0.12,
    title: 'Skipped Exercise',
    description: 'Too tired to exercise today. Skip it?',
    type: 'multi-stage',
    multiStage: {
      stages: [
        {
          prompt: 'Force yourself to exercise?',
          choices: [
            {
              text: 'Push through fatigue',
              requiresCheck: {
                attribute: 'morale',
                difficulty: 60,
                successOutcome: {
                  title: 'Pushed Through',
                  description: 'Exercised despite fatigue. Feel accomplished!',
                  effects: { health: 3, morale: 10 },
                },
                failureOutcome: {
                  title: 'Half-Assed Workout',
                  description: 'Went but barely tried. Wasted time.',
                  effects: { health: 1, morale: -5 },
                },
              },
            },
            {
              text: 'Skip it today',
              outcome: {
                title: 'Rest Day',
                description: 'Rested instead. Body needed it.',
                effects: { morale: 3 },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'junk-food-temptation',
    category: 'health',
    severity: 'trivial',
    dailyChance: 0.25,
    title: 'Fast Food Craving',
    description: 'Really craving fast food right now...',
    type: 'multi-stage',
    multiStage: {
      stages: [
        {
          prompt: 'Give in to the craving?',
          choices: [
            {
              text: 'Get fast food',
              outcome: {
                title: 'Indulged',
                description: 'Tasted good but feel unhealthy.',
                effects: { money: -15, morale: 5, health: -2 },
              },
            },
            {
              text: 'Cook at home',
              outcome: {
                title: 'Healthy Choice',
                description: 'Made a healthy meal. Feel proud!',
                effects: { money: -5, morale: 8, health: 2 },
              },
            },
            {
              text: 'Skip the meal',
              outcome: {
                title: 'Went Hungry',
                description: 'Saved money but still hungry and cranky.',
                effects: { morale: -5, health: -1 },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'good-sleep',
    category: 'health',
    severity: 'trivial',
    dailyChance: 0.3,
    title: 'Great Night\'s Sleep',
    description: 'Had an amazing night of sleep!',
    type: 'multi-stage',
    multiStage: {
      stages: [
        {
          prompt: 'Feel refreshed!',
          choices: [
            {
              text: 'Start day energized',
              outcome: {
                title: 'Refreshed',
                description: 'Feel amazing and ready to tackle the day!',
                effects: { health: 3, morale: 8 },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'bad-sleep',
    category: 'health',
    severity: 'trivial',
    dailyChance: 0.2,
    title: 'Terrible Sleep',
    description: 'Barely slept last night. Exhausted.',
    type: 'multi-stage',
    multiStage: {
      stages: [
        {
          prompt: 'How do you cope?',
          choices: [
            {
              text: 'Power through with coffee',
              outcome: {
                title: 'Caffeine Fix',
                description: 'Coffee helps but you\'re still tired.',
                effects: { health: -2, morale: -5, money: -5 },
              },
            },
            {
              text: 'Call in sick',
              requirements: { hasJob: true },
              outcome: {
                title: 'Mental Health Day',
                description: 'Took the day off to rest. Needed it.',
                effects: { health: 5, morale: 10 },
              },
            },
            {
              text: 'Push through tired',
              outcome: {
                title: 'Suffering',
                description: 'Day was rough. Barely functional.',
                effects: { health: -3, morale: -10 },
              },
            },
          ],
        },
      ],
    },
  },

  // ===== RANDOM ENCOUNTERS =====
  {
    id: 'cute-dog',
    category: 'encounter',
    severity: 'trivial',
    dailyChance: 0.4,
    title: 'Adorable Dog',
    description: 'Saw the cutest dog on a walk today!',
    type: 'multi-stage',
    multiStage: {
      stages: [
        {
          prompt: 'Pet the dog?',
          choices: [
            {
              text: 'Ask to pet it',
              outcome: {
                title: 'Made a Friend',
                description: 'Owner said yes! Dog was so happy. You feel great!',
                effects: { morale: 12 },
              },
            },
            {
              text: 'Just admire from afar',
              outcome: {
                title: 'Respectful Distance',
                description: 'Smiled at it. Still made your day better.',
                effects: { morale: 5 },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'street-performer',
    category: 'encounter',
    severity: 'trivial',
    dailyChance: 0.15,
    title: 'Street Performer',
    description: 'Talented street musician is performing.',
    type: 'multi-stage',
    multiStage: {
      stages: [
        {
          prompt: 'Give them money?',
          choices: [
            {
              text: 'Tip generously ($10)',
              outcome: {
                title: 'Supported Art',
                description: 'They thanked you warmly. Felt good to support talent.',
                effects: { money: -10, morale: 10, karma: 15 },
              },
            },
            {
              text: 'Small tip ($2)',
              outcome: {
                title: 'Showed Appreciation',
                description: 'Tossed in some change. They smiled.',
                effects: { money: -2, morale: 5, karma: 5 },
              },
            },
            {
              text: 'Just listen and move on',
              outcome: {
                title: 'Free Entertainment',
                description: 'Enjoyed the music but didn\'t tip.',
                effects: { morale: 3, karma: -2 },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'find-money',
    category: 'fortune',
    severity: 'trivial',
    dailyChance: 0.1,
    title: 'Money on Ground',
    description: 'Found $20 on the sidewalk!',
    type: 'multi-stage',
    multiStage: {
      stages: [
        {
          prompt: 'What do you do?',
          choices: [
            {
              text: 'Keep it',
              outcome: {
                title: 'Finders Keepers',
                description: 'Pocketed the money. Free $20!',
                effects: { money: 20, morale: 10, karma: -5 },
              },
            },
            {
              text: 'Look for owner',
              outcome: {
                title: 'Good Samaritan',
                description: 'Couldn\'t find owner. Donated it to charity.',
                effects: { morale: 15, karma: 25 },
              },
            },
          ],
        },
      ],
    },
  },
];

export function getDailyLifeEvents() {
  return dailyLifeEvents;
}
