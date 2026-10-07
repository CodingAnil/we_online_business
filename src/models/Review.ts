import mongoose, { Schema, Document, Model } from 'mongoose';
import { IReview } from '@/types/review.types';

export interface IReviewDocument extends Omit<IReview, '_id' | 'businessId'>, Document {
  businessId: mongoose.Types.ObjectId;
}

interface IReviewModel extends Model<IReviewDocument> {
  calculateAverageRating(businessId: mongoose.Types.ObjectId): Promise<void>;
}

const ReviewSchema = new Schema<IReviewDocument>(
  {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: 'Business',
      required: [true, 'Business ID is required'],
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: [true, 'Review text is required'],
      trim: true,
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

// Aggregate rating and totalReviews for Business
ReviewSchema.statics.calculateAverageRating = async function (businessId: mongoose.Types.ObjectId) {
  const stats = await this.aggregate([
    {
      $match: { businessId, status: 'approved' },
    },
    {
      $group: {
        _id: '$businessId',
        rating: { $avg: '$rating' },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await mongoose.model('Business').findByIdAndUpdate(businessId, {
      rating: Math.round(stats[0].rating * 10) / 10,
      totalReviews: stats[0].totalReviews,
    });
  } else {
    await mongoose.model('Business').findByIdAndUpdate(businessId, {
      rating: 0,
      totalReviews: 0,
    });
  }
};

// Post save hook to update rating
ReviewSchema.post('save', async function (doc) {
  if (doc.status === 'approved') {
    await (this.constructor as IReviewModel).calculateAverageRating(doc.businessId);
  }
});

// Post remove hook to update rating (pre/post deleteOne/deleteMany can also trigger this, let's cover findOneAndDelete / deleteOne)
ReviewSchema.post('findOneAndDelete', async function (doc) {
  if (doc && doc.status === 'approved') {
    await mongoose.model<IReviewDocument, IReviewModel>('Review').calculateAverageRating(doc.businessId);
  }
});

const Review: IReviewModel =
  (mongoose.models.Review as IReviewModel) ||
  mongoose.model<IReviewDocument, IReviewModel>('Review', ReviewSchema);

export default Review;
