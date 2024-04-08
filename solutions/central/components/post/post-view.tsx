'use client';

import { useRouter } from 'next/navigation';

import { useToast } from '@/components/ui/use-toast';
import { EditItem } from '@/components/edit-item';

import { removePost } from '@/actions/user/posts';
import { PlanView } from '../plans/plan-view';
import { Activity } from '@fyp/db';

export const PostView = ({ post, isCreator }: PostViewProps) => {
  const router = useRouter();

  const { toast } = useToast();

  const handleEdit = (id: string) => router.push(`posts/update?id=${id}`);

  const handleDelete = (id: string) => {
    removePost(id).then(() => {
      router.push('/home');
      toast({
        title: 'you deleted a post',
      });
    });
  };

  return (
    <div className='container max-w-2xl flex flex-col space-y-5'>
      <div className='flex justify-between'>
        <h3 className='text-lg font-medium'>{post.title}</h3>
        {isCreator && (
          <EditItem
            id={post.id}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </div>

      <p className='text-zinc-600'>{post.body}</p>

      {post.plan && (
        <>
          <p className='italic'>included activity plan</p>
          <PlanView plan={post.plan} isCreator={isCreator} />
        </>
      )}
    </div>
  );
};

interface PostViewProps {
  post: PostType;
  isCreator: boolean;
}

interface PostType {
  plan: {
    id: string;
    creatorId: string | null;
    name: string;
    description: string;
    activities: Activity[];
    tags: string[];
    public: boolean;
    created: Date;
    edited: Date | null;
  };
  id: string;
  authorId: string;
  title: string;
  body: string;
  tags: string[];
  postDate: Date | string;
}
