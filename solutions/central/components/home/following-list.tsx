'use client';

import { useEffect, useState, useTransition } from 'react';

import { fetchFollowing } from '@/actions/user/follow';

import { FollowListItem } from '@/components/home/follow-list-item';

export const FollowingList = () => {
  const [isPending, startTransition] = useTransition();

  const [following, setFollowing] = useState([{}]);

  useEffect(() => {
    startTransition(() =>
      fetchFollowing().then((following) => setFollowing(following)),
    );
  }, []);

  return (
    <>
      {isPending
        ? 'loading...'
        : following.length === 0
          ? 'no following'
          : following.map((follower, n) => {
              const props = {
                following: true,
                ...follower,
              };
              return <FollowListItem key={n} {...props} />;
            })}
    </>
  );
};
