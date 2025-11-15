'use client';

import { useAtom } from 'jotai';
import { userAtom, moneyAtom, bankAtom, netWorthAtom } from '@/lib/atoms/game-state';
import { formatCurrency, formatAge } from '@/lib/utils/game-utils';
import { Settings, TrendingUp, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { SettingsDialog } from './dialogs/SettingsDialog';

export function TopBar() {
  const [user] = useAtom(userAtom);
  const [money] = useAtom(moneyAtom);
  const [bank] = useAtom(bankAtom);
  const [netWorth] = useAtom(netWorthAtom);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          {/* Left - Branding & User Info */}
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                Lifely
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {user.name} • {formatAge(user.age)}
              </p>
            </div>
          </div>

          {/* Right - Money & Stats */}
          <div className="flex items-center gap-4">
            {/* Cash */}
            <div className="hidden items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 dark:bg-emerald-950/30 sm:flex">
              <Wallet className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <div className="text-right">
                <div className="text-xs text-emerald-700 dark:text-emerald-300">
                  Cash
                </div>
                <div className="font-semibold text-emerald-900 dark:text-emerald-100">
                  {formatCurrency(money)}
                </div>
              </div>
            </div>

            {/* Net Worth */}
            <div className="hidden items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 dark:bg-blue-950/30 md:flex">
              <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <div className="text-right">
                <div className="text-xs text-blue-700 dark:text-blue-300">
                  Net Worth
                </div>
                <div className="font-semibold text-blue-900 dark:text-blue-100">
                  {formatCurrency(netWorth)}
                </div>
              </div>
            </div>

            {/* Settings */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSettingsOpen(true)}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
