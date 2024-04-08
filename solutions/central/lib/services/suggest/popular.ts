import { filterFollowing, filterUser } from '@/lib/utils';
import { getProfileById, getProfileId } from '@/lib/dao/profile';
import { getUserByProfile } from '@/lib/dao/user';

import { POPULAR_API } from './urls';
import { filterNotEmpty } from '@fyp/utils';

export const addPopularPost = async (postId: string) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await fetch(POPULAR_API + '/posts/' + postId, options);
  } catch {
    return null;
  }
};

export const getPopularPosts = async () => {
  try {
    const res = await fetch(POPULAR_API + '/posts');
    const data = await res.json();

    const filtered = await filterUser(data.posts);

    const format = Promise.all(
      filtered.map(async (p) => {
        const user = await getProfileId();

        if (user !== p.authorId) {
          let author;
          const profile = await getProfileById(p.authorId);

          if (profile) {
            const account = await getUserByProfile(profile.id);
            author = {
              image: account?.image,
              profileId: profile.id,
              name: account?.name,
              username: account?.username,
            };
          }

          return {
            ...p,
            author,
          };
        }
      }),
    );

    const posts = filterNotEmpty(await format);

    if (posts) return posts;

    return [];
  } catch {
    return null;
  }
};
