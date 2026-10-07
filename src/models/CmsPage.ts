import mongoose, { Schema, Document, Model } from 'mongoose';
import { ICmsPage } from '@/types/cms.types';

export interface ICmsPageDocument extends Omit<ICmsPage, '_id'>, Document {}

const CmsPageSchema = new Schema<ICmsPageDocument>(
  {
    title: {
      type: String,
      required: [true, 'Page title is required'],
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
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    metaTitle: {
      type: String,
      trim: true,
      default: '',
    },
    metaDescription: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const CmsPage: Model<ICmsPageDocument> =
  mongoose.models.CmsPage || mongoose.model<ICmsPageDocument>('CmsPage', CmsPageSchema);

export default CmsPage;
