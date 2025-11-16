'use client';

import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { SettingsDialog } from './dialogs/SettingsDialog';

export function TopBar() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <div className="border-b border-border bg-card/30 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          {/* Left - Branding */}
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold tracking-tight text-foreground">
              Lifely
            </div>
            <div className="text-xs text-muted-foreground">Life Simulator</div>
          </div>

          {/* Right - Settings */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSettingsOpen(true)}
            className="h-8 w-8 cursor-pointer text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
