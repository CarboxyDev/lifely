import type { Stock, StockSector, MarketCondition } from '../types';
import { randint } from '../utils/game-utils';

/**
 * Stock market trading system with realistic price movements
 */

export const availableStocks: Stock[] = [
  // Technology
  {
    symbol: 'TECH',
    name: 'TechCorp Inc',
    sector: 'technology',
    currentPrice: 150.00,
    previousPrice: 150.00,
    dividendYield: 0.5,
    volatility: 80,
  },
  {
    symbol: 'SOFT',
    name: 'Softwave Solutions',
    sector: 'technology',
    currentPrice: 280.50,
    previousPrice: 280.50,
    dividendYield: 1.2,
    volatility: 75,
  },
  {
    symbol: 'DATA',
    name: 'DataFlow Systems',
    sector: 'technology',
    currentPrice: 95.75,
    previousPrice: 95.75,
    dividendYield: 0.8,
    volatility: 70,
  },
  // Healthcare
  {
    symbol: 'MEDI',
    name: 'MediPharm Corp',
    sector: 'healthcare',
    currentPrice: 120.30,
    previousPrice: 120.30,
    dividendYield: 2.5,
    volatility: 50,
  },
  {
    symbol: 'BIOT',
    name: 'BioTech Innovations',
    sector: 'healthcare',
    currentPrice: 65.20,
    previousPrice: 65.20,
    dividendYield: 1.0,
    volatility: 85,
  },
  // Finance
  {
    symbol: 'BANK',
    name: 'Universal Bank Corp',
    sector: 'finance',
    currentPrice: 85.50,
    previousPrice: 85.50,
    dividendYield: 3.5,
    volatility: 45,
  },
  {
    symbol: 'INSU',
    name: 'Insurance Global',
    sector: 'finance',
    currentPrice: 110.75,
    previousPrice: 110.75,
    dividendYield: 4.0,
    volatility: 40,
  },
  // Energy
  {
    symbol: 'OILG',
    name: 'Oil & Gas Giant',
    sector: 'energy',
    currentPrice: 75.00,
    previousPrice: 75.00,
    dividendYield: 5.0,
    volatility: 90,
  },
  {
    symbol: 'RENW',
    name: 'Renewable Energy Co',
    sector: 'energy',
    currentPrice: 45.60,
    previousPrice: 45.60,
    dividendYield: 1.5,
    volatility: 95,
  },
  // Consumer
  {
    symbol: 'RETL',
    name: 'Retail Mega Corp',
    sector: 'consumer',
    currentPrice: 135.25,
    previousPrice: 135.25,
    dividendYield: 2.0,
    volatility: 55,
  },
  {
    symbol: 'FOOD',
    name: 'Global Food Brands',
    sector: 'consumer',
    currentPrice: 90.00,
    previousPrice: 90.00,
    dividendYield: 3.0,
    volatility: 35,
  },
  // Industrials
  {
    symbol: 'MANU',
    name: 'Manufacturing Corp',
    sector: 'industrials',
    currentPrice: 70.50,
    previousPrice: 70.50,
    dividendYield: 3.5,
    volatility: 60,
  },
  // Utilities
  {
    symbol: 'UTIL',
    name: 'Utilities United',
    sector: 'utilities',
    currentPrice: 55.00,
    previousPrice: 55.00,
    dividendYield: 4.5,
    volatility: 25,
  },
];

/**
 * Simulate monthly stock price movement
 */
export function simulateStockPriceMovement(
  stock: Stock,
  marketCondition: MarketCondition,
  marketSentiment: number // -100 to 100
): {
  newPrice: number;
  percentChange: number;
  reason: string;
} {
  const volatilityFactor = stock.volatility / 100;

  // Base change range based on volatility
  const baseChangePercent = (Math.random() - 0.5) * 2 * volatilityFactor * 10; // -10% to +10% for max volatility

  // Market condition modifier
  let marketModifier = 0;
  switch (marketCondition) {
    case 'bull':
      marketModifier = 3; // +3% bias upward
      break;
    case 'bear':
      marketModifier = -3; // -3% bias downward
      break;
    case 'crash':
      marketModifier = -15; // -15% crash
      break;
    case 'volatile':
      marketModifier = (Math.random() - 0.5) * 10; // Wild swings
      break;
    case 'stable':
      marketModifier = (Math.random() - 0.5) * 2; // Small movements
      break;
  }

  // Sentiment modifier (-2% to +2%)
  const sentimentModifier = (marketSentiment / 100) * 2;

  // Total change
  const totalChangePercent = baseChangePercent + marketModifier + sentimentModifier;

  const newPrice = Math.max(1, stock.currentPrice * (1 + totalChangePercent / 100));

  // Determine reason
  let reason = '';
  if (totalChangePercent > 10) {
    reason = 'Strong rally';
  } else if (totalChangePercent > 5) {
    reason = 'Solid gains';
  } else if (totalChangePercent > 2) {
    reason = 'Modest increase';
  } else if (totalChangePercent > -2) {
    reason = 'Relatively flat';
  } else if (totalChangePercent > -5) {
    reason: 'Modest decline';
  } else if (totalChangePercent > -10) {
    reason = 'Significant drop';
  } else {
    reason = 'Sharp selloff';
  }

  return {
    newPrice: Math.round(newPrice * 100) / 100,
    percentChange: Math.round(totalChangePercent * 100) / 100,
    reason,
  };
}

/**
 * Calculate portfolio value
 */
export function calculatePortfolioValue(
  holdings: { stockSymbol: string; shares: number }[],
  currentPrices: Record<string, number>
): {
  totalValue: number;
  holdings: { symbol: string; shares: number; value: number }[];
} {
  let totalValue = 0;
  const holdingsWithValue = [];

  for (const holding of holdings) {
    const currentPrice = currentPrices[holding.stockSymbol] || 0;
    const value = holding.shares * currentPrice;
    totalValue += value;

    holdingsWithValue.push({
      symbol: holding.stockSymbol,
      shares: holding.shares,
      value: Math.round(value * 100) / 100,
    });
  }

  return {
    totalValue: Math.round(totalValue * 100) / 100,
    holdings: holdingsWithValue,
  };
}

/**
 * Calculate gains/losses for a holding
 */
export function calculateGainLoss(
  shares: number,
  purchasePrice: number,
  currentPrice: number
): {
  totalGain: number;
  percentGain: number;
  isProfit: boolean;
} {
  const costBasis = shares * purchasePrice;
  const currentValue = shares * currentPrice;
  const totalGain = currentValue - costBasis;
  const percentGain = (totalGain / costBasis) * 100;

  return {
    totalGain: Math.round(totalGain * 100) / 100,
    percentGain: Math.round(percentGain * 100) / 100,
    isProfit: totalGain > 0,
  };
}

/**
 * Process annual dividends
 */
export function processDividends(
  holdings: { stockSymbol: string; shares: number }[],
  stocks: Stock[]
): {
  totalDividends: number;
  dividendsByStock: { symbol: string; amount: number }[];
} {
  let totalDividends = 0;
  const dividendsByStock = [];

  for (const holding of holdings) {
    const stock = stocks.find((s) => s.symbol === holding.stockSymbol);
    if (!stock) continue;

    // Annual dividend = shares * price * yield
    const annualDividend = holding.shares * stock.currentPrice * (stock.dividendYield / 100);
    const monthlyDividend = annualDividend / 12;

    totalDividends += monthlyDividend;
    dividendsByStock.push({
      symbol: stock.symbol,
      amount: Math.round(monthlyDividend * 100) / 100,
    });
  }

  return {
    totalDividends: Math.round(totalDividends * 100) / 100,
    dividendsByStock,
  };
}

/**
 * Determine market condition based on sentiment and randomness
 */
export function determineMarketCondition(
  currentCondition: MarketCondition,
  monthsSinceChange: number
): MarketCondition {
  // Market conditions tend to persist for 6-24 months
  if (monthsSinceChange < 6) {
    // 90% chance to stay the same
    if (Math.random() < 0.9) {
      return currentCondition;
    }
  }

  // Transition probabilities
  const rand = Math.random();

  switch (currentCondition) {
    case 'bull':
      if (rand < 0.05) return 'crash'; // 5% crash risk
      if (rand < 0.20) return 'bear'; // 15% bear transition
      if (rand < 0.40) return 'volatile'; // 20% volatile
      if (rand < 0.60) return 'stable'; // 20% stable
      return 'bull'; // 40% stay bull

    case 'bear':
      if (rand < 0.30) return 'bull'; // 30% recovery
      if (rand < 0.50) return 'volatile'; // 20% volatile
      if (rand < 0.70) return 'stable'; // 20% stabilize
      if (rand < 0.75) return 'crash'; // 5% crash
      return 'bear'; // 25% stay bear

    case 'volatile':
      if (rand < 0.25) return 'bull'; // 25% bull
      if (rand < 0.45) return 'bear'; // 20% bear
      if (rand < 0.70) return 'stable'; // 25% stabilize
      if (rand < 0.75) return 'crash'; // 5% crash
      return 'volatile'; // 25% stay volatile

    case 'stable':
      if (rand < 0.35) return 'bull'; // 35% bull
      if (rand < 0.55) return 'bear'; // 20% bear
      if (rand < 0.70) return 'volatile'; // 15% volatile
      if (rand < 0.72) return 'crash'; // 2% crash
      return 'stable'; // 28% stay stable

    case 'crash':
      // Crash always transitions quickly
      if (rand < 0.60) return 'bear'; // 60% to bear market
      if (rand < 0.85) return 'volatile'; // 25% to volatile
      return 'bull'; // 15% quick recovery

    default:
      return 'stable';
  }
}

/**
 * Calculate trading fees and commissions
 */
export function calculateTradingFees(
  transactionValue: number,
  isDayTrade: boolean = false
): {
  commission: number;
  fees: number;
  total: number;
} {
  // Modern brokers often have $0 commissions, but we'll simulate small fees
  const commission = 0; // Most brokers are commission-free now
  const feeRate = 0.0001; // 0.01% SEC fee
  const fees = Math.round(transactionValue * feeRate * 100) / 100;

  // Day trading pattern penalty (simplified)
  const dayTradePenalty = isDayTrade ? 5 : 0;

  const total = commission + fees + dayTradePenalty;

  return {
    commission,
    fees,
    total: Math.round(total * 100) / 100,
  };
}

/**
 * Get investment recommendation based on risk tolerance
 */
export function getInvestmentRecommendations(
  riskTolerance: 'conservative' | 'moderate' | 'aggressive',
  age: number
): {
  recommendedStocks: string[];
  reasoning: string;
  assetAllocation: {
    stocks: number;
    bonds: number;
    cash: number;
  };
} {
  const ageInYears = age / 12;

  // Rule of thumb: stock allocation = 110 - age
  const baseStockAllocation = Math.max(20, Math.min(90, 110 - ageInYears));

  let stockAllocation = baseStockAllocation;
  let recommendedStocks: string[] = [];
  let reasoning = '';

  switch (riskTolerance) {
    case 'conservative':
      stockAllocation = baseStockAllocation * 0.7; // 30% less stocks
      recommendedStocks = ['UTIL', 'BANK', 'FOOD', 'INSU'];
      reasoning = 'Focus on stable, dividend-paying stocks with low volatility';
      break;

    case 'moderate':
      stockAllocation = baseStockAllocation;
      recommendedStocks = ['RETL', 'MEDI', 'BANK', 'MANU'];
      reasoning = 'Balanced portfolio with mix of growth and value stocks';
      break;

    case 'aggressive':
      stockAllocation = Math.min(100, baseStockAllocation * 1.3); // 30% more stocks
      recommendedStocks = ['TECH', 'SOFT', 'BIOT', 'RENW'];
      reasoning = 'High-growth technology and emerging sector focus';
      break;
  }

  const bondsAllocation = Math.round((100 - stockAllocation) * 0.7);
  const cashAllocation = 100 - stockAllocation - bondsAllocation;

  return {
    recommendedStocks,
    reasoning,
    assetAllocation: {
      stocks: Math.round(stockAllocation),
      bonds: bondsAllocation,
      cash: cashAllocation,
    },
  };
}

/**
 * Simulate market crash event
 */
export function simulateMarketCrash(): {
  severity: 'moderate' | 'severe' | 'catastrophic';
  marketDrop: number; // percentage
  recoveryMonths: number;
  description: string;
} {
  const rand = Math.random();

  let severity: 'moderate' | 'severe' | 'catastrophic';
  let marketDrop: number;
  let recoveryMonths: number;
  let description: string;

  if (rand < 0.60) {
    // 60% - Moderate correction
    severity = 'moderate';
    marketDrop = randint(10, 20);
    recoveryMonths = randint(3, 8);
    description = 'Market correction - stocks decline 10-20%';
  } else if (rand < 0.90) {
    // 30% - Severe crash
    severity = 'severe';
    marketDrop = randint(20, 40);
    recoveryMonths = randint(12, 24);
    description = 'Major market crash - stocks plunge 20-40%';
  } else {
    // 10% - Catastrophic crash
    severity = 'catastrophic';
    marketDrop = randint(40, 60);
    recoveryMonths = randint(24, 48);
    description = 'Catastrophic market collapse - stocks crater 40-60%';
  }

  return { severity, marketDrop, recoveryMonths, description };
}
