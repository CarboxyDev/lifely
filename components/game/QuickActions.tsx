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
      description: 'View your life details',
      onClick: () => setProfileOpen(true),
      color: '#6b7280',
    },
    {
      icon: Landmark,
      label: 'Bank',
      description: 'Manage finances',
      onClick: () => setBankOpen(true),
      color: '#10b981',
    },
    {
      icon: Dumbbell,
      label: 'Activities',
      description: 'Exercise & hobbies',
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
                className="group cursor-pointer border-border bg-card transition-all hover:border-accent hover:bg-accent/50"
                onClick={action.onClick}
              >
                <CardContent className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors"
                      style={{ backgroundColor: `${action.color}20` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: action.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-foreground">
                        {action.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {action.description}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Divider - Fixed height to prevent layout shift */}
        <div className="relative h-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-2 text-xs text-muted-foreground">
              {hoveredAction || '\u00A0'}
            </span>
          </div>
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
                className="group flex aspect-square cursor-pointer items-center justify-center rounded-lg border border-border bg-card transition-all hover:border-accent hover:bg-accent/50"
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
