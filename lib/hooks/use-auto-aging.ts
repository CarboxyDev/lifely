import { useEffect, useRef, useState, useCallback } from 'react';
import { useAtom } from 'jotai';
import {
  calendarAtom,
  statsAtom,
  moneyAtom,
  hasJobAtom,
  userAtom,
  perksAtom,
} from '../atoms/game-state';
import {
  performAgingTick,
  getTickDelay,
  calculateDailyAgingEffects,
  checkDeathConditions,
  checkBirthdayMilestone,
  checkMonthlySalary,
  type AgingSpeed,
} from '../utils/auto-aging';
import { applyPerkEffects, getPerkMultiplier } from '../data/perks';

/**
 * Hook for managing auto-aging system
 */
export function useAutoAging() {
  const [calendar, setCalendar] = useAtom(calendarAtom);
  const [stats, setStats] = useAtom(statsAtom);
  const [money, setMoney] = useAtom(moneyAtom);
  const [hasJob] = useAtom(hasJobAtom);
  const [user] = useAtom(userAtom);
  const [perks] = useAtom(perksAtom);

  const [isAging, setIsAging] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState<AgingSpeed>('paused');
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [daysProcessedCount, setDaysProcessedCount] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);

  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastTickTimeRef = useRef<number>(Date.now());
  const lastNonPausedSpeedRef = useRef<AgingSpeed>('normal');

  // Use refs to store current values to avoid closure issues
  const isAgingRef = useRef(isAging);
  const currentSpeedRef = useRef(currentSpeed);

  // Update refs when state changes
  useEffect(() => {
    isAgingRef.current = isAging;
  }, [isAging]);

  useEffect(() => {
    currentSpeedRef.current = currentSpeed;
  }, [currentSpeed]);

  /**
   * Process a single aging tick
   */
  const processTick = useCallback(() => {
    // Use refs to get current values and avoid stale closures
    if (!isAgingRef.current || currentSpeedRef.current === 'paused') return;

    const now = Date.now();
    const elapsed = now - lastTickTimeRef.current;
    const requiredDelay = getTickDelay(currentSpeedRef.current);

    // Only tick if enough time has passed
    if (elapsed < requiredDelay) return;

    lastTickTimeRef.current = now;
    setProgressPercentage(0); // Reset progress immediately after tick

    // Get player data
    const playerData = {
      age: calendar.ageInDays,
      wealth: money,
      fame: 0, // TODO: Get from reputation atom
      hasJob,
      hasSpouse: false, // TODO: Get from relationships atom
      health: stats.health,
      morale: stats.morale,
      intellect: stats.intellect,
      looks: stats.looks,
      luck: 50,
    };

    // Perform aging tick
    const result = performAgingTick(calendar, playerData);

    if (result.newCalendarState) {
      setCalendar(result.newCalendarState);
    }

    // Calculate daily aging effects
    const agingEffects = calculateDailyAgingEffects(
      result.newCalendarState?.ageInDays || calendar.ageInDays,
      stats.health,
      stats.morale
    );

    // Apply perk multipliers to aging effects
    const recoveryMultiplier = getPerkMultiplier(perks.activePerks, 'recoverySpeed');
    const stressResistance = getPerkMultiplier(perks.activePerks, 'stressResistance');

    const finalHealthChange = agingEffects.healthChange * recoveryMultiplier;
    const finalMoraleChange = agingEffects.moraleChange * stressResistance;

    // Update stats with aging effects
    setStats(prev => ({
      ...prev,
      health: Math.max(0, Math.min(100, prev.health + finalHealthChange)),
      morale: Math.max(0, Math.min(100, prev.morale + finalMoraleChange)),
    }));

    // Check for birthday
    const birthdayCheck = checkBirthdayMilestone(
      calendar.ageInDays,
      result.newCalendarState?.ageInDays || calendar.ageInDays
    );

    if (birthdayCheck.isBirthday) {
      // TODO: Show birthday notification
      console.log(`Birthday! Now ${birthdayCheck.age} years old!`, birthdayCheck.milestoneMessage);
    }

    // Check for monthly salary
    const salaryCheck = checkMonthlySalary(
      calendar.ageInDays,
      result.newCalendarState?.ageInDays || calendar.ageInDays,
      hasJob,
      user.job.salary || 0
    );

    if (salaryCheck.shouldReceiveSalary && salaryCheck.salaryAmount) {
      setMoney(prev => prev + salaryCheck.salaryAmount!);
      // TODO: Add console message about salary
    }

    // Check for death
    const deathCheck = checkDeathConditions(
      result.newCalendarState?.ageInDays || calendar.ageInDays,
      stats.health
    );

    if (deathCheck.isDead) {
      // Stop aging
      setIsAging(false);
      setCurrentSpeed('paused');
      // TODO: Show death screen
      console.log('Character died:', deathCheck.deathReason);
      return;
    }

    // If event occurred, handle it
    if (result.event) {
      if (!result.shouldContinue) {
        // Event requires user input, pause aging
        setIsAging(false);
        setCurrentSpeed('paused');
        setCurrentEvent(result.event);
      } else {
        // Event auto-applies, just log it
        // TODO: Add to console messages
        console.log('Event occurred:', result.event.title);

        // Apply event effects if any
        if (result.event.effects) {
          const effects = result.event.effects;

          if (effects.health) {
            setStats(prev => ({
              ...prev,
              health: Math.max(0, Math.min(100, prev.health + effects.health)),
            }));
          }
          if (effects.morale) {
            setStats(prev => ({
              ...prev,
              morale: Math.max(0, Math.min(100, prev.morale + effects.morale)),
            }));
          }
          if (effects.intellect) {
            setStats(prev => ({
              ...prev,
              intellect: Math.max(0, Math.min(100, prev.intellect + effects.intellect)),
            }));
          }
          if (effects.looks) {
            setStats(prev => ({
              ...prev,
              looks: Math.max(0, Math.min(100, prev.looks + effects.looks)),
            }));
          }
          if (effects.money) {
            setMoney(prev => prev + effects.money);
          }
        }
      }
    }

    setDaysProcessedCount(prev => prev + result.daysAdvanced);
  }, [calendar, stats, money, hasJob, user, perks, setCalendar, setStats, setMoney]);

  /**
   * Manage interval lifecycle with useEffect
   */
  useEffect(() => {
    if (!isAging || currentSpeed === 'paused') {
      if (tickIntervalRef.current) {
        clearInterval(tickIntervalRef.current);
        tickIntervalRef.current = null;
      }
      setProgressPercentage(0);
      return;
    }

    // Start the interval
    if (tickIntervalRef.current) {
      clearInterval(tickIntervalRef.current);
    }

    tickIntervalRef.current = setInterval(() => {
      processTick();
    }, 5000); // Check every 5 seconds

    return () => {
      if (tickIntervalRef.current) {
        clearInterval(tickIntervalRef.current);
        tickIntervalRef.current = null;
      }
    };
  }, [isAging, currentSpeed, processTick]);

  /**
   * Update progress percentage for visual feedback
   */
  useEffect(() => {
    if (!isAging || currentSpeed === 'paused') {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      return;
    }

    // Update progress every 100ms
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    progressIntervalRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastTickTimeRef.current;
      const requiredDelay = getTickDelay(currentSpeed);
      const percentage = Math.min(100, (elapsed / requiredDelay) * 100);
      setProgressPercentage(percentage);
    }, 100);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, [isAging, currentSpeed]);

  /**
   * Start aging at specified speed
   */
  const startAging = useCallback((speed?: AgingSpeed) => {
    // Use provided speed or last non-paused speed
    const targetSpeed = speed || lastNonPausedSpeedRef.current;

    if (targetSpeed === 'paused') {
      stopAging();
      return;
    }

    lastNonPausedSpeedRef.current = targetSpeed;
    setIsAging(true);
    setCurrentSpeed(targetSpeed);
    setDaysProcessedCount(0);
    lastTickTimeRef.current = Date.now();
  }, []);

  /**
   * Stop aging
   */
  const stopAging = useCallback(() => {
    setIsAging(false);
    setCurrentSpeed('paused');
    // Interval cleanup is handled by useEffect
  }, []);

  /**
   * Change aging speed
   */
  const changeSpeed = useCallback((speed: AgingSpeed) => {
    if (speed === 'paused') {
      stopAging();
    } else {
      lastNonPausedSpeedRef.current = speed;
      startAging(speed);
    }
  }, [startAging, stopAging]);

  /**
   * Clear current event and resume aging
   */
  const resolveEvent = useCallback(() => {
    setCurrentEvent(null);
    // Don't auto-resume, let user manually restart
  }, []);

  return {
    isAging,
    currentSpeed,
    currentEvent,
    daysProcessed: daysProcessedCount,
    progressPercentage,
    startAging,
    stopAging,
    changeSpeed,
    resolveEvent,
  };
}
