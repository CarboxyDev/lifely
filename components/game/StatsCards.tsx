'use client';

import { useAtom } from 'jotai';
import { statsAtom, userAtom } from '@/lib/atoms/game-state';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Smile, Brain, Sparkles, Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  index: number;
}

function StatCard({ label, value, icon, color, bgColor, index }: StatCardProps) {
  const getStatLevel = (val: number) => {
    if (val >= 80) return { label: 'Excellent', color: 'text-emerald-600 dark:text-emerald-400' };
    if (val >= 60) return { label: 'Good', color: 'text-blue-600 dark:text-blue-400' };
    if (val >= 40) return { label: 'Fair', color: 'text-amber-600 dark:text-amber-400' };
    return { label: 'Poor', color: 'text-red-600 dark:text-red-400' };
  };

  const level = getStatLevel(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <div className={`rounded-lg ${bgColor} p-2`}>
                  {icon}
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {label}
                  </div>
                  <div className={`text-xs font-medium ${level.color}`}>
                    {level.label}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${color}`}>
                {value}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                / 100
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <motion.div
              className={`h-full ${bgColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${value}%` }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function StatsCards() {
  const [stats] = useAtom(statsAtom);
  const [user] = useAtom(userAtom);

  const statCards = [
    {
      label: 'Health',
      value: stats.health,
      icon: <Heart className="h-4 w-4 text-red-600 dark:text-red-400" />,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-950',
    },
    {
      label: 'Morale',
      value: stats.morale,
      icon: <Smile className="h-4 w-4 text-amber-600 dark:text-amber-400" />,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-100 dark:bg-amber-950',
    },
    {
      label: 'Intellect',
      value: stats.intellect,
      icon: <Brain className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-950',
    },
    {
      label: 'Looks',
      value: stats.looks,
      icon: <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-950',
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        Your Stats
      </h2>

      <div className="space-y-3">
        {statCards.map((stat, index) => (
          <StatCard key={stat.label} {...stat} index={index} />
        ))}
      </div>

      {/* Career Card */}
      <Card className="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
            <Briefcase className="h-4 w-4" />
            Career
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-base font-semibold text-slate-900 dark:text-white">
            {user.job.name}
          </div>
          {user.job.name !== 'Unemployed' && (
            <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              ${user.job.salary.toLocaleString()}/month
            </div>
          )}
        </CardContent>
      </Card>

      {/* Education Card */}
      {Object.keys(user.education.degrees).length > 0 && (
        <Card className="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
              <GraduationCap className="h-4 w-4" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-900 dark:text-white">
              {Object.keys(user.education.degrees).length} degree(s)
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
