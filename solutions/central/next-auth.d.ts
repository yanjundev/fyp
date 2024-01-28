import { Role } from '@prisma/client';
import { DefaultSession } from 'next-auth';

export type AppUser = DefaultSession['user'] & {
  name: string;
  username: string;
  role: Role;
};

declare module 'next-auth' {
  interface Session {
    user: AppUser;
  }
}

// doesn't work in v5
declare module 'next-auth/jwt' {
  interface JWT {
    role: Role;
  }
}
