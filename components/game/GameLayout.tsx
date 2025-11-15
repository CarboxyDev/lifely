'use client';

import { TopPanel } from './TopPanel';
import { Console } from './Console';
import { StatsPanel } from './StatsPanel';
import { BottomPanel } from './BottomPanel';

export function GameLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Top Panel - Money & Age */}
      <TopPanel />

      {/* Main Content */}
      <div className="flex flex-1 flex-col gap-4 p-4 lg:flex-row">
        {/* Console - Main Game Feed */}
        <div className="flex-1">
          <Console />
        </div>

        {/* Stats Sidebar */}
        <div className="w-full lg:w-80">
          <StatsPanel />
        </div>
      </div>

      {/* Bottom Panel - Action Buttons */}
      <BottomPanel />
    </div>
  );
}
