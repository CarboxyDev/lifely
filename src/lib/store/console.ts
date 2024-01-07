import { ConsoleInstance } from '@/lib/types/general';

export interface ConsoleState {
  history: ConsoleInstance[];
  head: number;
}
