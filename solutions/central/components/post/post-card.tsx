import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { UserBanner } from './user-banner';
import { PlanCard } from '../plans/plan-card';
import { useEffect, useState } from 'react';
import { checkPlanCreator } from '@/actions/user/plans';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  DotsVerticalIcon,
  Pencil1Icon,
  TrashIcon,
} from '@radix-ui/react-icons';

export const PostCard = ({
  post,
  handleEdit,
  handleDelete,
  handleTagClick,
}: PostCardProps) => {
  //   const handleProfileClick = () => {};

  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    checkPlanCreator(post.authorId).then((data) => setIsCreator(data));
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between items-center'>
          <UserBanner {...post.author} />
          {isCreator && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <DotsVerticalIcon className='mr-2 w-5 h-5 text-zinc-600' />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => handleEdit && handleEdit(post.id)}
                >
                  <Pencil1Icon className='mr-2 w-5 h-5 text-zinc-600' />
                  edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='text-rose-600'
                  onClick={() => handleDelete && handleDelete(post.id)}
                >
                  <TrashIcon className='mr-2 w-5 h-5' /> delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className='flex flex-col justify-between'>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <span>{post.tags}</span>
        {post.plan && (
          <PlanCard
            key={post.plan.id}
            id={post.plan.id}
            name={post.plan.name}
            created={post.plan.created}
          />
        )}
        <p className='text-zinc-600'>{post.postDate.toDateString()}</p>
      </CardContent>
      <CardFooter>like, share, comment</CardFooter>
    </Card>
  );
};

interface PostCardProps {
  post: PostCardType;
  handleEdit?: (id: string) => void;
  handleDelete?: (id: string) => void;
  handleTagClick?: () => void;
}

interface PostCardType {
  author: {
    image?: string | null;
    profileId: string;
    name?: string | null;
    username?: string | null;
  };
  plan: {
    id: string;
    creatorId: string | null;
    name: string;
    public: boolean;
    created: Date;
    edited: Date | null;
  };
  id: string;
  authorId: string;
  title: string;
  body: string;
  tags: string[];
  postDate: Date;
  isPublic: boolean;
}
