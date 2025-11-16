import type { InvestmentType } from '../types';
import { randint } from '../utils/game-utils';

export interface InvestmentOption {
  id: string;
  type: InvestmentType;
  name: string;
  description: string;
  minInvestment: number;
  volatility: number; // 1-10, higher = more volatile
  avgReturn: number; // average annual return percentage
  riskLevel: 'Low' | 'Medium' | 'High' | 'Very High';
}

export const investmentOptions: InvestmentOption[] = [
  // Index Funds - Low risk, steady growth
  {
    id: 'sp500',
    type: 'index-fund',
    name: 'S&P 500 Index Fund',
    description: 'Tracks the top 500 US companies',
    minInvestment: 100,
    volatility: 3,
    avgReturn: 10,
    riskLevel: 'Low',
  },
  {
    id: 'total-market',
    type: 'index-fund',
    name: 'Total Market Index',
    description: 'Diversified across entire market',
    minInvestment: 100,
    volatility: 3,
    avgReturn: 9,
    riskLevel: 'Low',
  },

  // Bonds - Very low risk
  {
    id: 'govt-bonds',
    type: 'bonds',
    name: 'Government Bonds',
    description: 'Safe, government-backed securities',
    minInvestment: 500,
    volatility: 1,
    avgReturn: 4,
    riskLevel: 'Low',
  },
  {
    id: 'corporate-bonds',
    type: 'bonds',
    name: 'Corporate Bonds',
    description: 'Higher yield corporate debt',
    minInvestment: 1000,
    volatility: 2,
    avgReturn: 6,
    riskLevel: 'Low',
  },

  // Individual Stocks - Medium to high risk
  {
    id: 'blue-chip',
    type: 'stocks',
    name: 'Blue Chip Stocks',
    description: 'Established, stable companies',
    minInvestment: 500,
    volatility: 5,
    avgReturn: 12,
    riskLevel: 'Medium',
  },
  {
    id: 'growth-stocks',
    type: 'stocks',
    name: 'Growth Stocks',
    description: 'High-growth potential companies',
    minInvestment: 500,
    volatility: 7,
    avgReturn: 15,
    riskLevel: 'High',
  },
  {
    id: 'tech-stocks',
    type: 'stocks',
    name: 'Technology Stocks',
    description: 'Tech sector investments',
    minInvestment: 500,
    volatility: 8,
    avgReturn: 18,
    riskLevel: 'High',
  },

  // Real Estate - Medium risk, physical assets
  {
    id: 'reit',
    type: 'real-estate',
    name: 'REIT',
    description: 'Real Estate Investment Trust',
    minInvestment: 1000,
    volatility: 4,
    avgReturn: 11,
    riskLevel: 'Medium',
  },
  {
    id: 'property-fund',
    type: 'real-estate',
    name: 'Property Fund',
    description: 'Diversified real estate portfolio',
    minInvestment: 2000,
    volatility: 4,
    avgReturn: 10,
    riskLevel: 'Medium',
  },

  // Cryptocurrency - Very high risk
  {
    id: 'bitcoin',
    type: 'crypto',
    name: 'Bitcoin',
    description: 'Leading cryptocurrency',
    minInvestment: 100,
    volatility: 10,
    avgReturn: 25,
    riskLevel: 'Very High',
  },
  {
    id: 'ethereum',
    type: 'crypto',
    name: 'Ethereum',
    description: 'Smart contract platform',
    minInvestment: 100,
    volatility: 10,
    avgReturn: 22,
    riskLevel: 'Very High',
  },
  {
    id: 'altcoins',
    type: 'crypto',
    name: 'Altcoin Portfolio',
    description: 'High-risk crypto basket',
    minInvestment: 50,
    volatility: 10,
    avgReturn: 30,
    riskLevel: 'Very High',
  },
];

export function simulateMonthlyPriceChange(
  currentPrice: number,
  avgReturn: number,
  volatility: number
): number {
  // Convert annual return to monthly
  const monthlyReturn = avgReturn / 12 / 100;

  // Add random volatility
  const volatilityFactor = (randint(-volatility * 10, volatility * 10) / 100);
  const change = monthlyReturn + volatilityFactor;

  // Calculate new price
  const newPrice = currentPrice * (1 + change);
  return Math.max(1, Math.round(newPrice * 100) / 100); // Minimum $1, 2 decimal places
}

export function calculateTotalReturn(
  invested: number,
  currentValue: number
): { amount: number; percentage: number } {
  const amount = currentValue - invested;
  const percentage = invested > 0 ? (amount / invested) * 100 : 0;
  return {
    amount: Math.round(amount),
    percentage: Math.round(percentage * 100) / 100,
  };
}

export function getReturnColor(percentage: number): string {
  if (percentage > 10) return '#10b981';
  if (percentage > 0) return '#3b82f6';
  if (percentage > -10) return '#f59e0b';
  return '#ef4444';
}

export function getRiskColor(riskLevel: string): string {
  switch (riskLevel) {
    case 'Low':
      return '#10b981';
    case 'Medium':
      return '#f59e0b';
    case 'High':
      return '#f97316';
    case 'Very High':
      return '#ef4444';
    default:
      return '#6b7280';
  }
}

export const investmentTypeNames: Record<InvestmentType, string> = {
  'index-fund': 'Index Fund',
  bonds: 'Bonds',
  stocks: 'Stocks',
  'real-estate': 'Real Estate',
  crypto: 'Cryptocurrency',
};

export const investmentTypeIcons: Record<InvestmentType, string> = {
  'index-fund': '📈',
  bonds: '🏦',
  stocks: '📊',
  'real-estate': '🏘️',
  crypto: '₿',
};

export function calculateRetirementProjection(
  currentAge: number, // in months
  retirementAge: number, // in months (typically 65*12 = 780)
  currentRetirementFund: number,
  monthlyContribution: number,
  avgReturn: number = 7 // annual percentage
): { finalAmount: number; monthsToRetirement: number } {
  const monthsToRetirement = retirementAge - currentAge;
  if (monthsToRetirement <= 0) {
    return { finalAmount: currentRetirementFund, monthsToRetirement: 0 };
  }

  const monthlyRate = avgReturn / 100 / 12;
  let balance = currentRetirementFund;

  for (let i = 0; i < monthsToRetirement; i++) {
    balance = balance * (1 + monthlyRate) + monthlyContribution;
  }

  return {
    finalAmount: Math.round(balance),
    monthsToRetirement,
  };
}
