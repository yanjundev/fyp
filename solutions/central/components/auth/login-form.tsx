'use client';

// hooks
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

// forms
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schemas';

// actions
import { login } from '@/actions/auth';

// components
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

const content = {
  type: 'login',
  title: 'sign into central',
  description: 'enter your email and password to sign in',
  button: 'login',
  text: "don't have an account?",
  link: 'register',
  href: '/register',
};

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'email already in use with different provider'
      : '';

  const [error, setError] = useState<string | undefined>('');

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');

    startTransition(() => {
      login(values).then((data) => {
        setError(data.error);
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

          <FormError message={error || urlError} />

          <Button type='submit' disabled={isPending} className='w-full'>
            {content.button}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
