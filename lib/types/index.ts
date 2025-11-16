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
  performance: number; // 0-100, affects raises and promotions
  lastReview: number; // age in months of last performance review
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
  requires: string[]; // education requirements
  requiredSkills?: string[]; // skill IDs that are required
  recommendedSkills?: string[]; // skill IDs that boost performance
  skillWeight?: number; // 0-1, how much skills matter (default 0.3)
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

export type InvestmentType = 'stocks' | 'bonds' | 'crypto' | 'real-estate' | 'index-fund';

export interface Investment {
  id: string;
  type: InvestmentType;
  name: string;
  shares: number;
  purchasePrice: number; // price per share when bought
  currentPrice: number; // current price per share
  monthsHeld: number;
  totalInvested: number;
}

export interface InvestmentState {
  portfolio: Investment[];
  totalValue: number;
  totalInvested: number;
  monthlyContribution: number; // automatic monthly investment
  retirementFund: number; // separate retirement account
}

export type AchievementCategory =
  | 'financial'
  | 'career'
  | 'education'
  | 'relationships'
  | 'health'
  | 'lifestyle'
  | 'special';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  icon: string;
  unlockedAt: number; // age in months when unlocked
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface AchievementState {
  unlocked: Achievement[];
  totalPoints: number;
}

export type TravelType =
  | 'weekend-trip'
  | 'vacation'
  | 'world-tour'
  | 'business-trip'
  | 'backpacking'
  | 'luxury-cruise'
  | 'road-trip';

export interface Destination {
  id: string;
  name: string;
  country: string;
  type: 'city' | 'beach' | 'mountains' | 'cultural' | 'adventure' | 'exotic';
  baseCost: number;
  duration: number; // days
  moraleBoost: number;
  stressRelief: number; // reduces negative morale effects
  culturalValue: number; // intellect boost
  memories: string[]; // possible experiences
}

export interface Trip {
  id: string;
  destinationId: string;
  destinationName: string;
  cost: number;
  traveledAt: number; // age in months
  duration: number;
  experiences: string[]; // what happened during the trip
  satisfaction: number; // 1-10
}

export interface TravelState {
  trips: Trip[];
  totalCountriesVisited: number;
  totalMoneySpent: number;
  favoriteDestination: string | null;
  travelDays: number; // total days traveled
}

export type TaxType = 'income' | 'property' | 'capital-gains' | 'sales';

export interface TaxBracket {
  minIncome: number;
  maxIncome: number;
  rate: number; // percentage
}

export interface TaxRecord {
  id: string;
  year: number; // which year's taxes
  filedAt: number; // age in months when filed
  incomeReported: number;
  taxOwed: number;
  taxPaid: number;
  refund: number; // if overpaid
  penalty: number; // if underpaid or late
  deductions: TaxDeduction[];
}

export interface TaxDeduction {
  type: 'student-loan' | 'mortgage' | 'charity' | 'medical' | 'retirement';
  amount: number;
  description: string;
}

export interface TaxState {
  filingHistory: TaxRecord[];
  currentYearIncome: number; // income earned this tax year
  currentYearWithheld: number; // tax already withheld from salary
  lastFiledYear: number; // last year taxes were filed
  totalTaxesPaid: number;
  totalRefundsReceived: number;
  totalPenaltiesPaid: number;
  hasTaxDebt: boolean;
  taxDebtAmount: number;
}

export type TimelineEventType =
  | 'birth'
  | 'education'
  | 'job'
  | 'relationship'
  | 'purchase'
  | 'travel'
  | 'health'
  | 'financial'
  | 'achievement'
  | 'life-event'
  | 'milestone';

export type TimelineEventCategory =
  | 'positive'
  | 'negative'
  | 'neutral'
  | 'milestone';

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  category: TimelineEventCategory;
  title: string;
  description: string;
  age: number; // age in months when event occurred
  timestamp: number; // Date.now() when event occurred
  icon?: string; // optional icon identifier
  metadata?: Record<string, any>; // additional data about the event
}

export interface LifeMilestone {
  id: string;
  name: string;
  description: string;
  requiredAge?: number; // age in months
  condition: (data: any) => boolean;
  icon: string;
}

export interface TimelineState {
  events: TimelineEvent[];
  milestones: string[]; // IDs of achieved milestones
  totalEvents: number;
}
