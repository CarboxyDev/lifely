export type PrimaryValue = 'health' | 'morale' | 'intellect' | 'looks';

type ConsoleMessageType = 'neutral' | 'personal' | 'earn' | 'pay' | 'social';
export interface ConsoleMessage {
  id: string;
  seqno: number;
  type: ConsoleMessageType;
  message: string;
}

/** Each Console instance is linked with a past/current age of the Player for navigation. Basically a sequence number. */
export interface ConsoleInstance {
  age: number;
  messages: ConsoleMessage[];
}
