'use client';

import {
  DotsVerticalIcon,
  Pencil1Icon,
  TrashIcon,
} from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const EditItem = ({ id, handleEdit, handleDelete }: EditItemProps) => {
  const editItem = (e) => {
    e.stopPropagation();
    handleEdit(id);
  };

  const deleteItem = (e) => {
    e.stopPropagation();
    handleDelete(id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DotsVerticalIcon className='w-5 h-5 text-zinc-600 hover:text-zinc-300' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={editItem}>
          <Pencil1Icon className='mr-2 w-5 h-5 text-zinc-600' />
          edit
        </DropdownMenuItem>
        <DropdownMenuItem className='text-rose-600' onClick={deleteItem}>
          <TrashIcon className='mr-2 w-5 h-5' /> delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface EditItemProps {
  id: string;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}
