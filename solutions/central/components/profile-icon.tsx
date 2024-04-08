'use client';

import { PersonIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export const ProfileIcon = ({ imageUrl }: ProfileIconProps) => {
  return (
    <Avatar className={`w-7 h-7`}>
      <AvatarImage src={imageUrl || ''} />
      <AvatarFallback className='bg-zinc-500'>
        <PersonIcon className={`text-white h-5 w-5`} />
      </AvatarFallback>
    </Avatar>
  );
};

interface ProfileIconProps {
  imageUrl: string | null;
}
