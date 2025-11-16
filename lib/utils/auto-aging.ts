import type { CalendarState, GameDate } from '../types';
import { advanceOneDay } from './calendar-system';
import { checkDailyEvent } from '../data/daily-events';
import { checkInteractiveEvent } from '../data/interactive-events';

/**
 * AUTO-TICK AGING SYSTEM
 * Continuously advances the character's age day-by-day
 * Pauses when events requiring user input occur
 */

export type AgingSpeed = 'paused' | 'slow' | 'normal' | 'fast' | 'very-fast';

export interface AgingTickResult {
  shouldContinue: boolean; // False if event requires user input
  newCalendarState?: CalendarState;
  event?: any; // Event that triggered pause, if any
  daysAdvanced: number;
}

/**
 * Get milliseconds delay between ticks based on speed
 */
export function getTickDelay(speed: AgingSpeed): number {
  switch (speed) {
    case 'paused':
      return 0; // No ticking
    case 'slow':
      return 10000; // 1 day every 10 seconds
    case 'normal':
      return 5000; // 1 day every 5 seconds
    case 'fast':
      return 2500; // 1 day every 2.5 seconds
    case 'very-fast':
      return 1000; // 1 day every 1 second
    default:
      return 5000;
  }
}

/**
 * Advance one day and check for events
 */
export function performAgingTick(
  currentCalendar: CalendarState,
  playerData: {
    age: number; // in days
    wealth: number;
    fame: number;
    hasJob: boolean;
    hasSpouse: boolean;
    health: number;
    morale: number;
    intellect: number;
    looks: number;
    luck: number;
  }
): AgingTickResult {
  // Advance calendar by one day
  const newDate = advanceOneDay(currentCalendar.currentDate);

  // Calculate new age
  const totalDaysLived = newDate.totalDaysLived;
  const ageInDays = totalDaysLived - currentCalendar.birthDate.totalDaysLived;
  const ageInYears = Math.floor(ageInDays / 365.25);
  const ageInMonths = Math.floor(ageInDays / 30.44);

  // Calculate season
  const month = newDate.month;
  let season: 'spring' | 'summer' | 'fall' | 'winter';
  if (month >= 3 && month <= 5) season = 'spring';
  else if (month >= 6 && month <= 8) season = 'summer';
  else if (month >= 9 && month <= 11) season = 'fall';
  else season = 'winter';

  // Check if weekend
  const isWeekend = newDate.dayOfWeek === 0 || newDate.dayOfWeek === 6;

  // Create updated calendar state
  const newCalendarState: CalendarState = {
    currentDate: newDate,
    birthDate: currentCalendar.birthDate,
    ageInYears,
    ageInMonths,
    ageInDays,
    season,
    isWeekend,
    isHoliday: false, // TODO: Implement holiday checking
    tickSpeed: currentCalendar.tickSpeed,
  };

  // Check for interactive events first (these require user input)
  const interactiveEvent = checkInteractiveEvent({
    age: ageInDays,
    wealth: playerData.wealth,
    fame: playerData.fame,
    hasJob: playerData.hasJob,
    hasSpouse: playerData.hasSpouse,
    health: playerData.health,
    intellect: playerData.intellect,
  });

  if (interactiveEvent) {
    return {
      shouldContinue: false, // Pause for user input
      newCalendarState,
      event: interactiveEvent,
      daysAdvanced: 1,
    };
  }

  // Check for regular daily events
  const dailyEventResult = checkDailyEvent(
    ageInDays,
    playerData.wealth,
    playerData.fame,
    playerData.hasJob,
    playerData.hasSpouse,
    !isWeekend,
    isWeekend,
    season,
    playerData.luck
  );

  if (dailyEventResult.eventOccurs && dailyEventResult.event) {
    // Check if event has choices (requires user input)
    const hasChoices = dailyEventResult.event.choices && dailyEventResult.event.choices.length > 0;

    if (hasChoices) {
      return {
        shouldContinue: false, // Pause for user choice
        newCalendarState,
        event: dailyEventResult.event,
        daysAdvanced: 1,
      };
    }

    // Event doesn't require input, apply effects and continue
    // Effects will be applied by the caller
    return {
      shouldContinue: true,
      newCalendarState,
      event: dailyEventResult.event,
      daysAdvanced: 1,
    };
  }

  // No events, continue ticking
  return {
    shouldContinue: true,
    newCalendarState,
    daysAdvanced: 1,
  };
}

/**
 * Calculate aging effects for this day
 * Health/morale naturally decay over time
 */
export function calculateDailyAgingEffects(
  currentAge: number, // in days
  currentHealth: number,
  currentMorale: number
): {
  healthChange: number;
  moraleChange: number;
} {
  const ageInYears = currentAge / 365.25;

  let healthChange = 0;
  let moraleChange = 0;

  // Health decay increases with age
  if (ageInYears >= 40) {
    healthChange = -0.01; // Slow decline
  }
  if (ageInYears >= 60) {
    healthChange = -0.02; // Faster decline
  }
  if (ageInYears >= 80) {
    healthChange = -0.05; // Rapid decline
  }

  // Morale fluctuates slightly
  moraleChange = (Math.random() - 0.5) * 0.1; // Random small change

  // Very low health affects morale
  if (currentHealth < 20) {
    moraleChange -= 0.1;
  }

  // Very low morale affects health
  if (currentMorale < 20) {
    healthChange -= 0.05;
  }

  return { healthChange, moraleChange };
}

/**
 * Check if character should die of old age or poor health
 */
export function checkDeathConditions(
  age: number, // in days
  health: number
): {
  isDead: boolean;
  deathReason?: string;
} {
  const ageInYears = age / 365.25;

  // Health-based death
  if (health <= 0) {
    return {
      isDead: true,
      deathReason: 'Health complications',
    };
  }

  // Age-based death probability
  if (ageInYears >= 80) {
    const deathChance = (ageInYears - 80) * 0.001; // 0.1% at 80, increases with age
    if (Math.random() < deathChance) {
      return {
        isDead: true,
        deathReason: 'Old age',
      };
    }
  }

  // Extreme age (100+) has higher death chance
  if (ageInYears >= 100) {
    const deathChance = (ageInYears - 100) * 0.01 + 0.05; // 5% at 100, increases rapidly
    if (Math.random() < deathChance) {
      return {
        isDead: true,
        deathReason: 'Old age',
      };
    }
  }

  return { isDead: false };
}

/**
 * Check for birthday and milestone events
 */
export function checkBirthdayMilestone(
  previousAge: number, // in days
  newAge: number // in days
): {
  isBirthday: boolean;
  age?: number; // in years
  milestoneMessage?: string;
} {
  const previousYears = Math.floor(previousAge / 365.25);
  const newYears = Math.floor(newAge / 365.25);

  if (newYears > previousYears) {
    // Birthday!
    const age = newYears;
    let milestoneMessage: string | undefined;

    // Special milestone ages
    if (age === 21) milestoneMessage = 'You can now legally drink in the US! 🍺';
    else if (age === 25) milestoneMessage = 'Quarter century milestone!';
    else if (age === 30) milestoneMessage = 'Entered your 30s!';
    else if (age === 40) milestoneMessage = 'Life begins at 40!';
    else if (age === 50) milestoneMessage = 'Half a century old!';
    else if (age === 65) milestoneMessage = 'Retirement age in many countries!';
    else if (age === 75) milestoneMessage = 'Diamond anniversary!';
    else if (age === 100) milestoneMessage = 'CENTENARIAN! What a life!';
    else if (age % 10 === 0) milestoneMessage = `Entered your ${age}s!`;

    return {
      isBirthday: true,
      age,
      milestoneMessage,
    };
  }

  return { isBirthday: false };
}

/**
 * Process monthly salary (every ~30 days)
 */
export function checkMonthlySalary(
  previousAge: number, // in days
  newAge: number, // in days
  hasJob: boolean,
  currentSalary: number
): {
  shouldReceiveSalary: boolean;
  salaryAmount?: number;
} {
  if (!hasJob) return { shouldReceiveSalary: false };

  const previousMonths = Math.floor(previousAge / 30.44);
  const newMonths = Math.floor(newAge / 30.44);

  if (newMonths > previousMonths) {
    // New month, pay salary
    const monthlySalary = currentSalary / 12;
    return {
      shouldReceiveSalary: true,
      salaryAmount: Math.floor(monthlySalary),
    };
  }

  return { shouldReceiveSalary: false };
}

/**
 * Batch process multiple days (for catching up after pause)
 * Returns aggregate results without triggering events
 */
export function batchProcessDays(
  startCalendar: CalendarState,
  daysToProcess: number,
  playerData: {
    age: number;
    health: number;
    morale: number;
    hasJob: boolean;
    currentSalary: number;
  }
): {
  finalCalendar: CalendarState;
  totalHealthChange: number;
  totalMoraleChange: number;
  birthdaysOccurred: number[];
  salariesEarned: number;
} {
  let currentDate = startCalendar.currentDate;
  let totalHealthChange = 0;
  let totalMoraleChange = 0;
  const birthdaysOccurred: number[] = [];
  let salariesEarned = 0;

  let currentAge = startCalendar.ageInDays;

  for (let i = 0; i < daysToProcess; i++) {
    currentDate = advanceOneDay(currentDate);
    currentAge++;

    // Calculate aging effects
    const agingEffects = calculateDailyAgingEffects(
      currentAge,
      playerData.health + totalHealthChange,
      playerData.morale + totalMoraleChange
    );
    totalHealthChange += agingEffects.healthChange;
    totalMoraleChange += agingEffects.moraleChange;

    // Check for birthday
    const birthdayCheck = checkBirthdayMilestone(currentAge - 1, currentAge);
    if (birthdayCheck.isBirthday && birthdayCheck.age) {
      birthdaysOccurred.push(birthdayCheck.age);
    }

    // Check for monthly salary
    const salaryCheck = checkMonthlySalary(
      currentAge - 1,
      currentAge,
      playerData.hasJob,
      playerData.currentSalary
    );
    if (salaryCheck.shouldReceiveSalary && salaryCheck.salaryAmount) {
      salariesEarned += salaryCheck.salaryAmount;
    }
  }

  // Create final calendar state
  const ageInDays = currentDate.totalDaysLived - startCalendar.birthDate.totalDaysLived;
  const ageInYears = Math.floor(ageInDays / 365.25);
  const ageInMonths = Math.floor(ageInDays / 30.44);

  const month = currentDate.month;
  let season: 'spring' | 'summer' | 'fall' | 'winter';
  if (month >= 3 && month <= 5) season = 'spring';
  else if (month >= 6 && month <= 8) season = 'summer';
  else if (month >= 9 && month <= 11) season = 'fall';
  else season = 'winter';

  const isWeekend = currentDate.dayOfWeek === 0 || currentDate.dayOfWeek === 6;

  const finalCalendar: CalendarState = {
    currentDate,
    birthDate: startCalendar.birthDate,
    ageInYears,
    ageInMonths,
    ageInDays,
    season,
    isWeekend,
    isHoliday: false,
    tickSpeed: startCalendar.tickSpeed,
  };

  return {
    finalCalendar,
    totalHealthChange,
    totalMoraleChange,
    birthdaysOccurred,
    salariesEarned,
  };
}
