'use client';

import { useAtom } from 'jotai';
import { statsAtom } from '@/lib/atoms/game-state';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Smile, Brain, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const statConfig = [
  { key: 'health', label: 'Health', icon: Heart, color: '#ef4444' },
  { key: 'morale', label: 'Morale', icon: Smile, color: '#f59e0b' },
  { key: 'intellect', label: 'Intellect', icon: Brain, color: '#3b82f6' },
  { key: 'looks', label: 'Looks', icon: Sparkles, color: '#a855f7' },
];

export function StatsCards() {
  const [stats] = useAtom(statsAtom);

  return (
    <Card className="border-border bg-card">
      <CardContent className="p-4">
        <div className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Attributes
        </div>
        <div className="space-y-3.5">
          {statConfig.map((stat, index) => {
            const value = stats[stat.key as keyof typeof stats] as number;
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5" style={{ color: stat.color }} />
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{Math.round(value)}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: stat.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
