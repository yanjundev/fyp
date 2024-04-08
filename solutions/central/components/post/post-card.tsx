import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { UserBanner } from './user-banner';
import { useEffect, useState, useTransition } from 'react';
import { checkPlanCreator } from '@/actions/user/plans';

import { FileIcon, StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { Tag } from '../ui/tag-input';
import {
  likePost,
  likingPost,
  postLikes,
  unlikePost,
} from '@/actions/user/posts';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { EditItem } from '../edit-item';
import { useRouter } from 'next/navigation';

export const PostCard = ({ post, handleEdit, handleDelete }: PostCardProps) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [isCreator, setIsCreator] = useState(false);
  const [likedPost, setLikedPost] = useState(false);
  const [noOfLikes, setNoOfLikes] = useState(0);

  useEffect(() => {
    startTransition(() => {
      checkPlanCreator(post.authorId).then((data) => setIsCreator(data));
      likingPost(post.id).then((data) => setLikedPost(data));
      postLikes(post.id).then((data) => setNoOfLikes(data));
    });
  }, []);

  const handleLikePost = (e) => {
    e.stopPropagation();

    likePost(post.id).then(() => {
      setLikedPost(true);
      setNoOfLikes(noOfLikes + 1);
    });
  };

  const handleUnlikePost = (e) => {
    e.stopPropagation();

    unlikePost(post.id).then(() => {
      setLikedPost(false);
      setNoOfLikes(noOfLikes - 1);
    });
  };

  const handleClick = () => router.push(`/posts/view?postId=${post.id}`);

  useEffect(() => {
    checkPlanCreator(post.authorId).then((data) => setIsCreator(data));
  }, []);

  return (
    <Card
      className='flex flex-col justify-between cursor-pointer'
      onClick={handleClick}
    >
      <CardHeader>
        <div className='flex justify-between items-center'>
          <UserBanner {...post.author} />
          {isCreator && handleEdit && handleDelete && (
            <EditItem
              id={post.id}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        </div>
      </CardHeader>

      <CardContent className='flex flex-col justify-between space-y-2'>
        <div className='flex items-center'>
          {post.plan && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <FileIcon className='mr-2 w-5 h-5 text-zinc-600' />
                </TooltipTrigger>
                <TooltipContent>
                  <p className='text-base'>includes activity plan</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <h3 className='text-lg font-medium'>{post.title}</h3>
        </div>

        <p>{post.body}</p>

        <p className='text-zinc-600'>
          {typeof post.postDate === 'string'
            ? new Date(post.postDate).toDateString().toLowerCase()
            : post.postDate.toDateString().toLowerCase()}
        </p>

        <span className='flex flex-wrap'>
          {post.tags.length !== 0
            ? post.tags.map((tag) => {
                return (
                  <Tag
                    key={tag}
                    text={tag}
                    type='post'
                    className='mr-1 cursor-pointer text-zinc-500'
                    disabled
                  />
                );
              })
            : ''}
        </span>
      </CardContent>
      <CardFooter className='flex justify-between mt-[-10px]'>
        {likedPost ? (
          <span onClick={handleUnlikePost}>
            <StarFilledIcon className='mr-2 w-6 h-6 cursor-pointer' />
          </span>
        ) : (
          <span onClick={handleLikePost}>
            <StarIcon className='mr-2 w-6 h-6 cursor-pointer' />
          </span>
        )}
        <span>{noOfLikes === 1 ? '1 like' : `${noOfLikes} likes`}</span>
      </CardFooter>
    </Card>
  );
};

interface PostCardProps {
  post: PostCardType;
  handleEdit?: (id: string) => void;
  handleDelete?: (id: string) => void;
}

export interface PostCardType {
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
    tags: string[];
    public: boolean;
    created: Date;
    edited: Date | null;
  };
  likes: Object[];
  id: string;
  authorId: string;
  title: string;
  body: string;
  tags: string[];
  postDate: Date | string;
  isPublic: boolean;
}
