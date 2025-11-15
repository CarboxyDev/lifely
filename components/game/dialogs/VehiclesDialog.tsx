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
  vehiclesAtom,
  moneyAtom,
  addConsoleMessageAtom,
  bankAtom,
} from '@/lib/atoms/game-state';
import { Car, Bike, Truck, Sparkles, DollarSign, Wrench } from 'lucide-react';
import { toast } from 'sonner';
import type { Vehicle } from '@/lib/types';
import {
  availableVehicles,
  vehicleTypeNames,
  vehicleTypeColors,
  calculateMonthlyVehicleCost,
  calculateVehicleValue,
  getReliabilityLabel,
  getReliabilityColor,
} from '@/lib/data/vehicles';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

interface VehiclesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VehiclesDialog({ open, onOpenChange }: VehiclesDialogProps) {
  const [vehicles, setVehicles] = useAtom(vehiclesAtom);
  const [money, setMoney] = useAtom(moneyAtom);
  const [bank, setBank] = useAtom(bankAtom);
  const [, addMessage] = useAtom(addConsoleMessageAtom);

  const handleBuyVehicle = (vehicleId: string) => {
    const vehicleDef = availableVehicles.find((v) => v.id === vehicleId);
    if (!vehicleDef) return;

    if (money < vehicleDef.price) {
      toast.error(`Need $${vehicleDef.price.toLocaleString()} to buy this vehicle`);
      return;
    }

    // If already have a vehicle, sell it first
    if (vehicles.currentVehicle) {
      const sellPrice = vehicles.currentVehicle.currentValue;
      setMoney(money - vehicleDef.price + sellPrice);
      addMessage(`Sold ${vehicles.currentVehicle.name} for $${sellPrice.toLocaleString()}`);

      // Add to history
      setVehicles({
        ...vehicles,
        vehicleHistory: [...vehicles.vehicleHistory, vehicles.currentVehicle],
      });
    } else {
      setMoney(money - vehicleDef.price);
    }

    const newVehicle: Vehicle = {
      id: vehicleDef.id,
      name: vehicleDef.name,
      type: vehicleDef.type,
      price: vehicleDef.price,
      maintenanceCost: vehicleDef.maintenanceCost,
      fuelCost: vehicleDef.fuelCost,
      depreciation: vehicleDef.depreciation,
      reliability: vehicleDef.reliability,
      currentValue: vehicleDef.price,
      monthsOwned: 0,
      mileage: 0,
    };

    setVehicles({
      ...vehicles,
      currentVehicle: newVehicle,
    });

    addMessage(`Bought ${newVehicle.name} for $${vehicleDef.price.toLocaleString()}`);
    toast.success(`Purchased ${newVehicle.name}!`);
  };

  const handleSellVehicle = () => {
    if (!vehicles.currentVehicle) return;

    const sellPrice = vehicles.currentVehicle.currentValue;
    setMoney(money + sellPrice);

    addMessage(`Sold ${vehicles.currentVehicle.name} for $${sellPrice.toLocaleString()}`);
    toast.success(`Sold for $${sellPrice.toLocaleString()}`);

    setVehicles({
      ...vehicles,
      vehicleHistory: [...vehicles.vehicleHistory, vehicles.currentVehicle],
      currentVehicle: null,
    });
  };

  const handleMaintenance = () => {
    if (!vehicles.currentVehicle) return;

    const maintenanceCost = 500; // One-time maintenance
    if (money < maintenanceCost) {
      toast.error(`Need $${maintenanceCost} for maintenance`);
      return;
    }

    setMoney(money - maintenanceCost);

    // Improve reliability
    const improvedReliability = Math.min(100, vehicles.currentVehicle.reliability + 10);
    setVehicles({
      ...vehicles,
      currentVehicle: {
        ...vehicles.currentVehicle,
        reliability: improvedReliability,
      },
      maintenanceScheduled: false,
    });

    addMessage(`Performed maintenance on ${vehicles.currentVehicle.name}`);
    toast.success('Maintenance completed!');
  };

  const getVehicleIcon = (type: string) => {
    if (type === 'bicycle' || type === 'motorcycle') return Bike;
    if (type === 'truck') return Truck;
    return Car;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl border-border bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Car className="h-6 w-6" />
            Vehicles
          </DialogTitle>
          <DialogDescription>Buy and manage your vehicles</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current Vehicle */}
          {vehicles.currentVehicle && (
            <>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">Your Vehicle</h3>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleSellVehicle}
                  >
                    Sell for ${vehicles.currentVehicle.currentValue.toLocaleString()}
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-lg font-bold text-foreground">
                      {vehicles.currentVehicle.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {vehicleTypeNames[vehicles.currentVehicle.type]}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground">Reliability</div>
                    <div
                      className="text-sm font-semibold"
                      style={{ color: getReliabilityColor(vehicles.currentVehicle.reliability) }}
                    >
                      {getReliabilityLabel(vehicles.currentVehicle.reliability)} ({vehicles.currentVehicle.reliability})
                    </div>
                    <Progress value={vehicles.currentVehicle.reliability} className="mt-1 h-1.5" />
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground">Monthly Cost</div>
                    <div className="text-sm font-semibold text-foreground">
                      ${calculateMonthlyVehicleCost(
                        vehicles.currentVehicle.maintenanceCost,
                        vehicles.currentVehicle.fuelCost
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground">Owned:</span>{' '}
                    <span className="font-medium text-foreground">
                      {Math.floor(vehicles.currentVehicle.monthsOwned / 12)}y {vehicles.currentVehicle.monthsOwned % 12}m
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Mileage:</span>{' '}
                    <span className="font-medium text-foreground">
                      {vehicles.currentVehicle.mileage.toLocaleString()} mi
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Value:</span>{' '}
                    <span className="font-medium text-foreground">
                      ${vehicles.currentVehicle.currentValue.toLocaleString()}
                    </span>
                  </div>
                </div>

                {vehicles.currentVehicle.reliability < 70 && (
                  <Button
                    className="mt-3 w-full"
                    variant="outline"
                    size="sm"
                    onClick={handleMaintenance}
                    disabled={money < 500}
                  >
                    <Wrench className="mr-2 h-4 w-4" />
                    Perform Maintenance ($500)
                  </Button>
                )}
              </div>

              <Separator />
            </>
          )}

          {/* Available Vehicles */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              {vehicles.currentVehicle ? 'Upgrade Vehicle' : 'Buy a Vehicle'}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {availableVehicles.map((vehicle) => {
                const Icon = getVehicleIcon(vehicle.type);
                const monthlyCost = calculateMonthlyVehicleCost(
                  vehicle.maintenanceCost,
                  vehicle.fuelCost
                );

                return (
                  <div
                    key={vehicle.id}
                    className="rounded-lg border border-border bg-muted/30 p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Icon
                            className="h-4 w-4"
                            style={{ color: vehicleTypeColors[vehicle.type] }}
                          />
                          <div className="font-medium text-foreground">{vehicle.name}</div>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {vehicleTypeNames[vehicle.type]}
                        </div>

                        <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                          <div>
                            <span className="text-muted-foreground">Price:</span>{' '}
                            <span className="font-medium text-foreground">
                              ${vehicle.price.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Monthly:</span>{' '}
                            <span className="font-medium text-foreground">
                              ${monthlyCost}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Reliability:</span>{' '}
                            <span
                              className="font-medium"
                              style={{ color: getReliabilityColor(vehicle.reliability) }}
                            >
                              {vehicle.reliability}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Depreciation:</span>{' '}
                            <span className="font-medium text-foreground">
                              {vehicle.depreciation}%/yr
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="mt-3 w-full"
                      size="sm"
                      variant={money >= vehicle.price ? 'default' : 'outline'}
                      onClick={() => handleBuyVehicle(vehicle.id)}
                      disabled={money < vehicle.price}
                    >
                      {vehicles.currentVehicle ? 'Upgrade' : 'Buy'} ${vehicle.price.toLocaleString()}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Vehicle History */}
          {vehicles.vehicleHistory.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Vehicle History</h3>
                <div className="space-y-1">
                  {vehicles.vehicleHistory.slice(-5).reverse().map((vehicle, index) => {
                    const Icon = getVehicleIcon(vehicle.type);
                    return (
                      <div
                        key={`${vehicle.id}-${index}`}
                        className="flex items-center gap-2 rounded border border-border bg-muted/20 p-2 text-xs"
                      >
                        <Icon
                          className="h-3 w-3"
                          style={{ color: vehicleTypeColors[vehicle.type] }}
                        />
                        <span className="flex-1 text-foreground">{vehicle.name}</span>
                        <span className="text-muted-foreground">
                          Owned for {Math.floor(vehicle.monthsOwned / 12)}y {vehicle.monthsOwned % 12}m
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
