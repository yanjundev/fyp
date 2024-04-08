import { getPostLikes } from '../dao/liked-posts';
import {
  getPostsByProfile,
  getPostsByProfiles,
  getPostsByTag,
} from '../dao/post';
import { getAuthorProfile, getFollowing, getProfileId } from '../dao/profile';
import { getUserByProfile } from '../dao/user';

export const getProfilePosts = async (id?: string) => {
  try {
    let profileId: string | undefined = id;

    if (id === undefined) {
      profileId = (await getProfileId()) as string;
    }

    const posts = await getPostsByProfile(profileId as string);

    const user = await getUserByProfile(profileId as string);

    if (posts && user) {
      const mapped = Promise.all(
        posts.map(async (post) => {
          const likes = await getPostLikes(post.id);

          return {
            ...post,
            author: user
              ? {
                  image: user.image,
                  profileId,
                  name: user.name,
                  username: user.username,
                }
              : null,
            likes,
          };
        }),
      );

      return mapped;
    }
  } catch {
    return null;
  }
};

export const getFeedPosts = async () => {
  try {
    const following = await getFollowing();

    if (following) {
      const existing = following
        .filter((follow) => follow?.profileId)
        .map((f) => f!);

      const ids = existing.map((follow) => follow?.profileId!);

      const posts = await getPostsByProfiles(ids);

      if (posts) {
        const sorted = Promise.all(
          posts.map(async (post) => {
            const author = existing.find(
              (follow) => follow.profileId === post.authorId,
            );
            const likes = await getPostLikes(post.id);
            return {
              ...post,
              author: author
                ? {
                    ...author,
                  }
                : null,
              likes,
            };
          }),
        );
        return sorted;
      }
    }
  } catch {
    return null;
  }
};

export const searchPostsByTag = async (tag: string) => {
  try {
    const posts = await getPostsByTag(tag);

    if (posts) {
      const promise = Promise.all(
        posts.map(async (post) => {
          const author = await getAuthorProfile(post.authorId);
          return {
            ...post,
            author,
          };
        }),
      );

      const format = await promise;

      return format;
    }
  } catch {
    return null;
  }
};
