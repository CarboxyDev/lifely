// Name generator utility
import { randomChoice } from './game-utils';
import { namesByRegion } from '../data/names';
import { getRegionForCountry } from '../data/countries';

export function generateRandomName(country: string): string {
  const region = getRegionForCountry(country);
  const names = namesByRegion[region];

  const firstName = randomChoice(names.firstName);
  const lastName = randomChoice(names.lastName);

  // Avoid names like "Morgan Morgan"
  if (firstName === lastName) {
    return generateRandomName(country);
  }

  return `${firstName} ${lastName}`;
}
