'use client';

import { useEffect, useState, useTransition } from 'react';

import { TbHexagonFilled } from 'react-icons/tb';

import { getLevelInfo } from '@/actions/user/profile';

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { UserInfo, SocialInfo, CheckInButton } from '@/components/home';

export const ProfileCard = () => {
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [exp, setExp] = useState('');
  const [threshold, setThreshold] = useState('');

  const updateLevelInfo = () => {
    getLevelInfo().then((info) => {
      if (info) {
        setName(info.username || info.name);
        setLevel(info.level);
        setExp(info.experience);
        setThreshold(info.threshold);
      }
    });
  };

  useEffect(() => {
    startTransition(() => updateLevelInfo());
  }, []);

  return (
    <div className='flex fixed flex-col justify-center mx-auto space-y-5 w-full max-w-sm'>
      <Card>
        <CardHeader>
          {isPending ? (
            <div className='flex items-center space-x-4'>
              <Skeleton className='h-20 w-20 rounded-full' />
              <div className='space-y-2'>
                <Skeleton className='h-5 w-56' />
                <Skeleton className='h-5 w-56' />
              </div>
            </div>
          ) : (
            <UserInfo
              name={name}
              level={level}
              exp={exp}
              threshold={threshold}
            />
          )}
        </CardHeader>
        <CardContent>
          {isPending ? (
            <div className='flex items-center space-x-4'>
              <Skeleton className='h-4 w-[200px]' />
              <Skeleton className='h-4 w-[200px]' />
            </div>
          ) : (
            <SocialInfo />
          )}

          <Separator className='my-8' />

          <div className='flex gap-6 mt-5 text-center'>
            <div className='flex-1'>
              <TbHexagonFilled className='w-full h-full text-zinc-200' />
            </div>
            <div className='flex-1'>
              <TbHexagonFilled className='w-full h-full text-zinc-200' />
            </div>
            <div className='flex-1'>
              <TbHexagonFilled className='w-full h-full text-zinc-200' />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <CheckInButton updateLevelInfo={updateLevelInfo} />
        </CardFooter>
      </Card>
    </div>
  );
};
