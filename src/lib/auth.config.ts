import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import { UserRole } from '@/types/user.types';

const authSecret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;

export const authConfig = {
  providers: [], // Populated with providers in auth.ts
  // Required on Vercel. Without it Auth.js returns
  // "There was a problem with the server configuration."
  trustHost: true,
  ...(authSecret ? { secret: authSecret } : {}),
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.id) {
        token.id = user.id;
        token.role = user.role as UserRole;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
} satisfies NextAuthConfig;

export const { auth } = NextAuth(authConfig);
