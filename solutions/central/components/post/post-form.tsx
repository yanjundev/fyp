'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

// forms
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostSchema } from '@/schemas';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormError } from '@/components/form-error';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import { createPost } from '@/actions/user/posts';

export const PostForm = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>('');

  const { toast } = useToast();

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: '',
      body: '',
      tags: [],
      isPublic: false,
    },
  });

  const onSubmit = (values: z.infer<typeof PostSchema>) => {
    setError('');

    startTransition(() => {
      createPost(values).then((data) => {
        if (!data.error) {
          toast({
            title: 'you created a post',
          });
          router.push('/home');
        }
        setError(data.error);
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='container space-y-6 max-w-2xl'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='enter the title of your post...'
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='body'
          render={({ field }) => (
            <FormItem>
              <FormLabel>content</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='write the contents of your post here...'
                  className='h-52'
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='isPublic'
          render={({ field }) => (
            <FormItem className='flex flex-row justify-between items-center p-4 rounded-lg border'>
              <div className='space-y-0.5'>
                <FormLabel>public</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormError message={error} />

        <Button type='submit' disabled={isPending} className='w-full'>
          publish
        </Button>
      </form>
    </Form>
  );
};
