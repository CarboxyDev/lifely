'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useAtom } from 'jotai';
import { initializeGameAtom } from '@/lib/atoms/game-state';

export function WelcomeScreen() {
  const [, initGame] = useAtom(initializeGameAtom);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md border-zinc-800 bg-zinc-950/50 backdrop-blur">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600"
            >
              <Sparkles className="h-8 w-8 text-white" />
            </motion.div>
            <CardTitle className="text-3xl font-bold">Welcome to Lifely</CardTitle>
            <CardDescription className="text-base">
              A text-based life simulator where every decision matters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm text-zinc-400">
              <p>
                • Start as an 18-year-old with random attributes
              </p>
              <p>
                • Make decisions about education, career, and lifestyle
              </p>
              <p>
                • Experience random events that shape your life
              </p>
              <p>
                • Manage your health, morale, intellect, and looks
              </p>
            </div>
            <Button
              onClick={() => initGame()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              size="lg"
            >
              Begin Your Life
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
