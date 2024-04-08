'use client';

import { useRouter } from 'next/navigation';

import { useToast } from '@/components/ui/use-toast';

import * as z from 'zod';

import { PlanForm } from '@/components/plans/plan-form';
import { useState } from 'react';
import { makePlan } from '@/actions/user/plans';
import { PlanSchema } from '@/schemas';

const Create = () => {
  const router = useRouter();

  const { toast } = useToast();

  const [submitting, setSubmitting] = useState(false);

  const onCreate = (values: z.infer<typeof PlanSchema>) => {
    setSubmitting(true);
    makePlan(values)
      .then((data) => {
        router.push('/plans');
        toast({
          title: 'you made a plan',
        });
      })
      .finally(() => setSubmitting(false));
  };

  const plan = {
    name: '',
    activities: [],
    tags: [],
    isPublic: false,
  };

  return (
    <PlanForm
      type='create'
      plan={plan}
      submitting={submitting}
      handleSubmit={onCreate}
    />
  );
};

export default Create;
