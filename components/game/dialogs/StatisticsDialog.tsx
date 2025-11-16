'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAtom } from 'jotai';
import {
  userAtom,
  statsAtom,
  moneyAtom,
  bankAtom,
  investmentsAtom,
  creditAtom,
  relationshipsAtom,
  skillsAtom,
  housingAtom,
  vehiclesAtom,
  achievementsAtom,
  healthAtom,
} from '@/lib/atoms/game-state';
import { formatCurrency, formatAge } from '@/lib/utils/game-utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  Briefcase,
  GraduationCap,
  Users,
  TrendingUp,
  Trophy,
  Heart,
  Home
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface StatisticsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StatisticsDialog({ open, onOpenChange }: StatisticsDialogProps) {
  const [user] = useAtom(userAtom);
  const [stats] = useAtom(statsAtom);
  const [money] = useAtom(moneyAtom);
  const [bank] = useAtom(bankAtom);
  const [investments] = useAtom(investmentsAtom);
  const [credit] = useAtom(creditAtom);
  const [relationships] = useAtom(relationshipsAtom);
  const [skills] = useAtom(skillsAtom);
  const [housing] = useAtom(housingAtom);
  const [vehicles] = useAtom(vehiclesAtom);
  const [achievements] = useAtom(achievementsAtom);
  const [health] = useAtom(healthAtom);

  // Calculate net worth
  const propertyValue = housing.currentProperty?.price || 0;
  const vehicleValue = vehicles.currentVehicle?.currentValue || 0;
  const portfolioValue = investments.portfolio.reduce((sum, inv) => {
    return sum + Math.round((inv.shares / 100) * inv.currentPrice);
  }, 0);
  const totalAssets = money + bank.balance + propertyValue + vehicleValue + portfolioValue + investments.retirementFund;
  const totalLiabilities = credit.totalDebt;
  const netWorth = totalAssets - totalLiabilities;

  // Calculate various stats
  const yearsAlive = Math.floor(user.age / 12);
  const monthsAlive = user.age % 12;
  const friendCount = relationships.relationships.filter((r) => r.type === 'friend').length;
  const avgSkillLevel = skills.skills.length > 0
    ? Math.round(skills.skills.reduce((sum, s) => sum + s.level, 0) / skills.skills.length)
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl border-border bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <BarChart3 className="h-6 w-6" />
            Life Statistics
          </DialogTitle>
          <DialogDescription>
            Comprehensive overview of your life journey
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Overview Cards */}
          <div className="grid grid-cols-4 gap-3">
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="text-xs text-muted-foreground">Age</div>
              <div className="text-lg font-bold text-foreground">
                {yearsAlive}y {monthsAlive}m
              </div>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="text-xs text-muted-foreground">Net Worth</div>
              <div className="text-lg font-bold text-foreground">
                {formatCurrency(netWorth)}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="text-xs text-muted-foreground">Achievements</div>
              <div className="text-lg font-bold text-foreground">
                {achievements.unlocked.length}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="text-xs text-muted-foreground">Achievement Points</div>
              <div className="text-lg font-bold text-foreground">
                {achievements.totalPoints}
              </div>
            </div>
          </div>

          <Tabs defaultValue="financial" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="career">Career</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            {/* Financial Tab */}
            <TabsContent value="financial" className="space-y-4">
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <TrendingUp className="h-4 w-4" />
                  Net Worth Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cash</span>
                    <span className="font-medium text-foreground">{formatCurrency(money)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bank Balance</span>
                    <span className="font-medium text-foreground">{formatCurrency(bank.balance)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Investment Portfolio</span>
                    <span className="font-medium text-foreground">{formatCurrency(portfolioValue)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Retirement Fund</span>
                    <span className="font-medium text-foreground">{formatCurrency(investments.retirementFund)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Property Value</span>
                    <span className="font-medium text-foreground">{formatCurrency(propertyValue)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Vehicle Value</span>
                    <span className="font-medium text-foreground">{formatCurrency(vehicleValue)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-foreground">Total Assets</span>
                    <span className="font-bold text-foreground">{formatCurrency(totalAssets)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-destructive">Total Debt</span>
                    <span className="font-bold text-destructive">-{formatCurrency(totalLiabilities)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-bold text-foreground">Net Worth</span>
                    <span className="text-xl font-bold text-foreground">{formatCurrency(netWorth)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <div className="text-xs text-muted-foreground">Credit Score</div>
                  <div className="text-2xl font-bold text-foreground">{credit.score}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {credit.activeLoans.length} active loans
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <div className="text-xs text-muted-foreground">Investments</div>
                  <div className="text-2xl font-bold text-foreground">{investments.portfolio.length}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Total invested: {formatCurrency(investments.totalInvested)}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Career Tab */}
            <TabsContent value="career" className="space-y-4">
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Briefcase className="h-4 w-4" />
                  Career Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current Job</span>
                    <span className="font-medium text-foreground">{user.job.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Salary</span>
                    <span className="font-medium text-foreground">{formatCurrency(user.job.salary)}/month</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time in Current Job</span>
                    <span className="font-medium text-foreground">
                      {Math.floor(user.job.duration / 12)}y {user.job.duration % 12}m
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Promotions</span>
                    <span className="font-medium text-foreground">{user.job.promotions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Previous Jobs</span>
                    <span className="font-medium text-foreground">{user.job.previousJobs.length}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <GraduationCap className="h-4 w-4" />
                  Education
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Degrees Earned</span>
                    <span className="font-medium text-foreground">{user.education.degrees.length}</span>
                  </div>
                  {user.education.degrees.length > 0 && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        {user.education.degrees.map((degree, index) => (
                          <div key={index} className="rounded border border-border bg-muted/20 p-2 text-xs">
                            <div className="font-medium text-foreground">{degree.major || degree.level}</div>
                            <div className="text-muted-foreground">
                              {degree.institution} • {degree.graduationYear} • GPA: {degree.gpa.toFixed(2)}
                              {degree.honors && ` • ${degree.honors}`}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Skills</h3>
                <div className="space-y-2">
                  {skills.skills.length > 0 ? (
                    skills.skills.slice(0, 5).map((skill) => (
                      <div key={skill.id} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-foreground">{skill.name}</span>
                          <span className="text-muted-foreground">Level {skill.level}</span>
                        </div>
                        <Progress value={skill.level} className="h-1.5" />
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-xs text-muted-foreground py-4">
                      No skills learned yet
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Social Tab */}
            <TabsContent value="social" className="space-y-4">
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Users className="h-4 w-4" />
                  Relationships
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="rounded-lg border border-border bg-muted/20 p-3">
                    <div className="text-xs text-muted-foreground">Total Relationships</div>
                    <div className="text-2xl font-bold text-foreground">{relationships.relationships.length}</div>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/20 p-3">
                    <div className="text-xs text-muted-foreground">Friends</div>
                    <div className="text-2xl font-bold text-foreground">{friendCount}</div>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/20 p-3">
                    <div className="text-xs text-muted-foreground">Children</div>
                    <div className="text-2xl font-bold text-foreground">{relationships.children}</div>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/20 p-3">
                    <div className="text-xs text-muted-foreground">Marital Status</div>
                    <div className="text-lg font-bold text-foreground">
                      {relationships.hasSpouse ? 'Married' : 'Single'}
                    </div>
                  </div>
                </div>

                {relationships.relationships.length > 0 && (
                  <>
                    <Separator className="my-3" />
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-foreground mb-2">Relationship Quality</div>
                      {relationships.relationships.slice(0, 5).map((rel) => (
                        <div key={rel.id} className="flex items-center justify-between text-xs">
                          <span className="text-foreground">{rel.name} ({rel.type})</span>
                          <div className="flex items-center gap-2">
                            <Progress value={rel.quality} className="h-1.5 w-20" />
                            <span className="text-muted-foreground w-8">{rel.quality}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </TabsContent>

            {/* Personal Tab */}
            <TabsContent value="personal" className="space-y-4">
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Heart className="h-4 w-4" />
                  Health & Wellbeing
                </h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-foreground">Physical Health</span>
                      <span className="text-muted-foreground">{stats.health}</span>
                    </div>
                    <Progress value={stats.health} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-foreground">Mental Health</span>
                      <span className="text-muted-foreground">{health.mentalHealth}</span>
                    </div>
                    <Progress value={health.mentalHealth} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-foreground">Fitness Level</span>
                      <span className="text-muted-foreground">{health.fitnessLevel}</span>
                    </div>
                    <Progress value={health.fitnessLevel} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-foreground">Morale</span>
                      <span className="text-muted-foreground">{stats.morale}</span>
                    </div>
                    <Progress value={stats.morale} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-foreground">Intellect</span>
                      <span className="text-muted-foreground">{stats.intellect}</span>
                    </div>
                    <Progress value={stats.intellect} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-foreground">Looks</span>
                      <span className="text-muted-foreground">{stats.looks}</span>
                    </div>
                    <Progress value={stats.looks} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Home className="h-4 w-4" />
                  Possessions
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Housing</span>
                    <span className="font-medium text-foreground">
                      {housing.currentProperty
                        ? `${housing.currentProperty.name}`
                        : housing.isRenting
                          ? 'Renting'
                          : 'Homeless'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vehicle</span>
                    <span className="font-medium text-foreground">
                      {vehicles.currentVehicle ? vehicles.currentVehicle.name : 'None'}
                    </span>
                  </div>
                  {vehicles.totalMilesDriven > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Miles Driven</span>
                      <span className="font-medium text-foreground">
                        {vehicles.totalMilesDriven.toLocaleString()} mi
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-4">
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Trophy className="h-4 w-4" />
                  Achievement Progress
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-lg border border-border bg-muted/20 p-3">
                    <div className="text-xs text-muted-foreground">Unlocked</div>
                    <div className="text-2xl font-bold text-foreground">{achievements.unlocked.length}</div>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/20 p-3">
                    <div className="text-xs text-muted-foreground">Total Points</div>
                    <div className="text-2xl font-bold text-foreground">{achievements.totalPoints}</div>
                  </div>
                </div>

                {achievements.unlocked.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-foreground mb-2">Recent Achievements</div>
                    {achievements.unlocked.slice(-10).reverse().map((achievement) => (
                      <div key={achievement.id} className="rounded border border-border bg-muted/20 p-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{achievement.icon}</span>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-foreground">{achievement.name}</div>
                            <div className="text-xs text-muted-foreground">{achievement.description}</div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatAge(achievement.unlockedAt)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
