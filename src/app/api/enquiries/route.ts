import { NextRequest } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import Business from '@/models/Business';
import { enquirySchema } from '@/lib/validators/enquiry.validator';
import { ApiResponse } from '@/lib/helpers/api.helper';
import { auth } from '@/lib/auth';

// GET: Retrieve enquiries (Protected)
export async function GET(_req: NextRequest) {
  try {
    await dbConnect();
    const session = await auth();

    if (!session || !session.user) {
      return ApiResponse.unauthorized('You must be signed in to view enquiries.');
    }

    const { role, id: userId } = session.user;

    // Admin can see all enquiries
    if (role === 'admin') {
      const enquiries = await Enquiry.find()
        .populate('businessId', 'name slug')
        .sort({ createdAt: -1 });
      return ApiResponse.success('Enquiries retrieved successfully.', enquiries);
    }

    // Business owners can only see enquiries for their business(es)
    if (role === 'business') {
      // Find businesses owned by this user
      const userBusinesses = await Business.find({ userId });
      const businessIds = userBusinesses.map((b) => b._id);

      const enquiries = await Enquiry.find({ businessId: { $in: businessIds } })
        .populate('businessId', 'name slug')
        .sort({ createdAt: -1 });

      return ApiResponse.success('Enquiries retrieved successfully.', enquiries);
    }

    return ApiResponse.forbidden('You do not have access to view these enquiries.');
  } catch (error) {
    console.error('GET Enquiries API error:', error);
    return ApiResponse.internalServerError('Failed to fetch enquiries.', (error as Error).message);
  }
}

// POST: Create a new enquiry (Public)
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    // Validate body
    const validation = enquirySchema.safeParse(body);
    if (!validation.success) {
      return ApiResponse.badRequest('Validation failed', validation.error.flatten().fieldErrors);
    }

    const { businessId, name, phone, email, message } = body;

    // Check if business exists
    const business = await Business.findById(businessId);
    if (!business) {
      return ApiResponse.notFound('Business not found.');
    }

    const enquiry = await Enquiry.create({
      businessId,
      name,
      phone,
      email,
      message,
      status: 'pending',
    });

    return ApiResponse.success('Enquiry sent successfully.', enquiry, 201);
  } catch (error) {
    console.error('POST Enquiry API error:', error);
    return ApiResponse.internalServerError('Failed to submit enquiry.', (error as Error).message);
  }
}
