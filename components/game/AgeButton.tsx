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
import { Calendar, TrendingUp } from 'lucide-react';
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
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={handleAgeUp}
          disabled={isAging}
          className="group relative h-12 gap-2.5 overflow-hidden rounded-full border-2 border-zinc-700 bg-zinc-900 px-6 font-semibold text-zinc-100 shadow-xl shadow-black/50 transition-all hover:border-zinc-600 hover:bg-zinc-800 hover:shadow-2xl disabled:opacity-50"
        >
          {/* Animated background on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />

          {/* Content */}
          <div className="relative z-10 flex items-center gap-2.5">
            <motion.div
              animate={isAging ? { rotate: 360 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Calendar className="h-4 w-4" />
            </motion.div>
            <span className="text-sm">Age 1 Month</span>
            <motion.div
              animate={isAging ? { scale: [1, 1.2, 1] } : {}}
              transition={{ repeat: isAging ? Infinity : 0, duration: 0.6 }}
            >
              <TrendingUp className="h-3.5 w-3.5 opacity-70" />
            </motion.div>
          </div>

          {/* Pulse ring on hover */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-zinc-500"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{ scale: 1.1, opacity: [0, 0.5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </Button>
      </motion.div>
    </div>
  );
}
