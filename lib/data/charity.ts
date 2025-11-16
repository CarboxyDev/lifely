import type { CharityCause } from '../types';
import { randomChoice } from '../utils/game-utils';

/**
 * Charity and philanthropy system
 */

export interface CharityOrganization {
  name: string;
  cause: CharityCause;
  description: string;
  efficiency: number; // 0-100, how much of donation goes to cause
  reputation: number; // 0-100
  taxDeductible: boolean;
}

export const charityOrganizations: Record<CharityCause, CharityOrganization[]> = {
  education: [
    {
      name: 'Teach for Tomorrow',
      cause: 'education',
      description: 'Provides educational resources to underprivileged schools',
      efficiency: 85,
      reputation: 90,
      taxDeductible: true,
    },
    {
      name: 'Scholarship Foundation',
      cause: 'education',
      description: 'Funds scholarships for students in need',
      efficiency: 90,
      reputation: 95,
      taxDeductible: true,
    },
    {
      name: 'Global Literacy Initiative',
      cause: 'education',
      description: 'Promotes literacy in developing countries',
      efficiency: 80,
      reputation: 85,
      taxDeductible: true,
    },
  ],
  healthcare: [
    {
      name: "Doctors Without Borders",
      cause: 'healthcare',
      description: 'Provides medical care in crisis zones',
      efficiency: 88,
      reputation: 98,
      taxDeductible: true,
    },
    {
      name: 'Free Health Clinics Network',
      cause: 'healthcare',
      description: 'Operates free clinics for uninsured patients',
      efficiency: 85,
      reputation: 90,
      taxDeductible: true,
    },
    {
      name: 'Medical Research Foundation',
      cause: 'healthcare',
      description: 'Funds research for cures and treatments',
      efficiency: 75,
      reputation: 88,
      taxDeductible: true,
    },
  ],
  environment: [
    {
      name: 'Ocean Conservation Fund',
      cause: 'environment',
      description: 'Protects marine ecosystems and reduces pollution',
      efficiency: 82,
      reputation: 87,
      taxDeductible: true,
    },
    {
      name: 'Rainforest Alliance',
      cause: 'environment',
      description: 'Conserves rainforests and biodiversity',
      efficiency: 88,
      reputation: 92,
      taxDeductible: true,
    },
    {
      name: 'Clean Energy Initiative',
      cause: 'environment',
      description: 'Promotes renewable energy adoption',
      efficiency: 80,
      reputation: 85,
      taxDeductible: true,
    },
  ],
  poverty: [
    {
      name: 'Feed the Hungry',
      cause: 'poverty',
      description: 'Provides meals to food-insecure families',
      efficiency: 92,
      reputation: 94,
      taxDeductible: true,
    },
    {
      name: 'Homeless Shelter Coalition',
      cause: 'poverty',
      description: 'Operates shelters and support services',
      efficiency: 85,
      reputation: 88,
      taxDeductible: true,
    },
    {
      name: 'Microfinance for All',
      cause: 'poverty',
      description: 'Provides small loans to entrepreneurs in poverty',
      efficiency: 78,
      reputation: 82,
      taxDeductible: true,
    },
  ],
  'animal-welfare': [
    {
      name: 'Animal Rescue League',
      cause: 'animal-welfare',
      description: 'Rescues and rehomes abandoned animals',
      efficiency: 88,
      reputation: 90,
      taxDeductible: true,
    },
    {
      name: 'Wildlife Conservation Society',
      cause: 'animal-welfare',
      description: 'Protects endangered species and habitats',
      efficiency: 85,
      reputation: 93,
      taxDeductible: true,
    },
    {
      name: 'Farm Animal Sanctuary',
      cause: 'animal-welfare',
      description: 'Provides refuge for rescued farm animals',
      efficiency: 80,
      reputation: 85,
      taxDeductible: true,
    },
  ],
  'disaster-relief': [
    {
      name: 'Red Cross',
      cause: 'disaster-relief',
      description: 'Provides emergency assistance during disasters',
      efficiency: 90,
      reputation: 96,
      taxDeductible: true,
    },
    {
      name: 'Emergency Response Team',
      cause: 'disaster-relief',
      description: 'Rapid deployment for natural disasters',
      efficiency: 85,
      reputation: 88,
      taxDeductible: true,
    },
    {
      name: 'Rebuild Communities Fund',
      cause: 'disaster-relief',
      description: 'Helps communities rebuild after disasters',
      efficiency: 82,
      reputation: 87,
      taxDeductible: true,
    },
  ],
  'arts-culture': [
    {
      name: 'Arts for All Foundation',
      cause: 'arts-culture',
      description: 'Supports arts education and accessibility',
      efficiency: 80,
      reputation: 85,
      taxDeductible: true,
    },
    {
      name: 'Museum Preservation Society',
      cause: 'arts-culture',
      description: 'Preserves cultural heritage and artifacts',
      efficiency: 75,
      reputation: 88,
      taxDeductible: true,
    },
    {
      name: 'Community Theater Project',
      cause: 'arts-culture',
      description: 'Provides theater access to underserved communities',
      efficiency: 78,
      reputation: 82,
      taxDeductible: true,
    },
  ],
  research: [
    {
      name: 'Cancer Research Institute',
      cause: 'research',
      description: 'Funds cutting-edge cancer research',
      efficiency: 88,
      reputation: 94,
      taxDeductible: true,
    },
    {
      name: 'Climate Science Foundation',
      cause: 'research',
      description: 'Studies climate change and solutions',
      efficiency: 85,
      reputation: 90,
      taxDeductible: true,
    },
    {
      name: 'Space Exploration Fund',
      cause: 'research',
      description: 'Supports space research and exploration',
      efficiency: 70,
      reputation: 80,
      taxDeductible: true,
    },
  ],
};

/**
 * Get a random charity for a cause
 */
export function getRandomCharity(cause: CharityCause): CharityOrganization {
  const charities = charityOrganizations[cause];
  return randomChoice(charities);
}

/**
 * Get all charities for a cause
 */
export function getCharitiesForCause(cause: CharityCause): CharityOrganization[] {
  return charityOrganizations[cause];
}

/**
 * Calculate karma and morale boost from donation
 */
export function calculateDonationBenefits(
  donationAmount: number,
  income: number,
  efficiency: number
): {
  karmaGain: number;
  moraleGain: number;
  message: string;
} {
  // Donation as percentage of income
  const donationPercent = income > 0 ? (donationAmount / income) * 100 : 0;

  // Base karma gain (scales with amount and efficiency)
  let karmaGain = Math.round((donationAmount / 100) * (efficiency / 100));
  karmaGain = Math.min(20, karmaGain); // Cap at 20

  // Bonus for giving significant portion of income
  if (donationPercent > 10) {
    karmaGain += 10; // Very generous
  } else if (donationPercent > 5) {
    karmaGain += 5; // Generous
  } else if (donationPercent > 2) {
    karmaGain += 2; // Moderate
  }

  // Morale boost from giving
  let moraleGain = Math.round(karmaGain / 2);
  moraleGain = Math.min(15, moraleGain); // Cap at 15

  let message = '';
  if (donationPercent > 10) {
    message = 'Your extraordinary generosity has made a huge impact!';
  } else if (donationPercent > 5) {
    message = 'Your generosity will change lives!';
  } else if (donationPercent > 2) {
    message = 'Thank you for your meaningful contribution!';
  } else {
    message = 'Every donation helps!';
  }

  return { karmaGain, moraleGain, message };
}

/**
 * Calculate volunteer benefits
 */
export function calculateVolunteerBenefits(hours: number): {
  karmaGain: number;
  moraleGain: number;
  skillGain: number;
  message: string;
} {
  // Karma gain (1 point per hour, capped)
  const karmaGain = Math.min(15, hours);

  // Morale gain from helping others
  const moraleGain = Math.min(10, Math.round(hours * 0.5));

  // Skill improvement (communication, leadership, etc.)
  const skillGain = Math.min(5, Math.round(hours * 0.2));

  let message = '';
  if (hours >= 20) {
    message = 'Your dedication to volunteering is inspiring!';
  } else if (hours >= 10) {
    message = 'Your volunteer work made a real difference!';
  } else {
    message = 'Thank you for giving your time!';
  }

  return { karmaGain, moraleGain, skillGain, message };
}

/**
 * Determine philanthropy level based on total giving
 */
export function calculatePhilanthropyLevel(
  totalDonated: number,
  totalVolunteerHours: number,
  annualIncome: number
): 'none' | 'occasional' | 'regular' | 'generous' | 'philanthropist' {
  const givingRatio = annualIncome > 0 ? totalDonated / annualIncome : 0;

  if (totalDonated > 1000000 || (givingRatio > 0.2 && totalDonated > 100000)) {
    return 'philanthropist'; // Major philanthropist
  } else if (totalDonated > 50000 || (givingRatio > 0.1 && totalVolunteerHours > 100)) {
    return 'generous'; // Very generous
  } else if (totalDonated > 10000 || totalVolunteerHours > 50) {
    return 'regular'; // Regular giver
  } else if (totalDonated > 1000 || totalVolunteerHours > 10) {
    return 'occasional'; // Occasional giver
  } else {
    return 'none'; // No significant giving
  }
}

/**
 * Calculate charitable foundation impact
 */
export function simulateFoundationMonth(
  foundation: {
    totalFunds: number;
    totalDisbursed: number;
    reputation: number;
  },
  monthlyDonation: number
): {
  newFunds: number;
  disbursed: number;
  beneficiariesHelped: number;
  reputationChange: number;
  message: string;
} {
  // Add monthly donation
  const newFunds = foundation.totalFunds + monthlyDonation;

  // Disburse 5-10% of funds per month to causes
  const disbursementRate = 0.05 + Math.random() * 0.05;
  const disbursed = Math.round(newFunds * disbursementRate);

  // Number of beneficiaries helped (rough estimate: 1 per $100)
  const beneficiariesHelped = Math.round(disbursed / 100);

  // Reputation grows with successful disbursement
  let reputationChange = 0;
  if (disbursed > 10000) {
    reputationChange = 2;
  } else if (disbursed > 5000) {
    reputationChange = 1;
  }

  // Reputation declines if not enough activity
  if (disbursed < 1000 && newFunds > 50000) {
    reputationChange = -1; // Hoarding funds
  }

  let message = '';
  if (beneficiariesHelped > 1000) {
    message = `Foundation helped ${beneficiariesHelped} people this month!`;
  } else if (beneficiariesHelped > 100) {
    message = `Foundation made a significant impact: ${beneficiariesHelped} beneficiaries`;
  } else if (beneficiariesHelped > 0) {
    message = `Foundation helped ${beneficiariesHelped} people`;
  }

  return {
    newFunds: newFunds - disbursed,
    disbursed,
    beneficiariesHelped,
    reputationChange,
    message,
  };
}

/**
 * Calculate tax deduction from charitable giving
 */
export function calculateCharitableTaxDeduction(
  totalDonations: number,
  volunteerMileage: number = 0
): {
  deduction: number;
  breakdown: {
    cashDonations: number;
    mileageDeduction: number;
  };
} {
  // Cash donations are fully deductible up to 60% of AGI (simplified here)
  const cashDonations = totalDonations;

  // Volunteer mileage deduction ($0.14 per mile for 2024)
  const mileageDeduction = Math.round(volunteerMileage * 0.14);

  const totalDeduction = cashDonations + mileageDeduction;

  return {
    deduction: totalDeduction,
    breakdown: {
      cashDonations,
      mileageDeduction,
    },
  };
}

/**
 * Get suggested donation amount based on income
 */
export function getSuggestedDonation(annualIncome: number): {
  conservative: number;
  moderate: number;
  generous: number;
} {
  return {
    conservative: Math.round(annualIncome * 0.01), // 1% of income
    moderate: Math.round(annualIncome * 0.03), // 3% of income
    generous: Math.round(annualIncome * 0.10), // 10% of income (tithing)
  };
}

/**
 * Get charity impact report
 */
export function getCharityImpactReport(
  donationAmount: number,
  cause: CharityCause,
  efficiency: number
): string {
  const effectiveAmount = Math.round(donationAmount * (efficiency / 100));

  const impacts: Record<CharityCause, (amount: number) => string> = {
    education: (amt) => {
      const students = Math.round(amt / 50);
      return `Your donation can provide educational materials for approximately ${students} students`;
    },
    healthcare: (amt) => {
      const treatments = Math.round(amt / 200);
      return `Your donation can fund approximately ${treatments} medical treatments`;
    },
    environment: (amt) => {
      const trees = Math.round(amt / 5);
      return `Your donation can help plant approximately ${trees} trees`;
    },
    poverty: (amt) => {
      const meals = Math.round(amt / 3);
      return `Your donation can provide approximately ${meals} meals to those in need`;
    },
    'animal-welfare': (amt) => {
      const animals = Math.round(amt / 100);
      return `Your donation can help rescue and care for approximately ${animals} animals`;
    },
    'disaster-relief': (amt) => {
      const families = Math.round(amt / 500);
      return `Your donation can provide emergency supplies for approximately ${families} families`;
    },
    'arts-culture': (amt) => {
      const tickets = Math.round(amt / 20);
      return `Your donation can provide approximately ${tickets} free cultural experiences`;
    },
    research: (amt) => {
      const hours = Math.round(amt / 100);
      return `Your donation can fund approximately ${hours} hours of research`;
    },
  };

  return impacts[cause](effectiveAmount);
}
