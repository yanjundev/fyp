import { ProfileIcon } from '@/components/profile-icon';

export const UserBanner = (user: UserBannerProps) => {
  return (
    <div className='flex justify-between items-center'>
      <ProfileIcon imageUrl={user.image} />
      <div className='flex-grow px-2'>{user.name || user.username}</div>
    </div>
  );
};

interface UserBannerProps {
  image: string | null;
  profileId: string;
  name: string | null;
  username: string | null;
}
