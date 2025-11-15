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
import { Calendar, TrendingUp, Clock } from 'lucide-react';
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
        animate={isAging ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={handleAgeUp}
          disabled={isAging}
          size="lg"
          className="group relative h-16 gap-3 rounded-full bg-blue-600 px-8 text-lg font-semibold shadow-2xl shadow-blue-600/50 hover:bg-blue-700 hover:shadow-blue-700/50 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <motion.div
            animate={{ rotate: isAging ? 360 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <Calendar className="h-6 w-6" />
          </motion.div>
          <div className="flex items-center gap-2">
            <span>Age 1 Month</span>
            <motion.div
              animate={{ x: isAging ? 5 : 0 }}
              transition={{ repeat: isAging ? Infinity : 0, duration: 0.5 }}
            >
              <TrendingUp className="h-5 w-5 opacity-70" />
            </motion.div>
          </div>

          {/* Pulse animation on hover */}
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-400/30"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </Button>
      </motion.div>

      {/* Age indicator */}
      <div className="mt-3 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-2 text-sm font-medium text-white backdrop-blur dark:bg-slate-100/80 dark:text-slate-900">
          <Clock className="h-4 w-4" />
          Currently: {formatAge(user.age)}
        </div>
      </div>
    </div>
  );
}
