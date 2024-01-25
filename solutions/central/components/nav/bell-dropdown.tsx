import { BellIcon } from '@radix-ui/react-icons';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const BellDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BellIcon className='w-6 h-6 text-zinc-600' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='end'>
        <DropdownMenuItem>notif?</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
