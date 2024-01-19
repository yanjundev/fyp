import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'email is required',
  }),
  password: z.string().min(1, {
    message: 'password is required',
  }),
  code: z.optional(z.string()),
});

const USERNAME_REGEX =
  /^(?=.{1,50}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: 'name is required',
    })
    .regex(USERNAME_REGEX, {
      message: 'should contain 1 to 50 alphanumeric letters',
    }),
  email: z.string().email({
    message: 'email is required',
  }),
  password: z.string().min(6, {
    message: 'minimum 6 characters required',
  }),
});
