'use client';

import { useState } from 'react';
import { useAtom } from 'jotai';
import { Dices, TrendingUp, TrendingDown, Zap, Heart, Brain, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { statsAtom, moneyAtom } from '@/lib/atoms/game-state';
import type { InteractiveEvent, AttributeCheck, DiceChallenge } from '@/lib/data/interactive-events';
import { performAttributeCheck, performDiceChallenge } from '@/lib/data/interactive-events';

interface InteractiveEventDialogProps {
  event: InteractiveEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export function InteractiveEventDialog({ event, isOpen, onClose }: InteractiveEventDialogProps) {
  const [stats, setStats] = useAtom(statsAtom);
  const [money, setMoney] = useAtom(moneyAtom);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [rollValue, setRollValue] = useState<number | null>(null);

  if (!event) return null;

  const handleAttributeCheck = (check: AttributeCheck) => {
    const attributeValue = stats[check.attribute];
    const outcome = performAttributeCheck(attributeValue, check);

    const resultOutcome = outcome === 'success' ? check.successOutcome : check.failureOutcome;

    setResult(resultOutcome);
    setShowResult(true);

    // Apply effects
    applyEffects(resultOutcome.effects);
  };

  const handleDiceChallenge = (challenge: DiceChallenge) => {
    const luckModifier = Math.floor((stats.luck || 50) / 10) - 5; // -5 to +5 based on luck
    const { result: outcome, roll } = performDiceChallenge(challenge, luckModifier);

    setRollValue(roll);

    let resultOutcome;
    if (outcome === 'critical-success' && challenge.criticalSuccess) {
      resultOutcome = challenge.criticalSuccess;
    } else if (outcome === 'success') {
      resultOutcome = challenge.successOutcome;
    } else if (outcome === 'critical-failure' && challenge.criticalFailure) {
      resultOutcome = challenge.criticalFailure;
    } else {
      resultOutcome = challenge.failureOutcome;
    }

    setResult(resultOutcome);
    setShowResult(true);

    // Apply effects
    applyEffects(resultOutcome.effects);
  };

  const handleMultiStageChoice = (choiceIndex: number) => {
    if (!event.multiStage) return;

    const choice = event.multiStage.stages[0].choices[choiceIndex];

    if (choice.requiresCheck) {
      const check = choice.requiresCheck;
      if ('attribute' in check) {
        handleAttributeCheck(check);
      } else {
        handleDiceChallenge(check);
      }
    } else if (choice.outcome) {
      setResult(choice.outcome);
      setShowResult(true);
      applyEffects(choice.outcome.effects);
    }

    // TODO: Handle nextStage for multi-stage events
  };

  const applyEffects = (effects: any) => {
    if (!effects) return;

    if (effects.health) {
      setStats(prev => ({
        ...prev,
        health: Math.max(0, Math.min(100, prev.health + effects.health)),
      }));
    }
    if (effects.morale) {
      setStats(prev => ({
        ...prev,
        morale: Math.max(0, Math.min(100, prev.morale + effects.morale)),
      }));
    }
    if (effects.intellect) {
      setStats(prev => ({
        ...prev,
        intellect: Math.max(0, Math.min(100, prev.intellect + effects.intellect)),
      }));
    }
    if (effects.looks) {
      setStats(prev => ({
        ...prev,
        looks: Math.max(0, Math.min(100, prev.looks + effects.looks)),
      }));
    }
    if (effects.money) {
      setMoney(prev => prev + effects.money);
    }
  };

  const handleClose = () => {
    setShowResult(false);
    setResult(null);
    setRollValue(null);
    onClose();
  };

  const getAttributeIcon = (attr: string) => {
    switch (attr) {
      case 'health':
        return <Heart className="h-5 w-5 text-red-400" />;
      case 'morale':
        return <Sparkles className="h-5 w-5 text-yellow-400" />;
      case 'intellect':
        return <Brain className="h-5 w-5 text-blue-400" />;
      case 'looks':
        return <Zap className="h-5 w-5 text-purple-400" />;
      default:
        return null;
    }
  };

  const renderAttributeCheckContent = (check: AttributeCheck) => {
    const attributeValue = stats[check.attribute];
    const difficulty = check.difficulty;
    const willSucceed = attributeValue >= difficulty;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getAttributeIcon(check.attribute)}
            <span className="font-semibold capitalize">{check.attribute} Check</span>
          </div>
          <span className="text-sm text-zinc-400">DC {difficulty}</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Your {check.attribute}</span>
            <span className={willSucceed ? 'text-green-400' : 'text-red-400'}>
              {attributeValue} / {difficulty}
            </span>
          </div>
          <Progress value={(attributeValue / 100) * 100} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg border border-green-600/50 bg-green-950/20 p-3">
            <div className="mb-1 flex items-center gap-1 text-green-400">
              <TrendingUp className="h-3 w-3" />
              <span className="font-semibold">Success</span>
            </div>
            <p className="text-xs text-zinc-400">{check.successOutcome.description}</p>
          </div>

          <div className="rounded-lg border border-red-600/50 bg-red-950/20 p-3">
            <div className="mb-1 flex items-center gap-1 text-red-400">
              <TrendingDown className="h-3 w-3" />
              <span className="font-semibold">Failure</span>
            </div>
            <p className="text-xs text-zinc-400">{check.failureOutcome.description}</p>
          </div>
        </div>

        <Button
          onClick={() => handleAttributeCheck(check)}
          className="w-full"
          size="lg"
        >
          Proceed
        </Button>
      </div>
    );
  };

  const renderDiceChallengeContent = (challenge: DiceChallenge) => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dices className="h-5 w-5 text-purple-400" />
            <span className="font-semibold">
              Roll {challenge.rollCount}{challenge.diceType}
            </span>
          </div>
          <span className="text-sm text-zinc-400">DC {challenge.difficulty}</span>
        </div>

        {challenge.hasAdvantage && (
          <div className="rounded bg-green-950/30 p-2 text-xs text-green-400">
            ⬆ Advantage: Roll twice, take higher
          </div>
        )}
        {challenge.hasDisadvantage && (
          <div className="rounded bg-red-950/30 p-2 text-xs text-red-400">
            ⬇ Disadvantage: Roll twice, take lower
          </div>
        )}

        <div className="space-y-2">
          {challenge.criticalSuccess && (
            <div className="rounded-lg border border-yellow-600/50 bg-yellow-950/10 p-2 text-xs">
              <span className="font-semibold text-yellow-400">Nat 20: </span>
              <span className="text-zinc-400">{challenge.criticalSuccess.description}</span>
            </div>
          )}
          <div className="rounded-lg border border-green-600/50 bg-green-950/10 p-2 text-xs">
            <span className="font-semibold text-green-400">Success: </span>
            <span className="text-zinc-400">{challenge.successOutcome.description}</span>
          </div>
          <div className="rounded-lg border border-red-600/50 bg-red-950/10 p-2 text-xs">
            <span className="font-semibold text-red-400">Failure: </span>
            <span className="text-zinc-400">{challenge.failureOutcome.description}</span>
          </div>
          {challenge.criticalFailure && (
            <div className="rounded-lg border border-red-600/50 bg-red-950/20 p-2 text-xs">
              <span className="font-semibold text-red-400">Nat 1: </span>
              <span className="text-zinc-400">{challenge.criticalFailure.description}</span>
            </div>
          )}
        </div>

        <Button
          onClick={() => handleDiceChallenge(challenge)}
          className="w-full"
          size="lg"
        >
          <Dices className="mr-2 h-4 w-4" />
          Roll the Dice
        </Button>
      </div>
    );
  };

  const renderMultiStageContent = () => {
    if (!event.multiStage) return null;

    const stage = event.multiStage.stages[0]; // TODO: Handle multiple stages

    return (
      <div className="space-y-4">
        <p className="text-sm text-zinc-300">{stage.prompt}</p>

        <div className="space-y-2">
          {stage.choices.map((choice, index) => (
            <Button
              key={index}
              onClick={() => handleMultiStageChoice(index)}
              variant="outline"
              className="w-full justify-start text-left"
              size="lg"
            >
              {choice.text}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const renderResultContent = () => {
    if (!result) return null;

    return (
      <div className="space-y-4">
        <div className="text-center">
          {rollValue !== null && (
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 rounded-lg bg-purple-950/30 px-6 py-4">
                <Dices className="h-6 w-6 text-purple-400" />
                <span className="text-3xl font-bold text-purple-400">{rollValue}</span>
              </div>
            </div>
          )}

          <h3 className="text-2xl font-bold text-zinc-100">{result.title}</h3>
          <p className="mt-2 text-sm text-zinc-400">{result.description}</p>
        </div>

        {result.effects && (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="text-xs font-semibold uppercase text-zinc-500">Effects</div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              {result.effects.health && (
                <div className={result.effects.health > 0 ? 'text-green-400' : 'text-red-400'}>
                  Health: {result.effects.health > 0 ? '+' : ''}{result.effects.health}
                </div>
              )}
              {result.effects.morale && (
                <div className={result.effects.morale > 0 ? 'text-green-400' : 'text-red-400'}>
                  Morale: {result.effects.morale > 0 ? '+' : ''}{result.effects.morale}
                </div>
              )}
              {result.effects.intellect && (
                <div className={result.effects.intellect > 0 ? 'text-green-400' : 'text-red-400'}>
                  Intellect: {result.effects.intellect > 0 ? '+' : ''}{result.effects.intellect}
                </div>
              )}
              {result.effects.looks && (
                <div className={result.effects.looks > 0 ? 'text-green-400' : 'text-red-400'}>
                  Looks: {result.effects.looks > 0 ? '+' : ''}{result.effects.looks}
                </div>
              )}
              {result.effects.money && (
                <div className={result.effects.money > 0 ? 'text-green-400' : 'text-red-400'}>
                  Money: {result.effects.money > 0 ? '+' : ''}${result.effects.money.toLocaleString()}
                </div>
              )}
            </div>
          </div>
        )}

        <Button onClick={handleClose} className="w-full" size="lg">
          Continue
        </Button>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{event.title}</DialogTitle>
          <DialogDescription>{event.description}</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {showResult ? (
            renderResultContent()
          ) : event.type === 'attribute-check' && event.attributeCheck ? (
            renderAttributeCheckContent(event.attributeCheck)
          ) : event.type === 'dice-challenge' && event.diceChallenge ? (
            renderDiceChallengeContent(event.diceChallenge)
          ) : event.type === 'multi-stage' ? (
            renderMultiStageContent()
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
