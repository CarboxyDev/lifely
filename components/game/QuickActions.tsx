'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Briefcase,
  GraduationCap,
  Landmark,
  User,
  Dumbbell,
  Settings,
  Home,
  Car,
  Heart,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { JobsDialog } from './dialogs/JobsDialog';
import { ProfileDialog } from './dialogs/ProfileDialog';
import { BankDialog } from './dialogs/BankDialog';
import { ActivitiesDialog } from './dialogs/ActivitiesDialog';

export function QuickActions() {
  const [jobsOpen, setJobsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [bankOpen, setBankOpen] = useState(false);
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  // Frequently accessed - full cards
  const primaryActions = [
    {
      icon: User,
      label: 'Profile',
      onClick: () => setProfileOpen(true),
      color: '#6b7280',
    },
    {
      icon: Landmark,
      label: 'Bank',
      onClick: () => setBankOpen(true),
      color: '#10b981',
    },
    {
      icon: Dumbbell,
      label: 'Activities',
      onClick: () => setActivitiesOpen(true),
      color: '#f59e0b',
    },
  ];

  // Less frequently accessed - icon grid
  const secondaryActions = [
    {
      icon: Briefcase,
      label: 'Jobs',
      onClick: () => setJobsOpen(true),
      color: '#3b82f6',
    },
    {
      icon: GraduationCap,
      label: 'Education',
      onClick: () => {},
      color: '#8b5cf6',
    },
    {
      icon: Users,
      label: 'Relationships',
      onClick: () => {},
      color: '#ec4899',
    },
    {
      icon: Home,
      label: 'Real Estate',
      onClick: () => {},
      color: '#14b8a6',
    },
    {
      icon: Car,
      label: 'Vehicles',
      onClick: () => {},
      color: '#f97316',
    },
    {
      icon: Heart,
      label: 'Health',
      onClick: () => {},
      color: '#ef4444',
    },
    {
      icon: Settings,
      label: 'Settings',
      onClick: () => {},
      color: '#64748b',
    },
  ];

  return (
    <>
      <div className="flex h-full flex-col space-y-4">
        {/* Primary Actions - Full Cards */}
        <div className="space-y-2">
          {primaryActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card
                key={action.label}
                className="group cursor-pointer border-zinc-800 bg-zinc-900 transition-all hover:border-zinc-700 hover:bg-zinc-800"
                onClick={action.onClick}
              >
                <CardContent className="p-2.5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors"
                      style={{ backgroundColor: `${action.color}20` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: action.color }} />
                    </div>
                    <div className="text-sm font-semibold text-zinc-100">
                      {action.label}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800"></div>
          </div>
          {hoveredAction && (
            <div className="relative flex justify-center">
              <span className="bg-zinc-950 px-2 text-xs text-zinc-400">
                {hoveredAction}
              </span>
            </div>
          )}
        </div>

        {/* Secondary Actions - Icon Grid */}
        <div className="grid grid-cols-4 gap-2">
          {secondaryActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={action.onClick}
                onMouseEnter={() => setHoveredAction(action.label)}
                onMouseLeave={() => setHoveredAction(null)}
                className="group flex aspect-square items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 transition-all hover:border-zinc-700 hover:bg-zinc-800"
                aria-label={action.label}
              >
                <Icon
                  className="h-4 w-4 transition-colors"
                  style={{ color: action.color }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Dialogs */}
      <JobsDialog open={jobsOpen} onOpenChange={setJobsOpen} />
      <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
      <BankDialog open={bankOpen} onOpenChange={setBankOpen} />
      <ActivitiesDialog open={activitiesOpen} onOpenChange={setActivitiesOpen} />
    </>
  );
}
