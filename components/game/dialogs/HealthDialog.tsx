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
import {
  healthAtom,
  statsAtom,
  moneyAtom,
  addConsoleMessageAtom,
} from '@/lib/atoms/game-state';
import { Heart, Shield, Stethoscope, Activity as ActivityIcon } from 'lucide-react';
import { toast } from 'sonner';
import type { Disease } from '@/lib/types';
import {
  medicalTreatments,
  insurancePlans,
  getSeverityLabel,
  getSeverityColor,
  calculateTreatmentCost,
} from '@/lib/data/health';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

interface HealthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HealthDialog({ open, onOpenChange }: HealthDialogProps) {
  const [health, setHealth] = useAtom(healthAtom);
  const [stats, setStats] = useAtom(statsAtom);
  const [money, setMoney] = useAtom(moneyAtom);
  const [, addMessage] = useAtom(addConsoleMessageAtom);

  const handleTreatment = (treatmentId: string) => {
    const treatment = medicalTreatments.find((t) => t.id === treatmentId);
    if (!treatment) return;

    const cost = calculateTreatmentCost(
      treatment.cost,
      health.hasInsurance,
      health.hasInsurance ? 70 : 0
    );

    if (money < cost) {
      toast.error(`Need $${cost.toLocaleString()} for this treatment`);
      return;
    }

    setMoney(money - cost);
    setStats({
      ...stats,
      health: Math.min(100, stats.health + treatment.healthRestoration),
    });

    addMessage(`Received ${treatment.name} for $${cost.toLocaleString()}`);
    toast.success(`Treatment completed!`);
  };

  const handleBuyInsurance = (planId: string) => {
    const plan = insurancePlans.find((p) => p.id === planId);
    if (!plan) return;

    setHealth({
      ...health,
      hasInsurance: true,
      insuranceCost: plan.monthlyCost,
    });

    addMessage(`Purchased ${plan.name} health insurance`);
    toast.success('Insurance activated!');
  };

  const handleCancelInsurance = () => {
    setHealth({
      ...health,
      hasInsurance: false,
      insuranceCost: 0,
    });

    addMessage('Cancelled health insurance');
    toast.info('Insurance cancelled');
  };

  const handleTreatDisease = (disease: Disease) => {
    const cost = calculateTreatmentCost(
      disease.treatmentCost,
      health.hasInsurance,
      health.hasInsurance ? 70 : 0
    );

    if (money < cost) {
      toast.error(`Need $${cost.toLocaleString()} to treat ${disease.name}`);
      return;
    }

    setMoney(money - cost);

    const updatedDiseases = health.currentDiseases.filter((d) => d.id !== disease.id);
    setHealth({
      ...health,
      currentDiseases: updatedDiseases,
    });

    setStats({
      ...stats,
      health: Math.min(100, stats.health + 10),
    });

    addMessage(`Treated ${disease.name} for $${cost.toLocaleString()}`);
    toast.success(`${disease.name} cured!`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-border bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Heart className="h-6 w-6" />
            Health & Medical
          </DialogTitle>
          <DialogDescription>Manage your health and wellbeing</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Health Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="text-xs text-muted-foreground">Physical</div>
              <div className="mt-1 text-2xl font-bold text-foreground">{stats.health}</div>
              <Progress value={stats.health} className="mt-2 h-1.5" />
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="text-xs text-muted-foreground">Fitness</div>
              <div className="mt-1 text-2xl font-bold text-foreground">{health.fitnessLevel}</div>
              <Progress value={health.fitnessLevel} className="mt-2 h-1.5" />
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="text-xs text-muted-foreground">Mental</div>
              <div className="mt-1 text-2xl font-bold text-foreground">{health.mentalHealth}</div>
              <Progress value={health.mentalHealth} className="mt-2 h-1.5" />
            </div>
          </div>

          {/* Insurance Status */}
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Insurance Status</span>
            </div>
            <div className="mt-2">
              {health.hasInsurance ? (
                <div className="space-y-2">
                  <div className="text-sm text-foreground">
                    Active - ${health.insuranceCost}/month
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Covers 70% of medical costs
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleCancelInsurance}
                    className="mt-2"
                  >
                    Cancel Insurance
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">No insurance</div>
                  <div className="grid grid-cols-3 gap-2">
                    {insurancePlans.map((plan) => (
                      <Button
                        key={plan.id}
                        variant="outline"
                        size="sm"
                        onClick={() => handleBuyInsurance(plan.id)}
                      >
                        {plan.name.split(' ')[0]}
                        <br />${plan.monthlyCost}/mo
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Current Diseases */}
          {health.currentDiseases.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Current Conditions</h3>
                <div className="space-y-2">
                  {health.currentDiseases.map((disease) => {
                    const severityColor = getSeverityColor(disease.severity);
                    const cost = calculateTreatmentCost(
                      disease.treatmentCost,
                      health.hasInsurance,
                      health.hasInsurance ? 70 : 0
                    );

                    return (
                      <div
                        key={disease.id}
                        className="rounded-lg border border-border bg-muted/30 p-3"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-foreground">{disease.name}</div>
                            <div className="mt-1 flex items-center gap-2 text-xs">
                              <span
                                className="font-semibold"
                                style={{ color: severityColor }}
                              >
                                {getSeverityLabel(disease.severity)}
                              </span>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-muted-foreground">
                                {disease.monthsActive}/{disease.duration} months
                              </span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleTreatDisease(disease)}
                            disabled={money < cost}
                          >
                            Treat ${cost.toLocaleString()}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Medical Treatments */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Stethoscope className="h-4 w-4" />
              Medical Care
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {medicalTreatments.slice(0, 4).map((treatment) => {
                const cost = calculateTreatmentCost(
                  treatment.cost,
                  health.hasInsurance,
                  health.hasInsurance ? 70 : 0
                );

                return (
                  <Button
                    key={treatment.id}
                    variant="outline"
                    onClick={() => handleTreatment(treatment.id)}
                    disabled={money < cost}
                    className="h-auto flex-col items-start p-3"
                  >
                    <div className="font-medium">{treatment.name}</div>
                    <div className="text-xs text-muted-foreground">
                      ${cost.toLocaleString()} • +{treatment.healthRestoration} health
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
