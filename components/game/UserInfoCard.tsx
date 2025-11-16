'use client';

import { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom, calendarAtom, moneyAtom } from '@/lib/atoms/game-state';
import { Card, CardContent } from '@/components/ui/card';
import { User, Calendar, Wallet, Cake, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDateShort, formatExactAge, formatCurrency } from '@/lib/utils/game-utils';

const coreInfoConfig = [
  { key: 'name', label: 'Name', icon: User, color: '#10b981' },
  { key: 'age', label: 'Age', icon: Cake, color: '#8b5cf6' },
  { key: 'date', label: 'Today', icon: Calendar, color: '#3b82f6' },
  { key: 'cash', label: 'Cash', icon: Wallet, color: '#f59e0b' },
];

export function UserInfoCard() {
  const [user] = useAtom(userAtom);
  const [calendar] = useAtom(calendarAtom);
  const [money] = useAtom(moneyAtom);
  const [showDateChange, setShowDateChange] = useState(false);
  const previousDayRef = useRef(calendar.ageInDays);

  // Detect date changes
  useEffect(() => {
    if (calendar.ageInDays > previousDayRef.current) {
      setShowDateChange(true);
      const timer = setTimeout(() => setShowDateChange(false), 1500);
      previousDayRef.current = calendar.ageInDays;
      return () => clearTimeout(timer);
    }
    previousDayRef.current = calendar.ageInDays;
  }, [calendar.ageInDays]);

  const coreInfo = {
    name: user.name,
    age: formatExactAge(calendar.ageInDays),
    date: formatDateShort(calendar.currentDate),
    cash: formatCurrency(money),
  };

  return (
    <Card className="border-border bg-card relative">
      <CardContent className="p-4">
        <div className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Core Info
        </div>
        <div className="space-y-3">
          {coreInfoConfig.map((item, index) => {
            const value = coreInfo[item.key as keyof typeof coreInfo];
            const Icon = item.icon;

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5" style={{ color: item.color }} />
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{value}</span>
                </div>

                {/* Date change animation */}
                {item.key === 'date' && (
                  <AnimatePresence>
                    {showDateChange && (
                      <motion.div
                        initial={{ opacity: 0, y: 0, scale: 0.5 }}
                        animate={{
                          opacity: [0, 1, 1, 0],
                          y: [0, -8, -12, -18],
                          scale: [0.5, 1.1, 1, 0.9]
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 1.2,
                          times: [0, 0.3, 0.7, 1],
                          ease: "easeOut"
                        }}
                        className="absolute right-0 top-0 flex items-center gap-1 text-sm font-bold"
                        style={{
                          textShadow: '0 0 8px rgba(16, 185, 129, 0.6)',
                          color: '#10b981'
                        }}
                      >
                        <Plus className="h-4 w-4" strokeWidth={3} />
                        <span>1 day</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
