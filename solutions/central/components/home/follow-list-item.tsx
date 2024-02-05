'use client';

import { useState, useTransition } from 'react';

import {
  followProfile,
  unfollowProfile,
  removeFollow,
} from '@/actions/user/follow';

import { ProfileIcon } from '@/components/profile-icon';
import { Button } from '@/components/ui/button';

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
    <div className='flex items-center justify-between'>
      <ProfileIcon imageUrl={user.image} />
      <div>{user.name || user.username}</div>
      <Button
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
  image: string;
  profileId: string;
  name: string;
  username: string;
  following?: boolean;
  discover?: boolean;
}
