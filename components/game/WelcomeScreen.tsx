'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Heart, Brain, Sparkles, TrendingUp, Check } from 'lucide-react';
import { useAtom } from 'jotai';
import { initializeGameAtom } from '@/lib/atoms/game-state';

export function WelcomeScreen() {
  const [, initGame] = useAtom(initializeGameAtom);

  const features = [
    { icon: <Sparkles className="h-4 w-4" />, text: 'Start as an 18-year-old with random attributes' },
    { icon: <TrendingUp className="h-4 w-4" />, text: 'Make decisions about education, career, and lifestyle' },
    { icon: <Heart className="h-4 w-4" />, text: 'Experience random events that shape your life' },
    { icon: <Brain className="h-4 w-4" />, text: 'Manage your health, morale, intellect, and looks' },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Logo/Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-950"
          >
            <Sparkles className="h-10 w-10 text-blue-600 dark:text-blue-400" />
          </motion.div>

          {/* Title */}
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Welcome to Lifely
          </h1>
          <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
            A modern life simulation game where every decision shapes your story
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <CardContent className="p-8">
              {/* Features */}
              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3 rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50"
                  >
                    <div className="mt-0.5 rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                      {feature.icon}
                    </div>
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {feature.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  onClick={() => initGame()}
                  size="lg"
                  className="w-full bg-blue-600 text-base font-semibold hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Begin Your Life
                  <TrendingUp className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>

              <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
                Your progress is automatically saved
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
