'use client';

import { useRouter } from 'next/navigation';

import { useToast } from '@/components/ui/use-toast';
import { EditItem } from '@/components/edit-item';

import { removePlan } from '@/actions/user/plans';

import { Plan } from '@fyp/db';

export const PlanView = ({ plan, isCreator }: PlanViewProps) => {
  const router = useRouter();

  const { toast } = useToast();

  const handleEdit = (id: string) => router.push(`/plans/update?id=${id}`);

  const handleDelete = (id: string) => {
    removePlan(id).then(() => {
      router.push('/plans');
      toast({
        title: 'you deleted a plan',
      });
    });
  };

  return (
    <div className='container max-w-2xl flex flex-col space-y-5'>
      <div className='flex justify-between'>
        <h3 className='text-lg font-medium'>{plan.name}</h3>
        {isCreator && (
          <EditItem
            id={plan.id}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </div>

      <p className='text-zinc-600'>{plan.description}</p>

      <div className='space-y-2'>
        <h4 className='font-medium'>activities</h4>
        <div>
          {plan.activities.map((activity) => {
            return (
              <div className='flex space-x-5'>
                <p>{activity.name}</p>
                {activity.reps && <p>reps: {activity.reps}</p>}
                {activity.time && <p>time: {activity.time}</p>}
                {activity.weight && <p>weight: {activity.weight}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface PlanViewProps {
  plan: Plan;
  isCreator: boolean;
}
