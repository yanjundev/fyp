'use client';

import { useEffect, useState } from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

import { Tag } from '@/components/ui/tag-input';

import { checkPlanCreator } from '@/actions/user/plans';
import { EditItem } from '../edit-item';
import { useRouter } from 'next/navigation';

export const PlanCard = ({
  id,
  name,
  description,
  activities,
  tags,
  created,
  creatorId,
  handleEdit,
  handleDelete,
}: PlanCardProps) => {
  const router = useRouter();

  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    if (creatorId)
      checkPlanCreator(creatorId).then((data) => setIsCreator(data));
  }, []);

  const handleClick = () => router.push(`/plans/view?planId=${id}`);

  return (
    <Card
      className='flex flex-col justify-between cursor-pointer'
      onClick={handleClick}
    >
      <CardHeader>
        <div className='flex justify-between items-center'>
          <p className='font-semibold text-lg'>{name}</p>

          {isCreator && handleEdit && handleDelete && (
            <EditItem
              id={id}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className={`text-lg ${description ? '' : 'text-zinc-500'}`}>
          {description ? description : 'no description set'}
        </p>
      </CardContent>
      <CardFooter className='flex flex-col justify-between items-start space-y-2'>
        <p className='text-zinc-600'>
          {typeof created === 'string'
            ? new Date(created).toDateString().toLowerCase()
            : created.toDateString().toLowerCase()}
        </p>

        <span className='flex flex-wrap'>
          {tags.length !== 0
            ? tags.map((tag) => {
                return (
                  <Tag
                    key={tag}
                    text={tag}
                    type='plan'
                    className='mr-1 cursor-pointer text-zinc-500'
                    disabled
                  />
                );
              })
            : ''}
        </span>
      </CardFooter>
    </Card>
  );
};

interface PlanCardProps {
  id: string;
  name: string;
  description: string;
  activities: string[];
  tags: string[];
  created: Date;
  creatorId?: string;
  handleEdit?: (id: string) => void;
  handleDelete?: (id: string) => void;
}
