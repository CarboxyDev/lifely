import type { GameDate, Season, DayOfWeek, CalendarState } from '../types';
import { randint } from './game-utils';

/**
 * Calendar system for day-by-day time progression
 */

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const DAY_NAMES: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Check if year is leap year
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Get days in month
 */
export function getDaysInMonth(month: number, year: number): number {
  if (month === 2 && isLeapYear(year)) {
    return 29;
  }
  return DAYS_IN_MONTH[month - 1];
}

/**
 * Get season from month
 */
export function getSeason(month: number): Season {
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'fall';
  return 'winter';
}

/**
 * Get day of week name
 */
export function getDayOfWeekName(dayOfWeek: number): DayOfWeek {
  return DAY_NAMES[dayOfWeek];
}

/**
 * Get month name
 */
export function getMonthName(month: number): string {
  return MONTH_NAMES[month - 1];
}

/**
 * Check if weekend
 */
export function isWeekend(dayOfWeek: number): boolean {
  return dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
}

/**
 * Generate random birth date (18 years ago from a random point)
 */
export function generateRandomBirthDate(): GameDate {
  const currentYear = 2025;
  const birthYear = currentYear - 18; // Start at 18 years old
  const birthMonth = randint(1, 12);
  const birthDay = randint(1, getDaysInMonth(birthMonth, birthYear));

  // Calculate day of week (simplified - using Zeller's congruence)
  const dayOfWeek = calculateDayOfWeek(birthDay, birthMonth, birthYear);

  return {
    day: birthDay,
    month: birthMonth,
    year: birthYear,
    dayOfWeek,
    totalDaysLived: 0,
  };
}

/**
 * Calculate day of week using Zeller's congruence
 */
export function calculateDayOfWeek(day: number, month: number, year: number): 0 | 1 | 2 | 3 | 4 | 5 | 6 {
  // Adjust for Zeller's (March = 1, Feb = 12 of previous year)
  if (month < 3) {
    month += 12;
    year -= 1;
  }

  const q = day;
  const m = month;
  const k = year % 100;
  const j = Math.floor(year / 100);

  const h = (q + Math.floor((13 * (m + 1)) / 5) + k + Math.floor(k / 4) + Math.floor(j / 4) - 2 * j) % 7;

  // Convert Zeller's result (0=Sat) to our format (0=Sun)
  const adjusted = (h + 6) % 7;
  return adjusted as 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Advance date by one day
 */
export function advanceOneDay(date: GameDate): GameDate {
  let { day, month, year, dayOfWeek, totalDaysLived } = date;

  day += 1;
  dayOfWeek = ((dayOfWeek + 1) % 7) as 0 | 1 | 2 | 3 | 4 | 5 | 6;
  totalDaysLived += 1;

  const daysInMonth = getDaysInMonth(month, year);

  if (day > daysInMonth) {
    day = 1;
    month += 1;

    if (month > 12) {
      month = 1;
      year += 1;
    }
  }

  return {
    day,
    month,
    year,
    dayOfWeek,
    totalDaysLived,
  };
}

/**
 * Calculate age from birth date and current date
 */
export function calculateAge(birthDate: GameDate, currentDate: GameDate): {
  years: number;
  months: number;
  days: number;
  totalDays: number;
} {
  const totalDays = currentDate.totalDaysLived - birthDate.totalDaysLived;
  const years = Math.floor(totalDays / 365.25);
  const months = Math.floor(totalDays / 30.44);
  const days = totalDays;

  return { years, months, days, totalDays };
}

/**
 * Check if date is a holiday
 */
export function checkHoliday(date: GameDate): { isHoliday: boolean; holidayName?: string } {
  const { day, month } = date;

  // Major US holidays
  if (month === 1 && day === 1) return { isHoliday: true, holidayName: 'New Year\'s Day' };
  if (month === 2 && day === 14) return { isHoliday: true, holidayName: 'Valentine\'s Day' };
  if (month === 3 && day === 17) return { isHoliday: true, holidayName: 'St. Patrick\'s Day' };
  if (month === 7 && day === 4) return { isHoliday: true, holidayName: 'Independence Day' };
  if (month === 10 && day === 31) return { isHoliday: true, holidayName: 'Halloween' };
  if (month === 11 && day >= 22 && day <= 28 && date.dayOfWeek === 4) return { isHoliday: true, holidayName: 'Thanksgiving' };
  if (month === 12 && day === 25) return { isHoliday: true, holidayName: 'Christmas' };
  if (month === 12 && day === 31) return { isHoliday: true, holidayName: 'New Year\'s Eve' };

  return { isHoliday: false };
}

/**
 * Format date as string
 */
export function formatDate(date: GameDate, format: 'short' | 'long' | 'full'): string {
  const dayName = getDayOfWeekName(date.dayOfWeek);
  const monthName = getMonthName(date.month);

  if (format === 'short') {
    return `${date.month}/${date.day}/${date.year}`;
  } else if (format === 'long') {
    return `${monthName} ${date.day}, ${date.year}`;
  } else {
    return `${dayName}, ${monthName} ${date.day}, ${date.year}`;
  }
}

/**
 * Create initial calendar state
 */
export function createInitialCalendarState(): CalendarState {
  const birthDate = generateRandomBirthDate();

  // Start at 18 years old (18 * 365.25 days)
  const daysToAdd = Math.floor(18 * 365.25);
  let currentDate = { ...birthDate };

  for (let i = 0; i < daysToAdd; i++) {
    currentDate = advanceOneDay(currentDate);
  }

  const age = calculateAge(birthDate, currentDate);
  const season = getSeason(currentDate.month);
  const weekend = isWeekend(currentDate.dayOfWeek);
  const holiday = checkHoliday(currentDate);

  return {
    currentDate,
    birthDate,
    ageInYears: age.years,
    ageInMonths: age.months,
    ageInDays: age.days,
    season,
    isWeekend: weekend,
    isHoliday: holiday.isHoliday,
    currentHoliday: holiday.holidayName,
    tickSpeed: 'paused',
  };
}

/**
 * Advance calendar by one day and update state
 */
export function tickCalendar(calendarState: CalendarState): CalendarState {
  const newCurrentDate = advanceOneDay(calendarState.currentDate);
  const age = calculateAge(calendarState.birthDate, newCurrentDate);
  const season = getSeason(newCurrentDate.month);
  const weekend = isWeekend(newCurrentDate.dayOfWeek);
  const holiday = checkHoliday(newCurrentDate);

  return {
    ...calendarState,
    currentDate: newCurrentDate,
    ageInYears: age.years,
    ageInMonths: age.months,
    ageInDays: age.days,
    season,
    isWeekend: weekend,
    isHoliday: holiday.isHoliday,
    currentHoliday: holiday.holidayName,
  };
}

/**
 * Get days until next birthday
 */
export function daysUntilBirthday(birthDate: GameDate, currentDate: GameDate): number {
  const nextBirthday: GameDate = {
    ...birthDate,
    year: currentDate.year,
    totalDaysLived: 0,
  };

  // If birthday already passed this year, check next year
  if (currentDate.month > birthDate.month ||
      (currentDate.month === birthDate.month && currentDate.day >= birthDate.day)) {
    nextBirthday.year = currentDate.year + 1;
  }

  // Calculate days (simplified)
  const daysInCurrentMonth = getDaysInMonth(currentDate.month, currentDate.year);
  let days = daysInCurrentMonth - currentDate.day;

  let month = currentDate.month + 1;
  let year = currentDate.year;

  while (month !== nextBirthday.month || year !== nextBirthday.year) {
    if (month > 12) {
      month = 1;
      year += 1;
    }
    days += getDaysInMonth(month, year);
    month += 1;
  }

  days += nextBirthday.day;

  return days;
}
