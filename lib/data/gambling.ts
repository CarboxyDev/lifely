import type { GamblingActivityType, LotteryDraw } from '../types';
import { randint } from '../utils/game-utils';

/**
 * Gambling activity definitions with odds and payouts
 */

export interface GamblingGame {
  type: GamblingActivityType;
  name: string;
  description: string;
  minBet: number;
  maxBet: number;
  houseEdge: number; // percentage (0-100)
  averageReturn: number; // percentage of bet returned on average
}

export const gamblingGames: Record<GamblingActivityType, GamblingGame> = {
  lottery: {
    type: 'lottery',
    name: 'Lottery',
    description: 'Daily, weekly, or mega lottery draws with huge jackpots',
    minBet: 2,
    maxBet: 100,
    houseEdge: 50, // Very high house edge
    averageReturn: 50,
  },
  'scratch-card': {
    type: 'scratch-card',
    name: 'Scratch Card',
    description: 'Instant win scratch-off tickets',
    minBet: 1,
    maxBet: 20,
    houseEdge: 30,
    averageReturn: 70,
  },
  'slot-machine': {
    type: 'slot-machine',
    name: 'Slot Machine',
    description: 'Classic slot machines with various payouts',
    minBet: 1,
    maxBet: 100,
    houseEdge: 10,
    averageReturn: 90,
  },
  blackjack: {
    type: 'blackjack',
    name: 'Blackjack',
    description: 'Card game against the dealer',
    minBet: 10,
    maxBet: 500,
    houseEdge: 5, // Low house edge with good play
    averageReturn: 95,
  },
  roulette: {
    type: 'roulette',
    name: 'Roulette',
    description: 'Spin the wheel and bet on numbers or colors',
    minBet: 5,
    maxBet: 500,
    houseEdge: 5.26,
    averageReturn: 94.74,
  },
  poker: {
    type: 'poker',
    name: 'Poker',
    description: 'Video poker or table poker',
    minBet: 10,
    maxBet: 1000,
    houseEdge: 2, // Can be positive with skill
    averageReturn: 98,
  },
  'sports-betting': {
    type: 'sports-betting',
    name: 'Sports Betting',
    description: 'Bet on sports events',
    minBet: 10,
    maxBet: 1000,
    houseEdge: 4.5,
    averageReturn: 95.5,
  },
  'horse-racing': {
    type: 'horse-racing',
    name: 'Horse Racing',
    description: 'Bet on horse races',
    minBet: 2,
    maxBet: 500,
    houseEdge: 15,
    averageReturn: 85,
  },
};

/**
 * Generate lottery numbers
 */
export function generateLotteryNumbers(count: number, max: number): number[] {
  const numbers: number[] = [];
  while (numbers.length < count) {
    const num = randint(1, max);
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }
  return numbers.sort((a, b) => a - b);
}

/**
 * Create a lottery draw
 */
export function createLotteryDraw(
  type: 'daily' | 'weekly' | 'mega',
  timestamp: number
): LotteryDraw {
  let jackpot = 0;
  let numberCount = 0;
  let maxNumber = 0;

  switch (type) {
    case 'daily':
      jackpot = randint(50000, 200000);
      numberCount = 5;
      maxNumber = 30;
      break;
    case 'weekly':
      jackpot = randint(500000, 2000000);
      numberCount = 6;
      maxNumber = 49;
      break;
    case 'mega':
      jackpot = randint(5000000, 100000000);
      numberCount = 6;
      maxNumber = 70;
      break;
  }

  return {
    id: `${type}-${timestamp}`,
    type,
    drawDate: timestamp,
    winningNumbers: generateLotteryNumbers(numberCount, maxNumber),
    jackpot,
    winners: randint(0, 3), // Usually 0-3 winners
  };
}

/**
 * Check lottery ticket match
 */
export function checkLotteryMatch(
  playerNumbers: number[],
  winningNumbers: number[]
): { matches: number; prize: number; tier: string } {
  const matches = playerNumbers.filter((n) => winningNumbers.includes(n)).length;
  let prize = 0;
  let tier = 'No match';

  // Prize tiers based on matches
  if (matches === winningNumbers.length) {
    tier = 'Jackpot!';
    prize = 1000000; // Simplified - would split actual jackpot
  } else if (matches === winningNumbers.length - 1) {
    tier = 'Second prize';
    prize = randint(50000, 100000);
  } else if (matches === winningNumbers.length - 2) {
    tier = 'Third prize';
    prize = randint(1000, 5000);
  } else if (matches === 3) {
    tier = 'Fourth prize';
    prize = randint(50, 200);
  } else if (matches === 2) {
    tier = 'Fifth prize';
    prize = randint(5, 20);
  }

  return { matches, prize, tier };
}

/**
 * Play scratch card
 */
export function playScratchCard(betAmount: number): {
  won: boolean;
  payout: number;
  message: string;
} {
  // Scratch cards have ~70% return rate
  const random = Math.random();

  if (random < 0.001) {
    // 0.1% chance - Big win (1000x)
    return {
      won: true,
      payout: betAmount * 1000,
      message: 'JACKPOT! 1000x win!',
    };
  } else if (random < 0.01) {
    // 0.9% chance - Large win (100x)
    return {
      won: true,
      payout: betAmount * 100,
      message: 'Big winner! 100x win!',
    };
  } else if (random < 0.05) {
    // 4% chance - Good win (20x)
    return {
      won: true,
      payout: betAmount * 20,
      message: 'Nice win! 20x payout!',
    };
  } else if (random < 0.15) {
    // 10% chance - Moderate win (5x)
    return {
      won: true,
      payout: betAmount * 5,
      message: 'You won! 5x payout!',
    };
  } else if (random < 0.30) {
    // 15% chance - Small win (2x)
    return {
      won: true,
      payout: betAmount * 2,
      message: 'Winner! Doubled your money!',
    };
  } else {
    // 70% chance - Loss
    return {
      won: false,
      payout: 0,
      message: 'Not a winner. Try again!',
    };
  }
}

/**
 * Play slot machine
 */
export function playSlotMachine(betAmount: number): {
  won: boolean;
  payout: number;
  symbols: string[];
  message: string;
} {
  const symbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '7️⃣', 'BAR'];
  const weights = [30, 25, 20, 15, 5, 3, 1.5, 0.5]; // % chances

  // Generate 3 symbols based on weighted probabilities
  function getSymbol(): string {
    const rand = Math.random() * 100;
    let cumulative = 0;
    for (let i = 0; i < symbols.length; i++) {
      cumulative += weights[i];
      if (rand < cumulative) return symbols[i];
    }
    return symbols[0];
  }

  const reel1 = getSymbol();
  const reel2 = getSymbol();
  const reel3 = getSymbol();

  // Check for wins
  if (reel1 === reel2 && reel2 === reel3) {
    // Three of a kind
    let multiplier = 0;
    switch (reel1) {
      case '7️⃣':
        multiplier = 1000;
        break;
      case '💎':
        multiplier = 500;
        break;
      case '⭐':
        multiplier = 100;
        break;
      case 'BAR':
        multiplier = 50;
        break;
      case '🍇':
        multiplier = 25;
        break;
      case '🍊':
        multiplier = 15;
        break;
      case '🍋':
        multiplier = 10;
        break;
      case '🍒':
        multiplier = 5;
        break;
    }

    return {
      won: true,
      payout: betAmount * multiplier,
      symbols: [reel1, reel2, reel3],
      message: `${reel1} ${reel2} ${reel3} - ${multiplier}x win!`,
    };
  } else if (reel1 === reel2 || reel2 === reel3 || reel1 === reel3) {
    // Two of a kind - small win
    return {
      won: true,
      payout: betAmount * 2,
      symbols: [reel1, reel2, reel3],
      message: `${reel1} ${reel2} ${reel3} - Pair! 2x win!`,
    };
  } else {
    // No match
    return {
      won: false,
      payout: 0,
      symbols: [reel1, reel2, reel3],
      message: `${reel1} ${reel2} ${reel3} - No match`,
    };
  }
}

/**
 * Play blackjack (simplified)
 */
export function playBlackjack(betAmount: number): {
  won: boolean;
  payout: number;
  playerHand: number;
  dealerHand: number;
  message: string;
} {
  // Simplified blackjack simulation
  const drawCard = () => Math.min(randint(1, 13), 10); // Ace=1-11, Face cards=10

  let playerHand = drawCard() + drawCard();
  let dealerHand = drawCard() + drawCard();

  // Player hits if under 17 (simple strategy)
  while (playerHand < 17 && Math.random() > 0.3) {
    playerHand += drawCard();
  }

  // Dealer hits on 16 and below
  while (dealerHand < 17) {
    dealerHand += drawCard();
  }

  // Check for bust
  if (playerHand > 21) {
    return {
      won: false,
      payout: 0,
      playerHand,
      dealerHand,
      message: `Bust! You: ${playerHand}, Dealer: ${dealerHand}`,
    };
  }

  if (dealerHand > 21) {
    return {
      won: true,
      payout: betAmount * 2,
      playerHand,
      dealerHand,
      message: `Dealer bust! You: ${playerHand}, Dealer: ${dealerHand}`,
    };
  }

  // Compare hands
  if (playerHand > dealerHand) {
    return {
      won: true,
      payout: betAmount * 2,
      playerHand,
      dealerHand,
      message: `You win! You: ${playerHand}, Dealer: ${dealerHand}`,
    };
  } else if (playerHand === dealerHand) {
    return {
      won: false,
      payout: betAmount, // Push - money back
      playerHand,
      dealerHand,
      message: `Push! You: ${playerHand}, Dealer: ${dealerHand}`,
    };
  } else {
    return {
      won: false,
      payout: 0,
      playerHand,
      dealerHand,
      message: `Dealer wins! You: ${playerHand}, Dealer: ${dealerHand}`,
    };
  }
}

/**
 * Play roulette
 */
export function playRoulette(
  betAmount: number,
  betType: 'number' | 'color' | 'odd-even' | 'high-low'
): {
  won: boolean;
  payout: number;
  result: number;
  resultColor: 'red' | 'black' | 'green';
  message: string;
} {
  const number = randint(0, 36); // 0-36 (0 is green, others red/black)
  const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  const color: 'red' | 'black' | 'green' =
    number === 0 ? 'green' : redNumbers.includes(number) ? 'red' : 'black';

  let won = false;
  let payout = 0;
  let message = '';

  switch (betType) {
    case 'number':
      // Random number bet (1/37 odds, pays 35:1)
      const playerNumber = randint(0, 36);
      if (number === playerNumber) {
        won = true;
        payout = betAmount * 36;
        message = `Hit number ${number}! 35:1 payout!`;
      } else {
        message = `Number ${number} (${color}). You bet ${playerNumber}`;
      }
      break;

    case 'color':
      // Random color bet (18/37 odds, pays 1:1)
      const playerColor = Math.random() < 0.5 ? 'red' : 'black';
      if (color === playerColor) {
        won = true;
        payout = betAmount * 2;
        message = `${color} wins! You bet ${playerColor}`;
      } else {
        message = `${color} - You bet ${playerColor}`;
      }
      break;

    case 'odd-even':
      // Odd/even bet (18/37 odds, pays 1:1)
      const playerOddEven = Math.random() < 0.5 ? 'odd' : 'even';
      const isOdd = number % 2 === 1;
      const resultOddEven = number === 0 ? 'zero' : isOdd ? 'odd' : 'even';
      if (resultOddEven === playerOddEven) {
        won = true;
        payout = betAmount * 2;
        message = `${number} (${resultOddEven}) - You bet ${playerOddEven}`;
      } else {
        message = `${number} (${resultOddEven}) - You bet ${playerOddEven}`;
      }
      break;

    case 'high-low':
      // High (19-36) or Low (1-18) bet (18/37 odds, pays 1:1)
      const playerHighLow = Math.random() < 0.5 ? 'high' : 'low';
      const resultHighLow =
        number === 0 ? 'zero' : number >= 19 ? 'high' : 'low';
      if (resultHighLow === playerHighLow) {
        won = true;
        payout = betAmount * 2;
        message = `${number} (${resultHighLow}) - You bet ${playerHighLow}`;
      } else {
        message = `${number} (${resultHighLow}) - You bet ${playerHighLow}`;
      }
      break;
  }

  return { won, payout, result: number, resultColor: color, message };
}

/**
 * Calculate gambling addiction risk
 */
export function calculateGamblingRisk(
  totalWagered: number,
  totalLost: number,
  gamblingStreak: number,
  recentActivities: number // count in last month
): {
  riskLevel: 'none' | 'low' | 'moderate' | 'high' | 'severe';
  riskScore: number; // 0-100
  warnings: string[];
} {
  let riskScore = 0;
  const warnings: string[] = [];

  // Factor 1: Total amount wagered
  if (totalWagered > 50000) {
    riskScore += 25;
    warnings.push('High total gambling amount');
  } else if (totalWagered > 10000) {
    riskScore += 15;
  }

  // Factor 2: Net losses
  const lossRatio = totalWagered > 0 ? totalLost / totalWagered : 0;
  if (lossRatio > 0.5) {
    riskScore += 20;
    warnings.push('Significant gambling losses');
  } else if (lossRatio > 0.3) {
    riskScore += 10;
  }

  // Factor 3: Gambling frequency (streak)
  if (gamblingStreak > 12) {
    riskScore += 30;
    warnings.push('Gambling every month for over a year');
  } else if (gamblingStreak > 6) {
    riskScore += 20;
    warnings.push('Regular gambling pattern');
  } else if (gamblingStreak > 3) {
    riskScore += 10;
  }

  // Factor 4: Recent activity intensity
  if (recentActivities > 20) {
    riskScore += 25;
    warnings.push('Excessive recent gambling activity');
  } else if (recentActivities > 10) {
    riskScore += 15;
  } else if (recentActivities > 5) {
    riskScore += 5;
  }

  // Determine risk level
  let riskLevel: 'none' | 'low' | 'moderate' | 'high' | 'severe';
  if (riskScore >= 75) {
    riskLevel = 'severe';
    warnings.push('Severe gambling problem - seek help');
  } else if (riskScore >= 50) {
    riskLevel = 'high';
    warnings.push('High risk of gambling addiction');
  } else if (riskScore >= 30) {
    riskLevel = 'moderate';
  } else if (riskScore >= 10) {
    riskLevel = 'low';
  } else {
    riskLevel = 'none';
  }

  return { riskLevel, riskScore, warnings };
}
