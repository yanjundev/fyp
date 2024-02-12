'use client';

import { useState, useTransition } from 'react';

import {
  followProfile,
  unfollowProfile,
  removeFollow,
} from '@/actions/user/follow';

import { Button } from '@/components/ui/button';
import { ProfileIcon } from '@/components/profile-icon';

export const FollowListItem = (user: FollowListItemProps) => {
  const [isPending, startTransition] = useTransition();
  const [actionType, setactionType] = useState(
    user.discover
      ? ActionType.FOLLOW
      : user.following
        ? ActionType.UNFOLLOW
        : ActionType.REMOVE,
  );

  const onClickActionTypeAction = (actionType: ActionType) => {
    startTransition(() => {
      switch (actionType) {
        case ActionType.FOLLOW:
          followProfile(user.profileId).then(() =>
            setactionType(ActionType.UNFOLLOW),
          );
          break;
        case ActionType.UNFOLLOW:
          unfollowProfile(user.profileId).then(() =>
            setactionType(ActionType.FOLLOW),
          );
          break;
        case ActionType.REMOVE:
          removeFollow(user.profileId).then(() =>
            setactionType(ActionType.FOLLOW),
          );
      }
    });
  };

  return (
    <div className='flex justify-between items-center py-1'>
      <ProfileIcon imageUrl={user.image} />
      <div className='flex-grow px-3'>{user.name || user.username}</div>
      <Button
        variant={actionType !== ActionType.FOLLOW ? 'outline' : 'default'}
        className='w-20'
        disabled={isPending}
        onClick={() => onClickActionTypeAction(actionType)}
      >
        {actionType}
      </Button>
    </div>
  );
};

enum ActionType {
  FOLLOW = 'follow',
  UNFOLLOW = 'unfollow',
  REMOVE = 'remove',
}

interface FollowListItemProps {
  image: string | null;
  profileId: string;
  name: string | null;
  username: string | null;
  following?: boolean;
  discover?: boolean;
}
