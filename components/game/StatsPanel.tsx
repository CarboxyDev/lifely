'use client';

import { useAtom } from 'jotai';
import { statsAtom } from '@/lib/atoms/game-state';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { Heart, Smile, Brain, Flame } from 'lucide-react';
import { getStatColor } from '@/lib/utils/game-utils';

interface StatItemProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  index: number;
}

function StatItem({ label, value, icon, color, index }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${color}`}>
            {icon}
          </div>
          <span className="text-sm font-medium text-zinc-300">{label}</span>
        </div>
        <span className="text-lg font-bold" style={{ color: getStatColor(value) }}>
          {value}
        </span>
      </div>
      <Progress
        value={value}
        className="h-2 bg-zinc-800"
        style={{
          ['--progress-background' as any]: getStatColor(value),
        }}
      />
    </motion.div>
  );
}

export function StatsPanel() {
  const [stats] = useAtom(statsAtom);

  const statItems = [
    {
      label: 'Health',
      value: stats.health,
      icon: <Heart className="h-4 w-4 text-white" />,
      color: 'bg-gradient-to-br from-red-500 to-pink-600',
    },
    {
      label: 'Morale',
      value: stats.morale,
      icon: <Smile className="h-4 w-4 text-white" />,
      color: 'bg-gradient-to-br from-yellow-500 to-orange-600',
    },
    {
      label: 'Intellect',
      value: stats.intellect,
      icon: <Brain className="h-4 w-4 text-white" />,
      color: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    },
    {
      label: 'Looks',
      value: stats.looks,
      icon: <Flame className="h-4 w-4 text-white" />,
      color: 'bg-gradient-to-br from-purple-500 to-pink-600',
    },
  ];

  return (
    <Card className="border-zinc-800 bg-zinc-950/50 backdrop-blur">
      <CardHeader className="border-b border-zinc-800 pb-3">
        <CardTitle className="text-lg">Your Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {statItems.map((stat, index) => (
          <StatItem key={stat.label} {...stat} index={index} />
        ))}
      </CardContent>
    </Card>
  );
}
