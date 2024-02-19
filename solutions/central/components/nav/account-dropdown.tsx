import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { UserIcon } from '@/components/user-icon';
import { ExitIcon } from '@radix-ui/react-icons';
import { LogoutButton } from '@/components/nav';

export const AccountDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserIcon imageSize={10} iconSize={6} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='end'>
        <DropdownMenuItem>
          <Link href='/profile' className='text-base'>
            profile
          </Link>
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className='mr-2 w-6 h-6' />
            <p className='text-base'>logout</p>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
