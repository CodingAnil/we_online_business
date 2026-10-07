import mongoose, { Schema, Document, Model } from 'mongoose';
import { ICity } from '@/types/city.types';

export interface ICityDocument extends Omit<ICity, '_id'>, Document {}

const CitySchema = new Schema<ICityDocument>(
  {
    name: {
      type: String,
      required: [true, 'City name is required'],
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
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// Compound index on city name and state to ensure uniqueness of city in a state
CitySchema.index({ name: 1, state: 1 }, { unique: true });

const City: Model<ICityDocument> =
  mongoose.models.City || mongoose.model<ICityDocument>('City', CitySchema);

export default City;
