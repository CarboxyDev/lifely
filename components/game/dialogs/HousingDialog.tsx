'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { housingAtom, moneyAtom, addConsoleMessageAtom } from '@/lib/atoms/game-state';
import { Home } from 'lucide-react';
import { toast } from 'sonner';
import { availableProperties, rentOptions } from '@/lib/data/housing';

interface HousingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HousingDialog({ open, onOpenChange }: HousingDialogProps) {
  const [housing, setHousing] = useAtom(housingAtom);
  const [money, setMoney] = useAtom(moneyAtom);
  const [, addMessage] = useAtom(addConsoleMessageAtom);

  const handleBuyProperty = (property: typeof availableProperties[0]) => {
    if (money < property.price * 0.2) {
      toast.error(`Need $${(property.price * 0.2).toLocaleString()} for down payment (20%)`);
      return;
    }

    setMoney(money - property.price * 0.2);
    setHousing({
      ...housing,
      currentProperty: { ...property, monthsOwned: 0 },
      isRenting: false,
      monthlyRent: 0,
      propertyHistory: housing.currentProperty
        ? [...housing.propertyHistory, housing.currentProperty]
        : housing.propertyHistory,
    });

    addMessage(`Purchased ${property.name} for $${property.price.toLocaleString()}`);
    toast.success('Property purchased!');
  };

  const handleRent = (rent: typeof rentOptions[0]) => {
    setHousing({ ...housing, isRenting: true, monthlyRent: rent.monthly, currentProperty: null });
    addMessage(`Now renting ${rent.name} for $${rent.monthly}/month`);
    toast.success('Rental agreement signed!');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-border bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Home className="h-6 w-6" />
            Housing & Real Estate
          </DialogTitle>
          <DialogDescription>Buy property or rent a place to live</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current Status */}
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="font-medium">Current Housing</div>
            {housing.currentProperty ? (
              <div className="mt-2 space-y-1">
                <div className="text-foreground">{housing.currentProperty.name}</div>
                <div className="text-sm text-muted-foreground">
                  ${housing.currentProperty.monthlyMortgage}/month mortgage
                </div>
              </div>
            ) : housing.isRenting ? (
              <div className="mt-2 text-sm text-muted-foreground">
                Renting for ${housing.monthlyRent}/month
              </div>
            ) : (
              <div className="mt-2 text-sm text-muted-foreground">Homeless</div>
            )}
          </div>

          {/* Rent Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Rent</h3>
            <div className="grid grid-cols-2 gap-2">
              {rentOptions.map((rent) => (
                <Button
                  key={rent.name}
                  variant="outline"
                  onClick={() => handleRent(rent)}
                  className="h-auto flex-col p-3"
                >
                  <div className="font-medium">{rent.name}</div>
                  <div className="text-xs text-muted-foreground">${rent.monthly}/month</div>
                </Button>
              ))}
            </div>
          </div>

          {/* Buy Properties */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Buy Property (20% down)</h3>
            <div className="max-h-80 space-y-2 overflow-y-auto pr-2">
              {availableProperties.map((prop) => {
                const downPayment = prop.price * 0.2;
                const canAfford = money >= downPayment;

                return (
                  <div key={prop.id} className="rounded-lg border border-border bg-muted/30 p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{prop.name}</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          ${prop.price.toLocaleString()} • ${prop.monthlyMortgage}/mo mortgage
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleBuyProperty(prop)}
                        disabled={!canAfford}
                      >
                        Buy ${downPayment.toLocaleString()}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
