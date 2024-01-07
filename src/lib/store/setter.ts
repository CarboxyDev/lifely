import { PlayerState, usePlayer } from '@/lib/store/player';

const setMoney = (amount: number) => {
  return usePlayer.getState().setMoney(amount);
};

const addMoney = (amount: number) => {
  return usePlayer.getState().addMoney(amount);
};

const subtractMoney = (amount: number) => {
  return usePlayer.getState().subtractMoney(amount);
};

const increaseAge = (amount: number) => {
  return usePlayer.getState().increaseAge(amount);
};

const addPrimaryValue = (
  key: keyof PlayerState['primaryValues'],
  amount: number
) => {
  return usePlayer.getState().addPrimaryValue(key, amount);
};

const subtractPrimaryValue = (
  key: keyof PlayerState['primaryValues'],
  amount: number
) => {
  return usePlayer.getState().subtractPrimaryValue(key, amount);
};

export const Setter = {
  setMoney,
  addMoney,
  subtractMoney,
  increaseAge,
  addPrimaryValue,
  subtractPrimaryValue,
};
