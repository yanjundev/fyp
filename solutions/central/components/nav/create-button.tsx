'use client';

import { useRouter } from 'next/navigation';

interface CreateButtonProps {
  children?: React.ReactNode;
  link: string;
}

export const CreateButton = ({ children, link }: CreateButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(link);
  };

  return (
    <span onClick={onClick} className='cursor-pointer'>
      {children}
    </span>
  );
};
