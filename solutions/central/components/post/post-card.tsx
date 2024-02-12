import { Follow, Post } from '@prisma/client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { UserBanner } from './user-banner';

export const PostCard = ({
  post,
  handleEdit,
  handleDelete,
  handleTagClick,
}: PostCardProps) => {
  //   const handleProfileClick = () => {};

  return (
    <Card>
      <CardHeader>
        <UserBanner {...post.author} />
      </CardHeader>
      <CardContent className='flex flex-col justify-between'>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <span>{post.tags}</span>
        <p className='text-zinc-600'>{post.postDate.toDateString()}</p>
      </CardContent>
      <CardFooter>like, share, comment</CardFooter>
    </Card>
  );
};

interface PostCardProps {
  post: PostCardType;
  handleEdit?: () => void;
  handleDelete?: () => void;
  handleTagClick?: () => void;
}

interface PostCardType {
  author: {
    image?: string | null;
    profileId: string;
    name?: string | null;
    username?: string | null;
  };
  id: string;
  authorId: string;
  title: string;
  body: string;
  tags: string[];
  postDate: Date;
  isPublic: boolean;
}
