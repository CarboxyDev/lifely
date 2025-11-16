'use client';

import { useState, useEffect } from 'react';
import { TopBar } from './TopBar';
import { StatsCards } from './StatsCards';
import { UserInfoCard } from './UserInfoCard';
import { ActivityFeed } from './ActivityFeed';
import { QuickActions } from './QuickActions';
import { AgingControls } from './AgingControls';
import { PerksPanel } from './PerksPanel';
import { InteractiveEventDialog } from './dialogs/InteractiveEventDialog';
import { useAutoAging } from '@/lib/hooks/use-auto-aging';

export function GameLayout() {
  const { currentEvent, resolveEvent } = useAutoAging();
  const [showEventDialog, setShowEventDialog] = useState(false);

  useEffect(() => {
    if (currentEvent) {
      setShowEventDialog(true);
    }
  }, [currentEvent]);

  const handleEventClose = () => {
    setShowEventDialog(false);
    resolveEvent();
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Top Navigation Bar */}
      <TopBar />

      {/* Main Content Grid - takes remaining height */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 overflow-hidden px-6 py-6">
        <div className="grid w-full gap-6 lg:grid-cols-12">
          {/* Left Column - Stats & Core Info (Compact) */}
          <div className="space-y-4 lg:col-span-3">
            <StatsCards />
            <UserInfoCard />
          </div>

          {/* Center Column - Activity Feed (More prominent) */}
          <div className="lg:col-span-6">
            <ActivityFeed />
          </div>

          {/* Right Column - Quick Actions & Perks */}
          <div className="space-y-4 lg:col-span-3 overflow-y-auto">
            <QuickActions />
            <PerksPanel />
          </div>
        </div>
      </div>

      {/* Aging Controls - Bottom Center */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 transform">
        <AgingControls />
      </div>

      {/* Interactive Event Dialog */}
      <InteractiveEventDialog
        event={currentEvent}
        isOpen={showEventDialog}
        onClose={handleEventClose}
      />
    </div>
  );
}
