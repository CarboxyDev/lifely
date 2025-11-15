'use client';

import { useAtom } from 'jotai';
import { consoleMessagesAtom } from '@/lib/atoms/game-state';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Heart,
  Briefcase,
  GraduationCap,
  Home,
  Users,
  AlertTriangle,
  Sparkles,
  MessageCircle,
} from 'lucide-react';

type MessageCategory = 'positive' | 'negative' | 'neutral';
type MessageIconType = React.ComponentType<{ className?: string }>;

function categorizeMessage(message: string): MessageCategory {
  const lowerMsg = message.toLowerCase();

  // Positive indicators
  if (
    lowerMsg.includes('earned') ||
    lowerMsg.includes('won') ||
    lowerMsg.includes('promotion') ||
    lowerMsg.includes('hired') ||
    lowerMsg.includes('increased') ||
    lowerMsg.includes('graduated') ||
    lowerMsg.includes('success') ||
    lowerMsg.includes('great day') ||
    lowerMsg.includes('found') ||
    lowerMsg.includes('friend')
  ) {
    return 'positive';
  }

  // Negative indicators
  if (
    lowerMsg.includes('lost') ||
    lowerMsg.includes('decreased') ||
    lowerMsg.includes('died') ||
    lowerMsg.includes('fired') ||
    lowerMsg.includes('failed') ||
    lowerMsg.includes('sick') ||
    lowerMsg.includes('broke')
  ) {
    return 'negative';
  }

  return 'neutral';
}

function getMessageIcon(message: string): MessageIconType {
  const lowerMsg = message.toLowerCase();

  // Money related
  if (lowerMsg.includes('earned') || lowerMsg.includes('$') || lowerMsg.includes('money') || lowerMsg.includes('found')) {
    return DollarSign;
  }

  // Career related
  if (lowerMsg.includes('job') || lowerMsg.includes('hired') || lowerMsg.includes('promotion') || lowerMsg.includes('fired')) {
    return Briefcase;
  }

  // Education related
  if (lowerMsg.includes('graduated') || lowerMsg.includes('college') || lowerMsg.includes('university')) {
    return GraduationCap;
  }

  // Health related
  if (lowerMsg.includes('health') || lowerMsg.includes('hospital') || lowerMsg.includes('sick') || lowerMsg.includes('gym')) {
    return Heart;
  }

  // Social related
  if (lowerMsg.includes('friend') || lowerMsg.includes('relationship') || lowerMsg.includes('conversation')) {
    return Users;
  }

  // Property related
  if (lowerMsg.includes('house') || lowerMsg.includes('property') || lowerMsg.includes('apartment')) {
    return Home;
  }

  // Positive events
  if (lowerMsg.includes('great day') || lowerMsg.includes('won')) {
    return Sparkles;
  }

  // Warnings/negative
  if (lowerMsg.includes('decreased') || lowerMsg.includes('lost')) {
    return AlertTriangle;
  }

  // Increased/improved
  if (lowerMsg.includes('increased')) {
    return TrendingUp;
  }

  // Default neutral
  return MessageCircle;
}

function getMessageStyle(message: string) {
  const category = categorizeMessage(message);

  switch (category) {
    case 'positive':
      return 'bg-emerald-500/10 text-emerald-400';
    case 'negative':
      return 'bg-red-500/10 text-red-400';
    default:
      return 'bg-blue-500/10 text-blue-400';
  }
}

export function ActivityFeed() {
  const [messages] = useAtom(consoleMessagesAtom);

  return (
    <Card className="flex h-full flex-col border-border bg-card">
      <CardHeader className="shrink-0 border-b border-border pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Activity className="h-4 w-4" />
          Life Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-3">
        <ScrollArea className="h-full pr-3">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center py-12 text-center">
              <div className="text-sm text-muted-foreground">
                Your life story will appear here...
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <AnimatePresence mode="popLayout">
                {messages.map((msg, index) => {
                  const styleClass = getMessageStyle(msg.message);
                  const Icon = getMessageIcon(msg.message);

                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.02 }}
                    >
                      <div className="group flex items-start gap-2.5 rounded-lg border border-border bg-muted/30 p-2.5 transition-colors hover:border-accent hover:bg-accent/20">
                        <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded ${styleClass}`}>
                          <Icon className="h-3 w-3" />
                        </div>
                        <div className="flex-1 pt-0.5">
                          <p className="text-sm leading-relaxed text-card-foreground">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
