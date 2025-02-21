
import { faker } from '@faker-js/faker/locale/en';

function randomIndex(array: string[]): number {
  return Math.floor(Math.random() * array .length);
}

function randomMonthValue() : number {
  return Math.floor(Math.random() * 12) + 1
}

export type UserDetails = {
  title:  string,
  name: string,
  email: string,
  password: string,
  birthDate: string,
  firstName: string,
  lastName:string,
  company: string,
  address: string,
  address2: string,
  country: string,
  state: string,
  city: string,
  zip: string,
  mobile: string,
  newsletter: boolean,
  offers: boolean,
  cardnumber: string,
  cardCVC: string,
  expiryMonth: string,
  expiryYear: string
}

export default async function userDetails(): Promise<UserDetails> {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const name = `${firstName} ${lastName}`;
  const birthDate = faker.date.birthdate({ mode: 'age', min: 18, max: 65 }).toLocaleDateString('en-gb', { day: '2-digit', month: '2-digit', year: 'numeric'})
  const company = faker.company.name();
  const address = faker.location.streetAddress();
  const address2 = faker.location.secondaryAddress();
  const state = faker.location.state();
  const city = faker.location.city();
  const zipcode = faker.location.zipCode();
  const mobileNumber = faker.phone.number();
  const title = ['Mr.', 'Mrs.']
  const selectedTitle = title[randomIndex(title)]
  const countries = ['India', 'United States', 'Canada', 'Australia', 'Israel', 'New Zealand', 'Singapore']
  const selectedCountry = countries[randomIndex(countries)];
  const cardnumber = faker.finance.creditCardNumber();
  const cardCVC = faker.finance.creditCardCVV();
  const expiryMonth = randomMonthValue().toString();
  const expiryYear = faker.date.future().getFullYear().toString();

  return {
    title:  selectedTitle,
    name,
    email: `${firstName}_${lastName}@example.local`,
    password: 'password!23',
    birthDate,
    firstName,
    lastName,
    company,
    address,
    address2,
    country: selectedCountry,
    state,
    city,
    zip: zipcode,
    mobile: mobileNumber,
    newsletter: true,
    offers: true,
    cardnumber,
    cardCVC,
    expiryMonth,
    expiryYear
  }

}


