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
  investmentsAtom,
  addConsoleMessageAtom,
  userAtom,
} from '@/lib/atoms/game-state';
import { formatCurrency } from '@/lib/utils/game-utils';
import { toast } from 'sonner';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, PiggyBank, Wallet, BarChart3 } from 'lucide-react';
import {
  investmentOptions,
  calculateTotalReturn,
  getReturnColor,
  getRiskColor,
  investmentTypeIcons,
  calculateRetirementProjection,
} from '@/lib/data/investments';
import type { Investment } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

interface InvestmentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvestmentsDialog({ open, onOpenChange }: InvestmentsDialogProps) {
  const [money, setMoney] = useAtom(moneyAtom);
  const [investments, setInvestments] = useAtom(investmentsAtom);
  const [user] = useAtom(userAtom);
  const [, addMessage] = useAtom(addConsoleMessageAtom);
  const [buyAmount, setBuyAmount] = useState('');
  const [retirementContribution, setRetirementContribution] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');

  const handleBuyInvestment = (optionId: string) => {
    const option = investmentOptions.find((o) => o.id === optionId);
    if (!option) return;

    const amount = parseInt(buyAmount);
    if (isNaN(amount) || amount < option.minInvestment) {
      toast.error(`Minimum investment is ${formatCurrency(option.minInvestment)}`);
      return;
    }

    if (money < amount) {
      toast.error('Insufficient funds');
      return;
    }

    // Create new investment or add to existing
    const existingInvestment = investments.portfolio.find(
      (inv) => inv.type === option.type && inv.name === option.name
    );

    if (existingInvestment) {
      // Add to existing investment
      const totalShares = existingInvestment.shares + amount;
      const avgPrice =
        (existingInvestment.purchasePrice * existingInvestment.shares + amount * 100) /
        totalShares;

      const updatedInvestment: Investment = {
        ...existingInvestment,
        shares: totalShares,
        purchasePrice: Math.round(avgPrice * 100) / 100,
        totalInvested: existingInvestment.totalInvested + amount,
      };

      setInvestments({
        ...investments,
        portfolio: investments.portfolio.map((inv) =>
          inv.id === existingInvestment.id ? updatedInvestment : inv
        ),
        totalInvested: investments.totalInvested + amount,
      });
    } else {
      // Create new investment
      const newInvestment: Investment = {
        id: `${Date.now()}-${Math.random()}`,
        type: option.type,
        name: option.name,
        shares: amount,
        purchasePrice: 100, // Starting price per share
        currentPrice: 100,
        monthsHeld: 0,
        totalInvested: amount,
      };

      setInvestments({
        ...investments,
        portfolio: [...investments.portfolio, newInvestment],
        totalInvested: investments.totalInvested + amount,
      });
    }

    setMoney(money - amount);
    addMessage(`Invested ${formatCurrency(amount)} in ${option.name}`);
    toast.success('Investment purchased!');
    setBuyAmount('');
  };

  const handleSellInvestment = (investmentId: string) => {
    const investment = investments.portfolio.find((inv) => inv.id === investmentId);
    if (!investment) return;

    const currentValue = Math.round((investment.shares / 100) * investment.currentPrice);
    setMoney(money + currentValue);

    setInvestments({
      ...investments,
      portfolio: investments.portfolio.filter((inv) => inv.id !== investmentId),
      totalInvested: investments.totalInvested - investment.totalInvested,
    });

    const returns = calculateTotalReturn(investment.totalInvested, currentValue);
    addMessage(
      `Sold ${investment.name} for ${formatCurrency(currentValue)} (${returns.percentage > 0 ? '+' : ''}${returns.percentage}%)`
    );
    toast.success('Investment sold!');
  };

  const handleContributeRetirement = () => {
    const amount = parseInt(retirementContribution);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Invalid amount');
      return;
    }

    if (money < amount) {
      toast.error('Insufficient funds');
      return;
    }

    setMoney(money - amount);
    setInvestments({
      ...investments,
      retirementFund: investments.retirementFund + amount,
    });

    addMessage(`Contributed ${formatCurrency(amount)} to retirement fund`);
    toast.success('Retirement contribution made!');
    setRetirementContribution('');
  };

  const handleSetMonthlyContribution = () => {
    const amount = parseInt(monthlyContribution);
    if (isNaN(amount) || amount < 0) {
      toast.error('Invalid amount');
      return;
    }

    setInvestments({
      ...investments,
      monthlyContribution: amount,
    });

    addMessage(`Set automatic monthly contribution to ${formatCurrency(amount)}`);
    toast.success('Automatic contribution updated!');
  };

  // Calculate total portfolio value
  const totalPortfolioValue = investments.portfolio.reduce((sum, inv) => {
    return sum + Math.round((inv.shares / 100) * inv.currentPrice);
  }, 0);

  const portfolioReturns = calculateTotalReturn(investments.totalInvested, totalPortfolioValue);

  // Retirement projection
  const retirementAge = 65 * 12; // 65 years in months
  const projection = calculateRetirementProjection(
    user.age,
    retirementAge,
    investments.retirementFund,
    investments.monthlyContribution
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl border-border bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <TrendingUp className="h-6 w-6" />
            Investments
          </DialogTitle>
          <DialogDescription>Build your wealth through investing</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">

        <div className="space-y-6 py-4">
          {/* Overview */}
          <div className="grid grid-cols-4 gap-3">
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="text-xs text-muted-foreground">Portfolio Value</div>
              <div className="text-lg font-bold text-foreground">
                {formatCurrency(totalPortfolioValue)}
              </div>
              <div
                className="text-xs font-medium"
                style={{ color: getReturnColor(portfolioReturns.percentage) }}
              >
                {portfolioReturns.percentage > 0 ? '+' : ''}
                {portfolioReturns.percentage}%
              </div>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="text-xs text-muted-foreground">Total Invested</div>
              <div className="text-lg font-bold text-foreground">
                {formatCurrency(investments.totalInvested)}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="text-xs text-muted-foreground">Retirement Fund</div>
              <div className="text-lg font-bold text-foreground">
                {formatCurrency(investments.retirementFund)}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="text-xs text-muted-foreground">Monthly Auto</div>
              <div className="text-lg font-bold text-foreground">
                {formatCurrency(investments.monthlyContribution)}
              </div>
            </div>
          </div>

          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="buy">Buy</TabsTrigger>
              <TabsTrigger value="retirement">Retirement</TabsTrigger>
            </TabsList>

            {/* Portfolio Tab */}
            <TabsContent value="portfolio" className="space-y-4">
              {investments.portfolio.length > 0 ? (
                <div className="space-y-2">
                  {investments.portfolio.map((investment) => {
                    const currentValue = Math.round(
                      (investment.shares / 100) * investment.currentPrice
                    );
                    const returns = calculateTotalReturn(investment.totalInvested, currentValue);

                    return (
                      <div
                        key={investment.id}
                        className="rounded-lg border border-border bg-muted/30 p-3"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">
                                {investmentTypeIcons[investment.type]}
                              </span>
                              <div className="font-medium text-foreground">
                                {investment.name}
                              </div>
                            </div>

                            <div className="mt-2 grid grid-cols-4 gap-2 text-xs">
                              <div>
                                <span className="text-muted-foreground">Value:</span>{' '}
                                <span className="font-medium text-foreground">
                                  {formatCurrency(currentValue)}
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Invested:</span>{' '}
                                <span className="font-medium text-foreground">
                                  {formatCurrency(investment.totalInvested)}
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Return:</span>{' '}
                                <span
                                  className="font-medium"
                                  style={{ color: getReturnColor(returns.percentage) }}
                                >
                                  {returns.percentage > 0 ? '+' : ''}
                                  {returns.percentage}%
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Held:</span>{' '}
                                <span className="font-medium text-foreground">
                                  {Math.floor(investment.monthsHeld / 12)}y{' '}
                                  {investment.monthsHeld % 12}m
                                </span>
                              </div>
                            </div>

                            <Progress
                              value={Math.min(100, ((currentValue / investment.totalInvested) - 1) * 100 + 100)}
                              className="mt-2 h-1.5"
                            />
                          </div>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSellInvestment(investment.id)}
                            className="ml-3"
                          >
                            Sell
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-lg border border-border bg-muted/20 p-8 text-center">
                  <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-3 text-sm font-medium text-foreground">
                    No investments yet
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Start building your portfolio in the Buy tab
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Buy Tab */}
            <TabsContent value="buy" className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {investmentOptions.map((option) => (
                  <div
                    key={option.id}
                    className="rounded-lg border border-border bg-muted/30 p-3"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-2xl">{investmentTypeIcons[option.type]}</span>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{option.name}</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {option.description}
                        </div>

                        <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
                          <div>
                            <span className="text-muted-foreground">Min:</span>{' '}
                            <span className="font-medium text-foreground">
                              {formatCurrency(option.minInvestment)}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Avg Return:</span>{' '}
                            <span className="font-medium text-foreground">
                              {option.avgReturn}%/yr
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Risk:</span>{' '}
                            <span
                              className="font-medium"
                              style={{ color: getRiskColor(option.riskLevel) }}
                            >
                              {option.riskLevel}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Volatility:</span>{' '}
                            <span className="font-medium text-foreground">
                              {option.volatility}/10
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 space-y-2">
                          <Input
                            type="number"
                            placeholder="Amount"
                            value={buyAmount}
                            onChange={(e) => setBuyAmount(e.target.value)}
                            className="h-8 text-xs"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleBuyInvestment(option.id)}
                            disabled={money < option.minInvestment}
                            className="w-full"
                          >
                            Buy
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Retirement Tab */}
            <TabsContent value="retirement" className="space-y-4">
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold text-foreground">Retirement Fund</h3>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {formatCurrency(investments.retirementFund)}
                    </div>
                    <div className="text-xs text-muted-foreground">Current Balance</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {formatCurrency(projection.finalAmount)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Projected at Age 65
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs text-muted-foreground">
                  {projection.monthsToRetirement > 0
                    ? `${Math.floor(projection.monthsToRetirement / 12)} years until retirement`
                    : 'Retirement age reached'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* One-time Contribution */}
                <div className="space-y-3 rounded-lg border border-border bg-muted/20 p-4">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Wallet className="h-4 w-4" />
                    One-Time Contribution
                  </h3>
                  <div className="space-y-2">
                    <Label className="text-xs">Amount</Label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={retirementContribution}
                      onChange={(e) => setRetirementContribution(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleContributeRetirement}
                    className="w-full"
                    disabled={money < 100}
                  >
                    Contribute
                  </Button>
                </div>

                {/* Monthly Auto-Contribution */}
                <div className="space-y-3 rounded-lg border border-border bg-muted/20 p-4">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <TrendingUp className="h-4 w-4" />
                    Monthly Auto-Contribute
                  </h3>
                  <div className="space-y-2">
                    <Label className="text-xs">Amount per month</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleSetMonthlyContribution} className="w-full">
                    Set Auto-Contribute
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-muted/20 p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  Retirement Planning Tips
                </h3>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Start saving early to maximize compound growth</li>
                  <li>• Aim to save 15-20% of your income for retirement</li>
                  <li>• Retirement funds grow at an average of 7% per year</li>
                  <li>• Consider your expected retirement age (typically 65)</li>
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
