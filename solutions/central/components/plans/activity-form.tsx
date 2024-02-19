'use client';

// hooks
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

// forms
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActivitySchema } from '@/schemas';

// components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FormError } from '@/components/form-error';

export const ActivityForm = ({ onSave }: ActivityFormProps) => {
  const [error, setError] = useState<string | undefined>('');

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ActivitySchema>>({
    resolver: zodResolver(ActivitySchema),
    defaultValues: {
      name: '',
      weight: '',
      reps: '',
      time: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className='space-y-5'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>activity name</FormLabel>
              <FormDescription>
                this can be a stretch, a movement, an exercise - anything you'd
                like!
              </FormDescription>
              <FormControl>
                <Input {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='weight'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                weight <span className='text-zinc-500'>(optional)</span>
              </FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='time'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                time <span className='text-zinc-500'>(optional)</span>
              </FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='reps'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                reps <span className='text-zinc-500'>(optional)</span>
              </FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormError message={error} />

        <Button type='submit' disabled={isPending} className='w-full'>
          add
        </Button>
      </form>
    </Form>
  );
};

interface ActivityFormProps {
  onSave: (values: z.infer<typeof ActivitySchema>) => void;
}
