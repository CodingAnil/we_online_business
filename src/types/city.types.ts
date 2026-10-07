export type CityStatus = 'active' | 'inactive';

export interface ICity {
  _id?: string;
  name: string;
  slug: string;
  state: string;
  status: CityStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
