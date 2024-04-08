'use client';

import { useEffect, useState } from 'react';

import {
  discoveryPosts,
  popularPosts,
  recommendedPosts,
} from '@/actions/explore/posts';
import { NewUserList } from '@/components/explore/new-user-list';
import { ExploreFeed } from '@/components/post/explore-feed';

const PostSection = ({ title, posts }) => {
  return (
    <div className='space-y-5'>
      <h3 className='text-xl font-medium'>{title}</h3>
      <ExploreFeed posts={posts} />
    </div>
  );
};

const Explore = () => {
  const [recommended, setRecommended] = useState([]);
  const [popular, setPopular] = useState([]);
  const [discovery, setDiscovery] = useState([]);

  useEffect(() => {
    recommendedPosts().then((posts) => setRecommended(posts));
    popularPosts().then((posts) => setPopular(posts));
    discoveryPosts().then((posts) => setDiscovery(posts));
  }, []);

  return (
    <div className='container flex justify-between mt-10 space-x-5 md:space-x-20'>
      <div className='flex flex-col flex-grow space-y-10'>
        {recommended.length === 0 ? null : (
          <PostSection title='handpicked for you' posts={recommended} />
        )}
        {popular.length === 0 ? null : (
          <PostSection title='popular now' posts={popular} />
        )}
        {discovery.length === 0 ? null : (
          <PostSection title='discover something new' posts={discovery} />
        )}
        {recommended.length === 0 &&
          popular.length === 0 &&
          discovery.length === 0 &&
          'looks like the world has ended : )'}
      </div>
      <NewUserList />
    </div>
  );
};

export default Explore;
