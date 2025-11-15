'use client';

import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import {
  userAtom,
  statsAtom,
  moneyAtom,
  hasJobAtom,
  addConsoleMessageAtom,
  relationshipsAtom,
} from '@/lib/atoms/game-state';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { randint, formatAge } from '@/lib/utils/game-utils';
import { useState } from 'react';
import { educationLevelNames, educationLevelDurations } from '@/lib/data/education';
import type { Degree } from '@/lib/types';

export function AgeButton() {
  const [user, setUser] = useAtom(userAtom);
  const [stats, setStats] = useAtom(statsAtom);
  const [hasJob] = useAtom(hasJobAtom);
  const [money, setMoney] = useAtom(moneyAtom);
  const [, addMessage] = useAtom(addConsoleMessageAtom);
  const [relationships, setRelationships] = useAtom(relationshipsAtom);
  const [isAging, setIsAging] = useState(false);

  const handleAgeUp = async () => {
    setIsAging(true);

    // Wait for transition to start
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Age up by 1 month
    const newAge = user.age + 1;
    setUser({ ...user, age: newAge });

    // Pay salary if employed
    if (hasJob && user.job.salary > 0) {
      setMoney(money + user.job.salary);
      addMessage(`Earned $${user.job.salary} from your job`);
      setUser({
        ...user,
        age: newAge,
        job: { ...user.job, duration: user.job.duration + 1 },
      });
    }

    // Education progression
    if (user.education.isEnrolled) {
      const monthsInYear = 12;
      const newYearsInLevel = user.education.yearsInCurrentLevel + 1 / monthsInYear;
      const requiredYears = educationLevelDurations[user.education.currentLevel];

      // Update GPA gradually (random performance each month)
      const monthlyPerformance = randint(70, 100) / 100; // 0.7 to 1.0
      const newGPA = user.education.gpa === 0
        ? monthlyPerformance * 4.0
        : (user.education.gpa * 0.9 + monthlyPerformance * 4.0 * 0.1);

      if (newYearsInLevel >= requiredYears) {
        // Graduate!
        const currentYear = Math.floor(newAge / 12) + 1982; // Approximate year
        const finalGPA = Number(newGPA.toFixed(2));

        const newDegree: Degree = {
          level: user.education.currentLevel,
          institution: user.education.currentInstitution!,
          major: user.education.currentMajor || educationLevelNames[user.education.currentLevel],
          gpa: finalGPA,
          graduationYear: currentYear,
          honors: finalGPA >= 3.5 ? 'Honors' : finalGPA >= 3.8 ? 'High Honors' : null,
        };

        setUser({
          ...user,
          age: newAge,
          education: {
            ...user.education,
            degrees: [...user.education.degrees, newDegree],
            isEnrolled: false,
            currentInstitution: null,
            currentMajor: null,
            yearsInCurrentLevel: 0,
            gpa: 0,
          },
        });

        const degreeText = newDegree.major ? `in ${newDegree.major}` : '';
        addMessage(`Graduated from ${newDegree.institution} ${degreeText} with ${finalGPA.toFixed(2)} GPA!`);

        // Boost intellect for graduating
        setStats({
          ...stats,
          intellect: Math.min(100, stats.intellect + 10),
          morale: Math.min(100, stats.morale + 10),
        });
      } else {
        // Still studying
        setUser({
          ...user,
          age: newAge,
          education: {
            ...user.education,
            yearsInCurrentLevel: Number(newYearsInLevel.toFixed(2)),
            gpa: Number(newGPA.toFixed(2)),
          },
        });

        // Occasionally show study progress
        if (Math.floor(newYearsInLevel) > Math.floor(user.education.yearsInCurrentLevel)) {
          const yearCompleted = Math.floor(newYearsInLevel);
          addMessage(`Completed year ${yearCompleted} at ${user.education.currentInstitution}`);

          // Small intellect boost for completing a year
          setStats({
            ...stats,
            intellect: Math.min(100, stats.intellect + 2),
          });
        }
      }
    }

    // Relationship progression
    if (relationships.relationships.length > 0) {
      const updatedRelationships = relationships.relationships.map((relationship) => {
        // Increment years known
        const newYearsKnown = relationship.yearsKnown + 1 / 12; // Add 1 month

        // Natural quality decay if not interacted with recently
        const monthsSinceInteraction = newAge - relationship.lastInteraction;
        let qualityChange = 0;

        if (monthsSinceInteraction > 6) {
          // Haven't interacted in over 6 months - relationship decays
          qualityChange = randint(-3, -1);
        } else if (monthsSinceInteraction > 3) {
          // Haven't interacted in over 3 months - slight decay
          qualityChange = randint(-2, 0);
        } else {
          // Regular interaction - slight improvement or stability
          qualityChange = randint(-1, 1);
        }

        // Family relationships are more stable
        if (['parent', 'sibling', 'child'].includes(relationship.type)) {
          qualityChange = Math.max(-1, qualityChange);
        }

        // Spouse relationship needs maintenance
        if (relationship.type === 'spouse' && monthsSinceInteraction > 2) {
          qualityChange -= 2;
        }

        const newQuality = Math.max(0, Math.min(100, relationship.quality + qualityChange));

        // Notify about declining relationships
        if (qualityChange < -2 && relationship.quality > 40 && newQuality <= 40) {
          addMessage(`Your relationship with ${relationship.name} is declining`);
        }

        return {
          ...relationship,
          yearsKnown: Number(newYearsKnown.toFixed(2)),
          quality: newQuality,
        };
      });

      setRelationships({
        ...relationships,
        relationships: updatedRelationships,
      });
    }

    // Random stat changes
    const healthChange = randint(-5, 2);
    const moraleChange = randint(-5, 5);

    const newStats = {
      ...stats,
      health: Math.max(0, Math.min(100, stats.health + healthChange)),
      morale: Math.max(0, Math.min(100, stats.morale + moraleChange)),
    };

    setStats(newStats);

    if (healthChange < -2) {
      addMessage(`Your health decreased by ${Math.abs(healthChange)}`);
    }

    // Random positive events
    const eventChance = randint(1, 10);
    if (eventChance === 1) {
      const events = [
        { msg: 'You had a great day!', money: 0 },
        { msg: 'You made a new friend', money: 0 },
        { msg: 'You found $50 on the street', money: 50 },
        { msg: 'You had an enjoyable conversation', money: 0 },
      ];
      const event = events[randint(0, events.length - 1)];
      addMessage(event.msg);
      if (event.money > 0) {
        setMoney(money + event.money);
      }
    }

    // Show success animation - wait for full transition
    setTimeout(() => {
      setIsAging(false);
      toast.success('A month has passed', {
        description: formatAge(newAge),
      });
    }, 2500);
  };

  return (
    <>
      {/* Age Transition Overlay */}
      <AnimatePresence>
        {isAging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-background/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
              >
                <Calendar className="h-16 w-16 text-foreground" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-foreground">Time passes...</div>
                <div className="mt-2 text-muted-foreground">One month forward</div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Button
            onClick={handleAgeUp}
            disabled={isAging}
            className="group relative h-14 cursor-pointer gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 px-8 text-base font-bold text-white shadow-2xl shadow-teal-900/50 transition-all hover:from-teal-500 hover:to-cyan-500 hover:shadow-teal-900/70 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />

            {/* Content */}
            <div className="relative z-10 flex items-center gap-3">
              <motion.div
                animate={isAging ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <Calendar className="h-5 w-5" />
              </motion.div>

              <span className="tracking-wide">Age 1 Month</span>

              <motion.div
                animate={isAging ? { x: [0, 4, 0] } : { x: 0 }}
                transition={{ repeat: isAging ? Infinity : 0, duration: 0.8 }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </div>

            {/* Sparkles on hover */}
            <motion.div
              className="absolute right-3 top-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles className="h-4 w-4 text-yellow-300" />
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </>
  );
}
