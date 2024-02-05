'use client';

import { PersonIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export const ProfileIcon = ({ imageUrl }: ProfileIconProps) => {
  return (
    <Avatar className={`w-10 h-10`}>
      <AvatarImage src={imageUrl || ''} />
      <AvatarFallback className='bg-zinc-500'>
        <PersonIcon className={`text-white h-6 w-6`} />
      </AvatarFallback>
    </Avatar>
  );
};

interface ProfileIconProps {
  imageUrl: string;
}
