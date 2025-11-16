import type { ClassValue } from 'clsx';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export const randint = (min: number, max: number, step?: number): number => {
  if (step == undefined) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return Math.floor((Math.random() * (max - min + 1)) / step) * step + min;
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
