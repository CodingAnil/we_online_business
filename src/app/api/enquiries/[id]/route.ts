import { NextRequest } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import Business from '@/models/Business';
import { ApiResponse } from '@/lib/helpers/api.helper';
import { auth } from '@/lib/auth';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// PATCH: Update enquiry status/details (Protected)
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    await dbConnect();
    const { id } = await params;
    const session = await auth();

    if (!session || !session.user) {
      return ApiResponse.unauthorized('You must be signed in to update enquiries.');
    }

    const body = await req.json();
    const { status } = body;

    if (status && !['pending', 'read', 'replied'].includes(status)) {
      return ApiResponse.badRequest('Invalid status value.');
    }

    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      return ApiResponse.notFound('Enquiry not found.');
    }

    const { role, id: userId } = session.user;

    // Check authorization
    if (role !== 'admin') {
      const business = await Business.findById(enquiry.businessId);
      if (!business || !business.userId || business.userId.toString() !== userId) {
        return ApiResponse.forbidden('You do not have permission to update this enquiry.');
      }
    }

    if (status) {
      enquiry.status = status;
    }

    await enquiry.save();

    return ApiResponse.success('Enquiry updated successfully.', enquiry);
  } catch (error) {
    console.error('PATCH Enquiry API error:', error);
    return ApiResponse.internalServerError('Failed to update enquiry.', (error as Error).message);
  }
}

// DELETE: Delete enquiry (Protected)
export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    await dbConnect();
    const { id } = await params;
    const session = await auth();

    if (!session || !session.user) {
      return ApiResponse.unauthorized('You must be signed in to delete enquiries.');
    }

    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      return ApiResponse.notFound('Enquiry not found.');
    }

    const { role, id: userId } = session.user;

    // Check authorization
    if (role !== 'admin') {
      const business = await Business.findById(enquiry.businessId);
      if (!business || !business.userId || business.userId.toString() !== userId) {
        return ApiResponse.forbidden('You do not have permission to delete this enquiry.');
      }
    }

    await enquiry.deleteOne();

    return ApiResponse.success('Enquiry deleted successfully.');
  } catch (error) {
    console.error('DELETE Enquiry API error:', error);
    return ApiResponse.internalServerError('Failed to delete enquiry.', (error as Error).message);
  }
}
