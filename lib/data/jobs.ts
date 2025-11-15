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
  },
  'Computer Engineer': {
    minSalary: 6000,
    maxSalary: 8000,
    minIncrement: 450,
    maxIncrement: 800,
    successRate: null,
    cgpaNeeded: null,
    requires: ['ENG'],
  },
  'Electrical Engineer': {
    minSalary: 4000,
    maxSalary: 5200,
    minIncrement: 400,
    maxIncrement: 750,
    successRate: null,
    cgpaNeeded: null,
    requires: ['ENG'],
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
  },
  'Accountant': {
    minSalary: 2000,
    maxSalary: 4000,
    minIncrement: 200,
    maxIncrement: 600,
    successRate: null,
    cgpaNeeded: null,
    requires: ['COM'],
  },
  'Stock Broker': {
    minSalary: 3250,
    maxSalary: 6500,
    minIncrement: 200,
    maxIncrement: 750,
    successRate: null,
    cgpaNeeded: null,
    requires: ['COM'],
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
  },
  'Delivery Driver': {
    minSalary: 1500,
    maxSalary: 2500,
    minIncrement: 50,
    maxIncrement: 100,
    successRate: null,
    cgpaNeeded: null,
    requires: [],
  },
  'Restaurant Waiter': {
    minSalary: 1250,
    maxSalary: 2250,
    minIncrement: 60,
    maxIncrement: 100,
    successRate: null,
    cgpaNeeded: null,
    requires: [],
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
