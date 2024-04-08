import { shuffle } from '@fyp/utils/shuffle';

import {
  addPopularPost,
  getPopularPost,
  getPopularPosts,
  prunePopularPosts,
} from '@/lib/dao/popular';

export const popularPosts = async () => {
  try {
    const posts = await getPopularPosts();

    if (posts) {
      await prunePopularPosts();

      const shuffled = shuffle(posts).map((p) => p.post);

      return shuffled;
    }

    return [];
  } catch {
    throw 'error';
  }
};

export const updatePopularPosts = async (postId: string) => {
  try {
    const post = await getPopularPost(postId);

    if (!post) {
      await addPopularPost(postId);
    }

    return;
  } catch {
    throw 'error';
  }
};
