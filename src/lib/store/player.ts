import { v4 as uuidv4 } from 'uuid';
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

export interface PlayerState {
  id: string;
  name: string;
  country: string;
  gender: 'male' | 'female';
  age: number; // In months
  money: number;
  primaryValues: {
    health: number;
    morale: number;
    intellect: number;
    looks: number;
  };
}

export interface PlayerMutations {
  setName: (name: string) => void;
  setCountry: (country: string) => void;
  addMoney: (amount: number) => void;
  subtractMoney: (amount: number) => void;
  setMoney: (amount: number) => void;
  increaseAge: (amount: number) => void;
  addHealth: (amount: number) => void;
  subtractHealth: (amount: number) => void;
  addMorale: (amount: number) => void;
  subtractMorale: (amount: number) => void;
  addIntellect: (amount: number) => void;
  subtractIntellect: (amount: number) => void;
  addLooks: (amount: number) => void;
  subtractLooks: (amount: number) => void;
}

export const usePlayer = create<PlayerState & PlayerMutations>()(
  immer((set) => ({
    id: uuidv4(),
    name: 'Player',
    gender: 'male',
    country: 'Undefined',
    age: 12 * 18,
    money: 0,
    primaryValues: {
      health: 0,
      morale: 0,
      intellect: 0,
      looks: 0,
    },
    /**
     * !> All the mutations/setters go in here. These are all non-reactive and hence not to be used inside hooks
     */
    setName: (name: string) => set((state) => void (state.name = name)),
    setCountry: (country: string) =>
      set((state) => void (state.country = country)),
    addMoney: (amount: number) => set((state) => void (state.money += amount)),
    subtractMoney: (amount: number) =>
      set((state) => void (state.money -= amount)),
    setMoney: (amount: number) => set((state) => void (state.money = amount)),
    increaseAge: (amount: number) => set((state) => void (state.age += amount)),
    addHealth: (amount: number) =>
      set((state) => void (state.primaryValues.health += amount)),
    subtractHealth: (amount: number) =>
      set((state) => void (state.primaryValues.health -= amount)),
    addMorale: (amount: number) =>
      set((state) => void (state.primaryValues.morale += amount)),
    subtractMorale: (amount: number) =>
      set((state) => void (state.primaryValues.morale -= amount)),
    addIntellect: (amount: number) =>
      set((state) => void (state.primaryValues.intellect += amount)),
    subtractIntellect: (amount: number) =>
      set((state) => void (state.primaryValues.intellect -= amount)),
    addLooks: (amount: number) =>
      set((state) => void (state.primaryValues.looks += amount)),
    subtractLooks: (amount: number) =>
      set((state) => void (state.primaryValues.looks -= amount)),
  }))
);
