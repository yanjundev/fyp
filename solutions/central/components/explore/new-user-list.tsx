'use client';

import { useEffect, useState } from 'react';

import { FollowListItem } from '@/components/profile-card';
import { discoverUsers } from '@/actions/user/profile';

export const NewUserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    discoverUsers().then((data) => setUsers(data));
  }, []);

  return (
    <div className='flex flex-col space-y-2'>
      <h3 className='text-lg font-semibold'>new users</h3>
      <div>
        {users?.map((i, index) => {
          const profile = {
            image: i.user.image,
            profileId: i.id,
            name: i.user.name,
            username: i.user.username,
            discover: true,
          };

          return <FollowListItem key={index} {...profile} />;
        })}
      </div>
    </div>
  );
};
