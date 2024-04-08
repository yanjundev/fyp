import { shuffle } from '@fyp/utils/shuffle';

import {
  addDiscoverPost,
  getDiscoverPost,
  getDiscoverPosts,
  pruneDiscoverPosts,
} from '@/lib/dao/discover';

/**
 * gets all discover posts and prunes older posts
 * @returns shuffled array of discover posts
 */
export const discoverPosts = async () => {
  try {
    const posts = await getDiscoverPosts();

    if (posts) {
      await pruneDiscoverPosts();

      const filtered = posts.map((p) => p.post);

      return shuffle(filtered);
    }

    return [];
  } catch {
    throw 'error';
  }
};

/**
 * add post to discover if not already in discover posts
 * @param postId id of post to be added
 */
export const updateDiscoverPosts = async (postId: string) => {
  try {
    const post = await getDiscoverPost(postId);

    if (!post) {
      await addDiscoverPost(postId);
    }

    return;
  } catch {
    throw 'error';
  }
};
