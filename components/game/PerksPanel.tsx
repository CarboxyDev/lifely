'use client';

import { useAtom } from 'jotai';
import { Award, Sparkles, TrendingUp, TrendingDown } from 'lucide-react';
import { perksAtom } from '@/lib/atoms/game-state';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Perk } from '@/lib/types';

const rarityColors = {
  common: 'bg-zinc-600',
  uncommon: 'bg-green-600',
  rare: 'bg-blue-600',
  legendary: 'bg-purple-600',
};

const categoryIcons = {
  physical: '💪',
  mental: '🧠',
  social: '👥',
  financial: '💰',
  luck: '🍀',
  career: '💼',
  health: '❤️',
};

export function PerksPanel() {
  const [perks] = useAtom(perksAtom);

  const positivePerks = perks.activePerks.filter(p => p.isPositive);
  const negativePerks = perks.activePerks.filter(p => !p.isPositive);

  const renderPerk = (perk: Perk) => {
    const Icon = perk.isPositive ? TrendingUp : TrendingDown;
    const borderColor = perk.isPositive ? 'border-green-600/50' : 'border-red-600/50';
    const bgColor = perk.isPositive ? 'bg-green-950/20' : 'bg-red-950/20';

    return (
      <div
        key={perk.id}
        className={`rounded-lg border ${borderColor} ${bgColor} p-3`}
      >
        <div className="mb-2 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{categoryIcons[perk.category]}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-100">{perk.name}</span>
                <Icon className={`h-3 w-3 ${perk.isPositive ? 'text-green-400' : 'text-red-400'}`} />
              </div>
            </div>
          </div>
          <Badge className={`${rarityColors[perk.rarity]} text-xs`}>
            {perk.rarity}
          </Badge>
        </div>

        <p className="mb-2 text-xs text-zinc-400">{perk.description}</p>

        {/* Show effects */}
        <div className="space-y-1 text-xs">
          {perk.effects.statModifiers && Object.entries(perk.effects.statModifiers).map(([stat, value]) => (
            value !== undefined && (
              <div key={stat} className={value > 0 ? 'text-green-400' : 'text-red-400'}>
                {stat}: {value > 0 ? '+' : ''}{value}
              </div>
            )
          ))}

          {perk.effects.multipliers && Object.entries(perk.effects.multipliers).map(([mult, value]) => (
            value !== undefined && value !== 1.0 && (
              <div key={mult} className={value > 1 ? 'text-green-400' : 'text-red-400'}>
                {mult.replace(/([A-Z])/g, ' $1').toLowerCase()}: ×{value.toFixed(2)}
              </div>
            )
          ))}

          {perk.effects.special && Object.entries(perk.effects.special).map(([ability, enabled]) => (
            enabled && (
              <div key={ability} className="text-purple-400">
                ✨ {ability.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </div>
            )
          ))}
        </div>

        {/* Birth trait indicator */}
        {perks.birthTraits.some(bt => bt.id === perk.id) && (
          <div className="mt-2 text-xs text-zinc-500">
            <Sparkles className="mr-1 inline h-3 w-3" />
            Birth Trait
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-yellow-400" />
          Perks & Traits
          <Badge variant="outline" className="ml-auto">
            {perks.activePerks.length} active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {positivePerks.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-green-400">
              Perks ({positivePerks.length})
            </h3>
            <div className="space-y-2">
              {positivePerks.map(renderPerk)}
            </div>
          </div>
        )}

        {negativePerks.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-red-400">
              Flaws ({negativePerks.length})
            </h3>
            <div className="space-y-2">
              {negativePerks.map(renderPerk)}
            </div>
          </div>
        )}

        {perks.activePerks.length === 0 && (
          <div className="text-center text-sm text-zinc-500">
            No perks or flaws yet
          </div>
        )}

        {/* Stats summary */}
        <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-3 text-xs">
          <div className="mb-1 font-semibold text-zinc-400">Summary</div>
          <div className="grid grid-cols-2 gap-1 text-zinc-500">
            <div>Total Perks: {positivePerks.length}</div>
            <div>Total Flaws: {negativePerks.length}</div>
            <div>Birth Traits: {perks.birthTraits.length}</div>
            <div>Unlocked: {perks.unlockedPerks.length}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
