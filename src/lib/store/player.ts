import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

/**
 * This is the global state for the Player.
 * All the getters and setters for fetching or mutating the player's state go in here.
 * Any logic before mutating the player's state MUST NOT go in here.
 *
 * !> Its fine to use Non-reactive setters but use Reactive getters only in the UI as hooks if possible.
 * !> setter.ts has non-reactive/non-hook setter methods as the PlayerMutation methods are not changed ever.
 * !> getter.ts has reactive/hook getter methods as the PlayerState is constantly changing.
 */

interface PlayerState {
  name: string;
  country: string;
  age: number; // In months
  money: number;
  primaryValues: {
    health: number;
    morale: number;
    intellect: number;
    looks: number;
  };
}

interface PlayerMutations {
  addMoney: (amount: number) => void;
  subtractMoney: (amount: number) => void;
  setMoney: (amount: number) => void;
}

export const usePlayer = create<PlayerState & PlayerMutations>()(
  immer((set) => ({
    name: 'Player',
    country: 'Undefined',
    age: 12 * 18,
    money: 0,
    primaryValues: {
      health: 90,
      morale: 82,
      intellect: 75,
      looks: 52,
    },
    /**
     * !> All the mutations/setters go in here. These are all non-reactive and hence not to be used inside hooks
     */
    addMoney: (amount: number) => set((state) => void (state.money += amount)),
    subtractMoney: (amount: number) =>
      set((state) => void (state.money -= amount)),
    setMoney: (amount: number) => set((state) => void (state.money = amount)),
  }))
);
