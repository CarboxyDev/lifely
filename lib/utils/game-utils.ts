// Game utility functions for Lifely

/**
 * Generate a random integer between min and max (inclusive)
 */
export function randint(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Convert age in months to years and months string
 */
export function formatAge(ageInMonths: number): string {
  const years = Math.floor(ageInMonths / 12);
  const months = ageInMonths % 12;
  return `${years}y ${months}m`;
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Get a random item from an array
 */
export function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Calculate percentage for stat bars
 */
export function getStatPercentage(value: number, max: number = 100): number {
  return (value / max) * 100;
}

/**
 * Get color based on stat value
 */
export function getStatColor(value: number, max: number = 100): string {
  const percentage = (value / max) * 100;

  if (percentage >= 70) return 'hsl(142, 76%, 36%)'; // green
  if (percentage >= 40) return 'hsl(45, 93%, 47%)'; // yellow
  return 'hsl(0, 84%, 60%)'; // red
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Calculate net worth
 */
export function calculateNetWorth(
  money: number,
  bankBalance: number,
  assets: { value: number }[],
  bankLoan: number,
  studentLoan: number
): number {
  const assetsValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  return money + bankBalance + assetsValue - bankLoan - studentLoan;
}

/**
 * Check if player has enough money (cash or bank)
 */
export function hasSufficientFunds(
  required: number,
  cash: number,
  bankBalance: number
): { sufficient: boolean; useBank: boolean } {
  if (cash >= required) {
    return { sufficient: true, useBank: false };
  }
  if (bankBalance >= required) {
    return { sufficient: true, useBank: true };
  }
  return { sufficient: false, useBank: false };
}

/**
 * Generate a random event chance
 */
export function randomChance(percentage: number): boolean {
  return Math.random() * 100 < percentage;
}

/**
 * Save game state to localStorage
 */
export function saveGame(state: any): void {
  try {
    localStorage.setItem('lifely-save', JSON.stringify(state));
    localStorage.setItem('lifely-save-date', new Date().toISOString());
  } catch (error) {
    console.error('Failed to save game:', error);
  }
}

/**
 * Load game state from localStorage
 */
export function loadGame(): any | null {
  try {
    const saved = localStorage.getItem('lifely-save');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load game:', error);
    return null;
  }
}

/**
 * Delete saved game
 */
export function deleteSave(): void {
  localStorage.removeItem('lifely-save');
  localStorage.removeItem('lifely-save-date');
}
