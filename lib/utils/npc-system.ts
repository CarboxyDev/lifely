/**
 * NPC SYSTEM UTILITIES
 * Functions for generating, managing, and interacting with NPCs
 */

import type { NPC, NPCState, NPCInteraction, NPCMood, NPCArchetype } from '../types';
import type { NPCTemplate } from '../data/npcs';
import { getRandomNPCTemplate } from '../data/npcs';
import { randomChoice } from './game-utils';

/**
 * Generate a new NPC from a template
 */
export function generateNPC(
  template: NPCTemplate,
  currentAgeInDays: number
): NPC {
  // Random name from template options
  const name = randomChoice(template.nameOptions);

  // Random personality traits (1-3 from template)
  const numTraits = Math.floor(Math.random() * 2) + 1;
  const personality: typeof template.personality = [];
  const availableTraits = [...template.personality];
  for (let i = 0; i < numTraits && availableTraits.length > 0; i++) {
    const trait = randomChoice(availableTraits);
    personality.push(trait);
    availableTraits.splice(availableTraits.indexOf(trait), 1);
  }

  // Random occupation from template
  const occupation = randomChoice(template.occupation);

  // Random age within template range
  const age = Math.floor(Math.random() * (template.ageRange.max - template.ageRange.min + 1)) + template.ageRange.min;

  // Initial relationship from template range
  const relationshipScore = Math.floor(
    Math.random() * (template.initialRelationship.max - template.initialRelationship.min + 1)
  ) + template.initialRelationship.min;

  // Random backstory from template
  const backstory = randomChoice(template.backstoryTemplates);

  // Determine initial relationship status based on score
  let relationshipStatus: NPC['relationshipStatus'];
  if (relationshipScore >= 80) relationshipStatus = 'close-friend';
  else if (relationshipScore >= 60) relationshipStatus = 'friend';
  else if (relationshipScore >= 30) relationshipStatus = 'acquaintance';
  else relationshipStatus = 'stranger';

  return {
    id: `npc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    templateId: template.id,
    name,
    age,
    personality,
    occupation,
    archetype: template.archetype,
    relationshipScore,
    relationshipStatus,
    metAt: currentAgeInDays,
    lastInteraction: currentAgeInDays,
    totalInteractions: 0,
    currentMood: 'neutral',
    backstory,
    likes: [...template.likes],
    dislikes: [...template.dislikes],
    completedEvents: [],
    activeQuests: [],
    isQuestGiver: template.questGiver || false,
    isRomantic: false,
    isMarried: false,
    isAlive: true,
    hasMovedAway: false,
  };
}

/**
 * Interact with an NPC and update relationship
 */
export function interactWithNPC(
  npc: NPC,
  interactionType: NPCInteraction['type'],
  quality: 'positive' | 'neutral' | 'negative',
  currentAgeInDays: number,
  description: string
): {
  updatedNPC: NPC;
  interaction: NPCInteraction;
  relationshipChange: number;
} {
  // Calculate relationship change based on quality and personality
  let relationshipChange = 0;
  let newMood: NPCMood = npc.currentMood;

  switch (quality) {
    case 'positive':
      relationshipChange = 5 + Math.floor(Math.random() * 6); // 5-10
      if (npc.personality.includes('friendly')) relationshipChange += 2;
      if (npc.personality.includes('optimistic')) relationshipChange += 2;
      newMood = 'happy';
      break;
    case 'neutral':
      relationshipChange = Math.floor(Math.random() * 3) - 1; // -1 to 1
      newMood = 'neutral';
      break;
    case 'negative':
      relationshipChange = -5 - Math.floor(Math.random() * 6); // -5 to -10
      if (npc.personality.includes('cold')) relationshipChange -= 2;
      if (npc.personality.includes('pessimistic')) relationshipChange -= 2;
      newMood = Math.random() > 0.5 ? 'angry' : 'sad';
      break;
  }

  // Special interaction type bonuses
  if (interactionType === 'gift' && npc.personality.includes('generous')) {
    relationshipChange += 3;
  }
  if (interactionType === 'date' && npc.personality.includes('romantic')) {
    relationshipChange += 5;
  }

  // Update NPC
  const newRelationshipScore = Math.max(0, Math.min(100, npc.relationshipScore + relationshipChange));
  let newRelationshipStatus: NPC['relationshipStatus'] = npc.relationshipStatus;

  // Update relationship status based on new score
  if (newRelationshipScore >= 90 && npc.archetype === 'love-interest') {
    newRelationshipStatus = 'romantic';
  } else if (newRelationshipScore >= 80) {
    newRelationshipStatus = 'close-friend';
  } else if (newRelationshipScore >= 60) {
    newRelationshipStatus = 'friend';
  } else if (newRelationshipScore >= 30) {
    newRelationshipStatus = 'acquaintance';
  } else if (newRelationshipScore < 20) {
    newRelationshipStatus = 'enemy';
  } else {
    newRelationshipStatus = 'stranger';
  }

  const updatedNPC: NPC = {
    ...npc,
    relationshipScore: newRelationshipScore,
    relationshipStatus: newRelationshipStatus,
    lastInteraction: currentAgeInDays,
    totalInteractions: npc.totalInteractions + 1,
    currentMood: newMood,
  };

  const interaction: NPCInteraction = {
    id: `interaction_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    npcId: npc.id,
    type: interactionType,
    timestamp: Date.now(),
    ageInDays: currentAgeInDays,
    relationshipChange,
    moodChange: newMood,
    description,
    outcomeType: quality,
  };

  return {
    updatedNPC,
    interaction,
    relationshipChange,
  };
}

/**
 * Check if NPC relationship has decayed (from neglect)
 */
export function checkRelationshipDecay(
  npc: NPC,
  currentAgeInDays: number
): { shouldDecay: boolean; decayAmount: number } {
  const daysSinceLastInteraction = currentAgeInDays - npc.lastInteraction;

  // Decay starts after 30 days of no interaction
  if (daysSinceLastInteraction < 30) {
    return { shouldDecay: false, decayAmount: 0 };
  }

  // More decay for best friends and romantic partners
  let decayRate = 1;
  if (npc.relationshipStatus === 'close-friend' || npc.relationshipStatus === 'romantic') {
    decayRate = 2;
  }

  // Loyal personalities decay slower
  if (npc.personality.includes('loyal')) {
    decayRate *= 0.5;
  }

  const decayAmount = Math.floor((daysSinceLastInteraction - 30) / 30) * decayRate;

  return {
    shouldDecay: decayAmount > 0,
    decayAmount: -decayAmount,
  };
}

/**
 * Apply relationship decay to NPC
 */
export function applyRelationshipDecay(npc: NPC, decayAmount: number): NPC {
  const newScore = Math.max(0, npc.relationshipScore + decayAmount);

  let newStatus: NPC['relationshipStatus'] = npc.relationshipStatus;
  if (newScore >= 80) newStatus = 'close-friend';
  else if (newScore >= 60) newStatus = 'friend';
  else if (newScore >= 30) newStatus = 'acquaintance';
  else newStatus = 'stranger';

  return {
    ...npc,
    relationshipScore: newScore,
    relationshipStatus: newStatus,
  };
}

/**
 * Get available NPCs for a specific archetype
 */
export function getAvailableNPCs(npcState: NPCState, archetype: NPCArchetype): NPC[] {
  return npcState.knownNPCs.filter(
    npc => npc.archetype === archetype && npc.isAlive && !npc.hasMovedAway
  );
}

/**
 * Get NPC by ID
 */
export function getNPCById(npcState: NPCState, npcId: string): NPC | undefined {
  return npcState.knownNPCs.find(npc => npc.id === npcId);
}

/**
 * Add NPC to state
 */
export function addNPC(npcState: NPCState, npc: NPC): NPCState {
  return {
    ...npcState,
    knownNPCs: [...npcState.knownNPCs, npc],
    totalNPCsMet: npcState.totalNPCsMet + 1,
  };
}

/**
 * Update NPC in state
 */
export function updateNPC(npcState: NPCState, updatedNPC: NPC): NPCState {
  return {
    ...npcState,
    knownNPCs: npcState.knownNPCs.map(npc =>
      npc.id === updatedNPC.id ? updatedNPC : npc
    ),
  };
}

/**
 * Add interaction to state
 */
export function addInteraction(
  npcState: NPCState,
  interaction: NPCInteraction
): NPCState {
  return {
    ...npcState,
    interactions: [...npcState.interactions, interaction],
  };
}

/**
 * Get interactions with specific NPC
 */
export function getNPCInteractions(
  npcState: NPCState,
  npcId: string,
  limit?: number
): NPCInteraction[] {
  const interactions = npcState.interactions
    .filter(i => i.npcId === npcId)
    .sort((a, b) => b.timestamp - a.timestamp);

  return limit ? interactions.slice(0, limit) : interactions;
}

/**
 * Get NPC mood description
 */
export function getMoodDescription(mood: NPCMood): string {
  const descriptions: Record<NPCMood, string> = {
    happy: 'They seem cheerful and content.',
    neutral: 'They appear calm and collected.',
    sad: 'They look down and melancholy.',
    angry: 'They seem irritated and tense.',
    excited: 'They are enthusiastic and energetic.',
    stressed: 'They appear worried and overwhelmed.',
  };
  return descriptions[mood];
}

/**
 * Get relationship status description
 */
export function getRelationshipDescription(status: NPC['relationshipStatus']): string {
  const descriptions: Record<NPC['relationshipStatus'], string> = {
    stranger: 'You barely know each other.',
    acquaintance: 'You know each other casually.',
    friend: 'You are friends.',
    'close-friend': 'You are close friends.',
    romantic: 'You are romantically involved.',
    enemy: 'You have a hostile relationship.',
  };
  return descriptions[status];
}

/**
 * Generate encounter with random NPC or create new one
 */
export function generateNPCEncounter(
  npcState: NPCState,
  currentAgeInDays: number,
  preferredArchetype?: NPCArchetype
): { npc: NPC; isNewNPC: boolean } {
  // 70% chance to encounter existing NPC, 30% chance for new
  const useExisting = Math.random() < 0.7 && npcState.knownNPCs.length > 0;

  if (useExisting) {
    // Filter to alive NPCs who haven't moved away
    const availableNPCs = npcState.knownNPCs.filter(
      npc => npc.isAlive && !npc.hasMovedAway
    );

    if (availableNPCs.length > 0) {
      const npc = randomChoice(availableNPCs);
      return { npc, isNewNPC: false };
    }
  }

  // Generate new NPC
  const template = getRandomNPCTemplate(preferredArchetype);
  const npc = generateNPC(template, currentAgeInDays);
  return { npc, isNewNPC: true };
}
