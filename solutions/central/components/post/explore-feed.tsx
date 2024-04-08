import { Post } from '@prisma/client';

import { PostCard } from '@/components/post/post-card';

const PostList = ({ data }: { data: Post[] }) => {
  const posts = data.slice(0, 3);

  return (
    <div className='flex flex-col space-y-5 flex-center'>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export const ExploreFeed = ({ posts }: { posts: Post[] }) => {
  return (
    <div>
      {posts.length !== 0 ? (
        <PostList data={posts} />
      ) : (
        <p>what shit luck try again</p>
      )}
    </div>
  );
};
