import { db } from '@/core/db';

export const getLikedPosts = async (userId: string) => {
  try {
    const likedPosts = await db.likedPosts.findMany({
      where: { profileId: userId },
      include: { post: true },
    });

    const publicPosts = likedPosts.filter((likedPost) => likedPost.post.public);

    const ids = publicPosts.map((likedPost) => likedPost.postId);

    return ids;
  } catch {
    throw 'error';
  }
};

export const getLikedPostUsers = async (postId: string) => {
  try {
    const users = await db.likedPosts.findMany({
      where: { postId },
      //   include: { profile: true },
    });

    const ids = users.map((user) => user.profileId);

    return ids;
  } catch {
    throw 'error';
  }
};
