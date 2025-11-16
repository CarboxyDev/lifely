'use client';

import { Play, Pause, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAutoAging } from '@/lib/hooks/use-auto-aging';
import type { AgingSpeed } from '@/lib/utils/auto-aging';

const speedLabels: Record<AgingSpeed, string> = {
  paused: 'Paused',
  slow: 'Slow (1 day/10s)',
  normal: 'Normal (1 day/5s)',
  fast: 'Fast (1 day/2.5s)',
  'very-fast': 'Very Fast (1 day/s)',
};

const speedColors: Record<AgingSpeed, string> = {
  paused: 'text-zinc-500',
  slow: 'text-blue-400',
  normal: 'text-green-400',
  fast: 'text-yellow-400',
  'very-fast': 'text-red-400',
};

export function AgingControls() {
  const { isAging, currentSpeed, daysProcessed, startAging, stopAging, changeSpeed } = useAutoAging();

  const handleToggleAging = () => {
    if (isAging) {
      stopAging();
    } else {
      // Default to normal speed when starting
      startAging('normal');
    }
  };

  const handleSpeedChange = (speed: AgingSpeed) => {
    changeSpeed(speed);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Play/Pause Button */}
      <Button
        onClick={handleToggleAging}
        variant={isAging ? 'destructive' : 'default'}
        size="lg"
        className="gap-2"
      >
        {isAging ? (
          <>
            <Pause className="h-4 w-4" />
            Pause
          </>
        ) : (
          <>
            <Play className="h-4 w-4" />
            Age Up
          </>
        )}
      </Button>

      {/* Speed Control Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="lg" className="gap-2">
            <Gauge className="h-4 w-4" />
            <span className={speedColors[currentSpeed]}>
              {speedLabels[currentSpeed]}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuLabel>Aging Speed</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleSpeedChange('slow')}>
            <span className={speedColors.slow}>● Slow</span>
            <span className="ml-auto text-xs text-zinc-500">1 day/10s</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSpeedChange('normal')}>
            <span className={speedColors.normal}>● Normal</span>
            <span className="ml-auto text-xs text-zinc-500">1 day/5s</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSpeedChange('fast')}>
            <span className={speedColors.fast}>● Fast</span>
            <span className="ml-auto text-xs text-zinc-500">1 day/2.5s</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSpeedChange('very-fast')}>
            <span className={speedColors['very-fast']}>● Very Fast</span>
            <span className="ml-auto text-xs text-zinc-500">1 day/s</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleSpeedChange('paused')}>
            <span className={speedColors.paused}>■ Pause</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Days Processed Counter */}
      {isAging && (
        <div className="text-sm text-zinc-400">
          <span className="font-mono">{daysProcessed}</span> days processed
        </div>
      )}
    </div>
  );
}
