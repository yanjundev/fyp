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

export const PostSchema = z.object({
  title: z.string().min(1, { message: 'title should not be empty' }),
  body: z.string().min(1, { message: 'the post body is empty' }),
  tags: z.array(z.string()),
  isPublic: z.boolean(),
  planId: z.optional(z.string()),
});

const NUMBER_REGEX = /^\d*$/;

export const ActivitySchema = z.object({
  name: z.string().min(1, { message: 'you should name the activity' }),
  weight: z.optional(
    z.string().regex(NUMBER_REGEX, { message: 'weight must be a number' }),
  ),
  reps: z.optional(
    z.string().regex(NUMBER_REGEX, { message: 'reps must be a number' }),
  ),
  time: z.optional(
    z.string().regex(NUMBER_REGEX, { message: 'time must be a number' }),
  ),
});

export const PlanSchema = z.object({
  name: z.string().min(1, { message: 'your plan should have a name' }),
  activities: z
    .array(ActivitySchema)
    .nonempty({ message: 'you have no activities :(' }),
  isPublic: z.boolean(),
});
