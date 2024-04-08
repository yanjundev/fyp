'use client';

import { createPost } from '@/actions/user/posts';
import { PostForm } from '@/components/post/post-form';
import { useToast } from '@/components/ui/use-toast';
import { PostSchema } from '@/schemas';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

const Create = () => {
  const router = useRouter();

  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof PostSchema>) => {
    startTransition(() => {
      createPost(values).then((data) => {
        if (!data.error) {
          router.push('/home');
          toast({
            title: 'you created a post',
          });
        }
      });
    });
  };

  const post = {
    title: '',
    body: '',
    tags: [],
    public: false,
    planId: undefined,
  };

  return (
    <PostForm
      type='create'
      post={post}
      submitting={isPending}
      handleSubmit={onSubmit}
    />
  );
};

export default Create;
