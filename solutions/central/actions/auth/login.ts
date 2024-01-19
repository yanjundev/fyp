'use server';

import * as z from 'zod';

import { LoginSchema } from '@/schemas';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { getUserByEmail } from '@/lib/dao/user';
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import { createDefaultLevels } from '@/scripts/create-default-levels';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'invalid fields found' };
  }

  const { email, password } = validateFields.data;

  const user = await getUserByEmail(email);

  console.log('user', user);

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
  return { success: 'email has been sent' };
};
