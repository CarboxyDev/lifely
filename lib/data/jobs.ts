// Job data for Lifely
import { JobData } from '../types';

export const allJobs: Record<string, JobData> = {
  // Engineering Jobs
  'Civil Engineer': {
    minSalary: 3500,
    maxSalary: 4500,
    minIncrement: 200,
    maxIncrement: 600,
    successRate: null,
    cgpaNeeded: null,
    requires: ['ENG'],
    requiredSkills: ['engineering'],
    recommendedSkills: ['data-analysis', 'communication'],
    skillWeight: 0.4,
  },
  'Computer Engineer': {
    minSalary: 6000,
    maxSalary: 8000,
    minIncrement: 450,
    maxIncrement: 800,
    successRate: null,
    cgpaNeeded: null,
    requires: ['ENG'],
    requiredSkills: ['programming'],
    recommendedSkills: ['engineering', 'data-analysis'],
    skillWeight: 0.5,
  },
  'Electrical Engineer': {
    minSalary: 4000,
    maxSalary: 5200,
    minIncrement: 400,
    maxIncrement: 750,
    successRate: null,
    cgpaNeeded: null,
    requires: ['ENG'],
    requiredSkills: ['engineering'],
    recommendedSkills: ['programming'],
    skillWeight: 0.4,
  },

  // Medical Jobs
  'Surgeon': {
    minSalary: 8000,
    maxSalary: 12000,
    minIncrement: 500,
    maxIncrement: 1000,
    successRate: null,
    cgpaNeeded: null,
    requires: ['MED'],
  },
  'Dentist': {
    minSalary: 6500,
    maxSalary: 9500,
    minIncrement: 400,
    maxIncrement: 750,
    successRate: null,
    cgpaNeeded: null,
    requires: ['MED'],
  },
  'Nurse': {
    minSalary: 3000,
    maxSalary: 5000,
    minIncrement: 250,
    maxIncrement: 450,
    successRate: null,
    cgpaNeeded: null,
    requires: ['MED'],
  },

  // Finance/Business Jobs
  'Corporate Lawyer': {
    minSalary: 7000,
    maxSalary: 12000,
    minIncrement: 150,
    maxIncrement: 1000,
    successRate: null,
    cgpaNeeded: null,
    requires: ['LAW'],
    requiredSkills: ['negotiation', 'communication'],
    recommendedSkills: ['research', 'writing'],
    skillWeight: 0.45,
  },
  'Accountant': {
    minSalary: 2000,
    maxSalary: 4000,
    minIncrement: 200,
    maxIncrement: 600,
    successRate: null,
    cgpaNeeded: null,
    requires: ['COM'],
    requiredSkills: ['finance'],
    recommendedSkills: ['data-analysis'],
    skillWeight: 0.35,
  },
  'Stock Broker': {
    minSalary: 3250,
    maxSalary: 6500,
    minIncrement: 200,
    maxIncrement: 750,
    successRate: null,
    cgpaNeeded: null,
    requires: ['COM'],
    requiredSkills: ['finance', 'negotiation'],
    recommendedSkills: ['communication', 'data-analysis'],
    skillWeight: 0.5,
  },

  // No Degree Required
  'Fast Food Worker': {
    minSalary: 1250,
    maxSalary: 2000,
    minIncrement: 50,
    maxIncrement: 75,
    successRate: null,
    cgpaNeeded: null,
    requires: [],
    recommendedSkills: ['communication'],
    skillWeight: 0.2,
  },
  'Delivery Driver': {
    minSalary: 1500,
    maxSalary: 2500,
    minIncrement: 50,
    maxIncrement: 100,
    successRate: null,
    cgpaNeeded: null,
    requires: [],
    recommendedSkills: ['time-management'],
    skillWeight: 0.2,
  },
  'Restaurant Waiter': {
    minSalary: 1250,
    maxSalary: 2250,
    minIncrement: 60,
    maxIncrement: 100,
    successRate: null,
    cgpaNeeded: null,
    requires: [],
    recommendedSkills: ['communication', 'time-management'],
    skillWeight: 0.25,
  },
};

export const degreeTypes = {
  ENG: 'Engineering',
  MED: 'Medicine',
  LAW: 'Law',
  COM: 'Commerce/Business',
  LIB: 'Liberal Arts',
  COMMUNITY: 'Community College',
};

export function getDegreeFullName(shortCode: string): string {
  return degreeTypes[shortCode as keyof typeof degreeTypes] || shortCode;
}
