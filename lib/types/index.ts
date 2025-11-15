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
  name: string;
  severity: number;
  duration: number;
  monthsActive: number;
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
