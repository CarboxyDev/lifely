import { useStore } from '@/lib/store/store';
import { create } from 'zustand';

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

export const usePlayer = create<PlayerState>()((set) => ({
  name: 'Player',
  country: 'Undefined',
  age: 12 * 18,
  money: 0,
  primaryValues: {
    health: 100,
    morale: 90,
    intellect: 80,
    looks: 70,
  },
}));

export const useGetPrimaryValues = () => {
  const _values = useStore(usePlayer, (state) => state.primaryValues);
  return _values;
};
