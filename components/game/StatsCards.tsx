'use client';

import { useAtom } from 'jotai';
import { statsAtom, userAtom, moneyAtom } from '@/lib/atoms/game-state';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Smile, Brain, Sparkles, Briefcase, GraduationCap, MapPin, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatAge } from '@/lib/utils/game-utils';

const statConfig = [
  { key: 'health', label: 'Health', icon: Heart, color: '#ef4444' },
  { key: 'morale', label: 'Morale', icon: Smile, color: '#f59e0b' },
  { key: 'intellect', label: 'Intellect', icon: Brain, color: '#3b82f6' },
  { key: 'looks', label: 'Looks', icon: Sparkles, color: '#a855f7' },
];

export function StatsCards() {
  const [stats] = useAtom(statsAtom);
  const [user] = useAtom(userAtom);
  const [money] = useAtom(moneyAtom);

  const netWorth = money + user.assets.reduce((sum, asset) => sum + asset.value, 0);
  const hasEducation = user.education && Object.keys(user.education.degrees).length > 0;
  const latestDegree = hasEducation ? Object.values(user.education.degrees)[0] : null;

  return (
    <div className="space-y-4">
      {/* Stats */}
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
                    <span className="text-sm font-semibold text-foreground">{value}</span>
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

      {/* Overview */}
      <Card className="border-border bg-card">
        <CardContent className="p-4">
          <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Overview
          </div>
          <div className="space-y-3">
            {/* Location */}
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">Location</div>
                <div className="mt-0.5 text-sm font-medium text-foreground">{user.country}</div>
              </div>
            </div>

            {/* Career */}
            <div className="flex items-start gap-2">
              <Briefcase className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">Career</div>
                <div className="mt-0.5 text-sm font-medium text-foreground">
                  {user.job.name || 'Unemployed'}
                </div>
                {user.job.name && user.job.name !== 'Unemployed' && (
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>${user.job.salary.toLocaleString()}/mo</span>
                    {user.job.duration > 0 && (
                      <>
                        <span className="text-muted">•</span>
                        <span>{formatAge(user.job.duration)}</span>
                      </>
                    )}
                  </div>
                )}
                {(!user.job.name || user.job.name === 'Unemployed') && (
                  <div className="mt-0.5 text-xs italic text-muted-foreground">Looking for work</div>
                )}
              </div>
            </div>

            {/* Education */}
            {hasEducation && latestDegree && (
              <div className="flex items-start gap-2">
                <GraduationCap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">Education</div>
                  <div className="mt-0.5 text-sm font-medium text-foreground">
                    {latestDegree.name}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    GPA: {latestDegree.cgpa.toFixed(2)} ({latestDegree.grade})
                  </div>
                </div>
              </div>
            )}

            {/* Assets */}
            {user.assets.length > 0 && (
              <div className="flex items-start gap-2">
                <Home className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">Assets</div>
                  <div className="mt-0.5 text-sm font-medium text-foreground">
                    {user.assets.length} item{user.assets.length !== 1 ? 's' : ''}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    Worth ${user.assets.reduce((sum, a) => sum + a.value, 0).toLocaleString()}
                  </div>
                </div>
              </div>
            )}

            {/* Net Worth */}
            <div className="rounded-lg border border-border bg-muted/50 p-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Net Worth</span>
                <span className="text-sm font-bold text-emerald-400">
                  ${netWorth.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
