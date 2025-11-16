/**
 * NPC SYSTEM - Named Characters with Personalities
 * Persistent characters with backstories, traits, and dynamic relationships
 */

export type NPCPersonality =
  | 'friendly' | 'cold' | 'ambitious' | 'lazy' | 'loyal' | 'manipulative'
  | 'generous' | 'stingy' | 'optimistic' | 'pessimistic' | 'romantic' | 'stoic'
  | 'adventurous' | 'cautious' | 'intellectual' | 'athletic' | 'artistic' | 'materialistic';

export type NPCOccupation =
  | 'student' | 'teacher' | 'doctor' | 'lawyer' | 'engineer' | 'artist'
  | 'business-owner' | 'manager' | 'retail-worker' | 'bartender' | 'chef'
  | 'musician' | 'writer' | 'scientist' | 'athlete' | 'politician'
  | 'unemployed' | 'retired';

export type NPCArchetype =
  | 'mentor' | 'rival' | 'love-interest' | 'best-friend' | 'family'
  | 'boss' | 'coworker' | 'neighbor' | 'stranger' | 'enemy';

export interface NPCTemplate {
  id: string;
  nameOptions: string[];
  personality: NPCPersonality[];
  occupation: NPCOccupation[];
  archetype: NPCArchetype;
  ageRange: { min: number; max: number };

  // Starting relationship
  initialRelationship: { min: number; max: number }; // 0-100

  // Backstory templates
  backstoryTemplates: string[];

  // Interaction preferences
  likes: string[]; // Activities/topics they enjoy
  dislikes: string[]; // Things that upset them

  // Special interactions
  specialEvents?: string[]; // Unique event IDs this NPC can trigger
  questGiver?: boolean; // Can they give quests?
}

/**
 * MENTOR NPCS
 * Older, wiser characters who can guide the player
 */
export const mentorNPCs: NPCTemplate[] = [
  {
    id: 'professor-sage',
    nameOptions: ['Dr. Eleanor Hayes', 'Prof. Marcus Chen', 'Dr. Sarah Williams'],
    personality: ['intellectual', 'optimistic', 'generous'],
    occupation: ['teacher', 'scientist'],
    archetype: 'mentor',
    ageRange: { min: 45, max: 65 },
    initialRelationship: { min: 60, max: 75 },
    backstoryTemplates: [
      'A renowned professor who sees potential in you.',
      'Former industry leader now dedicated to teaching.',
      'Published researcher passionate about mentoring.',
    ],
    likes: ['study', 'research', 'intellectual-discussion', 'library'],
    dislikes: ['laziness', 'dishonesty', 'anti-intellectualism'],
    specialEvents: ['research-opportunity', 'letter-of-recommendation', 'academic-guidance'],
    questGiver: true,
  },
  {
    id: 'business-mentor',
    nameOptions: ['James Sterling', 'Victoria Chen', 'Robert Blackwell'],
    personality: ['ambitious', 'stoic', 'materialistic'],
    occupation: ['business-owner', 'manager'],
    archetype: 'mentor',
    ageRange: { min: 40, max: 60 },
    initialRelationship: { min: 50, max: 70 },
    backstoryTemplates: [
      'Self-made millionaire willing to share wisdom.',
      'Successful entrepreneur who started from nothing.',
      'Former CEO now consulting and mentoring.',
    ],
    likes: ['networking', 'business-discussion', 'investment-talk', 'golf'],
    dislikes: ['excuses', 'lack-of-ambition', 'poor-work-ethic'],
    specialEvents: ['business-opportunity', 'investment-tip', 'career-advice'],
    questGiver: true,
  },
];

/**
 * LOVE INTEREST NPCS
 * Potential romantic partners with unique personalities
 */
export const loveInterestNPCs: NPCTemplate[] = [
  {
    id: 'creative-soul',
    nameOptions: ['Alex Rivera', 'Jordan Lee', 'Casey Morgan'],
    personality: ['artistic', 'romantic', 'adventurous'],
    occupation: ['artist', 'musician', 'writer'],
    archetype: 'love-interest',
    ageRange: { min: 20, max: 35 },
    initialRelationship: { min: 30, max: 50 },
    backstoryTemplates: [
      'Aspiring artist with big dreams and bigger heart.',
      'Passionate musician performing at local venues.',
      'Writer working on their first novel.',
    ],
    likes: ['art-gallery', 'concerts', 'deep-conversations', 'travel'],
    dislikes: ['materialism', 'routine', 'corporate-culture'],
    specialEvents: ['romantic-date', 'creative-collaboration', 'heartfelt-confession'],
  },
  {
    id: 'ambitious-professional',
    nameOptions: ['Emily Chen', 'Michael Torres', 'Sophia Johnson'],
    personality: ['ambitious', 'intellectual', 'optimistic'],
    occupation: ['lawyer', 'doctor', 'engineer'],
    archetype: 'love-interest',
    ageRange: { min: 25, max: 40 },
    initialRelationship: { min: 35, max: 55 },
    backstoryTemplates: [
      'High-achieving professional balancing career and personal life.',
      'Dedicated to their career but yearns for connection.',
      'Successful in work, searching for meaning beyond.',
    ],
    likes: ['intellectual-discussion', 'fine-dining', 'fitness', 'travel'],
    dislikes: ['laziness', 'unreliability', 'lack-of-ambition'],
    specialEvents: ['power-couple-moment', 'career-support', 'romantic-getaway'],
  },
];

/**
 * RIVAL NPCS
 * Competitive characters who push the player
 */
export const rivalNPCs: NPCTemplate[] = [
  {
    id: 'competitive-colleague',
    nameOptions: ['Derek Hamilton', 'Madison Pierce', 'Trevor Stone'],
    personality: ['ambitious', 'manipulative', 'cold'],
    occupation: ['manager', 'lawyer', 'business-owner'],
    archetype: 'rival',
    ageRange: { min: 25, max: 40 },
    initialRelationship: { min: 20, max: 40 },
    backstoryTemplates: [
      'Ruthless competitor who always needs to win.',
      'Former friend turned professional rival.',
      'Office politician skilled at getting ahead.',
    ],
    likes: ['competition', 'winning', 'status-symbols'],
    dislikes: ['losing', 'your-success', 'cooperation'],
    specialEvents: ['office-sabotage', 'competitive-challenge', 'public-rivalry'],
  },
  {
    id: 'athletic-rival',
    nameOptions: ['Jake Morrison', 'Brittany Chase', 'Marcus Strong'],
    personality: ['athletic', 'ambitious', 'stoic'],
    occupation: ['athlete', 'student'],
    archetype: 'rival',
    ageRange: { min: 18, max: 30 },
    initialRelationship: { min: 25, max: 45 },
    backstoryTemplates: [
      'Natural athlete who thrives on competition.',
      'Gym regular who sees you as competition.',
      'Former sports star maintaining dominance.',
    ],
    likes: ['sports', 'fitness', 'competition'],
    dislikes: ['weakness', 'excuses', 'poor-sportsmanship'],
    specialEvents: ['fitness-challenge', 'sports-showdown', 'respect-earned'],
  },
];

/**
 * BEST FRIEND NPCS
 * Loyal companions through thick and thin
 */
export const bestFriendNPCs: NPCTemplate[] = [
  {
    id: 'loyal-companion',
    nameOptions: ['Sam Peterson', 'Riley Martinez', 'Chris Anderson'],
    personality: ['loyal', 'optimistic', 'friendly'],
    occupation: ['student', 'retail-worker', 'artist'],
    archetype: 'best-friend',
    ageRange: { min: 18, max: 35 },
    initialRelationship: { min: 70, max: 90 },
    backstoryTemplates: [
      'Childhood friend who knows you better than anyone.',
      'College roommate who became family.',
      'Met during tough times and bonded instantly.',
    ],
    likes: ['hanging-out', 'video-games', 'movies', 'honest-talks'],
    dislikes: ['betrayal', 'lies', 'neglect'],
    specialEvents: ['friend-emergency', 'best-friend-support', 'unforgettable-memory'],
  },
  {
    id: 'party-friend',
    nameOptions: ['Danny Fox', 'Mia Santos', 'Tyler West'],
    personality: ['adventurous', 'optimistic', 'romantic'],
    occupation: ['bartender', 'musician', 'student'],
    archetype: 'best-friend',
    ageRange: { min: 20, max: 30 },
    initialRelationship: { min: 60, max: 80 },
    backstoryTemplates: [
      'The life of every party who drags you into adventures.',
      'Free spirit who brings excitement to your life.',
      'Social butterfly who introduced you to everyone.',
    ],
    likes: ['parties', 'concerts', 'spontaneous-plans', 'adventures'],
    dislikes: ['boring-routine', 'staying-home', 'serious-talk'],
    specialEvents: ['wild-night-out', 'spontaneous-trip', 'party-disaster'],
  },
];

/**
 * FAMILY NPCS
 * Family members with complex relationships
 */
export const familyNPCs: NPCTemplate[] = [
  {
    id: 'supportive-parent',
    nameOptions: ['Margaret', 'David', 'Linda', 'Robert'],
    personality: ['generous', 'optimistic', 'loyal'],
    occupation: ['retired', 'teacher', 'business-owner'],
    archetype: 'family',
    ageRange: { min: 45, max: 70 },
    initialRelationship: { min: 75, max: 95 },
    backstoryTemplates: [
      'Your parent who always believed in you.',
      'Working hard to provide for the family.',
      'Sacrificed everything for your success.',
    ],
    likes: ['family-time', 'your-success', 'grandchildren'],
    dislikes: ['worry', 'bad-influences', 'risky-behavior'],
    specialEvents: ['family-emergency', 'parental-advice', 'inheritance'],
  },
  {
    id: 'troubled-sibling',
    nameOptions: ['Jason', 'Emma', 'Kyle', 'Sarah'],
    personality: ['pessimistic', 'lazy', 'manipulative'],
    occupation: ['unemployed', 'retail-worker', 'student'],
    archetype: 'family',
    ageRange: { min: 16, max: 30 },
    initialRelationship: { min: 40, max: 70 },
    backstoryTemplates: [
      'Your sibling who always struggles.',
      'Family member who makes poor choices.',
      'Younger sibling who needs guidance.',
    ],
    likes: ['money', 'help', 'second-chances'],
    dislikes: ['lectures', 'success-comparisons', 'responsibility'],
    specialEvents: ['sibling-trouble', 'loan-request', 'family-intervention'],
  },
];

/**
 * COWORKER NPCS
 * People you work with daily
 */
export const coworkerNPCs: NPCTemplate[] = [
  {
    id: 'office-gossip',
    nameOptions: ['Karen White', 'Brad Cooper', 'Tiffany Mills'],
    personality: ['friendly', 'manipulative', 'optimistic'],
    occupation: ['manager', 'retail-worker'],
    archetype: 'coworker',
    ageRange: { min: 25, max: 45 },
    initialRelationship: { min: 45, max: 65 },
    backstoryTemplates: [
      'Office social hub who knows everything about everyone.',
      'Been here forever and has all the dirt.',
      'Friendly but uses information strategically.',
    ],
    likes: ['gossip', 'office-politics', 'drama'],
    dislikes: ['secrets', 'being-left-out', 'quiet-people'],
    specialEvents: ['office-drama', 'secret-revealed', 'alliance-offer'],
  },
  {
    id: 'hardworking-colleague',
    nameOptions: ['Jessica Park', 'Omar Hassan', 'Rachel Green'],
    personality: ['ambitious', 'stoic', 'loyal'],
    occupation: ['manager', 'engineer', 'teacher'],
    archetype: 'coworker',
    ageRange: { min: 25, max: 40 },
    initialRelationship: { min: 50, max: 70 },
    backstoryTemplates: [
      'Dedicated professional who respects hard work.',
      'Climbed the ladder through merit alone.',
      'Values competence and integrity above all.',
    ],
    likes: ['productivity', 'professionalism', 'teamwork'],
    dislikes: ['laziness', 'office-politics', 'incompetence'],
    specialEvents: ['work-collaboration', 'project-success', 'mutual-respect'],
  },
];

/**
 * ALL NPC TEMPLATES
 */
export const allNPCTemplates: NPCTemplate[] = [
  ...mentorNPCs,
  ...loveInterestNPCs,
  ...rivalNPCs,
  ...bestFriendNPCs,
  ...familyNPCs,
  ...coworkerNPCs,
];

/**
 * Get NPCs by archetype
 */
export function getNPCsByArchetype(archetype: NPCArchetype): NPCTemplate[] {
  return allNPCTemplates.filter(npc => npc.archetype === archetype);
}

/**
 * Get random NPC template
 */
export function getRandomNPCTemplate(archetype?: NPCArchetype): NPCTemplate {
  const pool = archetype
    ? getNPCsByArchetype(archetype)
    : allNPCTemplates;

  return pool[Math.floor(Math.random() * pool.length)];
}
