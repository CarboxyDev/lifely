import type { Cryptocurrency } from '../types';
import { randint } from '../utils/game-utils';

/**
 * Cryptocurrency trading system with extreme volatility
 */

export const availableCryptos: Cryptocurrency[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    currentPrice: 45000,
    previousPrice: 45000,
    volatility: 85,
    marketCap: 900000000000, // $900B
    maxSupply: 21000000,
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    currentPrice: 3000,
    previousPrice: 3000,
    volatility: 90,
    marketCap: 360000000000, // $360B
    maxSupply: 0, // No max supply
  },
  {
    symbol: 'BNB',
    name: 'Binance Coin',
    currentPrice: 400,
    previousPrice: 400,
    volatility: 95,
    marketCap: 60000000000,
    maxSupply: 200000000,
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    currentPrice: 100,
    previousPrice: 100,
    volatility: 100,
    marketCap: 40000000000,
    maxSupply: 0,
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    currentPrice: 0.50,
    previousPrice: 0.50,
    volatility: 95,
    marketCap: 18000000000,
    maxSupply: 45000000000,
  },
  {
    symbol: 'DOGE',
    name: 'Dogecoin',
    currentPrice: 0.08,
    previousPrice: 0.08,
    volatility: 120, // Meme coins = extreme volatility
    marketCap: 12000000000,
    maxSupply: 0,
  },
  {
    symbol: 'MATIC',
    name: 'Polygon',
    currentPrice: 0.80,
    previousPrice: 0.80,
    volatility: 100,
    marketCap: 7500000000,
    maxSupply: 10000000000,
  },
  {
    symbol: 'LINK',
    name: 'Chainlink',
    currentPrice: 15.00,
    previousPrice: 15.00,
    volatility: 95,
    marketCap: 8000000000,
    maxSupply: 1000000000,
  },
];

/**
 * Simulate crypto price movement (much more volatile than stocks)
 */
export function simulateCryptoPriceMovement(
  crypto: Cryptocurrency,
  marketBoom: boolean,
  monthlyChange: boolean = true
): {
  newPrice: number;
  percentChange: number;
  reason: string;
} {
  const volatilityFactor = crypto.volatility / 100;

  // Crypto can swing wildly - base range ±50% for max volatility
  let baseChangePercent = (Math.random() - 0.5) * 2 * volatilityFactor * 50;

  // Market boom (bull run) vs normal
  if (marketBoom) {
    baseChangePercent += randint(5, 25); // Strong upward bias
  } else {
    // Random chance of -30% crash even in normal times
    if (Math.random() < 0.05) {
      baseChangePercent = -randint(20, 50); // 5% chance of crash
    }
  }

  // Monthly vs weekly movement (weekly is smaller)
  if (!monthlyChange) {
    baseChangePercent *= 0.25; // Weekly changes are 1/4 of monthly
  }

  const newPrice = Math.max(0.01, crypto.currentPrice * (1 + baseChangePercent / 100));

  // Determine reason
  let reason = '';
  if (baseChangePercent > 50) {
    reason = 'Massive pump! To the moon!';
  } else if (baseChangePercent > 20) {
    reason = 'Strong rally';
  } else if (baseChangePercent > 10) {
    reason = 'Bullish momentum';
  } else if (baseChangePercent > -10) {
    reason = 'Consolidating';
  } else if (baseChangePercent > -20) {
    reason = 'Bearish pressure';
  } else if (baseChangePercent > -40) {
    reason = 'Sharp correction';
  } else {
    reason = 'Market crash!';
  }

  return {
    newPrice: Math.round(newPrice * 100) / 100,
    percentChange: Math.round(baseChangePercent * 100) / 100,
    reason,
  };
}

/**
 * Calculate portfolio value
 */
export function calculateCryptoPortfolioValue(
  holdings: { cryptoSymbol: string; amount: number }[],
  currentPrices: Record<string, number>
): {
  totalValue: number;
  holdings: { symbol: string; amount: number; value: number }[];
} {
  let totalValue = 0;
  const holdingsWithValue = [];

  for (const holding of holdings) {
    const currentPrice = currentPrices[holding.cryptoSymbol] || 0;
    const value = holding.amount * currentPrice;
    totalValue += value;

    holdingsWithValue.push({
      symbol: holding.cryptoSymbol,
      amount: Math.round(holding.amount * 100000) / 100000, // 5 decimal places
      value: Math.round(value * 100) / 100,
    });
  }

  return {
    totalValue: Math.round(totalValue * 100) / 100,
    holdings: holdingsWithValue,
  };
}

/**
 * Calculate crypto trading fees (higher than stocks)
 */
export function calculateCryptoFees(
  transactionValue: number,
  exchange: 'basic' | 'premium' = 'basic'
): {
  tradingFee: number;
  networkFee: number;
  total: number;
} {
  // Trading fees
  const feeRate = exchange === 'premium' ? 0.001 : 0.0025; // 0.1% vs 0.25%
  const tradingFee = Math.round(transactionValue * feeRate * 100) / 100;

  // Network/gas fees (fixed cost, higher for smaller transactions)
  const networkFee = exchange === 'premium' ? 2 : 5;

  const total = tradingFee + networkFee;

  return {
    tradingFee,
    networkFee,
    total: Math.round(total * 100) / 100,
  };
}

/**
 * Calculate staking rewards
 */
export function calculateStakingRewards(
  stakedAmount: number,
  coinPrice: number,
  apr: number, // Annual percentage rate
  monthsStaked: number
): {
  monthlyReward: number;
  totalRewards: number;
  rewardValue: number;
} {
  // Monthly reward = (stakedAmount * APR) / 12
  const monthlyReward = (stakedAmount * apr) / 12 / 100;
  const totalRewards = monthlyReward * monthsStaked;
  const rewardValue = totalRewards * coinPrice;

  return {
    monthlyReward: Math.round(monthlyReward * 100000) / 100000,
    totalRewards: Math.round(totalRewards * 100000) / 100000,
    rewardValue: Math.round(rewardValue * 100) / 100,
  };
}

/**
 * Get staking APR for different cryptos
 */
export function getStakingAPR(cryptoSymbol: string): number {
  const stakingRates: Record<string, number> = {
    BTC: 0, // Bitcoin doesn't have staking
    ETH: 4.5, // Ethereum staking ~4.5%
    BNB: 6.0, // Binance Coin ~6%
    SOL: 7.0, // Solana ~7%
    ADA: 5.0, // Cardano ~5%
    DOGE: 0, // Dogecoin doesn't have staking
    MATIC: 8.0, // Polygon ~8%
    LINK: 0, // Chainlink doesn't have staking
  };

  return stakingRates[cryptoSymbol] || 0;
}

/**
 * Determine crypto market boom/bust cycle
 */
export function determineCryptoMarketCycle(
  currentBoom: boolean,
  monthsSinceCycleChange: number
): boolean {
  // Crypto cycles tend to be 12-36 months
  if (monthsSinceCycleChange < 12) {
    // 95% chance to stay in current cycle
    if (Math.random() < 0.95) {
      return currentBoom;
    }
  }

  // After 12 months, cycles can change
  if (currentBoom) {
    // Bull market can end
    // 70% stay bull, 30% turn bear
    return Math.random() < 0.70;
  } else {
    // Bear market can recover
    // 40% stay bear, 60% turn bull
    return Math.random() < 0.60;
  }
}

/**
 * Get crypto investment risk warning
 */
export function getCryptoRiskWarning(investmentAmount: number, netWorth: number): {
  riskLevel: 'low' | 'moderate' | 'high' | 'extreme';
  warning: string;
  shouldProceed: boolean;
} {
  const percentOfNetWorth = netWorth > 0 ? (investmentAmount / netWorth) * 100 : 100;

  let riskLevel: 'low' | 'moderate' | 'high' | 'extreme';
  let warning: string;
  let shouldProceed: boolean;

  if (percentOfNetWorth > 50) {
    riskLevel = 'extreme';
    warning =
      'EXTREME RISK: Investing over 50% of net worth in crypto is extremely dangerous. You could lose everything.';
    shouldProceed = false;
  } else if (percentOfNetWorth > 25) {
    riskLevel = 'high';
    warning =
      'HIGH RISK: Investing over 25% in crypto is very risky. Only invest what you can afford to lose.';
    shouldProceed = false;
  } else if (percentOfNetWorth > 10) {
    riskLevel = 'moderate';
    warning =
      'MODERATE RISK: Crypto is highly volatile. Consider limiting to 5-10% of portfolio.';
    shouldProceed = true;
  } else {
    riskLevel = 'low';
    warning = 'Reasonable allocation. Remember crypto is highly speculative.';
    shouldProceed = true;
  }

  return { riskLevel, warning, shouldProceed };
}

/**
 * Simulate whale movement (large investor buying/selling)
 */
export function simulateWhaleActivity(): {
  affected: boolean;
  impact: number; // percentage impact
  direction: 'pump' | 'dump';
} {
  // 10% chance of whale activity per month
  if (Math.random() > 0.10) {
    return { affected: false, impact: 0, direction: 'pump' };
  }

  const direction: 'pump' | 'dump' = Math.random() < 0.5 ? 'pump' : 'dump';
  const impact = direction === 'pump' ? randint(10, 30) : -randint(15, 40);

  return { affected: true, impact, direction };
}

/**
 * Calculate potential rug pull risk for volatile coins
 */
export function calculateRugPullRisk(crypto: Cryptocurrency): {
  riskScore: number; // 0-100
  warning: string;
} {
  let riskScore = 0;

  // Very high volatility = higher risk
  if (crypto.volatility > 110) {
    riskScore += 40;
  } else if (crypto.volatility > 100) {
    riskScore += 25;
  }

  // Smaller market cap = higher risk
  if (crypto.marketCap < 10000000000) {
    // < $10B
    riskScore += 30;
  } else if (crypto.marketCap < 50000000000) {
    // < $50B
    riskScore += 15;
  }

  // Meme coins (like DOGE) have elevated risk
  if (crypto.symbol === 'DOGE') {
    riskScore += 20;
  }

  let warning = '';
  if (riskScore > 70) {
    warning = 'VERY HIGH RISK: This coin could crash to near-zero. Invest with extreme caution.';
  } else if (riskScore > 50) {
    warning = 'HIGH RISK: Volatile asset with significant downside potential.';
  } else if (riskScore > 30) {
    warning = 'MODERATE RISK: Standard crypto volatility applies.';
  } else {
    warning = 'LOWER RISK: Relatively established cryptocurrency.';
  }

  return { riskScore, warning };
}

/**
 * Get crypto market sentiment
 */
export function getCryptoMarketSentiment(marketBoom: boolean, recentChange: number): string {
  if (marketBoom) {
    if (recentChange > 30) {
      return 'Extreme greed - euphoria in the market';
    } else if (recentChange > 15) {
      return 'Greed - strong bullish sentiment';
    } else {
      return 'Optimism - steady upward trend';
    }
  } else {
    if (recentChange < -30) {
      return 'Extreme fear - panic selling';
    } else if (recentChange < -15) {
      return 'Fear - bearish sentiment dominates';
    } else {
      return 'Uncertainty - choppy market conditions';
    }
  }
}
