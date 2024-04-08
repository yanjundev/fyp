'use client';

import { profilePosts, removePost } from '@/actions/user/posts';
import { PostCard } from '@/components/post/post-card';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

const Posts = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const [posts, setPosts] = useState([]);

  const handleEdit = (id: string) => router.push(`posts/update?id=${id}`);

  const handleDelete = (id: string) => {
    removePost(id).then(() => {
      toast({
        title: 'you deleted a post',
      });
      updatePosts();
    });
  };

  const updatePosts = () => profilePosts().then((p) => setPosts(p));

  useEffect(() => {
    startTransition(() => updatePosts());
  }, []);

  return isPending ? (
    'loading posts...'
  ) : posts.length === 0 ? (
    'you have no posts'
  ) : (
    <div className='container flex flex-col space-y-5 flex-center'>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Posts;
