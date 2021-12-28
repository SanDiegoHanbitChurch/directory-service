import { find, range } from 'lodash';
import * as faker from 'faker';

export type Member = {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
};

const members = range(0, 10).map(() => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  return {
    id: faker.datatype.uuid(),
    name: `${firstName} ${lastName}`,
    avatar: 'https://i.pravatar.cc/300',
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(firstName, lastName)
  };
});

export const getMemberById = (id: string): Member | undefined => {
  return find(members, { id });
};

export const getAllMembers = (): Member[] => {
  return members;
}