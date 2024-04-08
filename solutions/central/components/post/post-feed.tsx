'use client';

import { Post } from '@prisma/client';

import { PostCard } from '@/components/post/post-card';
import { useEffect, useState } from 'react';
import { feedPosts } from '@/actions/user/posts';

export const PostList = ({ data }: { data: Post[] }) => {
  return (
    <div className='space-y-5'>
      {data.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
export const PostFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    feedPosts().then((data) => setPosts(data));
  }, []);

  return (
    <div className='relative w-full flex-center'>
      {posts.length !== 0 ? (
        <PostList data={posts} />
      ) : (
        <p className='text-center pt-20'>your feed is currently empty</p>
      )}
    </div>
  );
};
