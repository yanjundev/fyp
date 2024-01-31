'use client';

interface SocialInfoProps {
  followers: number;
  following: number;
}

export const SocialInfo = ({ followers, following }: SocialInfoProps) => {
  return (
    <div className='flex justify-evenly'>
      <div className='flex flex-col items-center'>
        <span>followers</span>
        <span>{followers}</span>
      </div>
      <div className='flex flex-col items-center'>
        <span>following</span>
        <span>{following}</span>
      </div>
    </div>
  );
};
