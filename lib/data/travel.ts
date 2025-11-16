import type { Destination } from '../types';
import { randomChoice } from '../utils/game-utils';

export const destinations: Destination[] = [
  // Budget-friendly destinations
  {
    id: 'bangkok',
    name: 'Bangkok',
    country: 'Thailand',
    type: 'cultural',
    baseCost: 1200,
    duration: 7,
    moraleBoost: 15,
    stressRelief: 20,
    culturalValue: 10,
    memories: [
      'Visited the Grand Palace',
      'Explored floating markets',
      'Took a Thai cooking class',
      'Got a traditional Thai massage',
      'Watched a Muay Thai fight',
    ],
  },
  {
    id: 'lisbon',
    name: 'Lisbon',
    country: 'Portugal',
    type: 'city',
    baseCost: 1500,
    duration: 5,
    moraleBoost: 12,
    stressRelief: 15,
    culturalValue: 8,
    memories: [
      'Rode the iconic yellow tram',
      'Tasted pastéis de nata',
      'Explored the historic Alfama district',
      'Watched the sunset at Miradouro',
      'Visited Jerónimos Monastery',
    ],
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    type: 'beach',
    baseCost: 1800,
    duration: 10,
    moraleBoost: 20,
    stressRelief: 30,
    culturalValue: 12,
    memories: [
      'Surfed at Uluwatu Beach',
      'Visited ancient temples',
      'Hiked Mount Batur at sunrise',
      'Took a yoga retreat',
      'Explored rice terraces in Ubud',
    ],
  },
  {
    id: 'prague',
    name: 'Prague',
    country: 'Czech Republic',
    type: 'cultural',
    baseCost: 1300,
    duration: 4,
    moraleBoost: 10,
    stressRelief: 12,
    culturalValue: 15,
    memories: [
      'Walked across Charles Bridge',
      'Toured Prague Castle',
      'Enjoyed Czech beer gardens',
      'Explored the Astronomical Clock',
      'Wandered the Old Town Square',
    ],
  },

  // Mid-range destinations
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    type: 'city',
    baseCost: 3000,
    duration: 7,
    moraleBoost: 25,
    stressRelief: 20,
    culturalValue: 25,
    memories: [
      'Visited the Imperial Palace',
      'Explored Akihabara electronics district',
      'Experienced a traditional tea ceremony',
      'Watched cherry blossoms in Ueno Park',
      'Ate authentic sushi at Tsukiji Market',
    ],
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    type: 'city',
    baseCost: 2500,
    duration: 6,
    moraleBoost: 20,
    stressRelief: 18,
    culturalValue: 18,
    memories: [
      "Visited Gaudí's Sagrada Familia",
      'Strolled down Las Ramblas',
      'Relaxed at Barceloneta Beach',
      'Explored Park Güell',
      'Enjoyed tapas in Gothic Quarter',
    ],
  },
  {
    id: 'new-york',
    name: 'New York City',
    country: 'USA',
    type: 'city',
    baseCost: 3500,
    duration: 5,
    moraleBoost: 18,
    stressRelief: 10,
    culturalValue: 20,
    memories: [
      'Saw the Statue of Liberty',
      'Walked through Central Park',
      'Visited the Metropolitan Museum',
      'Watched a Broadway show',
      'Explored Times Square at night',
    ],
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    type: 'beach',
    baseCost: 2800,
    duration: 7,
    moraleBoost: 30,
    stressRelief: 35,
    culturalValue: 15,
    memories: [
      'Watched the famous Oia sunset',
      'Swam in the Aegean Sea',
      'Explored ancient ruins at Akrotiri',
      'Toured local wineries',
      'Stayed in a cliffside hotel',
    ],
  },

  // Adventure destinations
  {
    id: 'patagonia',
    name: 'Patagonia',
    country: 'Argentina',
    type: 'adventure',
    baseCost: 4000,
    duration: 14,
    moraleBoost: 35,
    stressRelief: 25,
    culturalValue: 20,
    memories: [
      'Hiked to Fitz Roy',
      'Saw Perito Moreno Glacier',
      'Camped under the stars',
      'Spotted condors and guanacos',
      'Crossed the Andes mountains',
    ],
  },
  {
    id: 'machu-picchu',
    name: 'Machu Picchu',
    country: 'Peru',
    type: 'cultural',
    baseCost: 3200,
    duration: 8,
    moraleBoost: 28,
    stressRelief: 20,
    culturalValue: 30,
    memories: [
      'Hiked the Inca Trail',
      'Explored the ancient ruins',
      'Visited the Sacred Valley',
      'Experienced high altitude',
      'Learned about Inca history',
    ],
  },
  {
    id: 'safari-kenya',
    name: 'Kenyan Safari',
    country: 'Kenya',
    type: 'adventure',
    baseCost: 5000,
    duration: 10,
    moraleBoost: 40,
    stressRelief: 30,
    culturalValue: 25,
    memories: [
      'Saw the Big Five on safari',
      'Witnessed the Great Migration',
      'Visited Masai Mara',
      'Stayed in a safari lodge',
      'Learned about wildlife conservation',
    ],
  },
  {
    id: 'iceland',
    name: 'Iceland',
    country: 'Iceland',
    type: 'adventure',
    baseCost: 4500,
    duration: 7,
    moraleBoost: 30,
    stressRelief: 28,
    culturalValue: 22,
    memories: [
      'Bathed in the Blue Lagoon',
      'Chased the Northern Lights',
      'Explored ice caves',
      'Saw waterfalls and geysers',
      'Drove the Golden Circle',
    ],
  },

  // Luxury destinations
  {
    id: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    type: 'beach',
    baseCost: 8000,
    duration: 10,
    moraleBoost: 45,
    stressRelief: 50,
    culturalValue: 10,
    memories: [
      'Stayed in an overwater bungalow',
      'Snorkeled in crystal clear waters',
      'Got a spa treatment',
      'Enjoyed private beach dinners',
      'Saw bioluminescent plankton',
    ],
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    type: 'city',
    baseCost: 6000,
    duration: 5,
    moraleBoost: 25,
    stressRelief: 20,
    culturalValue: 15,
    memories: [
      'Visited Burj Khalifa',
      'Went on a desert safari',
      'Shopped at Dubai Mall',
      'Experienced luxury hotels',
      'Tried indoor skiing',
    ],
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    type: 'cultural',
    baseCost: 3500,
    duration: 7,
    moraleBoost: 28,
    stressRelief: 22,
    culturalValue: 28,
    memories: [
      'Climbed the Eiffel Tower',
      'Visited the Louvre Museum',
      'Strolled along the Champs-Élysées',
      'Enjoyed French cuisine',
      'Explored Montmartre',
    ],
  },
  {
    id: 'swiss-alps',
    name: 'Swiss Alps',
    country: 'Switzerland',
    type: 'mountains',
    baseCost: 5500,
    duration: 7,
    moraleBoost: 32,
    stressRelief: 28,
    culturalValue: 18,
    memories: [
      'Went skiing in Zermatt',
      'Took the Glacier Express train',
      'Visited charming mountain villages',
      'Tasted Swiss chocolate',
      'Saw the Matterhorn',
    ],
  },

  // Exotic destinations
  {
    id: 'antarctica',
    name: 'Antarctica',
    country: 'Antarctica',
    type: 'exotic',
    baseCost: 15000,
    duration: 14,
    moraleBoost: 50,
    stressRelief: 35,
    culturalValue: 40,
    memories: [
      'Sailed through icebergs',
      'Saw penguins and seals',
      'Experienced 24-hour daylight',
      'Visited research stations',
      'Kayaked in Antarctic waters',
    ],
  },
  {
    id: 'bhutan',
    name: 'Bhutan',
    country: 'Bhutan',
    type: 'cultural',
    baseCost: 4500,
    duration: 10,
    moraleBoost: 38,
    stressRelief: 40,
    culturalValue: 35,
    memories: [
      "Hiked to Tiger's Nest Monastery",
      'Learned about Gross National Happiness',
      'Visited ancient dzongs',
      'Experienced Buddhist culture',
      'Explored pristine landscapes',
    ],
  },
  {
    id: 'galapagos',
    name: 'Galápagos Islands',
    country: 'Ecuador',
    type: 'exotic',
    baseCost: 7000,
    duration: 10,
    moraleBoost: 42,
    stressRelief: 32,
    culturalValue: 38,
    memories: [
      'Swam with sea lions',
      'Saw giant tortoises',
      'Snorkeled with marine iguanas',
      'Learned about evolution',
      'Explored volcanic islands',
    ],
  },
];

// Get random experiences from a trip
export function getRandomExperiences(
  destination: Destination,
  count: number = 3
): string[] {
  const experiences: string[] = [];
  const available = [...destination.memories];

  for (let i = 0; i < Math.min(count, available.length); i++) {
    const index = Math.floor(Math.random() * available.length);
    experiences.push(available[index]);
    available.splice(index, 1);
  }

  return experiences;
}

// Calculate trip satisfaction based on various factors
export function calculateTripSatisfaction(
  destination: Destination,
  playerMoney: number,
  playerMorale: number
): number {
  let satisfaction = 5; // Base satisfaction

  // If player can comfortably afford it (has 3x the cost), +2 satisfaction
  if (playerMoney >= destination.baseCost * 3) {
    satisfaction += 2;
  } else if (playerMoney >= destination.baseCost * 1.5) {
    satisfaction += 1;
  } else {
    // Stressing about money
    satisfaction -= 1;
  }

  // If morale is high, enjoy it more
  if (playerMorale >= 80) {
    satisfaction += 2;
  } else if (playerMorale >= 60) {
    satisfaction += 1;
  } else if (playerMorale < 40) {
    satisfaction -= 1;
  }

  // Random factor for trip quality
  const randomFactor = Math.random() * 2 - 1; // -1 to +1
  satisfaction += randomFactor;

  return Math.max(1, Math.min(10, Math.round(satisfaction)));
}

// Get destinations by budget
export function getDestinationsByBudget(maxBudget: number): Destination[] {
  return destinations.filter((d) => d.baseCost <= maxBudget);
}

// Get recommended destinations based on player needs
export function getRecommendedDestinations(
  playerMorale: number,
  playerIntellect: number,
  playerMoney: number
): Destination[] {
  const affordable = destinations.filter((d) => d.baseCost <= playerMoney * 0.3);

  if (affordable.length === 0) return [];

  // If morale is low, prioritize stress relief
  if (playerMorale < 50) {
    return affordable.sort((a, b) => b.stressRelief - a.stressRelief).slice(0, 3);
  }

  // If intellect is low, prioritize cultural value
  if (playerIntellect < 50) {
    return affordable.sort((a, b) => b.culturalValue - a.culturalValue).slice(0, 3);
  }

  // Otherwise, prioritize overall morale boost
  return affordable.sort((a, b) => b.moraleBoost - a.moraleBoost).slice(0, 3);
}
