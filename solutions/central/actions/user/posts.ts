'use server';

import * as z from 'zod';

import { PostSchema } from '@/schemas';
import {
  createPostForUser,
  deletePost,
  getPostById,
  getPostsCount,
  updatePost,
} from '@/lib/dao/post';
import { getProfileId } from '@/lib/dao/profile';
import { getFeedPosts, getProfilePosts } from '@/lib/services/post';
import {
  addLikedPost,
  findLikedPost,
  getPostLikes,
  removeLikedPost,
} from '@/lib/dao/liked-posts';
import { addDiscoverPost } from '@/lib/services/suggest/discover';
import { refreshRecommendedPosts } from '@/lib/services/suggest/recommend';

export const checkPostAuthor = async (authorId: string) => {
  try {
    const profileId = await getProfileId();

    return profileId === authorId;
  } catch {
    return null;
  }
};

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
      const post = await createPostForUser(
        profileId,
        title,
        body,
        tags,
        postDate,
        isPublic,
        planId,
      );

      if (post && post.public) await addDiscoverPost(post.id);
    }

    return { success: 'made post' };
  } catch {
    return { error: 'something went wrong' };
  }
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

export const getProfilePost = async (postId: string) => {
  try {
    const post = await getPostById(postId);

    return post;
  } catch {
    return null;
  }
};

export const profilePosts = async (id?: string) => {
  try {
    const posts = await getProfilePosts(id);

    if (posts) return posts;

    return [];
  } catch {
    return null;
  }
};

export const feedPosts = async () => {
  try {
    const posts = await getFeedPosts();

    if (posts) return posts;

    return [];
  } catch {
    return null;
  }
};

export const editPost = async (
  id: string,
  values: z.infer<typeof PostSchema>,
) => {
  try {
    const validateFields = PostSchema.safeParse(values);

    if (!validateFields.success) {
      return { error: 'invalid fields' };
    }

    const { title, body, tags, isPublic, planId } = values;

    await updatePost(id, title, body, tags, isPublic, planId);
  } catch {
    return null;
  }
};

export const removePost = async (postId: string) => {
  try {
    await deletePost(postId);
  } catch {
    return null;
  }
};

export const likePost = async (postId: string) => {
  try {
    await addLikedPost(postId);
    await refreshRecommendedPosts();
  } catch {
    return null;
  }
};

export const unlikePost = async (postId: string) => {
  try {
    await removeLikedPost(postId);
  } catch {
    return null;
  }
};

export const likingPost = async (postId: string) => {
  try {
    const likes = await findLikedPost(postId);
    return likes;
  } catch {
    return null;
  }
};

export const postLikes = async (postId: string) => {
  try {
    const likes = await getPostLikes(postId);

    return likes?.length;
  } catch {
    return null;
  }
};
