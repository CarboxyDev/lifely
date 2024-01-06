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
  console.log(NAMES_DATA);
  return 'John Doe';
};

export const createNewLife = () => {
  const country = generateCountry();
  const name = generateName(country);

  return {
    country,
    name,
  };
};
