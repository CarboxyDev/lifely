'use client';

import { useAtom } from 'jotai';
import { moneyAtom, bankAtom, netWorthAtom, calendarAtom } from '@/lib/atoms/game-state';
import { formatCurrency } from '@/lib/utils/game-utils';
import { Settings, Calendar, Wallet, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { SettingsDialog } from './dialogs/SettingsDialog';
import { formatDate } from '@/lib/utils/calendar-system';

export function TopBar() {
  const [money] = useAtom(moneyAtom);
  const [bank] = useAtom(bankAtom);
  const [netWorth] = useAtom(netWorthAtom);
  const [calendar] = useAtom(calendarAtom);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <div className="border-b border-border bg-card/50 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Left - Current Date (Prominent) */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
              <Calendar className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Today</div>
              <div className="text-lg font-bold text-foreground">{formatDate(calendar.currentDate, 'short')}</div>
            </div>
          </div>

          {/* Right - Financial Stats & Settings */}
          <div className="flex items-center gap-4">
            {/* Cash */}
            <div className="flex items-center gap-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5">
              <Wallet className="h-5 w-5 text-emerald-400" />
              <div>
                <div className="text-[10px] uppercase tracking-wide text-emerald-300/60">Cash</div>
                <div className="text-base font-bold text-emerald-400">{formatCurrency(money)}</div>
              </div>
            </div>

            {/* Net Worth */}
            <div className="flex items-center gap-3 rounded-xl bg-blue-500/10 border border-blue-500/20 px-4 py-2.5">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              <div>
                <div className="text-[10px] uppercase tracking-wide text-blue-300/60">Net Worth</div>
                <div className="text-base font-bold text-blue-400">{formatCurrency(netWorth)}</div>
              </div>
            </div>

            {/* Settings */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSettingsOpen(true)}
              className="h-11 w-11 cursor-pointer rounded-xl text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
