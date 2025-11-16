import type { InteractiveEvent } from './interactive-events';

/**
 * THEMED INTERACTIVE EVENTS
 * Mystery, RPG Quests, Moral Dilemmas, and Deep Choices
 */

export const themedInteractiveEvents: InteractiveEvent[] = [
  // ===== MYSTERY EVENTS =====
  {
    id: 'mysterious-letter',
    category: 'mystery',
    severity: 'moderate',
    dailyChance: 0.02,
    title: 'Anonymous Letter',
    description: 'An unmarked envelope contains a letter claiming you have a secret admirer.',
    type: 'multi-stage',
    multiStage: {
      stages: [
        {
          prompt: 'The letter asks you to meet at a café. Go?',
          choices: [
            {
              text: 'Go to the meeting',
              requiresCheck: {
                diceType: 'd20',
                rollCount: 1,
                difficulty: 10,
                successOutcome: {
                  title: 'Genuine Admirer',
                  description: 'It was someone genuinely interested in you! Started dating.',
                  effects: { morale: 25, looks: 5 },
                },
                failureOutcome: {
                  title: 'Catfish Scam',
                  description: 'It was a scam artist trying to steal from you. Got away before they could.',
                  effects: { morale: -15, karma: -5 },
                },
                criticalFailure: {
                  title: 'Robbed',
                  description: 'You were drugged and robbed. Woke up with nothing.',
                  effects: { health: -20, money: -1000, morale: -30 },
                },
              },
            },
            {
              text: 'Investigate first',
              requiresCheck: {
                attribute: 'intellect',
                difficulty: 60,
                successOutcome: {
                  title: 'Smart Move',
                  description: 'Research revealed it was a scam. Dodged a bullet!',
                  effects: { morale: 10, intellect: 3 },
                },
                failureOutcome: {
                  title: 'Nothing Found',
                  description: 'Couldn\'t find info. Mystery remains.',
                  effects: { morale: -5 },
                },
              },
            },
            {
              text: 'Ignore it',
              outcome: {
                title: 'Cautious',
                description: 'Better safe than sorry. Probably the right call.',
                effects: { morale: 2 },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'haunted-house-dare',
    category: 'mystery',
    severity: 'moderate',
    dailyChance: 0.01,
    title: 'Abandoned House Challenge',
    description: 'Friends dare you to spend 1 hour in the "haunted" abandoned house for $500.',
    type: 'dice-challenge',
    diceChallenge: {
      diceType: 'd20',
      rollCount: 1,
      difficulty: 11,
      criticalSuccess: {
        title: 'Found Treasure',
        description: 'You found a hidden stash of old valuables! Worth way more than $500!',
        effects: { money: 2500, morale: 30 },
      },
      successOutcome: {
        title: 'Lasted the Hour',
        description: 'Nothing happened. Easiest $500 you ever made.',
        effects: { money: 500, morale: 15 },
      },
      failureOutcome: {
        title: 'Spooked Out',
        description: 'Strange noises freaked you out. Left after 30 minutes. No money.',
        effects: { morale: -10 },
      },
      criticalFailure: {
        title: 'Floor Collapse',
        description: 'The floor gave way! Fell through and got injured.',
        effects: { health: -25, money: -800, morale: -20 },
      },
    },
  },
  {
    id: 'detective-mystery',
    category: 'mystery',
    severity: 'major',
    dailyChance: 0.005,
    title: 'Amateur Detective',
    description: 'Neighborhood valuables are being stolen. Use your intellect to catch the thief?',
    type: 'attribute-check',
    attributeCheck: {
      attribute: 'intellect',
      difficulty: 75,
      successOutcome: {
        title: 'Case Solved!',
        description: 'You figured it out and caught the thief! Neighborhood hero. Reward offered.',
        effects: { intellect: 10, morale: 30, karma: 40, money: 1500 },
      },
      failureOutcome: {
        title: 'Stumped',
        description: 'Couldn\'t crack the case. Thefts continue.',
        effects: { morale: -12 },
      },
    },
  },

  // ===== RPG QUEST EVENTS =====
  {
    id: 'lost-cat-quest',
    category: 'encounter',
    severity: 'minor',
    dailyChance: 0.05,
    title: 'Lost Cat Poster',
    description: 'Someone posted a $200 reward for finding their lost cat.',
    type: 'multi-stage',
    multiStage: {
      stages: [
        {
          prompt: 'Search for the cat?',
          choices: [
            {
              text: 'Search the neighborhood',
              requiresCheck: {
                diceType: 'd20',
                rollCount: 1,
                difficulty: 12,
                successOutcome: {
                  title: 'Cat Found!',
                  description: 'You found the cat! Owner is overjoyed. Got reward plus tip!',
                  effects: { money: 250, morale: 20, karma: 25 },
                },
                failureOutcome: {
                  title: 'No Luck',
                  description: 'Searched for hours but no cat. At least you tried.',
                  effects: { morale: -5, karma: 5 },
                },
              },
            },
            {
              text: 'Post on social media',
              outcome: {
                title: 'Spread the Word',
                description: 'Your post was shared. Owner is grateful even though cat wasn\'t found yet.',
                effects: { morale: 8, karma: 10 },
              },
            },
            {
              text: 'Ignore it',
              outcome: {
                title: 'Not Your Problem',
                description: 'You had other things to do.',
                effects: {},
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'elderly-help-quest',
    category: 'encounter',
    severity: 'minor',
    dailyChance: 0.04,
    title: 'Elderly Neighbor Needs Help',
    description: 'Your elderly neighbor needs help moving furniture. No payment, just goodwill.',
    type: 'attribute-check',
    attributeCheck: {
      attribute: 'health',
      difficulty: 50,
      successOutcome: {
        title: 'Helped Successfully',
        description: 'You helped them out. They baked you cookies and spread word of your kindness!',
        effects: { health: -3, morale: 18, karma: 30 },
      },
      failureOutcome: {
        title: 'Threw Out Back',
        description: 'You tried but hurt yourself. They feel bad.',
        effects: { health: -15, morale: -10 },
      },
    },
  },
  {
    id: 'treasure-map-find',
    category: 'discovery',
    severity: 'major',
    dailyChance: 0.003,
    title: 'Treasure Map Discovery',
    description: 'You found what appears to be an old treasure map at a flea market for $50.',
    type: 'multi-stage',
    requirements: { minWealth: 50 },
    multiStage: {
      stages: [
        {
          prompt: 'Buy the map and investigate?',
          choices: [
            {
              text: 'Buy map and follow it',
              requiresCheck: {
                diceType: 'd100',
                rollCount: 1,
                difficulty: 80,
                criticalSuccess: {
                  title: 'Real Treasure!',
                  description: 'It was real! You found a buried cache worth $25,000!',
                  effects: { money: 24950, morale: 50, intellect: 5 },
                },
                successOutcome: {
                  title: 'Small Find',
                  description: 'Found some old coins and collectibles. Worth about $500.',
                  effects: { money: 450, morale: 20 },
                },
                failureOutcome: {
                  title: 'Wild Goose Chase',
                  description: 'Map led nowhere. Wasted time and money.',
                  effects: { money: -50, morale: -15 },
                },
              },
            },
            {
              text: 'Have it appraised first',
              requiresCheck: {
                attribute: 'intellect',
                difficulty: 65,
                successOutcome: {
                  title: 'Valuable Map',
                  description: 'Appraiser says the map itself is valuable! Sold it for $800!',
                  effects: { money: 750, morale: 15, intellect: 3 },
                },
                failureOutcome: {
                  title: 'Fake',
                  description: 'Appraiser confirms it\'s a fake. Saved yourself $50.',
                  effects: { morale: 5, intellect: 2 },
                },
              },
            },
            {
              text: 'Don\'t buy it',
              outcome: {
                title: 'Skeptical',
                description: 'Probably just a tourist trap anyway.',
                effects: {},
              },
            },
          ],
        },
      ],
    },
  },

  // ===== DEEP MORAL DILEMMAS =====
  {
    id: 'hit-and-run-witness',
    category: 'encounter',
    severity: 'major',
    dailyChance: 0.008,
    title: 'Hit and Run Witness',
    description: 'You witnessed a hit-and-run. The driver is someone you know.',
    type: 'multi-stage',
    multiStage: {
      stages: [
        {
          prompt: 'What do you do?',
          choices: [
            {
              text: 'Report them to police',
              outcome: {
                title: 'Did the Right Thing',
                description: 'Justice was served but they hate you now. Difficult but right choice.',
                effects: { morale: -10, karma: 50 },
              },
            },
            {
              text: 'Confront them privately',
              requiresCheck: {
                attribute: 'morale',
                difficulty: 70,
                successOutcome: {
                  title: 'They Turned Themselves In',
                  description: 'Your words convinced them to do the right thing. Justice served, relationship strained but intact.',
                  effects: { morale: 15, karma: 40 },
                },
                failureOutcome: {
                  title: 'They Denied It',
                  description: 'They angrily denied everything and cut you off.',
                  effects: { morale: -20, karma: -10 },
                },
              },
            },
            {
              text: 'Say nothing',
              outcome: {
                title: 'Stayed Silent',
                description: 'You protected them but feel immense guilt. The victim\'s family suffers.',
                effects: { morale: -30, karma: -60 },
              },
            },
            {
              text: 'Anonymous tip',
              outcome: {
                title: 'Compromised',
                description: 'Tipped police anonymously. Justice served, relationship intact but you feel like a coward.',
                effects: { morale: -5, karma: 35 },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'whistleblower-dilemma',
    category: 'career',
    severity: 'major',
    dailyChance: 0.005,
    title: 'Corporate Fraud Discovery',
    description: 'You discovered your company is defrauding customers. Report it and lose your job?',
    type: 'multi-stage',
    requirements: { hasJob: true },
    multiStage: {
      stages: [
        {
          prompt: 'Blow the whistle?',
          choices: [
            {
              text: 'Report to authorities',
              outcome: {
                title: 'Whistleblower',
                description: 'You got fired and blacklisted in the industry, but stopped the fraud. Heroes don\'t always win.',
                effects: { money: -5000, morale: -20, karma: 80 },
              },
            },
            {
              text: 'Report to media',
              requiresCheck: {
                diceType: 'd20',
                rollCount: 1,
                difficulty: 14,
                successOutcome: {
                  title: 'Protected Whistleblower',
                  description: 'Media attention protected you. Company shut down, you found better job!',
                  effects: { money: 10000, morale: 35, karma: 75 },
                },
                failureOutcome: {
                  title: 'Retaliation',
                  description: 'Company destroyed your reputation. Can\'t find work.',
                  effects: { money: -8000, morale: -40, karma: 60 },
                },
              },
            },
            {
              text: 'Anonymously leak',
              requiresCheck: {
                attribute: 'intellect',
                difficulty: 75,
                successOutcome: {
                  title: 'Smart Leak',
                  description: 'Investigation started, you stayed hidden. Best outcome.',
                  effects: { morale: 10, karma: 70 },
                },
                failureOutcome: {
                  title: 'Traced Back',
                  description: 'They figured out it was you. Fired and sued.',
                  effects: { money: -12000, morale: -35, karma: 55 },
                },
              },
            },
            {
              text: 'Stay silent',
              outcome: {
                title: 'Complicit',
                description: 'Kept your job but thousands were defrauded. Can you live with this?',
                effects: { money: 2000, morale: -40, karma: -80 },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'trolley-problem-real',
    category: 'accident',
    severity: 'major',
    dailyChance: 0.001,
    title: 'Runaway Vehicle',
    description: 'A driverless vehicle is heading toward 5 people. You can redirect it but it will hit 1 person instead.',
    type: 'multi-stage',
    multiStage: {
      stages: [
        {
          prompt: 'Do nothing and 5 die, or act and cause 1 death?',
          choices: [
            {
              text: 'Redirect to save the 5',
              outcome: {
                title: 'Utilitarian Choice',
                description: 'You saved 5 lives but caused 1 death. 5 families grateful, 1 blames you. Can\'t sleep.',
                effects: { morale: -25, karma: 30 },
              },
            },
            {
              text: 'Do nothing',
              outcome: {
                title: 'Frozen in Fear',
                description: '5 people died. You didn\'t kill them but you could have saved them. Trauma.',
                effects: { morale: -40, karma: -25, health: -10 },
              },
            },
            {
              text: 'Try to stop it yourself',
              requiresCheck: {
                diceType: 'd20',
                rollCount: 1,
                difficulty: 18,
                criticalSuccess: {
                  title: 'Heroic Save',
                  description: 'You stopped the vehicle! Everyone saved! Local hero!',
                  effects: { morale: 45, karma: 100, health: -5 },
                },
                successOutcome: {
                  title: 'Partial Success',
                  description: 'Managed to slow it enough for most to escape. 2 died instead of 5 or 1.',
                  effects: { morale: -10, karma: 45, health: -15 },
                },
                failureOutcome: {
                  title: 'Failed Attempt',
                  description: 'Tried but couldn\'t stop it. All 5 still died. You got injured trying.',
                  effects: { health: -30, morale: -35, karma: 15 },
                },
                criticalFailure: {
                  title: 'Made It Worse',
                  description: 'Your intervention made it hit even more people. 7 dead. Your fault.',
                  effects: { health: -25, morale: -60, karma: -100 },
                },
              },
            },
          ],
        },
      ],
    },
  },

  // ===== SKILL-BASED CHALLENGES =====
  {
    id: 'hacking-challenge',
    category: 'opportunity',
    severity: 'major',
    dailyChance: 0.01,
    title: 'Hacker Job Offer',
    description: 'Someone offers $5,000 to hack a company database. Claims it\'s "ethical hacking" for security testing.',
    type: 'multi-stage',
    requirements: { minIntellect: 60 },
    multiStage: {
      stages: [
        {
          prompt: 'Accept the job?',
          choices: [
            {
              text: 'Accept and hack it',
              requiresCheck: {
                attribute: 'intellect',
                difficulty: 80,
                successOutcome: {
                  title: 'Successful Hack',
                  description: 'Got the data, got paid. But was it really ethical? Unsure.',
                  effects: { money: 5000, intellect: 8, morale: -10, karma: -20 },
                },
                failureOutcome: {
                  title: 'Caught by FBI',
                  description: 'It was a sting operation. You\'re facing serious charges.',
                  effects: { money: -10000, morale: -45, karma: -50 },
                },
              },
            },
            {
              text: 'Report offer to authorities',
              outcome: {
                title: 'Good Citizen',
                description: 'Turned out it was illegal. FBI thanked you for the tip.',
                effects: { morale: 15, karma: 40 },
              },
            },
            {
              text: 'Decline',
              outcome: {
                title: 'Stayed Safe',
                description: 'Too risky. Better opportunities will come.',
                effects: { morale: 3 },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'medical-emergency',
    category: 'encounter',
    severity: 'major',
    dailyChance: 0.006,
    title: 'Medical Emergency',
    description: 'Someone collapses near you. They need CPR. Do you know how?',
    type: 'dice-challenge',
    diceChallenge: {
      diceType: 'd20',
      rollCount: 1,
      difficulty: 13,
      hasAdvantage: false, // Could add hasAdvantage if player has medical training perk
      criticalSuccess: {
        title: 'Life Saved!',
        description: 'Perfect CPR! You saved their life. Paramedics said you did everything right. Hero!',
        effects: { morale: 40, karma: 100 },
      },
      successOutcome: {
        title: 'Stabilized',
        description: 'Your CPR kept them alive until paramedics arrived. You saved them!',
        effects: { morale: 30, karma: 80 },
      },
      failureOutcome: {
        title: 'Tried But Failed',
        description: 'Despite your efforts, they didn\'t make it. Paramedics say you did what you could.',
        effects: { morale: -25, karma: 20 },
      },
      criticalFailure: {
        title: 'Tragic Outcome',
        description: 'You panicked and did it wrong. Might have made it worse. Haunts you.',
        effects: { morale: -45, karma: -10 },
      },
    },
  },

  // ===== RELATIONSHIP EVENTS =====
  {
    id: 'best-friend-betrayal',
    category: 'betrayal',
    severity: 'major',
    dailyChance: 0.004,
    title: 'Friend\'s Betrayal',
    description: 'Your best friend has been spreading rumors about you.',
    type: 'multi-stage',
    multiStage: {
      stages: [
        {
          prompt: 'How do you confront them?',
          choices: [
            {
              text: 'Confront publicly',
              outcome: {
                title: 'Public Confrontation',
                description: 'Made a scene. They denied it. Both of you look bad.',
                effects: { morale: -20, karma: -15 },
              },
            },
            {
              text: 'Talk privately',
              requiresCheck: {
                attribute: 'morale',
                difficulty: 65,
                successOutcome: {
                  title: 'Honest Conversation',
                  description: 'They broke down and admitted jealousy. Worked through it. Friendship deeper now.',
                  effects: { morale: 10, karma: 25 },
                },
                failureOutcome: {
                  title: 'Friendship Over',
                  description: 'They got defensive and ended the friendship. Hurts.',
                  effects: { morale: -30 },
                },
              },
            },
            {
              text: 'Cut them off silently',
              outcome: {
                title: 'Ghost Them',
                description: 'Just stopped talking to them. No closure for either of you.',
                effects: { morale: -15, karma: -10 },
              },
            },
            {
              text: 'Forgive and move on',
              outcome: {
                title: 'High Road',
                description: 'You chose to forgive without confronting. Rumors stopped. Peace > being right.',
                effects: { morale: 5, karma: 35 },
              },
            },
          ],
        },
      ],
    },
  },
];

export function getThemedInteractiveEvents() {
  return themedInteractiveEvents;
}
