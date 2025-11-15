'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAtom } from 'jotai';
import { moneyAtom, bankAtom, addConsoleMessageAtom } from '@/lib/atoms/game-state';
import { formatCurrency } from '@/lib/utils/game-utils';
import { toast } from 'sonner';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BankDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BankDialog({ open, onOpenChange }: BankDialogProps) {
  const [money, setMoney] = useAtom(moneyAtom);
  const [bank, setBank] = useAtom(bankAtom);
  const [, addMessage] = useAtom(addConsoleMessageAtom);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleDeposit = () => {
    const amount = parseInt(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Invalid amount');
      return;
    }
    if (amount > money) {
      toast.error('Insufficient cash');
      return;
    }

    setMoney(money - amount);
    setBank({ ...bank, balance: bank.balance + amount });
    addMessage(`Deposited ${formatCurrency(amount)} to bank`);
    toast.success('Deposit successful');
    setDepositAmount('');
  };

  const handleWithdraw = () => {
    const amount = parseInt(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Invalid amount');
      return;
    }
    if (amount > bank.balance) {
      toast.error('Insufficient bank balance');
      return;
    }

    setMoney(money + amount);
    setBank({ ...bank, balance: bank.balance - amount });
    addMessage(`Withdrew ${formatCurrency(amount)} from bank`);
    toast.success('Withdrawal successful');
    setWithdrawAmount('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-zinc-800 bg-zinc-950">
        <DialogHeader>
          <DialogTitle className="text-2xl">Bank</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-zinc-900/50 p-4">
              <div className="text-sm text-zinc-500">Cash on Hand</div>
              <div className="text-xl font-bold text-green-400">
                {formatCurrency(money)}
              </div>
            </div>
            <div className="rounded-lg bg-zinc-900/50 p-4">
              <div className="text-sm text-zinc-500">Bank Balance</div>
              <div className="text-xl font-bold text-blue-400">
                {formatCurrency(bank.balance)}
              </div>
            </div>
          </div>

          <Tabs defaultValue="deposit">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="deposit">Deposit</TabsTrigger>
              <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            </TabsList>
            <TabsContent value="deposit" className="space-y-4">
              <div className="space-y-2">
                <Label>Amount to Deposit</Label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
              </div>
              <Button onClick={handleDeposit} className="w-full">
                Deposit
              </Button>
            </TabsContent>
            <TabsContent value="withdraw" className="space-y-4">
              <div className="space-y-2">
                <Label>Amount to Withdraw</Label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </div>
              <Button onClick={handleWithdraw} className="w-full">
                Withdraw
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
