import type { PetType, PetPersonality, PetCareActivity } from '../types';
import { randomChoice } from '../utils/game-utils';

export interface PetDefinition {
  type: PetType;
  adoptionCost: number;
  monthlyCost: number; // food and basic care
  lifespan: number; // average lifespan in months
  moraleBonus: number; // passive morale boost per month
  description: string;
  commonNames: string[];
}

export const petDefinitions: Record<PetType, PetDefinition> = {
  dog: {
    type: 'dog',
    adoptionCost: 500,
    monthlyCost: 100,
    lifespan: 144, // 12 years
    moraleBonus: 5,
    description: 'Loyal companion, requires daily walks and attention',
    commonNames: ['Max', 'Bella', 'Charlie', 'Luna', 'Cooper', 'Daisy', 'Rocky', 'Sadie'],
  },
  cat: {
    type: 'cat',
    adoptionCost: 300,
    monthlyCost: 60,
    lifespan: 180, // 15 years
    moraleBonus: 3,
    description: 'Independent pet, low maintenance but affectionate',
    commonNames: ['Whiskers', 'Mittens', 'Shadow', 'Tiger', 'Simba', 'Cleo', 'Oliver', 'Milo'],
  },
  bird: {
    type: 'bird',
    adoptionCost: 150,
    monthlyCost: 30,
    lifespan: 120, // 10 years
    moraleBonus: 2,
    description: 'Cheerful singer, needs cage cleaning',
    commonNames: ['Tweety', 'Polly', 'Rio', 'Kiwi', 'Sunny', 'Mango', 'Blue', 'Chirpy'],
  },
  fish: {
    type: 'fish',
    adoptionCost: 50,
    monthlyCost: 15,
    lifespan: 36, // 3 years
    moraleBonus: 1,
    description: 'Calming to watch, low maintenance',
    commonNames: ['Goldie', 'Bubbles', 'Nemo', 'Splash', 'Finn', 'Coral', 'Aqua', 'Neptune'],
  },
  rabbit: {
    type: 'rabbit',
    adoptionCost: 200,
    monthlyCost: 40,
    lifespan: 108, // 9 years
    moraleBonus: 3,
    description: 'Soft and cuddly, needs space to hop',
    commonNames: ['Thumper', 'Snowball', 'Cotton', 'Fluffy', 'Hoppy', 'Bunny', 'Clover', 'Pepper'],
  },
  hamster: {
    type: 'hamster',
    adoptionCost: 30,
    monthlyCost: 20,
    lifespan: 24, // 2 years
    moraleBonus: 2,
    description: 'Small and active, fun to watch',
    commonNames: ['Nibbles', 'Peanut', 'Squeaky', 'Fuzzy', 'Whiskers', 'Tiny', 'Speedy', 'Patches'],
  },
};

export const petCareActivities: PetCareActivity[] = [
  {
    id: 'vet-checkup',
    name: 'Vet Checkup',
    cost: 150,
    happinessBoost: 5,
    healthBoost: 20,
    bondBoost: 5,
    description: 'Regular health examination',
  },
  {
    id: 'grooming',
    name: 'Professional Grooming',
    cost: 60,
    happinessBoost: 15,
    healthBoost: 5,
    bondBoost: 10,
    description: 'Bath, haircut, and nail trim',
  },
  {
    id: 'premium-food',
    name: 'Premium Food',
    cost: 50,
    happinessBoost: 10,
    healthBoost: 10,
    bondBoost: 5,
    description: 'High-quality nutrition',
  },
  {
    id: 'play-session',
    name: 'Extended Play Time',
    cost: 0,
    happinessBoost: 20,
    healthBoost: 5,
    bondBoost: 15,
    description: 'Spend quality time playing',
  },
  {
    id: 'training',
    name: 'Training Session',
    cost: 100,
    happinessBoost: 10,
    healthBoost: 0,
    bondBoost: 20,
    description: 'Teach new tricks and commands',
  },
  {
    id: 'toys',
    name: 'New Toys',
    cost: 40,
    happinessBoost: 25,
    healthBoost: 0,
    bondBoost: 10,
    description: 'Purchase new toys and enrichment',
  },
];

// Generate random pet name
export function generatePetName(petType: PetType): string {
  const definition = petDefinitions[petType];
  return randomChoice(definition.commonNames);
}

// Generate random personality
export function generatePetPersonality(): PetPersonality {
  const personalities: PetPersonality[] = [
    'playful',
    'calm',
    'energetic',
    'shy',
    'friendly',
    'independent',
  ];
  return randomChoice(personalities);
}

// Calculate pet's monthly needs decline
export function calculatePetDecline(
  monthsSinceLastFed: number,
  monthsSinceLastVet: number
): {
  healthDecline: number;
  happinessDecline: number;
} {
  let healthDecline = 0;
  let happinessDecline = 0;

  // Feeding
  if (monthsSinceLastFed > 0) {
    healthDecline += monthsSinceLastFed * 10; // -10 health per month not fed
    happinessDecline += monthsSinceLastFed * 15; // -15 happiness per month not fed
  }

  // Vet visits
  if (monthsSinceLastVet > 12) {
    // No vet in over a year
    healthDecline += (monthsSinceLastVet - 12) * 2; // -2 health per month overdue
  }

  return { healthDecline, happinessDecline };
}

// Check if pet should pass away (natural causes or neglect)
export function shouldPetPassAway(
  petAge: number,
  petHealth: number,
  petType: PetType
): boolean {
  const definition = petDefinitions[petType];

  // Natural lifespan
  if (petAge > definition.lifespan) {
    const monthsOverLifespan = petAge - definition.lifespan;
    const deathChance = Math.min(0.5, monthsOverLifespan * 0.05); // 5% per month over lifespan
    if (Math.random() < deathChance) return true;
  }

  // Health-based death
  if (petHealth <= 0) {
    return true; // Death from neglect
  }

  if (petHealth < 20) {
    const deathChance = (20 - petHealth) / 100; // Up to 20% if health is 0
    if (Math.random() < deathChance) return true;
  }

  return false;
}

// Get personality description
export function getPersonalityDescription(personality: PetPersonality): string {
  const descriptions: Record<PetPersonality, string> = {
    playful: 'Loves to play and have fun',
    calm: 'Relaxed and peaceful',
    energetic: 'Full of energy and excitement',
    shy: 'Timid but sweet',
    friendly: 'Loves everyone they meet',
    independent: 'Does their own thing',
  };
  return descriptions[personality];
}
