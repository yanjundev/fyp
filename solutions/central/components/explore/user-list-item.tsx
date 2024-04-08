'use client';

import { Button } from '@/components/ui/button';
import { ProfileIcon } from '../profile-icon';
import { followProfile, unfollowProfile } from '@/actions/user/follow';
import { useState, useTransition } from 'react';

export const UserListItem = (user: FollowListItemProps) => {
  const [isPending, startTransition] = useTransition();
  const [actionType, setActionType] = useState(
    user.discover ? Types.FOLLOW : Types.UNFOLLOW,
  );

  const onClickTypeAction = (type: Types) => {
    startTransition(() => {
      switch (type) {
        case Types.FOLLOW:
          followProfile(user.profileId).then(() =>
            setActionType(Types.UNFOLLOW),
          );
          break;
        case Types.UNFOLLOW:
          unfollowProfile(user.profileId).then(() =>
            setActionType(Types.FOLLOW),
          );
          break;
      }
    });
  };

  return (
    <div className='flex items-center justify-between'>
      <ProfileIcon imageUrl={user.image} />
      <div>{user.name || user.username}</div>
      <Button
        disabled={isPending}
        onClick={() => onClickTypeAction(actionType)}
      >
        {actionType}
      </Button>
    </div>
  );
};

enum Types {
  FOLLOW = 'follow',
  UNFOLLOW = 'unfollow',
}

interface FollowListItemProps {
  image: string;
  profileId: string;
  name: string;
  username: string;
  following?: boolean;
  discover?: boolean;
}
