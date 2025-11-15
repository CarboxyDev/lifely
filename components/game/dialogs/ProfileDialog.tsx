'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAtom } from 'jotai';
import { userAtom, netWorthAtom, moneyAtom, bankAtom } from '@/lib/atoms/game-state';
import { formatCurrency, formatAge } from '@/lib/utils/game-utils';
import { Separator } from '@/components/ui/separator';

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const [user] = useAtom(userAtom);
  const [netWorth] = useAtom(netWorthAtom);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-zinc-800 bg-zinc-950">
        <DialogHeader>
          <DialogTitle className="text-2xl">Your Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-zinc-500">Name</div>
              <div className="font-semibold">{user.name}</div>
            </div>
            <div>
              <div className="text-sm text-zinc-500">Age</div>
              <div className="font-semibold">{formatAge(user.age)}</div>
            </div>
            <div>
              <div className="text-sm text-zinc-500">Country</div>
              <div className="font-semibold">{user.country}</div>
            </div>
            <div>
              <div className="text-sm text-zinc-500">Occupation</div>
              <div className="font-semibold">{user.job.name}</div>
            </div>
          </div>

          <Separator className="bg-zinc-800" />

          <div>
            <div className="text-sm text-zinc-500">Net Worth</div>
            <div className="text-2xl font-bold text-green-400">
              {formatCurrency(netWorth)}
            </div>
          </div>

          <div>
            <div className="text-sm text-zinc-500">Total Assets</div>
            <div className="font-semibold">{user.assets.length}</div>
          </div>

          {user.job.name !== 'Unemployed' && (
            <>
              <Separator className="bg-zinc-800" />
              <div>
                <div className="mb-2 text-sm font-semibold text-zinc-300">Job Details</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-zinc-500">Monthly Salary</div>
                    <div className="font-semibold">{formatCurrency(user.job.salary)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">Duration</div>
                    <div className="font-semibold">{user.job.duration} months</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">Promotions</div>
                    <div className="font-semibold">{user.job.promotions}</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
