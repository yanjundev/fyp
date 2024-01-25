import Link from 'next/link';

import { UserIcon } from '@/components/user-icon';
import { ExitIcon } from '@radix-ui/react-icons';
import { LogoutButton } from '@/components/nav';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const AccountDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserIcon imageSize={10} iconSize={6} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='end'>
        <DropdownMenuItem>
          <Link href='/profile'>Profile</Link>
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className='mr-2 w-4 h-4' />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
