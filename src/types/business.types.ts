export type BusinessStatus = 'pending' | 'approved' | 'rejected';

export interface IBusiness {
  _id?: string;
  userId?: string; // references User (owner)
  name: string;
  slug: string;
  description: string;
  categoryId: string; // references Category
  cityId: string; // references City
  address: string;
  phone: string;
  email: string;
  website?: string;
  whatsapp?: string;
  logo?: string;
  coverImage?: string;
  gallery?: string[];
  rating?: number;
  totalReviews?: number;
  status: BusinessStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

