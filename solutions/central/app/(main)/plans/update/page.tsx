'use client';

import { editPlan, userPlan } from '@/actions/user/plans';
import { PlanForm } from '@/components/plans/plan-form';
import { useEffect, useState, useTransition } from 'react';

// forms
import * as z from 'zod';
import { PlanSchema } from '@/schemas';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

interface UpdateProps {
  searchParams: { id: string };
}

const Update = ({ searchParams }: UpdateProps) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const [plan, setPlan] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const onUpdate = (values: z.infer<typeof PlanSchema>) => {
    setSubmitting(true);
    editPlan(searchParams.id, { ...values }).finally(() => {
      router.push('/plans');
      toast({
        title: 'you revised your plan',
      });
      setSubmitting(false);
    });
  };

  useEffect(() => {
    startTransition(() =>
      userPlan(searchParams.id).then((data) => setPlan(data)),
    );
  }, []);

  return isPending ? (
    'loading plan'
  ) : (
    <PlanForm
      type='update'
      plan={plan}
      setPlan={setPlan}
      submitting={submitting}
      handleSubmit={onUpdate}
    />
  );
};

export default Update;
