'use client';

import { removePlan, userPlans } from '@/actions/user/plans';
import { PlanCard } from '@/components/plans/plan-card';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

const Plans = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const [plans, setPlans] = useState([]);

  const handleEdit = (id: string) => router.push(`/plans/update?id=${id}`);

  const handleDelete = (id: string) => {
    removePlan(id).then(() => {
      toast({
        title: 'you deleted a plan',
      });
      updatePlans();
    });
  };

  const updatePlans = () => userPlans('full').then((data) => setPlans(data));

  useEffect(() => startTransition(() => updatePlans()), []);

  return isPending ? (
    'loading plans...'
  ) : plans.length !== 0 ? (
    <div className='container grid grid-cols-2 gap-5 p-5 md:grid-cols-3'>
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          transition={startTransition}
          {...plan}
        />
      ))}
    </div>
  ) : (
    'you have no plans'
  );
};

export default Plans;
