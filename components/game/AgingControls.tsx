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
  slow: 'Slow',
  normal: 'Normal',
  fast: 'Fast',
  'very-fast': 'Very Fast',
};

const speedDetails: Record<AgingSpeed, string> = {
  paused: '',
  slow: '1 day/10s',
  normal: '1 day/5s',
  fast: '1 day/2.5s',
  'very-fast': '1 day/s',
};

const speedColors: Record<AgingSpeed, string> = {
  paused: 'text-zinc-500',
  slow: 'text-blue-400',
  normal: 'text-green-400',
  fast: 'text-yellow-400',
  'very-fast': 'text-red-400',
};

export function AgingControls() {
  const { isAging, currentSpeed, progressPercentage, startAging, stopAging, changeSpeed } = useAutoAging();

  // Get the active speed (the one that will be used when Age Up is clicked)
  const activeSpeed = currentSpeed === 'paused' ? 'normal' : currentSpeed;

  const handleToggleAging = () => {
    if (isAging) {
      stopAging();
    } else {
      // Resume with last speed (or default to normal)
      startAging();
    }
  };

  const handleSpeedChange = (speed: AgingSpeed) => {
    // Always pause when changing speed - user must click Age Up again
    if (speed === 'paused') {
      stopAging();
    } else {
      changeSpeed(speed);
      stopAging(); // Pause after changing speed
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {/* Play/Pause Button with Progress */}
        <div className="relative">
          <Button
            onClick={handleToggleAging}
            variant={isAging ? 'destructive' : 'default'}
            size="lg"
            className="gap-2 relative overflow-hidden"
          >
            {/* Progress bar fill */}
            {isAging && (
              <div
                className="absolute inset-0 bg-white/20 transition-all duration-100 ease-linear"
                style={{ width: `${progressPercentage}%` }}
              />
            )}
            {/* Button content */}
            <span className="relative z-10 flex items-center gap-2">
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
            </span>
          </Button>
        </div>

        {/* Speed Control Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="lg" className="gap-2">
              <Gauge className="h-4 w-4" />
              <div className="flex flex-col items-start">
                <span className={speedColors[activeSpeed]}>
                  {speedLabels[activeSpeed]}
                </span>
                {speedDetails[activeSpeed] && (
                  <span className="text-[10px] text-muted-foreground">
                    {speedDetails[activeSpeed]}
                  </span>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Select Speed</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleSpeedChange('slow')}>
              <span className={speedColors.slow}>
                {activeSpeed === 'slow' ? '● ' : '○ '}Slow
              </span>
              <span className="ml-auto text-xs text-zinc-500">1 day/10s</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSpeedChange('normal')}>
              <span className={speedColors.normal}>
                {activeSpeed === 'normal' ? '● ' : '○ '}Normal
              </span>
              <span className="ml-auto text-xs text-zinc-500">1 day/5s</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSpeedChange('fast')}>
              <span className={speedColors.fast}>
                {activeSpeed === 'fast' ? '● ' : '○ '}Fast
              </span>
              <span className="ml-auto text-xs text-zinc-500">1 day/2.5s</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSpeedChange('very-fast')}>
              <span className={speedColors['very-fast']}>
                {activeSpeed === 'very-fast' ? '● ' : '○ '}Very Fast
              </span>
              <span className="ml-auto text-xs text-zinc-500">1 day/s</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
