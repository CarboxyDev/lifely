'use client';

import { useAtom } from 'jotai';
import { statsAtom, userAtom } from '@/lib/atoms/game-state';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Smile, Brain, Sparkles, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const statConfig = [
  { key: 'health', label: 'Health', icon: Heart, color: '#ef4444' },
  { key: 'morale', label: 'Morale', icon: Smile, color: '#f59e0b' },
  { key: 'intellect', label: 'Intellect', icon: Brain, color: '#3b82f6' },
  { key: 'looks', label: 'Looks', icon: Sparkles, color: '#a855f7' },
];

export function StatsCards() {
  const [stats] = useAtom(statsAtom);
  const [user] = useAtom(userAtom);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <Card className="border-zinc-800 bg-zinc-900">
        <CardContent className="p-4">
          <div className="mb-4 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Attributes
          </div>
          <div className="space-y-4">
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
                      <span className="text-xs text-zinc-400">{stat.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-zinc-200">{value}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-zinc-800">
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

      {/* Career & Info */}
      <Card className="border-zinc-800 bg-zinc-900">
        <CardContent className="p-4">
          <div className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Overview
          </div>
          <div className="space-y-3">
            {/* Job */}
            <div>
              <div className="mb-1 flex items-center gap-1.5">
                <Briefcase className="h-3 w-3 text-zinc-500" />
                <span className="text-xs text-zinc-500">Career</span>
              </div>
              <div className="text-sm font-semibold text-zinc-200">
                {user.job.name || 'Unemployed'}
              </div>
              {user.job.name && user.job.name !== 'Unemployed' && (
                <div className="mt-0.5 text-xs text-zinc-400">
                  ${user.job.salary.toLocaleString()}/mo
                </div>
              )}
              {(!user.job.name || user.job.name === 'Unemployed') && (
                <div className="mt-0.5 text-xs text-zinc-500">Looking for work</div>
              )}
            </div>

            {/* Education */}
            {user.education && Object.keys(user.education.degrees).length > 0 && (
              <div>
                <div className="mb-1 flex items-center gap-1.5">
                  <Brain className="h-3 w-3 text-zinc-500" />
                  <span className="text-xs text-zinc-500">Education</span>
                </div>
                <div className="text-sm text-zinc-300">
                  {Object.keys(user.education.degrees).length} degree
                  {Object.keys(user.education.degrees).length > 1 ? 's' : ''}
                </div>
                <div className="mt-0.5 text-xs text-zinc-500">
                  {Object.values(user.education.degrees)[0]?.name || 'Unknown'}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
