import mongoose, { Schema, Document, Model } from 'mongoose';
import { IBusiness } from '@/types/business.types';

export interface IBusinessDocument extends Omit<IBusiness, '_id' | 'userId' | 'categoryId' | 'cityId'>, Document {
  userId?: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  cityId: mongoose.Types.ObjectId;
}

const BusinessSchema = new Schema<IBusinessDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Business name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category ID is required'],
    },
    cityId: {
      type: Schema.Types.ObjectId,
      ref: 'City',
      required: [true, 'City ID is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      lowercase: true,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
      default: '',
    },
    whatsapp: {
      type: String,
      trim: true,
      default: '',
    },
    logo: {
      type: String,
      default: '',
    },
    coverImage: {
      type: String,
      default: '',
    },
    gallery: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Business: Model<IBusinessDocument> =
  mongoose.models.Business || mongoose.model<IBusinessDocument>('Business', BusinessSchema);

export default Business;

