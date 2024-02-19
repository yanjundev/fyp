'use server';

import * as z from 'zod';

import { PostSchema } from '@/schemas';
import {
  createPostForUser,
  deletePost,
  getPostsByProfile,
  getPostsByProfiles,
  getPostsCount,
} from '@/lib/dao/post';
import { getProfile, getProfileId } from '@/lib/dao/profile';
import { fetchFollowing } from './follow';

export const createPost = async (values: z.infer<typeof PostSchema>) => {
  const validateFields = PostSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'invalid fields found' };
  }

  const { title, body, tags, isPublic, planId } = validateFields.data;
  const postDate = new Date();

  try {
    const profileId = await getProfileId();

    if (profileId) {
      await createPostForUser(
        profileId,
        title,
        body,
        tags,
        postDate,
        isPublic,
        planId,
      );
    }
  } catch {
    return { error: 'something went wrong' };
  }
  return { success: 'login success' };
};

export const getProfilePostCount = async () => {
  try {
    const count = await getPostsCount();

    if (count) {
      return count;
    }
  } catch {
    return null;
  }
};

export const getProfilePosts = async (id?: string) => {
  try {
    const posts = await getPostsByProfile(id);

    return posts;
  } catch {
    return null;
  }
};

export const getFeedPosts = async () => {
  try {
    const following = await fetchFollowing();

    if (following) {
      const existing = following
        .filter((follow) => follow?.profileId)
        .map((f) => f!);

      const ids = existing.map((follow) => follow?.profileId!);

      const posts = await getPostsByProfiles(ids);

      if (posts) {
        const sorted = posts.map((post) => {
          const author = existing.find(
            (follow) => follow.profileId === post.authorId,
          );
          return {
            ...post,
            author: author
              ? {
                  ...author,
                }
              : null,
          };
        });
        return sorted;
      }
    }
  } catch {
    return null;
  }
};

export const updatePost = async (values: z.infer<typeof PostSchema>) => {};

export const removePost = async (postId: string) => {
  try {
    await deletePost(postId);
  } catch {
    return null;
  }
};
