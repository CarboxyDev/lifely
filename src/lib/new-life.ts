import { Setter } from '@/lib/store/setter';
import { randint } from '@/lib/util';
import COUNTRIES_DATA from '../../public/countries.json';
import NAMES_DATA from '../../public/names.json';

const generateCountry = () => {
  const countryList = Object.keys(COUNTRIES_DATA);
  const country = countryList[Math.floor(Math.random() * countryList.length)];
  return country;
};

const generateName = (country: string) => {
  const countryNameGroup = COUNTRIES_DATA[country]['group'];
  let firstNames = [];
  let lastNames = [];
  countryNameGroup.forEach((nameGroup) => {
    if (NAMES_DATA[nameGroup] == undefined) {
      console.log(`Error: Name group ${nameGroup} doesn't exist`);
      return 'John Doe';
    }
    console.log(`Success: Name group ${nameGroup} exists`);
    firstNames = [...firstNames, ...NAMES_DATA[nameGroup]['firstNames']];
    lastNames = [...lastNames, ...NAMES_DATA[nameGroup]['lastNames']];
  });

  if (firstNames.length == 0 || lastNames.length == 0) {
    console.log('Error: No name could be generated. Defaulting to John Doe...');
    return 'John Doe';
  }

  const randomFirstName = firstNames[randint(0, firstNames.length - 1)];
  const randomLastName = lastNames[randint(0, lastNames.length - 1)];
  return `${randomFirstName} ${randomLastName}`;
};

export const createNewLife = () => {
  // !> Heads up: React strict mode is turned OFF for testing due to the dynamic nature of the game

  const country = generateCountry();
  const name = generateName(country);
  const money = randint(500, 4000, 100); // Starting money
  const primaryValues = {
    health: randint(80, 96),
    morale: randint(80, 98),
    intellect: randint(60, 95),
    looks: randint(60, 95),
  };

  Setter.setName(name);
  Setter.setCountry(country);
  Setter.addMoney(money);
  Setter.addHealth(primaryValues.health);
  Setter.addMorale(primaryValues.morale);
  Setter.addIntellect(primaryValues.intellect);
  Setter.addLooks(primaryValues.looks);

  return {
    country,
    name,
    money: money,
    primaryValues,
  };
};
