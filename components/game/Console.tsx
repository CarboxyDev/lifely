'use client';

import { useAtom } from 'jotai';
import { consoleMessagesAtom } from '@/lib/atoms/game-state';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Terminal } from 'lucide-react';

export function Console() {
  const [messages] = useAtom(consoleMessagesAtom);

  return (
    <Card className="h-[500px] border-zinc-800 bg-zinc-950/50 backdrop-blur">
      <CardHeader className="border-b border-zinc-800 pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Terminal className="h-5 w-5 text-purple-400" />
          Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="h-[400px] pr-4">
          <AnimatePresence mode="popLayout">
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="mb-2 rounded-md border border-zinc-800 bg-zinc-900/50 p-3 text-sm text-zinc-300"
              >
                {msg.message}
              </motion.div>
            ))}
          </AnimatePresence>
          {messages.length === 0 && (
            <div className="flex h-full items-center justify-center text-zinc-500">
              Your life story begins here...
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
