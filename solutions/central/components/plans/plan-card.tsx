'use client';

import {
  DotsVerticalIcon,
  Pencil1Icon,
  TrashIcon,
} from '@radix-ui/react-icons';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useEffect, useState } from 'react';
import { checkPlanCreator } from '@/actions/user/plans';

export const PlanCard = ({
  id,
  name,
  created,
  creatorId,
  handleEdit,
  handleDelete,
}: PlanCardProps) => {
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    console.log('plan check here');

    if (creatorId)
      checkPlanCreator(creatorId).then((data) => setIsCreator(data));
  }, []);

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='flex justify-between items-center'>
          <p className='font-semibold'>{name}</p>

          {isCreator && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <DotsVerticalIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleEdit && handleEdit(id)}>
                  <Pencil1Icon className='mr-2 w-5 h-5 text-zinc-600' />
                  edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='text-rose-600'
                  onClick={() => handleDelete && handleDelete(id)}
                >
                  <TrashIcon className='mr-2 w-5 h-5' /> delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardTitle>
        <CardDescription>description?</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col mt-5 space-y-5'>
        <p>{created.toUTCString()}</p>
      </CardContent>
    </Card>
  );
};

interface PlanCardProps {
  id: string;
  name: string;
  created: Date;
  creatorId?: string;
  handleEdit?: (id: string) => void;
  handleDelete?: (id: string) => void;
}
