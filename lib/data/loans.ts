import type { LoanType } from '../types';

export interface LoanOffer {
  type: LoanType;
  name: string;
  minAmount: number;
  maxAmount: number;
  interestRate: number; // annual percentage
  termMonths: number; // loan duration
  minCreditScore: number;
  description: string;
}

export const loanOffers: LoanOffer[] = [
  // Personal loans
  {
    type: 'personal',
    name: 'Small Personal Loan',
    minAmount: 1000,
    maxAmount: 5000,
    interestRate: 12,
    termMonths: 24,
    minCreditScore: 580,
    description: 'Quick cash for emergencies',
  },
  {
    type: 'personal',
    name: 'Standard Personal Loan',
    minAmount: 5000,
    maxAmount: 25000,
    interestRate: 9,
    termMonths: 36,
    minCreditScore: 640,
    description: 'Medium-term personal financing',
  },
  {
    type: 'personal',
    name: 'Premium Personal Loan',
    minAmount: 10000,
    maxAmount: 50000,
    interestRate: 6,
    termMonths: 60,
    minCreditScore: 720,
    description: 'Low-rate financing for good credit',
  },

  // Auto loans
  {
    type: 'auto',
    name: 'Standard Auto Loan',
    minAmount: 5000,
    maxAmount: 40000,
    interestRate: 7,
    termMonths: 60,
    minCreditScore: 620,
    description: 'Finance your vehicle purchase',
  },
  {
    type: 'auto',
    name: 'Premium Auto Loan',
    minAmount: 15000,
    maxAmount: 100000,
    interestRate: 4.5,
    termMonths: 72,
    minCreditScore: 700,
    description: 'Best rates for luxury vehicles',
  },

  // Student loans
  {
    type: 'student',
    name: 'Federal Student Loan',
    minAmount: 2000,
    maxAmount: 20000,
    interestRate: 5,
    termMonths: 120,
    minCreditScore: 0, // No credit check for federal
    description: 'Government-backed education loan',
  },
  {
    type: 'student',
    name: 'Private Student Loan',
    minAmount: 5000,
    maxAmount: 50000,
    interestRate: 7.5,
    termMonths: 120,
    minCreditScore: 650,
    description: 'Private education financing',
  },

  // Mortgage (handled separately but included for completeness)
  {
    type: 'mortgage',
    name: 'Home Mortgage',
    minAmount: 50000,
    maxAmount: 2000000,
    interestRate: 6.5,
    termMonths: 360, // 30 years
    minCreditScore: 620,
    description: 'Finance your home purchase',
  },
];

export function calculateMonthlyPayment(
  loanAmount: number,
  annualInterestRate: number,
  termMonths: number
): number {
  const monthlyRate = annualInterestRate / 100 / 12;
  if (monthlyRate === 0) return loanAmount / termMonths;

  const payment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1);

  return Math.round(payment);
}

export function calculateCreditScore(
  paymentHistory: number[], // 1 = on time, 0 = missed
  totalDebt: number,
  activeLoansCount: number,
  accountAge: number // months since first loan
): number {
  let score = 650; // Base score

  // Payment history (35% of score)
  if (paymentHistory.length > 0) {
    const onTimeRate = paymentHistory.filter((p) => p === 1).length / paymentHistory.length;
    score += (onTimeRate - 0.5) * 300; // -150 to +150
  }

  // Debt burden (30% of score)
  if (totalDebt < 5000) {
    score += 50;
  } else if (totalDebt < 20000) {
    score += 20;
  } else if (totalDebt > 50000) {
    score -= 50;
  } else if (totalDebt > 100000) {
    score -= 100;
  }

  // Number of active loans (15% of score)
  if (activeLoansCount === 0) {
    score -= 20; // No credit history
  } else if (activeLoansCount === 1 || activeLoansCount === 2) {
    score += 30; // Good mix
  } else if (activeLoansCount > 4) {
    score -= 40; // Too many loans
  }

  // Account age (20% of score)
  if (accountAge > 24) {
    score += 50;
  } else if (accountAge > 12) {
    score += 25;
  }

  return Math.max(300, Math.min(850, Math.round(score)));
}

export function getCreditRating(score: number): string {
  if (score >= 800) return 'Exceptional';
  if (score >= 740) return 'Very Good';
  if (score >= 670) return 'Good';
  if (score >= 580) return 'Fair';
  return 'Poor';
}

export function getCreditScoreColor(score: number): string {
  if (score >= 740) return '#10b981';
  if (score >= 670) return '#3b82f6';
  if (score >= 580) return '#f59e0b';
  return '#ef4444';
}

export function getApprovedLoanAmount(
  requestedAmount: number,
  creditScore: number,
  maxAmount: number
): number {
  // Reduce approved amount based on credit score
  let approvalRate = 1.0;

  if (creditScore < 600) {
    approvalRate = 0.5;
  } else if (creditScore < 650) {
    approvalRate = 0.7;
  } else if (creditScore < 700) {
    approvalRate = 0.85;
  }

  const approvedAmount = Math.min(requestedAmount * approvalRate, maxAmount);
  return Math.floor(approvedAmount);
}
