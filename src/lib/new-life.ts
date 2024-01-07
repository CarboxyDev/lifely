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
  //const countryNameGroup = COUNTRIES_DATA[country];
  //const countryNameData = COUNTRIES_DATA[country];
  console.log(country);
  console.log(NAMES_DATA);
  return 'John Doe';
};

export const createNewLife = () => {
  // !> Heads up: React strict mode is turned OFF for testing due to the dynamic nature of the game

  const country = generateCountry();
  const name = generateName(country);
  const money = randint(500, 4000, 100); // Starting money
  const primaryValues = {
    health: randint(80, 96, 1),
    morale: randint(80, 98, 1),
    intellect: randint(60, 95, 1),
    looks: randint(60, 95, 1),
  };

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
