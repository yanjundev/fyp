import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { Role } from '@prisma/client';

import { db } from '@/lib/db';
import { getUserById } from '@/lib/dao/user';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(db),
  ...authConfig,
});
