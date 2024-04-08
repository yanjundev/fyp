'use server';

import { searchPostsByTag } from '@/lib/services/post';
import { getDiscoveryPosts } from '@/lib/services/suggest/discover';
import { getPopularPosts } from '@/lib/services/suggest/popular';
import { getRecommendedPosts } from '@/lib/services/suggest/recommend';

export const postsByTag = async (tag: string) => {
  try {
    const posts = await searchPostsByTag(tag);

    return posts;
  } catch {
    return null;
  }
};

export const discoveryPosts = async () => {
  try {
    const posts = await getDiscoveryPosts();

    if (posts) return posts.filter((p) => p);

    return [];
  } catch {
    return null;
  }
};

export const popularPosts = async () => {
  try {
    const posts = await getPopularPosts();
    if (posts) return posts;

    return [];
  } catch {
    return null;
  }
};

export const recommendedPosts = async () => {
  try {
    const posts = await getRecommendedPosts();

    console.log(posts);

    if (posts) return posts;

    return [];
  } catch {
    return null;
  }
};
