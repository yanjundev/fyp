import { FileIcon, Pencil2Icon, PlusCircledIcon } from '@radix-ui/react-icons';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreateButton } from './create-button';

export const CreateDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <PlusCircledIcon className='w-7 h-7 text-zinc-600' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='end'>
        <CreateButton link='/create/post'>
          <DropdownMenuItem>
            <Pencil2Icon className='mr-2 w-6 h-6 text-zinc-600' />
            <p className='text-base'>create a post</p>
          </DropdownMenuItem>
        </CreateButton>
        <CreateButton link='/create/plan'>
          <DropdownMenuItem>
            <FileIcon className='mr-2 w-6 h-6 text-zinc-600' />
            <p className='text-base'>make a plan</p>
          </DropdownMenuItem>
        </CreateButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
