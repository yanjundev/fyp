'use server';

import bcrypt from 'bcryptjs';

import * as z from 'zod';

import { RegisterSchema } from '@/schemas';

import { getUserByEmail, insertUser } from '@/lib/dao/user';

import { PrismaClient } from '@prisma/client';
import { db } from '@/lib/db';

const SALT_ROUNDS = 10;

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'invalid fields found' };
  }

  const { username, email, password } = validateFields.data;

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // check if user already exists
  const userExists = await getUserByEmail(email);

  // if exists, cannot create a new user
  if (userExists) {
    return { error: 'email is already in use' };
  }

  await insertUser({
    email: email,
    username: username,
    password: hashedPassword,
  });

  const user = await getUserByEmail(email);

  if (!user) return 'something weng wrong?';
  await db.profile.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  return { success: 'user created' };
};
