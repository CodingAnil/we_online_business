export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface IReview {
  _id?: string;
  businessId: string; // references Business
  customerName: string;
  rating: number;
  review: string;
  status: ReviewStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
