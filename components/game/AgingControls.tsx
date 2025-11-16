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

  const handleToggleAging = () => {
    if (isAging) {
      stopAging();
    } else {
      startAging();
    }
  };

  const handleSpeedChange = (speed: AgingSpeed) => {
    // Update the speed setting
    changeSpeed(speed);
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
            <Button
              variant="outline"
              size="lg"
              className="min-w-[140px] gap-3 border-2 transition-colors hover:border-accent"
            >
              <Gauge className="h-5 w-5" />
              <div className="flex flex-col items-start gap-0.5">
                <span className={`text-sm font-semibold ${speedColors[currentSpeed]}`}>
                  {speedLabels[currentSpeed]}
                </span>
                {speedDetails[currentSpeed] && (
                  <span className="text-[10px] font-medium text-muted-foreground">
                    {speedDetails[currentSpeed]}
                  </span>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel className="text-xs">Select Aging Speed</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleSpeedChange('slow')}
              className={currentSpeed === 'slow' ? 'bg-accent' : ''}
            >
              <span className={`${speedColors.slow} font-medium`}>
                {currentSpeed === 'slow' ? '● ' : '  '}Slow
              </span>
              <span className="ml-auto text-xs text-zinc-500">1 day/10s</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSpeedChange('normal')}
              className={currentSpeed === 'normal' ? 'bg-accent' : ''}
            >
              <span className={`${speedColors.normal} font-medium`}>
                {currentSpeed === 'normal' ? '● ' : '  '}Normal
              </span>
              <span className="ml-auto text-xs text-zinc-500">1 day/5s</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSpeedChange('fast')}
              className={currentSpeed === 'fast' ? 'bg-accent' : ''}
            >
              <span className={`${speedColors.fast} font-medium`}>
                {currentSpeed === 'fast' ? '● ' : '  '}Fast
              </span>
              <span className="ml-auto text-xs text-zinc-500">1 day/2.5s</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSpeedChange('very-fast')}
              className={currentSpeed === 'very-fast' ? 'bg-accent' : ''}
            >
              <span className={`${speedColors['very-fast']} font-medium`}>
                {currentSpeed === 'very-fast' ? '● ' : '  '}Very Fast
              </span>
              <span className="ml-auto text-xs text-zinc-500">1 day/s</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
