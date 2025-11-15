'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Briefcase,
  GraduationCap,
  Landmark,
  User,
  Dumbbell,
  BookOpen,
  Utensils,
  Plane,
  AlertCircle,
} from 'lucide-react';
import { useState } from 'react';
import { JobsDialog } from './dialogs/JobsDialog';
import { ProfileDialog } from './dialogs/ProfileDialog';
import { BankDialog } from './dialogs/BankDialog';
import { ActivitiesDialog } from './dialogs/ActivitiesDialog';
import { useAtom } from 'jotai';
import { alertCountAtom } from '@/lib/atoms/game-state';

export function QuickActions() {
  const [jobsOpen, setJobsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [bankOpen, setBankOpen] = useState(false);
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  const [alertCount] = useAtom(alertCountAtom);

  const actions = [
    {
      icon: <Briefcase className="h-4 w-4" />,
      label: 'Jobs',
      description: 'Find work',
      onClick: () => setJobsOpen(true),
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    },
    {
      icon: <Landmark className="h-4 w-4" />,
      label: 'Bank',
      description: 'Manage money',
      onClick: () => setBankOpen(true),
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    },
    {
      icon: <User className="h-4 w-4" />,
      label: 'Profile',
      description: 'View details',
      onClick: () => setProfileOpen(true),
      color: 'text-slate-600 dark:text-slate-400',
      bgColor: 'bg-slate-100 dark:bg-slate-800',
    },
  ];

  const activities = [
    {
      icon: <Dumbbell className="h-4 w-4" />,
      label: 'Gym',
      onClick: () => setActivitiesOpen(true),
    },
    {
      icon: <BookOpen className="h-4 w-4" />,
      label: 'Library',
      onClick: () => setActivitiesOpen(true),
    },
    {
      icon: <Utensils className="h-4 w-4" />,
      label: 'Restaurant',
      onClick: () => setActivitiesOpen(true),
    },
    {
      icon: <Plane className="h-4 w-4" />,
      label: 'Vacation',
      onClick: () => setActivitiesOpen(true),
    },
  ];

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Quick Actions
        </h2>

        {/* Main Actions */}
        <div className="space-y-2">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto w-full justify-start border-slate-200 bg-white p-3 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
              onClick={action.onClick}
            >
              <div className="flex w-full items-center gap-3">
                <div className={`rounded-lg ${action.bgColor} p-2`}>
                  <div className={action.color}>{action.icon}</div>
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-slate-900 dark:text-white">
                    {action.label}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {action.description}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>

        {/* Activities */}
        <Card className="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {activities.map((activity) => (
                <Button
                  key={activity.label}
                  variant="outline"
                  size="sm"
                  className="h-auto flex-col gap-1 border-slate-200 py-3 dark:border-slate-700"
                  onClick={activity.onClick}
                >
                  {activity.icon}
                  <span className="text-xs">{activity.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        {alertCount > 0 && (
          <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <div className="flex-1">
                  <div className="font-medium text-red-900 dark:text-red-100">
                    Alerts
                  </div>
                  <div className="text-sm text-red-700 dark:text-red-300">
                    You have {alertCount} notification(s)
                  </div>
                </div>
                <Badge variant="destructive">{alertCount}</Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Dialogs */}
      <JobsDialog open={jobsOpen} onOpenChange={setJobsOpen} />
      <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
      <BankDialog open={bankOpen} onOpenChange={setBankOpen} />
      <ActivitiesDialog open={activitiesOpen} onOpenChange={setActivitiesOpen} />
    </>
  );
}
