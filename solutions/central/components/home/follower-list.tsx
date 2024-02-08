'use client';

import { useEffect, useState, useTransition } from 'react';

import { fetchFollowers } from '@/actions/user/follow';

import { FollowListItem } from '@/components/home';

export const FollowerList = () => {
  const [isPending, startTransition] = useTransition();

  const [followers, setFollowers] = useState([{}]);

  useEffect(() => {
    startTransition(() =>
      fetchFollowers().then((follower) => setFollowers(follower)),
    );
  }, []);

  return (
    <>
      {isPending
        ? 'loading...'
        : followers.length === 0
          ? 'no followers'
          : followers.map((follower, n) => {
              const props = {
                following: false,
                ...follower,
              };
              return <FollowListItem key={n} {...props} />;
            })}
    </>
  );
};
