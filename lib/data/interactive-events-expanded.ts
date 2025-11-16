import type { InteractiveEvent } from './interactive-events';

/**
 * EXPANDED INTERACTIVE EVENTS
 * 30+ additional diverse events across all categories
 */

export const expandedInteractiveEvents: InteractiveEvent[] = [
  // ===== MORE ATTRIBUTE CHECK EVENTS =====
  {
    id: 'marathon-challenge',
    category: 'opportunity',
    severity: 'moderate',
    dailyChance: 0.015,
    title: 'Marathon Sign-Up',
    description: 'Local marathon registration is open. Your physical fitness will determine performance.',
    type: 'attribute-check',
    attributeCheck: {
      attribute: 'health',
      difficulty: 70,
      successOutcome: {
        title: 'Marathon Completed!',
        description: 'You finished the marathon with a respectable time. Gained recognition and fitness.',
        effects: { health: 10, morale: 20, karma: 15 },
      },
      failureOutcome: {
        title: 'Did Not Finish',
        description: 'Had to drop out halfway. Feel disappointed.',
        effects: { health: -5, morale: -10 },
      },
    },
  },
  {
    id: 'chess-tournament',
    category: 'social',
    severity: 'minor',
    dailyChance: 0.02,
    title: 'Chess Tournament',
    description: 'Local chess club is hosting a tournament. Intelligence is key.',
    type: 'attribute-check',
    requirements: { minIntellect: 40 },
    attributeCheck: {
      attribute: 'intellect',
      difficulty: 60,
      successOutcome: {
        title: 'Tournament Victory',
        description: 'Your strategic thinking secured first place!',
        effects: { intellect: 5, morale: 15, money: 500 },
      },
      failureOutcome: {
        title: 'Early Elimination',
        description: 'Knocked out in the first round. Need more practice.',
        effects: { morale: -8 },
      },
    },
  },
  {
    id: 'fashion-show-model',
    category: 'opportunity',
    severity: 'moderate',
    dailyChance: 0.01,
    title: 'Fashion Show Casting',
    description: 'A fashion show is looking for models. Your appearance matters most.',
    type: 'attribute-check',
    attributeCheck: {
      attribute: 'looks',
      difficulty: 75,
      successOutcome: {
        title: 'Booked the Gig',
        description: 'They loved your look! Modeling contract offered.',
        effects: { looks: 5, morale: 20, money: 2000 },
      },
      failureOutcome: {
        title: 'Not Their Type',
        description: 'They went with someone else. Feels rejecting.',
        effects: { morale: -12, looks: -2 },
      },
    },
  },
  {
    id: 'confidence-presentation',
    category: 'career',
    severity: 'moderate',
    dailyChance: 0.025,
    title: 'Important Presentation',
    description: 'You must present to the board. Confidence (morale) will make or break it.',
    type: 'attribute-check',
    requirements: { hasJob: true },
    attributeCheck: {
      attribute: 'morale',
      difficulty: 70,
      successOutcome: {
        title: 'Presentation Success',
        description: 'Nailed it! Board was impressed. Promotion likely.',
        effects: { morale: 15, money: 2500 },
      },
      failureOutcome: {
        title: 'Stumbled Through',
        description: 'Lacked confidence. Board seemed unimpressed.',
        effects: { morale: -15 },
      },
    },
  },
  {
    id: 'dance-competition',
    category: 'social',
    severity: 'minor',
    dailyChance: 0.03,
    title: 'Dance Competition',
    description: 'Local dance-off is happening. Physical fitness and looks both matter.',
    type: 'attribute-check',
    attributeCheck: {
      attribute: 'health',
      difficulty: 55,
      successOutcome: {
        title: 'Dance Champion',
        description: 'Your moves won the crowd! Cash prize awarded.',
        effects: { health: 5, morale: 18, looks: 3, money: 300 },
      },
      failureOutcome: {
        title: 'Two Left Feet',
        description: 'Eliminated early. Embarrassing.',
        effects: { morale: -10 },
      },
    },
  },

  // ===== MORE DICE CHALLENGE EVENTS =====
  {
    id: 'stock-day-trade',
    category: 'opportunity',
    severity: 'major',
    dailyChance: 0.02,
    title: 'Day Trading Opportunity',
    description: 'Hot stock tip for a risky day trade. Invest $2,000?',
    type: 'dice-challenge',
    requirements: { minWealth: 2000 },
    diceChallenge: {
      diceType: 'd20',
      rollCount: 1,
      difficulty: 12,
      criticalSuccess: {
        title: 'Stock Skyrocketed!',
        description: 'Incredible timing! Stock went up 400%!',
        effects: { money: 8000, morale: 30 },
      },
      successOutcome: {
        title: 'Profitable Trade',
        description: 'Stock went up! Sold for 100% profit.',
        effects: { money: 2000, morale: 15 },
      },
      failureOutcome: {
        title: 'Stock Declined',
        description: 'Stock dropped 50%. Cut losses and sold.',
        effects: { money: -1000, morale: -15 },
      },
      criticalFailure: {
        title: 'Stock Crashed',
        description: 'Company filed bankruptcy. Total loss.',
        effects: { money: -2000, morale: -25 },
      },
    },
  },
  {
    id: 'car-accident-dodge',
    category: 'accident',
    severity: 'major',
    dailyChance: 0.006,
    title: 'Sudden Car Swerves!',
    description: 'A car is swerving into your lane! Quick reflexes needed!',
    type: 'dice-challenge',
    diceChallenge: {
      diceType: 'd20',
      rollCount: 1,
      difficulty: 14,
      criticalSuccess: {
        title: 'Perfect Evasion',
        description: 'Dodged perfectly and helped others avoid it too!',
        effects: { morale: 20, karma: 15 },
      },
      successOutcome: {
        title: 'Avoided Crash',
        description: 'Quick thinking saved you!',
        effects: { morale: 10 },
      },
      failureOutcome: {
        title: 'Fender Bender',
        description: 'Minor collision. Car damaged, you\'re okay.',
        effects: { money: -1500, morale: -15 },
      },
      criticalFailure: {
        title: 'Serious Accident',
        description: 'Major collision. Hospitalized with injuries.',
        effects: { health: -40, money: -8000, morale: -30 },
      },
    },
  },
  {
    id: 'bar-fight-escape',
    category: 'encounter',
    severity: 'moderate',
    dailyChance: 0.015,
    title: 'Bar Brawl',
    description: 'A fight breaks out at the bar you\'re in! Get out or get involved?',
    type: 'dice-challenge',
    diceChallenge: {
      diceType: 'd20',
      rollCount: 1,
      difficulty: 10,
      criticalSuccess: {
        title: 'Peacemaker',
        description: 'You calmed everyone down! Bar owner grateful.',
        effects: { morale: 20, karma: 20, money: 100 },
      },
      successOutcome: {
        title: 'Escaped Safely',
        description: 'Got out before things got ugly.',
        effects: { morale: 5 },
      },
      failureOutcome: {
        title: 'Caught in the Chaos',
        description: 'Got roughed up trying to leave.',
        effects: { health: -15, morale: -10 },
      },
      criticalFailure: {
        title: 'Knocked Out',
        description: 'Someone mistook you for the instigator. Woke up in hospital.',
        effects: { health: -30, money: -2000, morale: -20 },
      },
    },
  },
  {
    id: 'online-raffle',
    category: 'fortune',
    severity: 'minor',
    dailyChance: 0.1,
    title: 'Online Raffle Entry',
    description: 'Entered a free online raffle. Drawing today!',
    type: 'dice-challenge',
    diceChallenge: {
      diceType: 'd100',
      rollCount: 1,
      difficulty: 90,
      criticalSuccess: {
        title: 'Grand Prize Winner!',
        description: 'Won the grand prize! $50,000!',
        effects: { money: 50000, morale: 45 },
      },
      successOutcome: {
        title: 'Prize Won!',
        description: 'Won a nice prize! $500!',
        effects: { money: 500, morale: 15 },
      },
      failureOutcome: {
        title: 'No Win',
        description: 'Didn\'t win anything. Oh well.',
        effects: { morale: -1 },
      },
    },
  },
  {
    id: 'crypto-gamble',
    category: 'opportunity',
    severity: 'major',
    dailyChance: 0.015,
    title: 'Cryptocurrency Hype',
    description: 'New crypto is all over social media. Invest $1,000 and hope?',
    type: 'dice-challenge',
    requirements: { minWealth: 1000 },
    diceChallenge: {
      diceType: 'd20',
      rollCount: 1,
      difficulty: 13,
      criticalSuccess: {
        title: 'To The Moon!',
        description: 'Crypto exploded 1000%! Millionaire status!',
        effects: { money: 9000, morale: 50 },
      },
      successOutcome: {
        title: 'Good Timing',
        description: 'Sold near the peak. Tripled investment.',
        effects: { money: 2000, morale: 20 },
      },
      failureOutcome: {
        title: 'Rug Pull',
        description: 'Crypto crashed. Lost half.',
        effects: { money: -500, morale: -15 },
      },
      criticalFailure: {
        title: 'Total Scam',
        description: 'It was a scam coin. Total loss.',
        effects: { money: -1000, morale: -25 },
      },
    },
  },

  // ===== MORE MULTI-STAGE EVENTS =====
  {
    id: 'witness-crime',
    category: 'encounter',
    severity: 'moderate',
    dailyChance: 0.02,
    title: 'Witnessed a Crime',
    description: 'You saw someone steal a purse from an elderly person. What do you do?',
    type: 'multi-stage',
    multiStage: {
      stages: [
        {
          prompt: 'You witnessed a purse snatching. React:',
          choices: [
            {
              text: 'Chase the thief',
              requiresCheck: {
                attribute: 'health',
                difficulty: 60,
                successOutcome: {
                  title: 'Caught the Thief!',
                  description: 'You caught up and recovered the purse! Local hero.',
                  effects: { morale: 25, karma: 35, health: -5 },
                },
                failureOutcome: {
                  title: 'Lost Them',
                  description: 'They outran you. Feel helpless.',
                  effects: { morale: -10, health: -3 },
                },
              },
            },
            {
              text: 'Call the police',
              outcome: {
                title: 'Police Responded',
                description: 'Police came but thief was gone. You tried.',
                effects: { morale: 5, karma: 15 },
              },
            },
            {
              text: 'Help the victim',
              outcome: {
                title: 'Compassionate Aid',
                description: 'You helped the shaken victim. They were very grateful.',
                effects: { morale: 15, karma: 25 },
              },
            },
            {
              text: 'Do nothing',
              outcome: {
                title: 'Walked Away',
                description: 'You didn\'t want to get involved. Feel guilty.',
                effects: { morale: -15, karma: -20 },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'business-partner-offer',
    category: 'opportunity',
    severity: 'major',
    dailyChance: 0.008,
    title: 'Business Partnership',
    description: 'An acquaintance wants you to partner on a business. They need $15,000 investment.',
    type: 'multi-stage',
    requirements: { minWealth: 15000 },
    multiStage: {
      stages: [
        {
          prompt: 'They seem excited but you don\'t know them well. Invest $15,000?',
          choices: [
            {
              text: 'Invest the full amount',
              requiresCheck: {
                diceType: 'd20',
                rollCount: 1,
                difficulty: 14,
                successOutcome: {
                  title: 'Business Success!',
                  description: 'Business took off! You\'re now a business owner earning passive income.',
                  effects: { money: 35000, morale: 35 },
                },
                failureOutcome: {
                  title: 'Business Failed',
                  description: 'Business went under within 6 months. Investment lost.',
                  effects: { money: -15000, morale: -30 },
                },
              },
            },
            {
              text: 'Invest half ($7,500)',
              requiresCheck: {
                diceType: 'd20',
                rollCount: 1,
                difficulty: 12,
                successOutcome: {
                  title: 'Moderate Success',
                  description: 'Business did okay. Got your money back plus some.',
                  effects: { money: 5000, morale: 15 },
                },
                failureOutcome: {
                  title: 'Broke Even',
                  description: 'Business barely survived. Got investment back.',
                  effects: { morale: -5 },
                },
              },
            },
            {
              text: 'Decline the offer',
              outcome: {
                title: 'Played it Safe',
                description: 'You declined. (Later you hear the business failed.)',
                effects: { morale: 10 },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'homeless-person',
    category: 'encounter',
    severity: 'trivial',
    dailyChance: 0.15,
    title: 'Homeless Person Asking for Help',
    description: 'A homeless person asks if you can spare some money for food.',
    type: 'multi-stage',
    multiStage: {
      stages: [
        {
          prompt: 'How do you respond?',
          choices: [
            {
              text: 'Give $20',
              outcome: {
                title: 'Generous Donation',
                description: 'They\'re very grateful. You feel good.',
                effects: { money: -20, morale: 12, karma: 20 },
              },
            },
            {
              text: 'Give $5',
              outcome: {
                title: 'Small Help',
                description: 'They thank you. Every bit helps.',
                effects: { money: -5, morale: 5, karma: 10 },
              },
            },
            {
              text: 'Buy them a meal instead',
              outcome: {
                title: 'Direct Help',
                description: 'You bought them a hot meal. They were touched.',
                effects: { money: -15, morale: 15, karma: 25 },
              },
            },
            {
              text: 'Politely decline',
              outcome: {
                title: 'Kept Walking',
                description: 'You said sorry and moved on. Feel a bit guilty.',
                effects: { morale: -3, karma: -5 },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'promotion-opportunity',
    category: 'career',
    severity: 'major',
    dailyChance: 0.01,
    title: 'Promotion Consideration',
    description: 'Your boss hints at a promotion but it requires relocating to another city.',
    type: 'multi-stage',
    requirements: { hasJob: true },
    multiStage: {
      stages: [
        {
          prompt: 'Accept the promotion and relocate?',
          choices: [
            {
              text: 'Accept and relocate',
              outcome: {
                title: 'New Chapter',
                description: 'Got promoted! New city, new opportunities. 30% raise.',
                effects: { money: 10000, morale: 20 },
              },
            },
            {
              text: 'Negotiate for remote work',
              requiresCheck: {
                attribute: 'intellect',
                difficulty: 75,
                successOutcome: {
                  title: 'Best of Both Worlds',
                  description: 'They agreed! Promotion without relocation.',
                  effects: { money: 8000, morale: 30 },
                },
                failureOutcome: {
                  title: 'Offer Withdrawn',
                  description: 'They needed someone on-site. Lost the opportunity.',
                  effects: { morale: -20 },
                },
              },
            },
            {
              text: 'Decline the promotion',
              outcome: {
                title: 'Stayed Put',
                description: 'You value stability over advancement. Boss understands.',
                effects: { morale: 5 },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'family-emergency-loan',
    category: 'encounter',
    severity: 'moderate',
    dailyChance: 0.01,
    title: 'Family Emergency',
    description: 'A family member calls in crisis, needs $3,000 urgently for medical bills.',
    type: 'multi-stage',
    requirements: { minWealth: 3000 },
    multiStage: {
      stages: [
        {
          prompt: 'Help your family member?',
          choices: [
            {
              text: 'Give $3,000 (no strings)',
              outcome: {
                title: 'Family First',
                description: 'Your generosity meant everything to them. Deepened bond.',
                effects: { money: -3000, morale: 10, karma: 30 },
              },
            },
            {
              text: 'Loan $3,000 (expect repayment)',
              requiresCheck: {
                diceType: 'd20',
                rollCount: 1,
                difficulty: 12,
                successOutcome: {
                  title: 'Paid Back',
                  description: 'They repaid you in 6 months. Relationship intact.',
                  effects: { morale: 5, karma: 15 },
                },
                failureOutcome: {
                  title: 'Never Repaid',
                  description: 'They couldn\'t pay back. Strained relationship.',
                  effects: { money: -3000, morale: -15, karma: -10 },
                },
              },
            },
            {
              text: 'Give $1,000 (partial help)',
              outcome: {
                title: 'What You Could',
                description: 'You helped what you could. They appreciate it.',
                effects: { money: -1000, morale: 3, karma: 15 },
              },
            },
            {
              text: 'Decline to help',
              outcome: {
                title: 'Protected Finances',
                description: 'You couldn\'t afford to help. They\'re disappointed.',
                effects: { morale: -20, karma: -25 },
              },
            },
          ],
        },
      ],
    },
  },
];

/**
 * Combine with original interactive events
 */
export function getAllExpandedInteractiveEvents() {
  // This will be imported and combined with the original events
  return expandedInteractiveEvents;
}
