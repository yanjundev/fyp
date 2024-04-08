import { getProfileById, getProfileId } from '@/lib/dao/profile';

import { RECOMMEND_API } from './urls';
import { filterFollowing } from '@/lib/utils';
import { getUserByProfile } from '@/lib/dao/user';
import { getPostById } from '@/lib/dao/post';
import { filterNotEmpty } from '@fyp/utils';

export const getRecommendedPosts = async () => {
  try {
    const profileId = await getProfileId();

    const res = await fetch(RECOMMEND_API + '/posts/' + profileId);
    const data = await res.json();

    const postIds: string[] = data.posts;

    console.log(postIds);

    const promise = Promise.all(
      postIds.map(async (id) => {
        const post = await getPostById(id);
        return post;
      }),
    );

    const posts = filterNotEmpty(await promise);
    const filtered = await filterFollowing(posts);

    const format = Promise.all(
      filtered.map(async (post) => {
        const user = await getProfileId();

        if (post && user !== post.authorId) {
          let author;

          const profile = await getProfileById(post.authorId);

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
            ...post,
            author,
          };
        }
      }),
    );

    const recs = await format;

    return recs;
  } catch {
    return null;
  }
};

export const refreshRecommendedPosts = async () => {
  try {
    const profileId = await getProfileId();

    if (profileId) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await fetch(RECOMMEND_API + '/posts/' + profileId, options);
    }
  } catch {
    return null;
  }
};
