import { faker } from "@faker-js/faker/locale/ko";

type Person = { name: string; phone: string; memo: string };

export const makeFakePersonList = (limit: number): Array<Person> => {
  return new Array(limit).fill("").map(() => {
    return {
      name: `${faker.person.firstName()}${faker.person.lastName()}`,
      phone: faker.helpers.fromRegExp(/010-[0-9]{4}-[0-9]{4}/),
      memo: faker.lorem.text(),
    };
  });
};
