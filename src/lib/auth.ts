import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { dbConnect } from './mongodb';
import User from '@/models/User';
import { UserRole } from '@/types/user.types';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        await dbConnect();

        const user = await User.findOne({ email: (credentials.email as string).toLowerCase() });

        if (!user) {
          throw new Error('No user found with this email');
        }

        if (!user.isActive) {
          throw new Error('This account has been deactivated');
        }

        const isPasswordCorrect = await user.comparePassword(credentials.password as string);

        if (!isPasswordCorrect) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role as UserRole,
        };
      },
    }),
  ],
});
