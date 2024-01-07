import { usePlayer } from '@/lib/store/player';

const setMoney = (amount: number) => {
  return usePlayer.getState().setMoney(amount);
};

export const Setter = {
  setMoney,
};
