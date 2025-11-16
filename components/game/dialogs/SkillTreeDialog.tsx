'use client';

import { useAtom } from 'jotai';
import { skillTreeAtom, statsAtom, calendarAtom } from '@/lib/atoms/game-state';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { getSkillsByTree, type SkillNode, type SkillTreeType } from '@/lib/data/skill-trees';
import { canUnlockSkill, unlockSkill, getAvailableSkills } from '@/lib/utils/skill-tree-system';
import { Lock, Check, Star, Zap } from 'lucide-react';
import { useState } from 'react';

interface SkillTreeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SkillTreeDialog({ open, onOpenChange }: SkillTreeDialogProps) {
  const [skillTree, setSkillTree] = useAtom(skillTreeAtom);
  const [stats] = useAtom(statsAtom);
  const [calendar] = useAtom(calendarAtom);
  const [selectedTree, setSelectedTree] = useState<SkillTreeType>('combat');

  const playerLevel = Math.floor(calendar.ageInYears);
  const playerData = {
    level: playerLevel,
    health: stats.health,
    morale: stats.morale,
    intellect: stats.intellect,
    looks: stats.looks,
  };

  const handleUnlockSkill = (skillId: string) => {
    const result = canUnlockSkill(skillId, skillTree, playerData);
    if (!result.canUnlock) {
      alert(result.reason);
      return;
    }

    try {
      const newState = unlockSkill(skillId, skillTree, calendar.ageInDays);
      setSkillTree(newState);
    } catch (error) {
      alert('Failed to unlock skill');
    }
  };

  const isSkillUnlocked = (skillId: string) => {
    return skillTree.unlockedSkills.some(s => s.skillId === skillId);
  };

  const isSkillAvailable = (skill: SkillNode) => {
    const result = canUnlockSkill(skill.id, skillTree, playerData);
    return result.canUnlock;
  };

  const renderSkill = (skill: SkillNode) => {
    const unlocked = isSkillUnlocked(skill.id);
    const available = isSkillAvailable(skill);
    const checkResult = canUnlockSkill(skill.id, skillTree, playerData);

    return (
      <div
        key={skill.id}
        className={`rounded-lg border p-4 transition-all ${
          unlocked
            ? 'border-emerald-500 bg-emerald-950/30'
            : available
            ? 'border-yellow-600 bg-yellow-950/20 hover:bg-yellow-950/30'
            : 'border-zinc-800 bg-zinc-900/50 opacity-60'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{skill.icon}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm">{skill.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    Tier {skill.tier}
                  </Badge>
                </div>
                <p className="text-xs text-zinc-400">{skill.description}</p>
              </div>
            </div>

            {/* Effects */}
            <div className="mt-2 space-y-1 text-xs">
              {skill.effects.statModifiers && (
                <div className="flex flex-wrap gap-2">
                  {Object.entries(skill.effects.statModifiers).map(([stat, value]) => (
                    <span key={stat} className="text-emerald-400">
                      +{value} {stat}
                    </span>
                  ))}
                </div>
              )}
              {skill.effects.multipliers && (
                <div className="flex flex-wrap gap-2">
                  {Object.entries(skill.effects.multipliers).map(([key, value]) => (
                    <span key={key} className="text-blue-400">
                      {((value - 1) * 100).toFixed(0)}% {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Requirements */}
            {skill.requires.skillIds && skill.requires.skillIds.length > 0 && !unlocked && (
              <div className="mt-2 text-xs text-zinc-500">
                Requires: {skill.requires.skillIds.join(', ')}
              </div>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1 text-sm font-semibold">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{skill.skillPointCost}</span>
            </div>

            {unlocked ? (
              <div className="flex items-center gap-1 text-emerald-400">
                <Check className="h-4 w-4" />
                <span className="text-xs">Unlocked</span>
              </div>
            ) : available ? (
              <Button
                size="sm"
                onClick={() => handleUnlockSkill(skill.id)}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Zap className="h-3 w-3 mr-1" />
                Unlock
              </Button>
            ) : (
              <div className="flex items-center gap-1 text-zinc-500">
                <Lock className="h-4 w-4" />
                <span className="text-xs">Locked</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const trees: { id: SkillTreeType; label: string; icon: string }[] = [
    { id: 'combat', label: 'Combat', icon: '⚔️' },
    { id: 'social', label: 'Social', icon: '🗣️' },
    { id: 'mental', label: 'Mental', icon: '🧠' },
    { id: 'financial', label: 'Financial', icon: '💰' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Skill Trees</DialogTitle>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-lg font-semibold">
                {skillTree.availableSkillPoints} Points Available
              </span>
            </div>
          </div>

          {/* Stats Display */}
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between p-2 rounded bg-zinc-900/50">
              <span className="text-zinc-400">Total Skills Unlocked:</span>
              <span className="font-semibold">{skillTree.unlockedSkills.length}</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-zinc-900/50">
              <span className="text-zinc-400">Total Points Spent:</span>
              <span className="font-semibold">{skillTree.totalSkillPointsSpent}</span>
            </div>
          </div>

          {/* Active Bonuses Summary */}
          {skillTree.unlockedSkills.length > 0 && (
            <div className="mt-3 p-3 rounded-lg bg-emerald-950/30 border border-emerald-800">
              <div className="text-xs font-semibold text-emerald-400 mb-2">Active Bonuses</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(skillTree.activeBonuses.statModifiers)
                  .filter(([_, value]) => value > 0)
                  .map(([stat, value]) => (
                    <div key={stat} className="flex justify-between">
                      <span className="text-zinc-400 capitalize">{stat}:</span>
                      <span className="text-emerald-400">+{value}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </DialogHeader>

        <Tabs value={selectedTree} onValueChange={(v) => setSelectedTree(v as SkillTreeType)} className="px-6">
          <TabsList className="w-full grid grid-cols-4 mb-4">
            {trees.map((tree) => (
              <TabsTrigger key={tree.id} value={tree.id} className="flex items-center gap-2">
                <span>{tree.icon}</span>
                <span>{tree.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {trees.map((tree) => (
            <TabsContent key={tree.id} value={tree.id} className="mt-0">
              <ScrollArea className="h-[50vh] pr-4">
                <div className="space-y-3 pb-6">
                  {[1, 2, 3, 4, 5].map((tier) => {
                    const skillsInTier = getSkillsByTree(tree.id).filter(s => s.tier === tier);
                    if (skillsInTier.length === 0) return null;

                    return (
                      <div key={tier}>
                        <div className="mb-2 flex items-center gap-2">
                          <div className="h-px flex-1 bg-zinc-800" />
                          <span className="text-xs font-semibold text-zinc-500">TIER {tier}</span>
                          <div className="h-px flex-1 bg-zinc-800" />
                        </div>
                        <div className="space-y-2">
                          {skillsInTier.map(renderSkill)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
