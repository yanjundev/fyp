import { DISCOVER_API } from './urls';

import { getProfileById, getProfileId } from '@/lib/dao/profile';
import { getUserByProfile } from '@/lib/dao/user';
import { filterFollowing } from '@/lib/utils';

export const addDiscoverPost = async (postId: string) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await fetch(DISCOVER_API + '/posts/' + postId, options);
  } catch {
    return null;
  }
};

/**
 * @returns new posts from accounts the user doesn't follow
 */
export const getDiscoveryPosts = async () => {
  try {
    const res = await fetch(DISCOVER_API + '/posts');
    const data = await res.json();

    const filtered = await filterFollowing(data.posts);

    const user = await getProfileId();

    const format = Promise.all(
      filtered.map(async (post) => {
        if (user !== post.authorId) {
          let author;

          const profile = await getProfileById(post.authorId);

          if (profile) {
            const account = await getUserByProfile(profile?.id);

            author = {
              image: account?.image,
              profileId: profile.id,
              name: account?.name,
              username: account?.username,
            };
          }

          return {
            ...post,
            author,
          };
        }
      }),
    );

    const posts = await format;

    return posts;
  } catch {
    return null;
  }
};
