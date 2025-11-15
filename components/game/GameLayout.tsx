'use client';

import { TopBar } from './TopBar';
import { StatsCards } from './StatsCards';
import { ActivityFeed } from './ActivityFeed';
import { QuickActions } from './QuickActions';
import { AgeButton } from './AgeButton';

export function GameLayout() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Top Navigation Bar */}
      <TopBar />

      {/* Main Content Grid */}
      <div className="mx-auto max-w-7xl p-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column - Stats (Compact) */}
          <div className="lg:col-span-3">
            <StatsCards />
          </div>

          {/* Center Column - Activity Feed (More prominent) */}
          <div className="lg:col-span-6">
            <ActivityFeed />
          </div>

          {/* Right Column - Quick Actions */}
          <div className="lg:col-span-3">
            <QuickActions />
          </div>
        </div>

        {/* Floating Age Button */}
        <AgeButton />
      </div>
    </div>
  );
}
