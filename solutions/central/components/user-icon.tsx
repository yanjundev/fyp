'use client';

import { PersonIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useCurrentUser } from '@/hooks/use-current-user';

export const UserIcon = ({ imageSize, iconSize }: UserIconProps) => {
  const user = useCurrentUser();

  return (
    <Avatar className={`w-${imageSize} h-${imageSize}`}>
      <AvatarImage src={user?.image || ''} />
      <AvatarFallback className='bg-zinc-500'>
        <PersonIcon className={`text-white h-${iconSize} w-${iconSize}`} />
      </AvatarFallback>
    </Avatar>
  );
};

interface UserIconProps {
  imageSize: number;
  iconSize: number;
}
