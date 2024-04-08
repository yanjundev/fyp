'use client';

import { plansByTag } from '@/actions/explore/plans';
import { postsByTag } from '@/actions/explore/posts';
import { PlanCard } from '@/components/plans/plan-card';
import { PostCard, PostCardType } from '@/components/post/post-card';
import { PostFeed, PostList } from '@/components/post/post-feed';
import { Plan, Post } from '@fyp/db';
import { useEffect, useState } from 'react';

interface SearchProps {
  searchParams: { type: string; tag: string };
}

const Search = ({ searchParams }: SearchProps) => {
  const [posts, setPosts] = useState<PostCardType[]>([]);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    if (searchParams.type === 'post') {
      postsByTag(searchParams.tag).then((data) => {
        if (data) setPosts(data);
      });
    }

    if (searchParams.type === 'plan') {
      plansByTag(searchParams.tag).then((data) => {
        if (data) setPlans(data);
      });
      //
    }
  }, []);

  if (searchParams.type === 'post') {
    return posts.length === 0
      ? `there are no posts with that tag`
      : posts.map((post) => <PostCard post={post} />);
  }

  if (searchParams.type === 'plan') {
    return plans.length === 0
      ? 'there are no plans with that tag'
      : plans.map((plan) => <PlanCard {...plan} />);
  }

  return 'are you sure your search is correct?';
};

export default Search;
