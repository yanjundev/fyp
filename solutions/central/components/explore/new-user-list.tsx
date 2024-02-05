import { getProfiles } from '@/lib/dao/profile';
import { FollowListItem } from '../home/follow-list-item';

export const NewUserList = async () => {
  // TODO: make this client component
  const users = await getProfiles();

  return (
    <div>
      {users?.map((user, index) => {
        const profile = {
          image: user.user.image,
          profileId: user.id,
          name: user.user.name,
          username: user.user.username,
          discover: true,
        };

        return <FollowListItem key={index} {...profile} />;
      })}
    </div>
  );
};
