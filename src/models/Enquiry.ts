import mongoose, { Schema, Document, Model } from 'mongoose';
import { IEnquiry } from '@/types/enquiry.types';

export interface IEnquiryDocument extends Omit<IEnquiry, '_id' | 'businessId'>, Document {
  businessId: mongoose.Types.ObjectId;
}

const EnquirySchema = new Schema<IEnquiryDocument>(
  {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: 'Business',
      required: [true, 'Business ID is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'read', 'replied'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Enquiry: Model<IEnquiryDocument> =
  mongoose.models.Enquiry || mongoose.model<IEnquiryDocument>('Enquiry', EnquirySchema);

export default Enquiry;
