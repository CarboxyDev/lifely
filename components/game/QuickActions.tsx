'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, GraduationCap, Landmark, User, Dumbbell } from 'lucide-react';
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

  const actions = [
    {
      icon: Briefcase,
      label: 'Jobs',
      description: 'Find work & manage career',
      onClick: () => setJobsOpen(true),
      color: '#3b82f6',
    },
    {
      icon: GraduationCap,
      label: 'Education',
      description: 'Study & improve skills',
      onClick: () => {},
      color: '#8b5cf6',
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
    {
      icon: User,
      label: 'Profile',
      description: 'View your life',
      onClick: () => setProfileOpen(true),
      color: '#6b7280',
    },
  ];

  return (
    <>
      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Card
              key={action.label}
              className="cursor-pointer border-zinc-800 bg-zinc-900 transition-colors hover:bg-zinc-800"
              onClick={action.onClick}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${action.color}20` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: action.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-zinc-100">
                      {action.label}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {action.description}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Dialogs */}
      <JobsDialog open={jobsOpen} onOpenChange={setJobsOpen} />
      <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
      <BankDialog open={bankOpen} onOpenChange={setBankOpen} />
      <ActivitiesDialog open={activitiesOpen} onOpenChange={setActivitiesOpen} />
    </>
  );
}
