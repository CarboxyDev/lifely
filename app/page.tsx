'use client';

import { useEffect } from 'react';
import { GameLayout } from '@/components/game/GameLayout';
import { WelcomeScreen } from '@/components/game/WelcomeScreen';
import { useAtom } from 'jotai';
import { userAtom, initializeGameAtom } from '@/lib/atoms/game-state';

export default function Home() {
  const [user] = useAtom(userAtom);
  const [, initGame] = useAtom(initializeGameAtom);

  useEffect(() => {
    // Initialize game if no user name (first time)
    if (!user.name) {
      initGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user.name ? <GameLayout /> : <WelcomeScreen />;
}
