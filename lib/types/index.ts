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

export interface Education {
  degrees: Record<string, Degree>;
}

export interface Degree {
  name: string;
  cgpa: number;
  grade: string;
  remark: string;
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
