'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { userAtom, hasJobAtom, addConsoleMessageAtom, perksAtom } from '@/lib/atoms/game-state';
import { allJobs } from '@/lib/data/jobs';
import { randint, formatCurrency } from '@/lib/utils/game-utils';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { getPerkMultiplier } from '@/lib/data/perks';

interface JobsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JobsDialog({ open, onOpenChange }: JobsDialogProps) {
  const [user, setUser] = useAtom(userAtom);
  const [, setHasJob] = useAtom(hasJobAtom);
  const [, addMessage] = useAtom(addConsoleMessageAtom);
  const [perks] = useAtom(perksAtom);
  const [selectedJobs] = useState<string[]>(() => {
    const jobNames = Object.keys(allJobs);
    const selected: string[] = [];
    for (let i = 0; i < 6 && i < jobNames.length; i++) {
      const randomJob = jobNames[randint(0, jobNames.length - 1)];
      if (!selected.includes(randomJob)) {
        selected.push(randomJob);
      }
    }
    return selected;
  });

  const applyForJob = (jobName: string) => {
    const jobData = allJobs[jobName];
    let baseSalary = randint(jobData.minSalary, jobData.maxSalary);

    // Apply perk multipliers to salary
    const salaryMultiplier = getPerkMultiplier(perks.activePerks, 'salaryMultiplier');
    const finalSalary = Math.floor(baseSalary * salaryMultiplier);

    // Check if user has required degree
    const userDegrees = Object.keys(user.education.degrees);
    const hasRequiredDegree = jobData.requires.length === 0 ||
      jobData.requires.some(req => userDegrees.includes(req));

    if (hasRequiredDegree) {
      setUser({
        ...user,
        job: {
          name: jobName,
          salary: finalSalary,
          promotions: 0,
          duration: 0,
          previousJobs: user.job.name !== 'Unemployed'
            ? [...user.job.previousJobs, user.job.name]
            : user.job.previousJobs,
          performance: 50, // Start with average performance
          lastReview: user.age, // Set review to current age
        },
      });
      setHasJob(true);

      // Show bonus message if salary was boosted by perks
      if (salaryMultiplier > 1.0) {
        const bonusPercent = Math.floor((salaryMultiplier - 1.0) * 100);
        addMessage(`You got a job as a ${jobName}! Salary boosted by ${bonusPercent}% due to your perks!`);
      } else {
        addMessage(`You got a job as a ${jobName}!`);
      }

      toast.success(`Hired as ${jobName}!`);
      onOpenChange(false);
    } else {
      toast.error('You don\'t have the required qualifications');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-zinc-800 bg-zinc-950">
        <DialogHeader>
          <DialogTitle className="text-2xl">Available Jobs</DialogTitle>
          <DialogDescription>
            Apply for a job to start earning money
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-4">
          {selectedJobs.map((jobName) => {
            const job = allJobs[jobName];
            const salary = randint(job.minSalary, job.maxSalary);

            return (
              <div
                key={jobName}
                className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
              >
                <div>
                  <div className="font-semibold">{jobName}</div>
                  <div className="text-sm text-zinc-400">
                    {formatCurrency(salary)}/month
                  </div>
                  {job.requires.length > 0 && (
                    <div className="mt-1 flex gap-1">
                      {job.requires.map((req) => (
                        <Badge key={req} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <Button onClick={() => applyForJob(jobName)}>
                  Apply
                </Button>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
