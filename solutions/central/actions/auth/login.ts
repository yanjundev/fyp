'use server';

import * as z from 'zod';

import { LoginSchema } from '@/schemas';

import { AuthError } from 'next-auth';
import { signIn } from '@/auth';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { getUserByEmail } from '@/lib/dao/user';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'invalid fields found' };
  }

  const { email, password } = validateFields.data;

  const user = await getUserByEmail(email);

  if (!user || !user.email || !user.password) {
    return { error: 'check your credentials are correct.' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'invalid credentials' };
        default:
          return { error: 'something went wrong!' };
      }
    }

    throw error;
  }

  return { success: 'login success' };
};
