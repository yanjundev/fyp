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

export const getUserByProfile = async (profileId: string) => {
  try {
    const user = await db.user.findFirst({
      where: { profile: { id: profileId } },
    });

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
  } catch (error) {
    console.log('error', error);

    return null;
  }
};

/**
 * creates a profile if it doesn't exist for the user
 * @param userId the user id
 */
export const createProfileForUser = async (userId: string) => {
  try {
    await db.profile.upsert({
      where: { userId },
      create: {
        user: {
          connect: {
            id: userId,
          },
        },
      },
      update: {},
    });
  } catch {
    return null;
  }
};
