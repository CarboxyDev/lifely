'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { statsAtom, moneyAtom, bankAtom, addConsoleMessageAtom } from '@/lib/atoms/game-state';
import { randint, formatCurrency, hasSufficientFunds } from '@/lib/utils/game-utils';
import { toast } from 'sonner';
import { Dumbbell, Book, Hospital, Utensils, Plane, Dice6 } from 'lucide-react';

interface ActivitiesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ActivitiesDialog({ open, onOpenChange }: ActivitiesDialogProps) {
  const [stats, setStats] = useAtom(statsAtom);
  const [money, setMoney] = useAtom(moneyAtom);
  const [bank, setBank] = useAtom(bankAtom);
  const [, addMessage] = useAtom(addConsoleMessageAtom);

  const doActivity = (
    activityName: string,
    cost: number,
    statChanges: Partial<typeof stats>
  ) => {
    const funds = hasSufficientFunds(cost, money, bank.balance);
    if (!funds.sufficient) {
      toast.error('Not enough money');
      return;
    }

    if (funds.useBank) {
      setBank({ ...bank, balance: bank.balance - cost });
    } else {
      setMoney(money - cost);
    }

    setStats({ ...stats, ...statChanges });
    addMessage(`You ${activityName} for ${formatCurrency(cost)}`);
    toast.success(`${activityName} completed!`);
  };

  const activities = [
    {
      icon: <Dumbbell className="h-5 w-5" />,
      label: 'Go to Gym',
      description: 'Improve health and looks',
      color: 'from-red-500 to-pink-600',
      onClick: () => {
        const cost = randint(20, 100);
        doActivity('went to the gym', cost, {
          health: Math.min(100, stats.health + randint(1, 3)),
          looks: Math.min(100, stats.looks + randint(0, 2)),
        });
      },
    },
    {
      icon: <Book className="h-5 w-5" />,
      label: 'Visit Library',
      description: 'Increase intellect',
      color: 'from-blue-500 to-cyan-600',
      onClick: () => {
        const cost = randint(5, 40);
        doActivity('studied at the library', cost, {
          intellect: Math.min(100, stats.intellect + randint(1, 3)),
        });
      },
    },
    {
      icon: <Hospital className="h-5 w-5" />,
      label: 'Visit Hospital',
      description: 'Restore health',
      color: 'from-green-500 to-emerald-600',
      onClick: () => {
        const cost = randint(100, 300);
        doActivity('visited the hospital', cost, {
          health: Math.min(100, stats.health + randint(10, 20)),
        });
      },
    },
    {
      icon: <Utensils className="h-5 w-5" />,
      label: 'Eat at Restaurant',
      description: 'Boost morale',
      color: 'from-orange-500 to-red-600',
      onClick: () => {
        const cost = randint(30, 80);
        doActivity('ate at a restaurant', cost, {
          morale: Math.min(100, stats.morale + randint(3, 8)),
          health: Math.min(100, stats.health + randint(0, 2)),
        });
      },
    },
    {
      icon: <Plane className="h-5 w-5" />,
      label: 'Go on Vacation',
      description: 'Greatly boost morale',
      color: 'from-purple-500 to-pink-600',
      onClick: () => {
        const cost = randint(500, 1500);
        doActivity('went on vacation', cost, {
          morale: Math.min(100, stats.morale + randint(15, 25)),
        });
      },
    },
    {
      icon: <Dice6 className="h-5 w-5" />,
      label: 'Gamble',
      description: 'Risk it all',
      color: 'from-yellow-500 to-amber-600',
      onClick: () => {
        const cost = randint(50, 200);
        const won = randint(0, 1) === 1;
        if (won) {
          const winnings = cost * randint(2, 4);
          setMoney(money + winnings);
          addMessage(`You won ${formatCurrency(winnings)} gambling!`);
          toast.success(`Won ${formatCurrency(winnings)}!`);
        } else {
          if (money >= cost) {
            setMoney(money - cost);
            addMessage(`You lost ${formatCurrency(cost)} gambling`);
            toast.error(`Lost ${formatCurrency(cost)}`);
          } else {
            toast.error('Not enough money to gamble');
          }
        }
      },
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-zinc-800 bg-zinc-950">
        <DialogHeader>
          <DialogTitle className="text-2xl">Activities</DialogTitle>
          <DialogDescription>
            Spend time doing activities to improve your stats
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {activities.map((activity, index) => (
            <Button
              key={activity.label}
              onClick={activity.onClick}
              variant="outline"
              className="h-auto flex-col items-start gap-2 border-zinc-800 bg-zinc-900/50 p-4 hover:bg-zinc-800"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${activity.color}`}>
                {activity.icon}
              </div>
              <div className="text-left">
                <div className="font-semibold">{activity.label}</div>
                <div className="text-xs text-zinc-400">{activity.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
