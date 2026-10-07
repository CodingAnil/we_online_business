import { NextRequest } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import User from '@/models/User';
import { registerSchema } from '@/lib/validators/auth.validator';
import { ApiResponse } from '@/lib/helpers/api.helper';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    // Validate request body
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return ApiResponse.badRequest('Validation failed', validation.error.flatten().fieldErrors);
    }

    const { name, email, password, role } = validation.data;

    // Check if user already exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return ApiResponse.badRequest('A user with this email already exists.');
    }

    // Create user (password is automatically hashed by UserSchema pre-save hook)
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role,
      isActive: true,
    });

    return ApiResponse.success(
      'User registered successfully.',
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      201
    );
  } catch (error) {
    console.error('Registration API error:', error);
    return ApiResponse.internalServerError('An error occurred during registration.', (error as Error).message);
  }
}
