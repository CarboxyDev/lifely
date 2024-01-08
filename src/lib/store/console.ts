import { ConsoleInstance } from '@/lib/types/general';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface ConsoleState {
  history: ConsoleInstance[];
  recentInstance: number; // Points to the latest instance in the history
}

export interface ConsoleMutations {
  add: (instance: ConsoleInstance) => void;
}

export const useConsole = create<ConsoleState & ConsoleMutations>()(
  immer((set) => ({
    history: [],
    recentInstance: 0,
    add: (instance: ConsoleInstance) =>
      set((state) => {
        state.history.push(instance);
        state.recentInstance = state.history.length - 1;
      }),
  }))
);
