'use client';

import { useEffect, useState } from 'react';
import { GameLayout } from '@/components/game/GameLayout';
import { WelcomeScreen } from '@/components/game/WelcomeScreen';
import { useAtom } from 'jotai';
import { userAtom, initializeGameAtom } from '@/lib/atoms/game-state';

// Force dynamic rendering since we use client-side localStorage
export const dynamic = 'force-dynamic';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [user] = useAtom(userAtom);
  const [, initGame] = useAtom(initializeGameAtom);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Initialize game if no user name (first time)
    if (mounted && !user.name) {
      initGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  // Prevent SSR rendering to avoid localStorage issues
  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
        <div className="text-zinc-400">Loading...</div>
      </div>
    );
  }

  return user.name ? <GameLayout /> : <WelcomeScreen />;
}
