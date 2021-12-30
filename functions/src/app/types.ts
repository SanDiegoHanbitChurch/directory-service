export type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

export type Member = {
  id: string;
  name: string;
  avatar: string;
  phone?: string;
  email?: string;
  address?: Address;
};