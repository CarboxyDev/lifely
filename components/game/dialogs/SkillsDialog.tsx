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
import {
  skillsAtom,
  statsAtom,
  moneyAtom,
  addConsoleMessageAtom,
} from '@/lib/atoms/game-state';
import { Target, TrendingUp, BookOpen, Award } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import type { Skill, SkillCategory } from '@/lib/types';
import {
  availableSkills,
  getSkillById,
  getTrainingForSkill,
  getSkillLevel,
  getSkillLevelName,
  getCategoryColor,
} from '@/lib/data/skills';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SkillsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SkillsDialog({ open, onOpenChange }: SkillsDialogProps) {
  const [skills, setSkills] = useAtom(skillsAtom);
  const [stats] = useAtom(statsAtom);
  const [money, setMoney] = useAtom(moneyAtom);
  const [, addMessage] = useAtom(addConsoleMessageAtom);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [view, setView] = useState<'list' | 'training'>('list');

  const getUserSkill = (skillId: string): Skill | undefined => {
    return skills.skills.find((s) => s.id === skillId);
  };

  const handleStartSkill = (skillId: string) => {
    const skillDef = getSkillById(skillId);
    if (!skillDef) return;

    const newSkill: Skill = {
      id: skillId,
      name: skillDef.name,
      category: skillDef.category,
      level: 0,
      experience: 0,
    };

    setSkills({
      ...skills,
      skills: [...skills.skills, newSkill],
    });

    toast.success(`Started learning ${skillDef.name}!`);
  };

  const handleEnrollTraining = (trainingId: string) => {
    const trainings = getTrainingForSkill(selectedSkillId!);
    const training = trainings.find((t) => t.id === trainingId);
    if (!training) return;

    if (money < training.cost) {
      toast.error(`Need $${training.cost.toLocaleString()} for this training`);
      return;
    }

    const userSkill = getUserSkill(training.skillId);
    if (!userSkill) {
      toast.error('You need to start this skill first');
      return;
    }

    if (training.requirements.minLevel && userSkill.level < training.requirements.minLevel) {
      toast.error(`Need skill level ${training.requirements.minLevel} for this training`);
      return;
    }

    if (training.requirements.minIntellect && stats.intellect < training.requirements.minIntellect) {
      toast.error(`Need ${training.requirements.minIntellect} intellect for this training`);
      return;
    }

    setMoney(money - training.cost);

    const newExperience = userSkill.experience + training.experienceGain;
    const newLevel = getSkillLevel(newExperience);

    const updatedSkills = skills.skills.map((s) =>
      s.id === training.skillId
        ? { ...s, experience: newExperience, level: newLevel }
        : s
    );

    setSkills({
      ...skills,
      skills: updatedSkills,
      totalSkillPoints: skills.totalSkillPoints + training.experienceGain,
    });

    addMessage(`Completed ${training.name}! +${training.experienceGain} experience in ${userSkill.name}`);
    toast.success(`Training completed! ${userSkill.name} is now level ${newLevel}`);
    setView('list');
    setSelectedSkillId(null);
  };

  const skillsByCategory = skills.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);

  const availableToLearn = availableSkills.filter(
    (skillDef) => !skills.skills.some((s) => s.id === skillDef.id)
  );

  if (view === 'training' && selectedSkillId) {
    const skillDef = getSkillById(selectedSkillId)!;
    const userSkill = getUserSkill(selectedSkillId);
    const trainings = getTrainingForSkill(selectedSkillId);
    const categoryColor = getCategoryColor(skillDef.category);

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg border-border bg-card">
          <DialogHeader>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setView('list');
                setSelectedSkillId(null);
              }}
              className="mb-2 w-fit"
            >
              ← Back
            </Button>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              {skillDef.name}
            </DialogTitle>
            <DialogDescription className="capitalize">{skillDef.category} Skill</DialogDescription>
          </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">

          <div className="space-y-6 py-4">
            {/* Current Progress */}
            {userSkill && (
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current Level</span>
                    <span className="font-semibold" style={{ color: categoryColor }}>
                      {userSkill.level} - {getSkillLevelName(userSkill.level)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Experience</span>
                      <span className="text-muted-foreground">{userSkill.experience} XP</span>
                    </div>
                    <Progress value={userSkill.level} className="h-2" />
                  </div>
                </div>
              </div>
            )}

            <Separator />

            {/* Training Programs */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Training Programs</h3>
              {trainings.length === 0 ? (
                <p className="text-sm text-muted-foreground">No training programs available</p>
              ) : (
                <div className="space-y-2">
                  {trainings.map((training) => {
                    const canEnroll =
                      money >= training.cost &&
                      userSkill &&
                      (!training.requirements.minLevel || userSkill.level >= training.requirements.minLevel) &&
                      (!training.requirements.minIntellect || stats.intellect >= training.requirements.minIntellect);

                    return (
                      <div
                        key={training.id}
                        className="rounded-lg border border-border bg-muted/30 p-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="font-medium text-foreground">{training.name}</div>
                              <div className="mt-1 text-xs text-muted-foreground">
                                {training.duration} months • +{training.experienceGain} XP
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-foreground">
                                ${training.cost.toLocaleString()}
                              </div>
                            </div>
                          </div>

                          {(training.requirements.minLevel || training.requirements.minIntellect) && (
                            <div className="text-xs text-muted-foreground">
                              Requirements:
                              {training.requirements.minLevel && ` Level ${training.requirements.minLevel}`}
                              {training.requirements.minLevel && training.requirements.minIntellect && ', '}
                              {training.requirements.minIntellect && ` ${training.requirements.minIntellect} Intellect`}
                            </div>
                          )}

                          <Button
                            size="sm"
                            onClick={() => handleEnrollTraining(training.id)}
                            disabled={!canEnroll}
                            className="w-full"
                          >
                            Enroll
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-border bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Target className="h-6 w-6" />
            Skills & Training
          </DialogTitle>
          <DialogDescription>Develop your abilities and career prospects</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">

        <div className="space-y-6 py-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
              <div className="text-2xl font-bold text-foreground">{skills.skills.length}</div>
              <div className="text-xs text-muted-foreground">Skills Learned</div>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
              <div className="text-2xl font-bold text-foreground">{skills.totalSkillPoints}</div>
              <div className="text-xs text-muted-foreground">Total XP</div>
            </div>
          </div>

          {/* Your Skills */}
          {skills.skills.length > 0 && (
            <>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Your Skills</h3>
                <div className="max-h-60 space-y-2 overflow-y-auto pr-2">
                  {skills.skills.map((skill) => {
                    const categoryColor = getCategoryColor(skill.category);
                    const levelName = getSkillLevelName(skill.level);

                    return (
                      <button
                        key={skill.id}
                        onClick={() => {
                          setSelectedSkillId(skill.id);
                          setView('training');
                        }}
                        className="w-full rounded-lg border border-border bg-muted/30 p-3 text-left transition-colors hover:border-accent hover:bg-accent/20"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-foreground">{skill.name}</div>
                            <div className="mt-1 text-xs capitalize text-muted-foreground">
                              {skill.category}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold" style={{ color: categoryColor }}>
                              Lv {skill.level}
                            </div>
                            <div className="text-xs text-muted-foreground">{levelName}</div>
                          </div>
                        </div>
                        <Progress value={skill.level} className="mt-2 h-1.5" />
                      </button>
                    );
                  })}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Available Skills */}
          {availableToLearn.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Start Learning</h3>
              <div className="max-h-60 space-y-2 overflow-y-auto pr-2">
                {availableToLearn.map((skillDef) => {
                  const categoryColor = getCategoryColor(skillDef.category);

                  return (
                    <div
                      key={skillDef.id}
                      className="rounded-lg border border-border bg-muted/30 p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{skillDef.name}</div>
                          <div className="mt-0.5 text-xs capitalize text-muted-foreground">
                            {skillDef.category}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {skillDef.description}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStartSkill(skillDef.id)}
                        >
                          Start
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {skills.skills.length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground">
              Start learning skills to improve your career prospects!
            </div>
          )}
        </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
