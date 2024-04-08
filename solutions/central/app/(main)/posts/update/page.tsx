'use client';

import { editPlan, userPlan } from '@/actions/user/plans';
import { PlanForm } from '@/components/plans/plan-form';
import { useEffect, useState, useTransition } from 'react';

// forms
import * as z from 'zod';
import { PostSchema } from '@/schemas';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { editPost, getProfilePost } from '@/actions/user/posts';
import { PostForm } from '@/components/post/post-form';

interface UpdateProps {
  searchParams: { id: string };
}

const Update = ({ searchParams }: UpdateProps) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const [post, setPost] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const onUpdate = (values: z.infer<typeof PostSchema>) => {
    setSubmitting(true);
    editPost(searchParams.id, { ...values }).finally(() => {
      router.push('/posts');
      toast({
        title: 'you edited your post',
      });
      setSubmitting(false);
    });
  };

  useEffect(() => {
    startTransition(() =>
      getProfilePost(searchParams.id).then((data) => setPost(data)),
    );
  }, []);

  return isPending ? (
    'loading plan'
  ) : (
    <PostForm
      type='edit'
      post={post}
      submitting={submitting}
      handleSubmit={onUpdate}
    />
  );
};

export default Update;
