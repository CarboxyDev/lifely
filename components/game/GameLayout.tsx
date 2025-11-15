'use client';

import { TopBar } from './TopBar';
import { StatsCards } from './StatsCards';
import { ActivityFeed } from './ActivityFeed';
import { QuickActions } from './QuickActions';
import { AgeButton } from './AgeButton';

export function GameLayout() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Top Navigation Bar */}
      <TopBar />

      {/* Main Content Grid - takes remaining height */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 overflow-hidden px-6 py-6">
        <div className="grid w-full gap-6 lg:grid-cols-12">
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
      </div>

      {/* Floating Age Button */}
      <AgeButton />
    </div>
  );
}
