'use client';

import { useAtom } from 'jotai';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Clock,
  Briefcase,
  GraduationCap,
  Heart,
  Home,
  Plane,
  TrendingUp,
  Award,
  AlertCircle,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { timelineAtom, userAtom } from '@/lib/atoms/game-state';
import type { TimelineEvent } from '@/lib/types';
import { formatAge } from '@/lib/utils/game-utils';

interface TimelineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TimelineDialog({ open, onOpenChange }: TimelineDialogProps) {
  const [timeline] = useAtom(timelineAtom);
  const [user] = useAtom(userAtom);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'birth':
        return <Sparkles className="h-4 w-4" />;
      case 'education':
        return <GraduationCap className="h-4 w-4" />;
      case 'job':
        return <Briefcase className="h-4 w-4" />;
      case 'relationship':
        return <Heart className="h-4 w-4" />;
      case 'purchase':
        return <Home className="h-4 w-4" />;
      case 'travel':
        return <Plane className="h-4 w-4" />;
      case 'financial':
        return <TrendingUp className="h-4 w-4" />;
      case 'achievement':
        return <Award className="h-4 w-4" />;
      case 'milestone':
        return <Sparkles className="h-4 w-4" />;
      case 'health':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'positive':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'negative':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'milestone':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
    }
  };

  // Group events by year
  const eventsByYear = timeline.events.reduce((acc, event) => {
    const year = Math.floor(event.age / 12);
    if (!acc[year]) acc[year] = [];
    acc[year].push(event);
    return acc;
  }, {} as Record<number, TimelineEvent[]>);

  // Sort years in descending order (most recent first)
  const years = Object.keys(eventsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  // Filter events by type
  const educationEvents = timeline.events.filter((e) => e.type === 'education');
  const jobEvents = timeline.events.filter((e) => e.type === 'job');
  const relationshipEvents = timeline.events.filter((e) => e.type === 'relationship');
  const travelEvents = timeline.events.filter((e) => e.type === 'travel');
  const achievementEvents = timeline.events.filter((e) => e.type === 'achievement');
  const milestoneEvents = timeline.events.filter((e) => e.category === 'milestone');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Life Timeline
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="career">Career</TabsTrigger>
            <TabsTrigger value="relationships">Social</TabsTrigger>
            <TabsTrigger value="travel">Travel</TabsTrigger>
            <TabsTrigger value="achievements">Awards</TabsTrigger>
          </TabsList>

          {/* All Events */}
          <TabsContent value="all" className="space-y-4">
            {years.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Your life story will appear here as you live it
              </div>
            ) : (
              years.map((year) => (
                <div key={year} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-foreground">Age {year}</h3>
                    <div className="flex-1 border-t border-border"></div>
                  </div>

                  <div className="space-y-2 ml-6">
                    {eventsByYear[year]
                      .sort((a, b) => a.age - b.age)
                      .map((event) => (
                        <Card key={event.id} className="border-l-2 border-accent">
                          <CardContent className="p-3">
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                <Badge className={getCategoryColor(event.category)}>
                                  {getEventIcon(event.type)}
                                </Badge>
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="font-semibold text-foreground">{event.title}</div>
                                <div className="text-sm text-muted-foreground">
                                  {event.description}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {formatAge(event.age)}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          {/* Milestones */}
          <TabsContent value="milestones" className="space-y-3">
            {milestoneEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No milestones achieved yet
              </div>
            ) : (
              milestoneEvents
                .sort((a, b) => b.age - a.age)
                .map((event) => (
                  <Card key={event.id} className="border-purple-500/30">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-400" />
                        <h3 className="font-semibold text-foreground">{event.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <div className="text-xs text-muted-foreground">{formatAge(event.age)}</div>
                    </CardContent>
                  </Card>
                ))
            )}
          </TabsContent>

          {/* Education */}
          <TabsContent value="education" className="space-y-3">
            {educationEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No education events yet
              </div>
            ) : (
              educationEvents
                .sort((a, b) => b.age - a.age)
                .map((event) => (
                  <Card key={event.id}>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-blue-400" />
                        <h3 className="font-semibold text-foreground">{event.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <div className="text-xs text-muted-foreground">{formatAge(event.age)}</div>
                    </CardContent>
                  </Card>
                ))
            )}
          </TabsContent>

          {/* Career */}
          <TabsContent value="career" className="space-y-3">
            {jobEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No career events yet
              </div>
            ) : (
              jobEvents
                .sort((a, b) => b.age - a.age)
                .map((event) => (
                  <Card key={event.id}>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-green-400" />
                        <h3 className="font-semibold text-foreground">{event.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <div className="text-xs text-muted-foreground">{formatAge(event.age)}</div>
                    </CardContent>
                  </Card>
                ))
            )}
          </TabsContent>

          {/* Relationships */}
          <TabsContent value="relationships" className="space-y-3">
            {relationshipEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No relationship events yet
              </div>
            ) : (
              relationshipEvents
                .sort((a, b) => b.age - a.age)
                .map((event) => (
                  <Card key={event.id}>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-pink-400" />
                        <h3 className="font-semibold text-foreground">{event.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <div className="text-xs text-muted-foreground">{formatAge(event.age)}</div>
                    </CardContent>
                  </Card>
                ))
            )}
          </TabsContent>

          {/* Travel */}
          <TabsContent value="travel" className="space-y-3">
            {travelEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No travel events yet
              </div>
            ) : (
              travelEvents
                .sort((a, b) => b.age - a.age)
                .map((event) => (
                  <Card key={event.id}>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Plane className="h-5 w-5 text-cyan-400" />
                        <h3 className="font-semibold text-foreground">{event.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <div className="text-xs text-muted-foreground">{formatAge(event.age)}</div>
                    </CardContent>
                  </Card>
                ))
            )}
          </TabsContent>

          {/* Achievements */}
          <TabsContent value="achievements" className="space-y-3">
            {achievementEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No achievements unlocked yet
              </div>
            ) : (
              achievementEvents
                .sort((a, b) => b.age - a.age)
                .map((event) => (
                  <Card key={event.id} className="border-yellow-500/30">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-400" />
                        <h3 className="font-semibold text-foreground">{event.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <div className="text-xs text-muted-foreground">{formatAge(event.age)}</div>
                    </CardContent>
                  </Card>
                ))
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div>Total Life Events: {timeline.totalEvents}</div>
          <div>Current Age: {formatAge(user.age)}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
