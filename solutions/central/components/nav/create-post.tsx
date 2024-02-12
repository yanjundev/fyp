import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

export const CreateButton = () => {
  return (
    <Link href='/posts/create'>
      <Pencil2Icon className='w-6 h-6 text-zinc-600' />
    </Link>
  );
};
