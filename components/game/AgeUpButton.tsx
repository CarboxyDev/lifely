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
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { randint } from '@/lib/utils/game-utils';

export function AgeUpButton() {
  const [user, setUser] = useAtom(userAtom);
  const [stats, setStats] = useAtom(statsAtom);
  const [hasJob] = useAtom(hasJobAtom);
  const [money, setMoney] = useAtom(moneyAtom);
  const [, addMessage] = useAtom(addConsoleMessageAtom);

  const handleAgeUp = () => {
    // Age up by 1 month
    const newAge = user.age + 1;
    setUser({ ...user, age: newAge });

    // Pay salary if employed
    if (hasJob && user.job.salary > 0) {
      setMoney(money + user.job.salary);
      addMessage(`You earned $${user.job.salary} from your job`);
      setUser({
        ...user,
        age: newAge,
        job: { ...user.job, duration: user.job.duration + 1 },
      });
    }

    // Random stat changes (life events)
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

    // Random events
    const eventChance = randint(1, 10);
    if (eventChance === 1) {
      const events = [
        'You had a great day!',
        'You made a new friend',
        'You found $50 on the street',
        'You had an enjoyable conversation',
      ];
      const event = events[randint(0, events.length - 1)];
      addMessage(event);
      if (event.includes('$50')) {
        setMoney(money + 50);
      }
    }

    toast.success('A month has passed');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <Button
        onClick={handleAgeUp}
        size="lg"
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
      >
        <Calendar className="mr-2 h-5 w-5" />
        Age 1 Month
      </Button>
    </motion.div>
  );
}
