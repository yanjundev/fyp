'use client';

// hooks
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

// forms
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '@/schemas';

// actions
import { register } from '@/actions/auth';

// components
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CardWrapper } from '@/components/auth';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';

const content = {
  type: 'register',
  title: 'create an account',
  description: 'enter your email and password to sign up',
  button: 'register',
  text: 'already have an account?',
  link: 'login',
  href: '/login',
};

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccesss] = useState<string | undefined>('');

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('');
    setSuccesss('');

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccesss(data.success);
      });
    });
  };

  return (
    <CardWrapper
      title={content.title}
      description={content.description}
      text={content.text}
      link={content.link}
      href={content.href}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>username</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} type='email' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error} />
          <FormSuccess message={success} />

          <p className='text-sm text-center text-muted-foreground'>
            by clicking continue, you agree to our{' '}
            <Link
              href='/terms'
              className='underline underline-offset-4 hover:text-primary'
            >
              terms
            </Link>{' '}
            and{' '}
            <Link
              href='/privacy'
              className='underline underline-offset-4 hover:text-primary'
            >
              privacy policy
            </Link>
            .
          </p>

          <Button type='submit' disabled={isPending} className='w-full'>
            {content.button}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
