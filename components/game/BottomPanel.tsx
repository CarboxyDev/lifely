'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAtom } from 'jotai';
import { alertCountAtom } from '@/lib/atoms/game-state';
import { Rocket, Zap, AlertTriangle, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ActionsDialog } from './dialogs/ActionsDialog';
import { ActivitiesDialog } from './dialogs/ActivitiesDialog';
import { SettingsDialog } from './dialogs/SettingsDialog';
import { AgeUpButton } from './AgeUpButton';

export function BottomPanel() {
  const [alertCount] = useAtom(alertCountAtom);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <div className="border-t border-zinc-800 bg-zinc-950/50 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          {/* Left Section */}
          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setActionsOpen(true)}
                className="bg-zinc-800 hover:bg-zinc-700"
              >
                <Rocket className="mr-2 h-4 w-4" />
                Actions
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setActivitiesOpen(true)}
                className="bg-zinc-800 hover:bg-zinc-700"
              >
                Activities
                <Zap className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          {/* Center Section - Age Up Button */}
          <AgeUpButton />

          {/* Right Section */}
          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="destructive" className="relative">
                <AlertTriangle className="mr-2 h-4 w-4" />
                {alertCount > 0 && (
                  <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs">
                    {alertCount}
                  </Badge>
                )}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSettingsOpen(true)}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <ActionsDialog open={actionsOpen} onOpenChange={setActionsOpen} />
      <ActivitiesDialog open={activitiesOpen} onOpenChange={setActivitiesOpen} />
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
