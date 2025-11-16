'use client';

import { useAtom } from 'jotai';
import { userAtom, calendarAtom, moneyAtom } from '@/lib/atoms/game-state';
import { Card, CardContent } from '@/components/ui/card';
import { User, Wallet, Cake } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatExactAge, formatCurrency } from '@/lib/utils/game-utils';

const coreInfoConfig = [
  { key: 'name', label: 'Name', icon: User, color: '#10b981' },
  { key: 'age', label: 'Age', icon: Cake, color: '#8b5cf6' },
  { key: 'cash', label: 'Cash', icon: Wallet, color: '#f59e0b' },
];

export function UserInfoCard() {
  const [user] = useAtom(userAtom);
  const [calendar] = useAtom(calendarAtom);
  const [money] = useAtom(moneyAtom);

  const coreInfo = {
    name: user.name,
    age: formatExactAge(calendar.ageInDays),
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
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
