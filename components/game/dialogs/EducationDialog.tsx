'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAtom } from 'jotai';
import { userAtom, moneyAtom, addConsoleMessageAtom, statsAtom } from '@/lib/atoms/game-state';
import { GraduationCap, BookOpen, Award } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import type { EducationLevel } from '@/lib/types';
import {
  educationLevelNames,
  educationLevelDurations,
  getInstitutionsForLevel,
  getMajorsForLevel,
  getNextEducationLevel,
  canEnrollInLevel,
} from '@/lib/data/education';
import { randomChoice } from '@/lib/utils/game-utils';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EducationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const educationCosts: Record<EducationLevel, number> = {
  none: 0,
  elementary: 0,
  'middle-school': 0,
  'high-school': 0,
  college: 5000,
  university: 15000,
  graduate: 30000,
  phd: 50000,
};

export function EducationDialog({ open, onOpenChange }: EducationDialogProps) {
  const [user, setUser] = useAtom(userAtom);
  const [money, setMoney] = useAtom(moneyAtom);
  const [, addMessage] = useAtom(addConsoleMessageAtom);
  const [stats, setStats] = useAtom(statsAtom);
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel | null>(null);

  const { education } = user;
  const nextLevel = getNextEducationLevel(education.currentLevel);

  const handleEnroll = (level: EducationLevel) => {
    const cost = educationCosts[level];

    if (money < cost) {
      toast.error(`You need $${cost.toLocaleString()} to enroll in ${educationLevelNames[level]}`);
      return;
    }

    if (!canEnrollInLevel(level, education)) {
      toast.error('You must complete the previous education level first');
      return;
    }

    const institutions = getInstitutionsForLevel(level);
    const majors = getMajorsForLevel(level);

    const institution = randomChoice(institutions);
    const major = majors.length > 0 ? randomChoice(majors) : null;

    setMoney(money - cost);
    setUser({
      ...user,
      education: {
        ...education,
        currentLevel: level,
        currentInstitution: institution,
        currentMajor: major,
        yearsInCurrentLevel: 0,
        gpa: 0,
        isEnrolled: true,
        graduationYear: null,
      },
    });

    const majorText = major ? ` studying ${major}` : '';
    addMessage(`Enrolled in ${institution}${majorText}`);

    // Boost intellect for enrolling in education
    setStats({
      ...stats,
      intellect: Math.min(100, stats.intellect + 5),
    });

    toast.success(`Enrolled in ${educationLevelNames[level]}!`);
    onOpenChange(false);
  };

  const handleDropOut = () => {
    setUser({
      ...user,
      education: {
        ...education,
        isEnrolled: false,
        currentInstitution: null,
        currentMajor: null,
      },
    });

    addMessage('Dropped out of school');

    // Decrease morale and intellect for dropping out
    setStats({
      ...stats,
      morale: Math.max(0, stats.morale - 10),
      intellect: Math.max(0, stats.intellect - 5),
    });

    toast.info('Dropped out of education');
    onOpenChange(false);
  };

  const currentProgress = education.isEnrolled
    ? (education.yearsInCurrentLevel / educationLevelDurations[education.currentLevel]) * 100
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-border bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <GraduationCap className="h-6 w-6" />
            Education
          </DialogTitle>
          <DialogDescription>Manage your educational journey</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">

        <div className="space-y-6 py-4">
          {/* Current Education Status */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Current Status</Label>
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Level</span>
                  <span className="font-semibold text-foreground">
                    {educationLevelNames[education.currentLevel]}
                  </span>
                </div>

                {education.isEnrolled && education.currentInstitution && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Institution</span>
                      <span className="text-sm font-medium text-foreground">
                        {education.currentInstitution}
                      </span>
                    </div>

                    {education.currentMajor && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Major</span>
                        <span className="text-sm font-medium text-foreground">
                          {education.currentMajor}
                        </span>
                      </div>
                    )}

                    <div className="space-y-1.5 pt-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-muted-foreground">
                          Year {education.yearsInCurrentLevel} /{' '}
                          {educationLevelDurations[education.currentLevel]}
                        </span>
                      </div>
                      <Progress value={currentProgress} className="h-2" />
                    </div>

                    {education.gpa > 0 && (
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm text-muted-foreground">GPA</span>
                        <span className="font-semibold text-emerald-400">
                          {education.gpa.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </>
                )}

                {!education.isEnrolled && (
                  <p className="text-sm text-muted-foreground">Not currently enrolled</p>
                )}
              </div>
            </div>
          </div>

          {/* Completed Degrees */}
          {education.degrees.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Award className="h-4 w-4" />
                  Degrees Earned
                </Label>
                <div className="space-y-2">
                  {education.degrees.map((degree, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-border bg-muted/30 p-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="font-medium text-foreground">{degree.major}</div>
                          <div className="text-xs text-muted-foreground">
                            {degree.institution}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-emerald-400">
                            {degree.gpa.toFixed(2)} GPA
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {degree.graduationYear}
                          </div>
                        </div>
                      </div>
                      {degree.honors && (
                        <div className="mt-2 text-xs text-amber-400">{degree.honors}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Enrollment Options */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <BookOpen className="h-4 w-4" />
              Enrollment
            </Label>

            {education.isEnrolled ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Continue your studies or drop out
                </p>
                <Button
                  variant="destructive"
                  onClick={handleDropOut}
                  className="w-full"
                  size="sm"
                >
                  Drop Out
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {nextLevel && canEnrollInLevel(nextLevel, education) ? (
                  <div className="space-y-2">
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-foreground">
                            {educationLevelNames[nextLevel]}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {educationLevelDurations[nextLevel]} years
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-foreground">
                            ${educationCosts[nextLevel].toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">tuition</div>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleEnroll(nextLevel)}
                      className="w-full"
                      disabled={money < educationCosts[nextLevel]}
                    >
                      Enroll in {educationLevelNames[nextLevel]}
                    </Button>
                  </div>
                ) : education.currentLevel === 'phd' ? (
                  <p className="text-sm text-muted-foreground">
                    You've reached the highest education level!
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Complete your current education level to continue
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
