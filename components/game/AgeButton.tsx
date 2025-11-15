'use client';

import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import {
  userAtom,
  statsAtom,
  moneyAtom,
  hasJobAtom,
  addConsoleMessageAtom,
} from '@/lib/atoms/game-state';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { randint, formatAge } from '@/lib/utils/game-utils';
import { useState } from 'react';

export function AgeButton() {
  const [user, setUser] = useAtom(userAtom);
  const [stats, setStats] = useAtom(statsAtom);
  const [hasJob] = useAtom(hasJobAtom);
  const [money, setMoney] = useAtom(moneyAtom);
  const [, addMessage] = useAtom(addConsoleMessageAtom);
  const [isAging, setIsAging] = useState(false);

  const handleAgeUp = async () => {
    setIsAging(true);

    // Age up by 1 month
    const newAge = user.age + 1;
    setUser({ ...user, age: newAge });

    // Pay salary if employed
    if (hasJob && user.job.salary > 0) {
      setMoney(money + user.job.salary);
      addMessage(`💰 Earned $${user.job.salary} from your job`);
      setUser({
        ...user,
        age: newAge,
        job: { ...user.job, duration: user.job.duration + 1 },
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
      addMessage(`⚠️ Your health decreased by ${Math.abs(healthChange)}`);
    }

    // Random positive events
    const eventChance = randint(1, 10);
    if (eventChance === 1) {
      const events = [
        { msg: '✨ You had a great day!', money: 0 },
        { msg: '🤝 You made a new friend', money: 0 },
        { msg: '💵 You found $50 on the street', money: 50 },
        { msg: '😊 You had an enjoyable conversation', money: 0 },
      ];
      const event = events[randint(0, events.length - 1)];
      addMessage(event.msg);
      if (event.money > 0) {
        setMoney(money + event.money);
      }
    }

    // Show success animation
    setTimeout(() => {
      setIsAging(false);
      toast.success('A month has passed', {
        description: formatAge(newAge),
      });
    }, 300);
  };

  return (
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
              animate={
                isAging
                  ? { x: [0, 4, 0] }
                  : { x: 0 }
              }
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
  );
}
