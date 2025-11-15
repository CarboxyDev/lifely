import type { RelationshipType, RelationshipStatus } from '../types';

export const relationshipTraits = [
  'Kind',
  'Funny',
  'Smart',
  'Caring',
  'Adventurous',
  'Creative',
  'Ambitious',
  'Loyal',
  'Generous',
  'Honest',
  'Patient',
  'Energetic',
  'Calm',
  'Optimistic',
  'Thoughtful',
  'Supportive',
  'Reliable',
  'Friendly',
  'Outgoing',
  'Reserved',
];

export const negativeTraits = [
  'Grumpy',
  'Selfish',
  'Lazy',
  'Impatient',
  'Stubborn',
  'Arrogant',
  'Pessimistic',
  'Unreliable',
  'Dishonest',
  'Critical',
];

export function getRelationshipStatus(quality: number): RelationshipStatus {
  if (quality >= 80) return 'excellent';
  if (quality >= 60) return 'good';
  if (quality >= 40) return 'neutral';
  if (quality >= 20) return 'poor';
  return 'terrible';
}

export function getStatusColor(status: RelationshipStatus): string {
  switch (status) {
    case 'excellent':
      return '#10b981'; // green
    case 'good':
      return '#3b82f6'; // blue
    case 'neutral':
      return '#f59e0b'; // amber
    case 'poor':
      return '#f97316'; // orange
    case 'terrible':
      return '#ef4444'; // red
  }
}

export function getRelationshipTypeLabel(type: RelationshipType): string {
  switch (type) {
    case 'parent':
      return 'Parent';
    case 'sibling':
      return 'Sibling';
    case 'spouse':
      return 'Spouse';
    case 'child':
      return 'Child';
    case 'friend':
      return 'Friend';
    case 'dating':
      return 'Dating';
    case 'ex':
      return 'Ex';
  }
}

export const interactionTypes = [
  {
    id: 'conversation',
    name: 'Have a Conversation',
    description: 'Spend time talking',
    cost: 0,
    qualityChange: { min: 2, max: 5 },
    duration: 'short',
  },
  {
    id: 'activity',
    name: 'Do an Activity Together',
    description: 'Spend quality time together',
    cost: 50,
    qualityChange: { min: 5, max: 10 },
    duration: 'medium',
  },
  {
    id: 'gift',
    name: 'Give a Gift',
    description: 'Show you care with a present',
    cost: 100,
    qualityChange: { min: 8, max: 15 },
    duration: 'short',
  },
  {
    id: 'support',
    name: 'Offer Support',
    description: 'Be there for them',
    cost: 0,
    qualityChange: { min: 10, max: 20 },
    duration: 'long',
  },
];

export const marriageRequirements = {
  minQuality: 80,
  minYearsKnown: 1,
  minAge: 18 * 12, // 18 years in months
};

export const datingRequirements = {
  minQuality: 60,
  minAge: 16 * 12, // 16 years in months
};

export function canMarry(quality: number, yearsKnown: number, userAge: number): boolean {
  return (
    quality >= marriageRequirements.minQuality &&
    yearsKnown >= marriageRequirements.minYearsKnown &&
    userAge >= marriageRequirements.minAge
  );
}

export function canStartDating(quality: number, userAge: number): boolean {
  return quality >= datingRequirements.minQuality && userAge >= datingRequirements.minAge;
}

export const conversationTopics = [
  'discussed your day',
  'shared funny stories',
  'talked about your dreams',
  'reminisced about old times',
  'shared your thoughts',
  'had a deep conversation',
  'caught up on life',
  'talked about hobbies',
  'discussed current events',
  'shared some laughs',
];

export const activityOptions = [
  'went to the movies',
  'had dinner together',
  'went for a walk',
  'played games',
  'went shopping',
  'visited a museum',
  'went to a concert',
  'had coffee',
  'went hiking',
  'cooked a meal together',
];

export const giftTypes = [
  'flowers',
  'a book',
  'jewelry',
  'chocolates',
  'a gadget',
  'a personalized gift',
  'concert tickets',
  'a watch',
  'perfume',
  'a handmade gift',
];
