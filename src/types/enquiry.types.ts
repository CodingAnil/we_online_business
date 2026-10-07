export type EnquiryStatus = 'pending' | 'read' | 'replied';

export interface IEnquiry {
  _id?: string;
  businessId: string; // references Business
  name: string;
  phone: string;
  email: string;
  message: string;
  status: EnquiryStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
