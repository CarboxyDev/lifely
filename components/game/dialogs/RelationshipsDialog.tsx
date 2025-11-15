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
  relationshipsAtom,
  userAtom,
  moneyAtom,
  statsAtom,
  addConsoleMessageAtom,
} from '@/lib/atoms/game-state';
import { Users, Heart, UserPlus, MessageCircle, Gift, Activity, HeartHandshake, UserX } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import type { Relationship, RelationshipType } from '@/lib/types';
import {
  getRelationshipStatus,
  getStatusColor,
  getRelationshipTypeLabel,
  interactionTypes,
  canMarry,
  canStartDating,
  conversationTopics,
  activityOptions,
  giftTypes,
  relationshipTraits,
} from '@/lib/data/relationships';
import { Separator } from '@/components/ui/separator';
import { randomChoice, randint } from '@/lib/utils/game-utils';
import { generateRandomName } from '@/lib/utils/name-generator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface RelationshipsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RelationshipsDialog({ open, onOpenChange }: RelationshipsDialogProps) {
  const [relationships, setRelationships] = useAtom(relationshipsAtom);
  const [user] = useAtom(userAtom);
  const [money, setMoney] = useAtom(moneyAtom);
  const [stats, setStats] = useAtom(statsAtom);
  const [, addMessage] = useAtom(addConsoleMessageAtom);
  const [selectedPerson, setSelectedPerson] = useState<Relationship | null>(null);
  const [view, setView] = useState<'list' | 'interact'>('list');

  const handleInteract = (
    person: Relationship,
    type: 'conversation' | 'activity' | 'gift' | 'support'
  ) => {
    const interaction = interactionTypes.find((i) => i.id === type)!;

    if (money < interaction.cost) {
      toast.error('Not enough money');
      return;
    }

    setMoney(money - interaction.cost);

    const qualityIncrease = randint(interaction.qualityChange.min, interaction.qualityChange.max);
    const newQuality = Math.min(100, person.quality + qualityIncrease);

    const updatedRelationships = relationships.relationships.map((r) =>
      r.id === person.id
        ? { ...r, quality: newQuality, lastInteraction: user.age }
        : r
    );

    setRelationships({
      ...relationships,
      relationships: updatedRelationships,
    });

    // Generate contextual message
    let activity = '';
    switch (type) {
      case 'conversation':
        activity = randomChoice(conversationTopics);
        break;
      case 'activity':
        activity = randomChoice(activityOptions);
        break;
      case 'gift':
        activity = `gave ${randomChoice(giftTypes)}`;
        break;
      case 'support':
        activity = 'offered support and encouragement';
        break;
    }

    addMessage(`You ${activity} with ${person.name}`);
    setStats({ ...stats, morale: Math.min(100, stats.morale + 2) });

    toast.success(`Relationship improved! (+${qualityIncrease})`);
  };

  const handleMakeFriend = () => {
    const name = generateRandomName(user.country);
    const numTraits = randint(2, 4);
    const traits = [];
    for (let i = 0; i < numTraits; i++) {
      traits.push(randomChoice(relationshipTraits));
    }

    const newFriend: Relationship = {
      id: `friend-${Date.now()}-${Math.random()}`,
      name,
      type: 'friend',
      quality: randint(40, 70),
      yearsKnown: 0,
      lastInteraction: user.age,
      metAt: user.age,
      isAlive: true,
      traits,
    };

    setRelationships({
      ...relationships,
      relationships: [...relationships.relationships, newFriend],
      totalFriends: relationships.totalFriends + 1,
    });

    addMessage(`You made a new friend: ${name}`);
    setStats({ ...stats, morale: Math.min(100, stats.morale + 5) });
    toast.success('Made a new friend!');
  };

  const handleStartDating = (person: Relationship) => {
    if (!canStartDating(person.quality, user.age)) {
      toast.error('Relationship quality not high enough or you are too young');
      return;
    }

    if (person.type === 'friend') {
      const updatedRelationships = relationships.relationships.map((r) =>
        r.id === person.id ? { ...r, type: 'dating' as RelationshipType } : r
      );

      setRelationships({
        ...relationships,
        relationships: updatedRelationships,
      });

      addMessage(`You started dating ${person.name}!`);
      setStats({ ...stats, morale: Math.min(100, stats.morale + 10) });
      toast.success(`Now dating ${person.name}!`);
      setView('list');
      setSelectedPerson(null);
    }
  };

  const handleMarry = (person: Relationship) => {
    if (!canMarry(person.quality, person.yearsKnown, user.age)) {
      toast.error('Not ready for marriage yet (need 80+ quality, 1+ years known, age 18+)');
      return;
    }

    if (relationships.hasSpouse) {
      toast.error('You are already married!');
      return;
    }

    const updatedRelationships = relationships.relationships.map((r) =>
      r.id === person.id ? { ...r, type: 'spouse' as RelationshipType } : r
    );

    setRelationships({
      ...relationships,
      relationships: updatedRelationships,
      hasSpouse: true,
      spouseId: person.id,
    });

    addMessage(`You married ${person.name}!`);
    setStats({
      ...stats,
      morale: Math.min(100, stats.morale + 20),
    });
    toast.success(`Married ${person.name}!`);
    setView('list');
    setSelectedPerson(null);
  };

  const handleBreakup = (person: Relationship) => {
    const updatedRelationships = relationships.relationships.map((r) =>
      r.id === person.id ? { ...r, type: 'ex' as RelationshipType, quality: Math.max(0, r.quality - 30) } : r
    );

    const wasSpouse = person.id === relationships.spouseId;

    setRelationships({
      ...relationships,
      relationships: updatedRelationships,
      hasSpouse: wasSpouse ? false : relationships.hasSpouse,
      spouseId: wasSpouse ? null : relationships.spouseId,
    });

    addMessage(`You broke up with ${person.name}`);
    setStats({
      ...stats,
      morale: Math.max(0, stats.morale - 15),
    });
    toast.info(`Broke up with ${person.name}`);
    setView('list');
    setSelectedPerson(null);
  };

  const groupedRelationships = {
    family: relationships.relationships.filter((r) =>
      ['parent', 'sibling', 'spouse', 'child'].includes(r.type)
    ),
    romantic: relationships.relationships.filter((r) =>
      ['dating', 'ex'].includes(r.type)
    ),
    friends: relationships.relationships.filter((r) => r.type === 'friend'),
  };

  if (view === 'interact' && selectedPerson) {
    const status = getRelationshipStatus(selectedPerson.quality);
    const statusColor = getStatusColor(status);

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg border-border bg-card">
          <DialogHeader>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setView('list');
                setSelectedPerson(null);
              }}
              className="mb-2 w-fit"
            >
              ← Back
            </Button>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              {selectedPerson.name}
            </DialogTitle>
            <DialogDescription>{getRelationshipTypeLabel(selectedPerson.type)}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Person Info */}
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Relationship Quality</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 w-24 rounded-full bg-muted"
                      style={{ position: 'relative', overflow: 'hidden' }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${selectedPerson.quality}%`,
                          backgroundColor: statusColor,
                        }}
                      />
                    </div>
                    <span className="font-semibold" style={{ color: statusColor }}>
                      {selectedPerson.quality}/100
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="font-semibold capitalize text-foreground">{status}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Years Known</span>
                  <span className="font-semibold text-foreground">
                    {selectedPerson.yearsKnown.toFixed(1)}
                  </span>
                </div>

                {selectedPerson.traits.length > 0 && (
                  <div className="pt-2">
                    <span className="text-sm text-muted-foreground">Traits:</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {selectedPerson.traits.map((trait, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Interactions */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Interact</h3>
              <div className="grid gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleInteract(selectedPerson, 'conversation')}
                  className="justify-start"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Have a Conversation (Free)
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleInteract(selectedPerson, 'activity')}
                  className="justify-start"
                  disabled={money < 50}
                >
                  <Activity className="mr-2 h-4 w-4" />
                  Do an Activity ($50)
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleInteract(selectedPerson, 'gift')}
                  className="justify-start"
                  disabled={money < 100}
                >
                  <Gift className="mr-2 h-4 w-4" />
                  Give a Gift ($100)
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleInteract(selectedPerson, 'support')}
                  className="justify-start"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Offer Support (Free)
                </Button>
              </div>
            </div>

            {/* Relationship Actions */}
            {selectedPerson.type === 'friend' && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Relationship Options</h3>
                  <Button
                    onClick={() => handleStartDating(selectedPerson)}
                    className="w-full"
                    disabled={!canStartDating(selectedPerson.quality, user.age)}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Start Dating
                  </Button>
                </div>
              </>
            )}

            {selectedPerson.type === 'dating' && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Relationship Options</h3>
                  <Button
                    onClick={() => handleMarry(selectedPerson)}
                    className="w-full"
                    disabled={!canMarry(selectedPerson.quality, selectedPerson.yearsKnown, user.age)}
                  >
                    <HeartHandshake className="mr-2 h-4 w-4" />
                    Propose Marriage
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleBreakup(selectedPerson)}
                    className="w-full"
                  >
                    <UserX className="mr-2 h-4 w-4" />
                    Break Up
                  </Button>
                </div>
              </>
            )}

            {selectedPerson.type === 'spouse' && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Relationship Options</h3>
                  <Button
                    variant="destructive"
                    onClick={() => handleBreakup(selectedPerson)}
                    className="w-full"
                  >
                    <UserX className="mr-2 h-4 w-4" />
                    Divorce
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-border bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Users className="h-6 w-6" />
            Relationships
          </DialogTitle>
          <DialogDescription>Manage your social connections</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
              <div className="text-2xl font-bold text-foreground">
                {groupedRelationships.family.length}
              </div>
              <div className="text-xs text-muted-foreground">Family</div>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
              <div className="text-2xl font-bold text-foreground">
                {groupedRelationships.friends.length}
              </div>
              <div className="text-xs text-muted-foreground">Friends</div>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
              <div className="text-2xl font-bold text-foreground">
                {groupedRelationships.romantic.length}
              </div>
              <div className="text-xs text-muted-foreground">Romantic</div>
            </div>
          </div>

          {/* Make New Friend */}
          <div>
            <Button onClick={handleMakeFriend} className="w-full">
              <UserPlus className="mr-2 h-4 w-4" />
              Make a New Friend
            </Button>
          </div>

          <Separator />

          {/* Relationships List */}
          <div className="max-h-96 space-y-4 overflow-y-auto pr-2">
            {relationships.relationships.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground">
                No relationships yet. Make some friends!
              </div>
            ) : (
              <>
                {/* Family */}
                {groupedRelationships.family.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">Family</h3>
                    <div className="space-y-2">
                      {groupedRelationships.family.map((person) => (
                        <RelationshipCard
                          key={person.id}
                          person={person}
                          onClick={() => {
                            setSelectedPerson(person);
                            setView('interact');
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Romantic */}
                {groupedRelationships.romantic.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">Romantic</h3>
                    <div className="space-y-2">
                      {groupedRelationships.romantic.map((person) => (
                        <RelationshipCard
                          key={person.id}
                          person={person}
                          onClick={() => {
                            setSelectedPerson(person);
                            setView('interact');
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Friends */}
                {groupedRelationships.friends.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">Friends</h3>
                    <div className="space-y-2">
                      {groupedRelationships.friends.map((person) => (
                        <RelationshipCard
                          key={person.id}
                          person={person}
                          onClick={() => {
                            setSelectedPerson(person);
                            setView('interact');
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function RelationshipCard({
  person,
  onClick,
}: {
  person: Relationship;
  onClick: () => void;
}) {
  const status = getRelationshipStatus(person.quality);
  const statusColor = getStatusColor(status);

  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg border border-border bg-muted/30 p-3 text-left transition-colors hover:border-accent hover:bg-accent/20"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="font-medium text-foreground">{person.name}</div>
          <div className="text-xs text-muted-foreground">
            {getRelationshipTypeLabel(person.type)} • {person.yearsKnown.toFixed(1)} years
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-sm font-semibold" style={{ color: statusColor }}>
              {person.quality}
            </div>
            <div className="text-xs capitalize text-muted-foreground">{status}</div>
          </div>
        </div>
      </div>
    </button>
  );
}
