import { db } from '@/lib/db';
import { getProfileId } from './profile';
import { addPopularPost } from '../services/suggest/popular';
import { MIN_DISCOVER_LIKES } from '../constants';

export const addLikedPost = async (postId: string) => {
  try {
    const profileId = await getProfileId();

    if (profileId) {
      await db.likedPosts.create({
        data: {
          post: {
            connect: { id: postId },
          },
          profile: {
            connect: { id: profileId },
          },
        },
      });
    }

    await getPostLikes(postId);
  } catch {
    return null;
  }
};

export const removeLikedPost = async (postId: string) => {
  try {
    const profileId = await getProfileId();

    if (profileId) {
      await db.likedPosts.deleteMany({
        where: {
          postId,
          profileId,
        },
      });
    }
  } catch (error) {
    console.log('error', error);
    return null;
  }
};

export const findLikedPost = async (postId: string) => {
  try {
    const profileId = await getProfileId();

    if (profileId) {
      const liked = await db.likedPosts.findFirst({
        where: {
          postId,
          profileId,
        },
      });

      if (liked) return true;
    }

    return false;
  } catch {
    return null;
  }
};

export const getPostLikes = async (postId: string) => {
  try {
    const liked = await db.likedPosts.findMany({
      where: {
        postId,
      },
      include: { profile: { include: { user: true } } },
    });

    // TODO: move out into service

    if (liked.length >= MIN_DISCOVER_LIKES) {
      await addPopularPost(postId);
    }

    return liked;
  } catch {
    return null;
  }
};
