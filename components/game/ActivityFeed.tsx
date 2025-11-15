'use client';

import { useAtom } from 'jotai';
import { consoleMessagesAtom } from '@/lib/atoms/game-state';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Briefcase,
  DollarSign,
  Heart,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

function getMessageIcon(message: string) {
  if (message.includes('job') || message.includes('hired') || message.includes('promotion')) {
    return <Briefcase className="h-4 w-4" />;
  }
  if (message.includes('earned') || message.includes('won') || message.includes('$')) {
    return <DollarSign className="h-4 w-4" />;
  }
  if (message.includes('health') && message.includes('decreased')) {
    return <TrendingDown className="h-4 w-4" />;
  }
  if (message.includes('health') || message.includes('hospital') || message.includes('gym')) {
    return <Heart className="h-4 w-4" />;
  }
  return <Activity className="h-4 w-4" />;
}

function getMessageColor(message: string) {
  if (message.includes('earned') || message.includes('won') || message.includes('promotion')) {
    return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300';
  }
  if (message.includes('lost') || message.includes('decreased') || message.includes('died')) {
    return 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300';
  }
  if (message.includes('job') || message.includes('hired')) {
    return 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300';
  }
  return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
}

export function ActivityFeed() {
  const [messages] = useAtom(consoleMessagesAtom);

  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardHeader className="border-b border-zinc-800 pb-4">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-zinc-100">
          <Activity className="h-4 w-4" />
          Life Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="h-[600px] pr-4">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center py-12 text-center">
              <div className="text-sm text-zinc-500">
                Your life story will appear here...
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {messages.map((msg, index) => {
                  const Icon = getMessageIcon(msg.message);
                  const colorClass = getMessageColor(msg.message);

                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <div className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 transition-colors hover:bg-zinc-800">
                        <div className={`mt-0.5 rounded-md p-1.5 ${colorClass}`}>
                          {Icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed text-zinc-300">
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
