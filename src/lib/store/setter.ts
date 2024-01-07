import { usePlayer } from '@/lib/store/player';

const setName = (name: string) => {
  return usePlayer.getState().setName(name);
};

const setCountry = (country: string) => {
  return usePlayer.getState().setCountry(country);
};

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

const addHealth = (amount: number) => {
  return usePlayer.getState().addHealth(amount);
};

const subtractHealth = (amount: number) => {
  return usePlayer.getState().subtractHealth(amount);
};

const addMorale = (amount: number) => {
  return usePlayer.getState().addMorale(amount);
};

const subtractMorale = (amount: number) => {
  return usePlayer.getState().subtractMorale(amount);
};

const addIntellect = (amount: number) => {
  return usePlayer.getState().addIntellect(amount);
};

const subtractIntellect = (amount: number) => {
  return usePlayer.getState().subtractIntellect(amount);
};

const addLooks = (amount: number) => {
  return usePlayer.getState().addLooks(amount);
};

const subtractLooks = (amount: number) => {
  return usePlayer.getState().subtractLooks(amount);
};

export const Setter = {
  setName,
  setCountry,
  setMoney,
  addMoney,
  subtractMoney,
  increaseAge,
  addHealth,
  subtractHealth,
  addMorale,
  subtractMorale,
  addIntellect,
  subtractIntellect,
  addLooks,
  subtractLooks,
};
