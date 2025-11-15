'use client';

import { useAtom } from 'jotai';
import { consoleMessagesAtom } from '@/lib/atoms/game-state';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from 'lucide-react';

type MessageCategory = 'positive' | 'negative' | 'neutral';

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
    lowerMsg.includes('success')
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
    <Card className="flex h-full flex-col border-zinc-800 bg-zinc-900">
      <CardHeader className="shrink-0 border-b border-zinc-800 pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
          <Activity className="h-4 w-4" />
          Life Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-3">
        <ScrollArea className="h-full pr-3">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center py-12 text-center">
              <div className="text-sm text-zinc-500">
                Your life story will appear here...
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <AnimatePresence mode="popLayout">
                {messages.map((msg, index) => {
                  const styleClass = getMessageStyle(msg.message);

                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.02 }}
                    >
                      <div className="group flex items-start gap-2.5 rounded-lg border border-zinc-800/50 bg-zinc-900/30 p-2.5 transition-colors hover:border-zinc-700 hover:bg-zinc-800/50">
                        <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded ${styleClass}`}>
                          <Activity className="h-3 w-3" />
                        </div>
                        <div className="flex-1 pt-0.5">
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
