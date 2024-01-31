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

      if (session.user && token.username) {
        session.user.username = token.username as string;
        session.user.email = token.email;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);

      if (!user) return token;

      token.username = user.username;
      token.role = user.role;

      return token;
    },
  },
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(db),
  ...authConfig,
});
