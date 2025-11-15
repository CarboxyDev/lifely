'use client';

import { TopBar } from './TopBar';
import { StatsCards } from './StatsCards';
import { ActivityFeed } from './ActivityFeed';
import { QuickActions } from './QuickActions';
import { AgeButton } from './AgeButton';

export function GameLayout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Top Navigation Bar */}
      <TopBar />

      {/* Main Content Grid */}
      <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column - Stats */}
          <div className="space-y-6 lg:col-span-4">
            <StatsCards />
          </div>

          {/* Center Column - Activity Feed */}
          <div className="space-y-6 lg:col-span-5">
            <ActivityFeed />
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6 lg:col-span-3">
            <QuickActions />
          </div>
        </div>

        {/* Floating Age Button */}
        <AgeButton />
      </div>
    </div>
  );
}
