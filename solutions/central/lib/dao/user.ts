import { db } from '@/lib/db';

import { User as UserType } from '@/lib/types';
import { getThresholdByLevel } from './level';

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

export const insertUser = async ({ username, email, password }: UserType) => {
  try {
    await db.user.create({
      data: {
        email,
        username,
        password,
      },
    });
  } catch (error) {
    console.log('here', error);

    return null;
  }
};
