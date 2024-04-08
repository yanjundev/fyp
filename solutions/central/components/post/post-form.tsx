'use client';

// hooks
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

// forms
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostSchema } from '@/schemas';

//components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { userPlans } from '@/actions/user/plans';
import { Badge } from '../ui/badge';
import { TagInput } from '../ui/tag-input';
import { isTag } from '@/lib/validate';

export const PostForm = ({
  type,
  post,
  submitting,
  handleSubmit,
}: PostFormProps) => {
  const router = useRouter();

  const { toast } = useToast();

  const [plans, setPlans] = useState<SelectPlan[]>([]);

  const [addTags, setAddTags] = useState(false);

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: post.title,
      body: post.body,
      tags: post.tags ? post.tags : [],
      isPublic: post.public,
      planId: post.planId ? post.planId : undefined,
    },
  });

  const onCheckTag = (text: string) => {
    if (isTag(text)) return true;

    return false;
  };

  useEffect(() => {
    userPlans('simple').then((data) => setPlans(data));
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='container space-y-5 max-w-2xl'
      >
        <h2 className='text-lg font-medium'>{type} post</h2>
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
                  disabled={submitting}
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
                  disabled={submitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='planId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>plan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        field.value ? field.value : 'select a plan to display'
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {plans.length !== 0 &&
                    plans.map((p) => (
                      <SelectItem id={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem className='flex flex-row justify-between items-center border-hidden'>
              {addTags || field.value.length !== 0 ? (
                <TagInput
                  value={field.value}
                  onChange={field.onChange}
                  name='tags'
                  placeHolder='type here to add tags'
                  isTag={onCheckTag}
                />
              ) : (
                <Badge
                  variant='secondary'
                  className='rounded-full text-base cursor-pointer'
                  onClick={() => {
                    setAddTags(!addTags);
                  }}
                >
                  #add tags to help people find your post
                </Badge>
              )}
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

        <Button type='submit' disabled={submitting} className='w-full'>
          publish
        </Button>
      </form>
    </Form>
  );
};

interface SelectPlan {
  id: string;
  name: string;
}

interface Post {
  title: string;
  body: string;
  tags: string[];
  public: boolean;
  planId?: string;
}
interface PostFormProps {
  type: 'create' | 'edit';
  post: Post;
  submitting: boolean;
  handleSubmit: (values: z.infer<typeof PostSchema>) => void;
}
