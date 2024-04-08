'use server';

import bcrypt from 'bcryptjs';

import * as z from 'zod';

import { RegisterSchema } from '@/schemas';

import {
  getUserByEmail,
  createUser,
  createProfileForUser,
} from '@/lib/dao/user';

const SALT_ROUNDS = 10;

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'invalid fields found' };
  }

  const { username, email, password } = validateFields.data;

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const userExists = await getUserByEmail(email);

  if (userExists) {
    return { error: 'email is already in use' };
  }

  await createUser({
    email: email,
    name: username,
    password: hashedPassword,
  });

  const user = await getUserByEmail(email);

  if (!user) return { error: 'something went wrong' };

  await createProfileForUser(user.id);

  return { success: 'user has been created' };
};
