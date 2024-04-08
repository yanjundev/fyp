import { db } from '@/core/db';
import { Similarity, Suggestion } from '@fyp/db';

export const getSimilarPosts = async (userId: string) => {
  try {
    const posts = await db.similarPosts.findUnique({
      where: { profileId: userId },
    });

    if (posts) return posts.suggestions;

    return [];
  } catch {
    throw 'error';
  }
};

export const getSimilarUsersForPosts = async (userId: string) => {
  try {
    const sim = await db.similarPosts.findUnique({
      where: { profileId: userId },
    });

    if (sim) return sim.similarity;

    return [];
  } catch {
    throw 'error';
  }
};

export const updateSimilarUsersForPosts = async (
  userId: string,
  similarity: Similarity[],
) => {
  try {
    await db.similarPosts.upsert({
      where: { profileId: userId },
      create: {
        profile: {
          connect: {
            id: userId,
          },
        },
        similarity,
      },
      update: {
        similarity,
      },
    });
  } catch {
    throw 'error';
  }
};

export const updateSimilarPosts = async (
  userId: string,
  suggestions: Suggestion[],
) => {
  try {
    await db.similarPosts.update({
      where: { profileId: userId },
      data: { suggestions },
    });
  } catch {
    throw 'error';
  }
};
