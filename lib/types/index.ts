// Game types for Lifely

export interface User {
  name: string;
  country: string;
  age: number; // in months
  status: string;
  assets: Asset[];
  education: Education;
  job: Job;
}

export interface Asset {
  id: string;
  name: string;
  type: 'house' | 'car' | 'other';
  value: number;
  purchaseDate: number; // age in months
}

export interface Property {
  id: string;
  name: string;
  type: 'apartment' | 'house' | 'condo' | 'mansion';
  price: number;
  monthlyMortgage: number;
  monthsOwned: number;
  appreciation: number; // percentage per year
}

export interface HousingState {
  currentProperty: Property | null;
  isRenting: boolean;
  monthlyRent: number;
  propertyHistory: Property[];
}

export type EducationLevel =
  | 'none'
  | 'elementary'
  | 'middle-school'
  | 'high-school'
  | 'college'
  | 'university'
  | 'graduate'
  | 'phd';

export interface Education {
  currentLevel: EducationLevel;
  currentInstitution: string | null;
  currentMajor: string | null;
  yearsInCurrentLevel: number;
  gpa: number;
  degrees: Degree[];
  isEnrolled: boolean;
  graduationYear: number | null;
}

export interface Degree {
  level: EducationLevel;
  institution: string;
  major: string;
  gpa: number;
  graduationYear: number;
  honors: string | null;
}

export interface Job {
  name: string;
  salary: number;
  promotions: number;
  duration: number; // months
  previousJobs: string[];
}

export interface Bank {
  balance: number;
  id: number;
  loan: number;
  hasLoan: boolean;
  transactions: number;
  transactionsList: Transaction[];
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'salary' | 'expense';
  amount: number;
  description: string;
  date: number; // age in months
}

export interface Student {
  hasStudentLoan: boolean;
  loanMonths: number;
  loanAmount: number;
  loanAmountPaid: number;
  months: number;
  course: string | null;
  collegeDuration: number;
}

export interface GameStats {
  health: number;
  morale: number;
  intellect: number;
  looks: number;
  karma: number;
}

export interface Alert {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'danger' | 'success';
  timestamp: number;
}

export interface ConsoleMessage {
  id: string;
  message: string;
  timestamp: number;
}

export interface Disease {
  id: string;
  name: string;
  severity: number; // 1-10
  duration: number; // months until recovery
  monthsActive: number; // how long you've had it
  treatmentCost: number;
  isChronic: boolean;
}

export interface HealthState {
  currentDiseases: Disease[];
  hasInsurance: boolean;
  insuranceCost: number;
  lastCheckup: number; // age in months
  fitnessLevel: number; // 0-100
  mentalHealth: number; // 0-100
}

export interface MedicalTreatment {
  id: string;
  name: string;
  cost: number;
  healthRestoration: number;
  description: string;
  requiresHospital: boolean;
}

export interface JobData {
  minSalary: number;
  maxSalary: number;
  minIncrement: number;
  maxIncrement: number;
  successRate: number | null;
  cgpaNeeded: number | null;
  requires: string[];
}

export interface Activity {
  id: string;
  name: string;
  icon: string;
  cost: { min: number; max: number };
  effects: {
    health?: number;
    morale?: number;
    intellect?: number;
    looks?: number;
  };
  description: string;
}

export type RelationshipType =
  | 'parent'
  | 'sibling'
  | 'spouse'
  | 'child'
  | 'friend'
  | 'dating'
  | 'ex';

export type RelationshipStatus =
  | 'excellent'   // 80-100
  | 'good'        // 60-79
  | 'neutral'     // 40-59
  | 'poor'        // 20-39
  | 'terrible';   // 0-19

export interface Relationship {
  id: string;
  name: string;
  type: RelationshipType;
  quality: number; // 0-100
  yearsKnown: number;
  lastInteraction: number; // age in months
  metAt: number; // age in months
  isAlive: boolean;
  traits: string[];
}

export interface RelationshipState {
  relationships: Relationship[];
  hasSpouse: boolean;
  spouseId: string | null;
  children: number;
  totalFriends: number;
}

export interface SocialInteraction {
  id: string;
  relationshipId: string;
  type: 'conversation' | 'activity' | 'gift' | 'argument' | 'support';
  qualityChange: number;
  timestamp: number;
  description: string;
}

export type SkillCategory =
  | 'technical'
  | 'creative'
  | 'business'
  | 'social'
  | 'physical'
  | 'academic';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 0-100
  experience: number; // Progress to next level
}

export interface SkillsState {
  skills: Skill[];
  totalSkillPoints: number;
}

export interface Training {
  id: string;
  name: string;
  skillId: string;
  cost: number;
  duration: number; // in months
  experienceGain: number;
  requirements: {
    minLevel?: number;
    minIntellect?: number;
  };
}

export type VehicleType =
  | 'bicycle'
  | 'motorcycle'
  | 'sedan'
  | 'suv'
  | 'truck'
  | 'sports'
  | 'luxury'
  | 'supercar';

export interface Vehicle {
  id: string;
  name: string;
  type: VehicleType;
  price: number;
  maintenanceCost: number; // per month
  fuelCost: number; // per month
  depreciation: number; // percentage per year
  reliability: number; // 0-100
  currentValue: number;
  monthsOwned: number;
  mileage: number;
}

export interface VehicleState {
  currentVehicle: Vehicle | null;
  vehicleHistory: Vehicle[];
  totalMilesDriven: number;
  maintenanceScheduled: boolean;
}

export type LoanType = 'personal' | 'student' | 'auto' | 'mortgage';

export interface Loan {
  id: string;
  type: LoanType;
  amount: number;
  remainingBalance: number;
  interestRate: number; // percentage
  monthlyPayment: number;
  monthsRemaining: number;
  monthsTaken: number; // age in months when loan was taken
  missedPayments: number;
}

export interface CreditState {
  score: number; // 300-850
  activeLoans: Loan[];
  loanHistory: Loan[];
  totalDebt: number;
  paymentHistory: number[]; // last 12 months: 1 = on-time, 0 = missed
}
