'use client';

import { getProfilePosts, removePost, updatePost } from '@/actions/user/posts';
import { PostCard } from '@/components/post/post-card';
import { useToast } from '@/components/ui/use-toast';
import { useEffect, useState, useTransition } from 'react';

const Posts = () => {
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const [posts, setPosts] = useState([]);

  const handleDelete = (id: string) => {
    removePost(id).then(() => {
      toast({
        title: 'you deleted a post',
      });
      updatePosts();
    });
  };

  const updatePosts = () => getProfilePosts().then((p) => setPosts(p));

  useEffect(() => {
    startTransition(() => updatePosts());
  }, []);

  return isPending ? (
    'loading posts...'
  ) : posts.length === 0 ? (
    'you have no posts'
  ) : (
    <div className='container w-full flex-center'>
      <div className='space-y-5'>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
