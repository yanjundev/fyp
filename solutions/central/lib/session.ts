import { auth } from '@/auth';

export const getCurrentUser = async () => {
  const session = await auth();

  console.log('session.ts', session);

  return session?.user;
};

export const getCurrentUserName = async () => {
  const session = await auth();

  return session?.user.name;
};

export const getCurrentUserRole = async () => {
  const session = await auth();

  return session?.user.role;
};
