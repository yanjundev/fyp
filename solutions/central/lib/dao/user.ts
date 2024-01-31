import { db } from '@/lib/db';

import { User as UserType } from '@/lib/types';

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const createUser = async ({ name, email, password }: UserType) => {
  try {
    await db.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  } catch {
    return null;
  }
};

export const createProfileForUser = async (userId: string) => {
  try {
    await db.profile.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch {
    return null;
  }
};
