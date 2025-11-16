// Country data for character generation

export const allCountries = [
  'United States',
  'Canada',
  'England',
  'India',
  'Pakistan',
  'China',
  'Saudi Arabia',
  'Sri Lanka',
  'Mexico',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Russia',
  'Japan',
  'Taiwan',
  'South Korea',
  'Indonesia',
  'Singapore',
  'Italy',
  'Hungary',
  'Switzerland',
  'Poland',
  'Germany',
  'France',
  'Portugal',
  'Spain',
  'Ireland',
  'Iceland',
  'Argentina',
  'Brazil',
  'Uruguay',
  'Cuba',
  'Albania',
  'Australia',
  'Austria',
  'Belgium',
  'Belarus',
  'Estonia',
  'Bulgaria',
  'Chile',
  'Turkey',
  'Greece',
  'Cyprus',
  'Croatia',
  'Costa Rica',
  'Egypt',
  'Israel',
  'Kuwait',
  'Latvia',
  'Iran',
  'Slovenia',
  'Lithuania',
  'Malaysia',
  'UAE',
  'Morocco',
  'Luxembourg',
  'New Zealand',
  'Qatar',
  'South Africa',
  'Bangladesh',
  'Mongolia',
  'Thailand',
  'Serbia',
  'Vietnam',
  'Ukraine',
  'Zimbawe',
  'Burundi',
  'Belize',
  'Bolivia',
  'Slovakia',
  'Laos',
  'Lebanon',
  'Mauritius',
  'Netherlands',
  'Macedonia',
  'Philippines',
  'Wales',
  'Northern Ireland',
  'Scotland',
];

export const westernCountries = [
  'United States',
  'Canada',
  'England',
  'New Zealand',
  'Netherlands',
  'Israel',
  'South Africa',
  'Italy',
  'Singapore',
  'Australia',
  'Germany',
  'Greece',
  'Ireland',
  'Scotland',
  'Malaysia',
];

export const scandinavianCountries = ['Sweden', 'Denmark', 'Norway', 'Finland'];

export const chineseCountries = ['China', 'Taiwan', 'Vietnam'];

export const japaneseCountries = ['Japan', 'South Korea'];

export const indianCountries = ['India', 'UAE'];

export const latinCountries = ['Brazil', 'Argentina', 'Spain', 'Portugal', 'Mexico'];

export const slavicCountries = ['Russia', 'Ukraine', 'Poland', 'Belarus'];

export const frenchCountries = ['France', 'Belgium'];

export const otherAsianCountries = ['Thailand', 'Philippines'];

export type RegionType =
  | 'western'
  | 'scandinavian'
  | 'chinese'
  | 'japanese'
  | 'indian'
  | 'latin'
  | 'slavic'
  | 'french'
  | 'otherAsian';

export const countriesByRegion: Record<RegionType, string[]> = {
  western: westernCountries,
  scandinavian: scandinavianCountries,
  chinese: chineseCountries,
  japanese: japaneseCountries,
  indian: indianCountries,
  latin: latinCountries,
  slavic: slavicCountries,
  french: frenchCountries,
  otherAsian: otherAsianCountries,
};

/**
 * Get the region for a given country
 */
export function getRegionForCountry(country: string): RegionType {
  for (const [region, countries] of Object.entries(countriesByRegion)) {
    if (countries.includes(country)) {
      return region as RegionType;
    }
  }
  return 'western'; // default
}
