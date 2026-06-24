export interface UserData {
  gender: 'female' | 'male';
  name: { first: string; last: string };
  email: string;
  dob: { age: number };
  registered: { date: string };
  nat: string;
  picture: { medium: string };
  location: {
    street: { number: number; name: string };
    city: string;
    country: string;
  };
}