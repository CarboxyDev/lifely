'use client';

import { useAtom } from 'jotai';
import { userAtom, moneyAtom, bankAtom, netWorthAtom, calendarAtom } from '@/lib/atoms/game-state';
import { formatCurrency, formatAge } from '@/lib/utils/game-utils';
import { Settings, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { SettingsDialog } from './dialogs/SettingsDialog';
import { formatDate } from '@/lib/utils/calendar-system';

export function TopBar() {
  const [user] = useAtom(userAtom);
  const [money] = useAtom(moneyAtom);
  const [bank] = useAtom(bankAtom);
  const [netWorth] = useAtom(netWorthAtom);
  const [calendar] = useAtom(calendarAtom);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <div className="border-b border-border bg-card/50 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          {/* Left - User Info */}
          <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <User className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">{user.name}</div>
              <div className="text-xs text-muted-foreground">
                Age {calendar.ageInYears} • {formatDate(calendar.currentDate, 'short')}
              </div>
            </div>
            <div className="ml-2 flex items-center gap-1.5 rounded-md bg-zinc-900/50 px-2 py-1">
              <Calendar className="h-3 w-3 text-zinc-500" />
              <span className="text-xs text-zinc-400">{calendar.season}</span>
            </div>
          </div>

          {/* Right - Money Stats & Settings */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Cash</div>
                <div className="font-semibold text-emerald-400">{formatCurrency(money)}</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <div className="text-xs text-muted-foreground">Net Worth</div>
                <div className="font-semibold text-card-foreground">{formatCurrency(netWorth)}</div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSettingsOpen(true)}
              className="h-9 w-9 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
