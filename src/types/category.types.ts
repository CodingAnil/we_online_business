export type CategoryStatus = 'active' | 'inactive';

export interface ICategory {
  _id?: string;
  name: string;
  slug: string;
  icon?: string;
  status: CategoryStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
