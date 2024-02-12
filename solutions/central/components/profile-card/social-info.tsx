'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';

import { getFollowing } from '@/actions/user/profile';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { FollowerList, FollowingList } from '@/components/profile-card';

export const SocialInfo = () => {
  const [isPending, startTransition] = useTransition();

  const [postCount, setPostCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const [defaultOption, setDefaultOption] = useState('');

  const onFollowClick = (option: Option) => {
    setDefaultOption(option);
  };

  const followInfo = () =>
    getFollowing().then((info) => {
      if (info) {
        setFollowerCount(info.followers);
        setFollowingCount(info.following);
      }
    });

  useEffect(() => {
    startTransition(() => followInfo());
  }, []);

  return isPending ? (
    <div className='flex items-center space-x-4'>
      <Skeleton className='h-4 w-[200px]' />
      <Skeleton className='h-4 w-[200px]' />
    </div>
  ) : (
    <div className='flex justify-evenly'>
      <Dialog>
        <Link className='flex flex-col items-center' href='/posts'>
          <span>posts</span>
          <span>{postCount}</span>
        </Link>
        <DialogTrigger
          className='flex flex-col items-center'
          onClick={() => onFollowClick(Option.FOLLOWER)}
        >
          <span>followers</span>
          <span>{followerCount}</span>
        </DialogTrigger>
        <DialogTrigger
          className='flex flex-col items-center'
          onClick={() => onFollowClick(Option.FOLLOWING)}
        >
          <span>following</span>
          <span>{followingCount}</span>
        </DialogTrigger>
        <DialogContent>
          <Tabs defaultValue={defaultOption}>
            <TabsList>
              <TabsTrigger value={Option.FOLLOWER}>followers</TabsTrigger>
              <TabsTrigger value={Option.FOLLOWING}>following</TabsTrigger>
            </TabsList>
            <TabsContent onClick={() => followInfo()} value={Option.FOLLOWER}>
              <FollowerList />
            </TabsContent>
            <TabsContent onClick={() => followInfo()} value={Option.FOLLOWING}>
              <FollowingList />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

enum Option {
  FOLLOWER = 'followers',
  FOLLOWING = 'following',
}
