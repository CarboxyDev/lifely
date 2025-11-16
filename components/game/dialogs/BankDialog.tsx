'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAtom } from 'jotai';
import {
  moneyAtom,
  bankAtom,
  addConsoleMessageAtom,
  creditAtom,
  userAtom,
} from '@/lib/atoms/game-state';
import { formatCurrency } from '@/lib/utils/game-utils';
import { toast } from 'sonner';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Landmark, CreditCard, TrendingUp, DollarSign } from 'lucide-react';
import {
  loanOffers,
  calculateMonthlyPayment,
  calculateCreditScore,
  getCreditRating,
  getCreditScoreColor,
  getApprovedLoanAmount,
} from '@/lib/data/loans';
import type { Loan } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BankDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BankDialog({ open, onOpenChange }: BankDialogProps) {
  const [money, setMoney] = useAtom(moneyAtom);
  const [bank, setBank] = useAtom(bankAtom);
  const [credit, setCredit] = useAtom(creditAtom);
  const [user] = useAtom(userAtom);
  const [, addMessage] = useAtom(addConsoleMessageAtom);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [loanAmount, setLoanAmount] = useState('');

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

  const handleTakeLoan = (offerId: string) => {
    const offer = loanOffers.find((l) => l.type === offerId);
    if (!offer) return;

    const requestedAmount = parseInt(loanAmount);
    if (isNaN(requestedAmount) || requestedAmount < offer.minAmount) {
      toast.error(`Minimum loan amount is ${formatCurrency(offer.minAmount)}`);
      return;
    }

    if (credit.score < offer.minCreditScore) {
      toast.error(`Need credit score of ${offer.minCreditScore} (you have ${credit.score})`);
      return;
    }

    const approvedAmount = getApprovedLoanAmount(
      requestedAmount,
      credit.score,
      offer.maxAmount
    );

    if (approvedAmount < requestedAmount) {
      toast.info(`Approved for ${formatCurrency(approvedAmount)} instead`);
    }

    const monthlyPayment = calculateMonthlyPayment(
      approvedAmount,
      offer.interestRate,
      offer.termMonths
    );

    const newLoan: Loan = {
      id: `${Date.now()}-${Math.random()}`,
      type: offer.type,
      amount: approvedAmount,
      remainingBalance: approvedAmount,
      interestRate: offer.interestRate,
      monthlyPayment,
      monthsRemaining: offer.termMonths,
      monthsTaken: user.age,
      missedPayments: 0,
    };

    setCredit({
      ...credit,
      activeLoans: [...credit.activeLoans, newLoan],
      totalDebt: credit.totalDebt + approvedAmount,
    });

    setMoney(money + approvedAmount);
    addMessage(`Took out ${offer.name} of ${formatCurrency(approvedAmount)}`);
    toast.success('Loan approved!');
    setLoanAmount('');
  };

  const handlePayOffLoan = (loanId: string) => {
    const loan = credit.activeLoans.find((l) => l.id === loanId);
    if (!loan) return;

    if (money < loan.remainingBalance) {
      toast.error(`Need ${formatCurrency(loan.remainingBalance)} to pay off this loan`);
      return;
    }

    setMoney(money - loan.remainingBalance);
    setCredit({
      ...credit,
      activeLoans: credit.activeLoans.filter((l) => l.id !== loanId),
      loanHistory: [...credit.loanHistory, { ...loan, remainingBalance: 0 }],
      totalDebt: credit.totalDebt - loan.remainingBalance,
    });

    addMessage(`Paid off ${formatCurrency(loan.remainingBalance)} loan`);
    toast.success('Loan paid off!');
  };

  // Calculate updated credit score
  const accountAge = credit.activeLoans.length > 0
    ? Math.max(...credit.activeLoans.map((l) => user.age - l.monthsTaken))
    : 0;
  const calculatedScore = calculateCreditScore(
    credit.paymentHistory,
    credit.totalDebt,
    credit.activeLoans.length,
    accountAge
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl border-border bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Landmark className="h-6 w-6" />
            Bank & Credit
          </DialogTitle>
          <DialogDescription>Manage your finances and credit</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">

        <div className="space-y-6 py-4">
          {/* Account Overview */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="text-xs text-muted-foreground">Cash</div>
              <div className="text-xl font-bold text-foreground">
                {formatCurrency(money)}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="text-xs text-muted-foreground">Bank Balance</div>
              <div className="text-xl font-bold text-foreground">
                {formatCurrency(bank.balance)}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="text-xs text-muted-foreground">Credit Score</div>
              <div
                className="text-xl font-bold"
                style={{ color: getCreditScoreColor(calculatedScore) }}
              >
                {calculatedScore}
              </div>
              <div className="text-xs text-muted-foreground">
                {getCreditRating(calculatedScore)}
              </div>
            </div>
          </div>

          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="loans">Loans</TabsTrigger>
              <TabsTrigger value="credit">Credit</TabsTrigger>
            </TabsList>

            {/* Account Tab */}
            <TabsContent value="account" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Deposit */}
                <div className="space-y-3 rounded-lg border border-border bg-muted/20 p-4">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <DollarSign className="h-4 w-4" />
                    Deposit
                  </h3>
                  <div className="space-y-2">
                    <Label className="text-xs">Amount</Label>
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
                </div>

                {/* Withdraw */}
                <div className="space-y-3 rounded-lg border border-border bg-muted/20 p-4">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <TrendingUp className="h-4 w-4" />
                    Withdraw
                  </h3>
                  <div className="space-y-2">
                    <Label className="text-xs">Amount</Label>
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
                </div>
              </div>
            </TabsContent>

            {/* Loans Tab */}
            <TabsContent value="loans" className="space-y-4">
              {/* Active Loans */}
              {credit.activeLoans.length > 0 && (
                <>
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-foreground">Active Loans</h3>
                    <div className="space-y-2">
                      {credit.activeLoans.map((loan) => (
                        <div
                          key={loan.id}
                          className="rounded-lg border border-border bg-muted/30 p-3"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="font-medium text-foreground capitalize">
                                {loan.type} Loan
                              </div>
                              <div className="mt-1 grid grid-cols-3 gap-2 text-xs">
                                <div>
                                  <span className="text-muted-foreground">Balance:</span>{' '}
                                  <span className="font-medium text-foreground">
                                    {formatCurrency(loan.remainingBalance)}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Payment:</span>{' '}
                                  <span className="font-medium text-foreground">
                                    {formatCurrency(loan.monthlyPayment)}/mo
                                  </span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Rate:</span>{' '}
                                  <span className="font-medium text-foreground">
                                    {loan.interestRate}%
                                  </span>
                                </div>
                              </div>
                              <Progress
                                value={
                                  ((loan.amount - loan.remainingBalance) / loan.amount) * 100
                                }
                                className="mt-2 h-1.5"
                              />
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handlePayOffLoan(loan.id)}
                              disabled={money < loan.remainingBalance}
                              className="ml-3"
                            >
                              Pay Off
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                </>
              )}

              {/* Available Loans */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Apply for Loan</h3>
                <div className="grid grid-cols-2 gap-3">
                  {loanOffers.filter((offer) => offer.type !== 'mortgage').map((offer) => {
                    const meetsRequirement = calculatedScore >= offer.minCreditScore;

                    return (
                      <div
                        key={offer.type}
                        className="rounded-lg border border-border bg-muted/30 p-3"
                      >
                        <div className="font-medium text-foreground">{offer.name}</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {offer.description}
                        </div>

                        <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
                          <div>
                            <span className="text-muted-foreground">Range:</span>{' '}
                            <span className="font-medium text-foreground">
                              {formatCurrency(offer.minAmount)}-
                              {formatCurrency(offer.maxAmount)}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Rate:</span>{' '}
                            <span className="font-medium text-foreground">
                              {offer.interestRate}%
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Term:</span>{' '}
                            <span className="font-medium text-foreground">
                              {Math.floor(offer.termMonths / 12)}yr
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Min Score:</span>{' '}
                            <span
                              className="font-medium"
                              style={{
                                color: meetsRequirement ? '#10b981' : '#ef4444',
                              }}
                            >
                              {offer.minCreditScore}
                            </span>
                          </div>
                        </div>

                        {meetsRequirement && (
                          <div className="mt-3 space-y-2">
                            <Input
                              type="number"
                              placeholder="Loan amount"
                              value={loanAmount}
                              onChange={(e) => setLoanAmount(e.target.value)}
                              className="h-8 text-xs"
                            />
                            <Button
                              size="sm"
                              onClick={() => handleTakeLoan(offer.type)}
                              className="w-full"
                            >
                              Apply
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            {/* Credit Tab */}
            <TabsContent value="credit" className="space-y-4">
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold" style={{ color: getCreditScoreColor(calculatedScore) }}>
                      {calculatedScore}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {getCreditRating(calculatedScore)}
                    </div>
                  </div>
                  <CreditCard className="h-12 w-12 text-muted-foreground" />
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Debt</span>
                    <span className="font-medium text-foreground">
                      {formatCurrency(credit.totalDebt)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active Loans</span>
                    <span className="font-medium text-foreground">{credit.activeLoans.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Payment History</span>
                    <span className="font-medium text-foreground">
                      {credit.paymentHistory.length > 0
                        ? `${Math.round(
                            (credit.paymentHistory.filter((p) => p === 1).length /
                              credit.paymentHistory.length) *
                              100
                          )}% on-time`
                        : 'No history'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Account Age</span>
                    <span className="font-medium text-foreground">
                      {accountAge > 0 ? `${Math.floor(accountAge / 12)} years` : 'New'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Credit Score Tips */}
              <div className="rounded-lg border border-border bg-muted/20 p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">Improve Your Score</h3>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Make all loan payments on time</li>
                  <li>• Keep total debt under control</li>
                  <li>• Maintain a mix of credit types</li>
                  <li>• Build a longer credit history</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
