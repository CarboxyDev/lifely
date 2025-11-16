'use client';

import { useState } from 'react';
import { useAtom } from 'jotai';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Plane,
  MapPin,
  Calendar,
  DollarSign,
  Heart,
  Brain,
  TrendingUp,
  Star,
  Globe,
  Mountain,
  Palmtree,
  Building2,
  Sparkles,
  Clock,
} from 'lucide-react';
import { moneyAtom, statsAtom, travelAtom, userAtom } from '@/lib/atoms/game-state';
import { addConsoleMessageAtom } from '@/lib/atoms/game-state';
import {
  destinations,
  getRandomExperiences,
  calculateTripSatisfaction,
  getRecommendedDestinations,
} from '@/lib/data/travel';
import type { Destination, Trip } from '@/lib/types';
import { toast } from 'sonner';

interface TravelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TravelDialog({ open, onOpenChange }: TravelDialogProps) {
  const [money, setMoney] = useAtom(moneyAtom);
  const [stats, setStats] = useAtom(statsAtom);
  const [travel, setTravel] = useAtom(travelAtom);
  const [user] = useAtom(userAtom);
  const [, addMessage] = useAtom(addConsoleMessageAtom);

  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const recommended = getRecommendedDestinations(stats.morale, stats.intellect, money);

  const handleBookTrip = (destination: Destination) => {
    if (money < destination.baseCost) {
      toast.error('Not enough money for this trip!');
      return;
    }

    // Deduct cost
    setMoney(money - destination.baseCost);

    // Generate experiences
    const experiences = getRandomExperiences(destination, 3);
    const satisfaction = calculateTripSatisfaction(destination, money, stats.morale);

    // Create trip record
    const newTrip: Trip = {
      id: `${Date.now()}-${Math.random()}`,
      destinationId: destination.id,
      destinationName: destination.name,
      cost: destination.baseCost,
      traveledAt: user.age,
      duration: destination.duration,
      experiences,
      satisfaction,
    };

    // Update stats based on trip
    const moraleIncrease = Math.round(destination.moraleBoost * (satisfaction / 10));
    const intellectIncrease = Math.round(destination.culturalValue * (satisfaction / 10));

    setStats({
      ...stats,
      morale: Math.min(100, stats.morale + moraleIncrease),
      intellect: Math.min(100, stats.intellect + intellectIncrease),
    });

    // Track unique countries
    const countriesVisited = new Set(travel.trips.map((t) => {
      const dest = destinations.find((d) => d.id === t.destinationId);
      return dest?.country;
    }));
    countriesVisited.add(destination.country);

    // Update travel state
    setTravel({
      trips: [...travel.trips, newTrip],
      totalCountriesVisited: countriesVisited.size,
      totalMoneySpent: travel.totalMoneySpent + destination.baseCost,
      favoriteDestination: destination.name,
      travelDays: travel.travelDays + destination.duration,
    });

    // Add console messages
    addMessage(`Traveled to ${destination.name}, ${destination.country}`);
    experiences.forEach((exp) => addMessage(exp));
    addMessage(`Trip satisfaction: ${satisfaction}/10 ⭐`);

    toast.success(`Trip to ${destination.name} booked!`, {
      description: `+${moraleIncrease} morale, +${intellectIncrease} intellect`,
    });

    setSelectedDestination(null);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'city':
        return <Building2 className="h-4 w-4" />;
      case 'beach':
        return <Palmtree className="h-4 w-4" />;
      case 'mountains':
        return <Mountain className="h-4 w-4" />;
      case 'cultural':
        return <Globe className="h-4 w-4" />;
      case 'adventure':
        return <Sparkles className="h-4 w-4" />;
      case 'exotic':
        return <Star className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    const colors: Record<string, string> = {
      city: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      beach: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      mountains: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
      cultural: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      adventure: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      exotic: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    };
    return colors[type] || 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
  };

  const filteredDestinations =
    filterType === 'all'
      ? destinations
      : destinations.filter((d) => d.type === filterType);

  const sortedDestinations = [...filteredDestinations].sort((a, b) => a.baseCost - b.baseCost);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5" />
            Travel the World
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="destinations" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="destinations">Destinations</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="history">Travel History</TabsTrigger>
          </TabsList>

          {/* All Destinations */}
          <TabsContent value="destinations" className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                size="sm"
                variant={filterType === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterType('all')}
              >
                All
              </Button>
              <Button
                size="sm"
                variant={filterType === 'city' ? 'default' : 'outline'}
                onClick={() => setFilterType('city')}
              >
                Cities
              </Button>
              <Button
                size="sm"
                variant={filterType === 'beach' ? 'default' : 'outline'}
                onClick={() => setFilterType('beach')}
              >
                Beaches
              </Button>
              <Button
                size="sm"
                variant={filterType === 'mountains' ? 'default' : 'outline'}
                onClick={() => setFilterType('mountains')}
              >
                Mountains
              </Button>
              <Button
                size="sm"
                variant={filterType === 'cultural' ? 'default' : 'outline'}
                onClick={() => setFilterType('cultural')}
              >
                Cultural
              </Button>
              <Button
                size="sm"
                variant={filterType === 'adventure' ? 'default' : 'outline'}
                onClick={() => setFilterType('adventure')}
              >
                Adventure
              </Button>
              <Button
                size="sm"
                variant={filterType === 'exotic' ? 'default' : 'outline'}
                onClick={() => setFilterType('exotic')}
              >
                Exotic
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sortedDestinations.map((destination) => {
                const canAfford = money >= destination.baseCost;
                return (
                  <Card
                    key={destination.id}
                    className={`cursor-pointer transition-all ${
                      canAfford
                        ? 'hover:border-accent hover:bg-accent/50'
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                    onClick={() => canAfford && setSelectedDestination(destination)}
                  >
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{destination.name}</h3>
                          <p className="text-sm text-muted-foreground">{destination.country}</p>
                        </div>
                        <Badge className={getTypeBadgeColor(destination.type)}>
                          {getTypeIcon(destination.type)}
                          <span className="ml-1">{destination.type}</span>
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <DollarSign className="h-3 w-3" />
                          ${destination.baseCost.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {destination.duration} days
                        </div>
                        <div className="flex items-center gap-1 text-green-400">
                          <Heart className="h-3 w-3" />
                          +{destination.moraleBoost} morale
                        </div>
                        <div className="flex items-center gap-1 text-blue-400">
                          <Brain className="h-3 w-3" />
                          +{destination.culturalValue} intellect
                        </div>
                      </div>

                      {!canAfford && (
                        <div className="text-xs text-red-400">
                          Need ${(destination.baseCost - money).toLocaleString()} more
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Recommended Destinations */}
          <TabsContent value="recommended" className="space-y-4">
            <div className="text-sm text-muted-foreground mb-3">
              Based on your current situation, we recommend these destinations:
            </div>

            {recommended.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Save more money to unlock travel recommendations!
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {recommended.map((destination) => {
                  const canAfford = money >= destination.baseCost;
                  return (
                    <Card
                      key={destination.id}
                      className={`cursor-pointer transition-all border-accent/50 ${
                        canAfford ? 'hover:border-accent hover:bg-accent/50' : 'opacity-50'
                      }`}
                      onClick={() => canAfford && setSelectedDestination(destination)}
                    >
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-foreground flex items-center gap-2">
                              {destination.name}
                              <Star className="h-4 w-4 text-yellow-400" />
                            </h3>
                            <p className="text-sm text-muted-foreground">{destination.country}</p>
                          </div>
                          <Badge className={getTypeBadgeColor(destination.type)}>
                            {getTypeIcon(destination.type)}
                            <span className="ml-1">{destination.type}</span>
                          </Badge>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          {destination.memories[0]}
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <DollarSign className="h-3 w-3" />
                            ${destination.baseCost.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1 text-green-400">
                            <Heart className="h-3 w-3" />
                            +{destination.moraleBoost}
                          </div>
                          <div className="flex items-center gap-1 text-blue-400">
                            <Brain className="h-3 w-3" />
                            +{destination.culturalValue}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Travel History */}
          <TabsContent value="history" className="space-y-4">
            {travel.trips.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No travel history yet. Book your first trip!
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-3">
                  <Card>
                    <CardContent className="p-3 text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {travel.totalCountriesVisited}
                      </div>
                      <div className="text-xs text-muted-foreground">Countries Visited</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {travel.travelDays}
                      </div>
                      <div className="text-xs text-muted-foreground">Days Traveled</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 text-center">
                      <div className="text-2xl font-bold text-foreground">
                        ${travel.totalMoneySpent.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Money Spent</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  {[...travel.trips].reverse().map((trip) => {
                    const dest = destinations.find((d) => d.id === trip.destinationId);
                    return (
                      <Card key={trip.id}>
                        <CardContent className="p-4 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {trip.destinationName}
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                Age {Math.floor(trip.traveledAt / 12)} years, {trip.traveledAt % 12}{' '}
                                months
                              </p>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-400">
                              <Star className="h-4 w-4 fill-yellow-400" />
                              <span className="text-sm font-semibold">{trip.satisfaction}/10</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {trip.duration} days
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              ${trip.cost.toLocaleString()}
                            </div>
                          </div>

                          <div className="space-y-1">
                            {trip.experiences.map((exp, idx) => (
                              <div key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                                <TrendingUp className="h-3 w-3 mt-0.5 shrink-0" />
                                {exp}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>

        {/* Booking Confirmation Dialog */}
        {selectedDestination && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="max-w-md w-full m-4">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Confirm Trip to {selectedDestination.name}
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Destination:</span>
                    <span className="text-foreground">{selectedDestination.name}, {selectedDestination.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="text-foreground">{selectedDestination.duration} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cost:</span>
                    <span className="text-foreground">${selectedDestination.baseCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expected Benefits:</span>
                    <span className="text-foreground">
                      +{selectedDestination.moraleBoost} morale, +{selectedDestination.culturalValue} intellect
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => handleBookTrip(selectedDestination)}
                  >
                    Book Trip
                  </Button>
                  <Button
                    className="flex-1"
                    variant="outline"
                    onClick={() => setSelectedDestination(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
