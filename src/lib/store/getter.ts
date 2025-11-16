import { usePlayer } from '@/lib/store/player';
import { useStore } from '@/lib/store/store';

const usePrimaryValues = () => {
  const values = useStore(usePlayer, (state) => state.primaryValues);
  return values;
};

const useAge = () => {
  const age = useStore(usePlayer, (state) => state.age);
  return age;
};

const useMoney = () => {
  const money = useStore(usePlayer, (state) => state.money);
  return money;
};

export const Getter = {
  usePrimaryValues,
  useAge,
  useMoney,
};
