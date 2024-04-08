import * as _ from 'underscore';

import { getLikedPostUsers, getLikedPosts } from '@/lib/dao/likes';
import {
  getSimilarPosts,
  getSimilarUsersForPosts,
  updateSimilarPosts,
  updateSimilarUsersForPosts,
} from '@/lib/dao/similar';

import { Suggestion } from '@fyp/db';

/**
 * @param userIds array of user ids
 * @returns liked post ids of users
 */
export const similarLikedPosts = async (userIds: string[]) => {
  try {
    // return liked posts of all users into an array
    const promise = Promise.all(
      userIds.map(async (userId) => {
        const posts = await getLikedPosts(userId);

        return posts ? posts : [];
      }),
    );

    const posts = (await promise).flat();

    return posts;
  } catch {
    throw 'error';
  }
};

/**
 * @param userId user for unrated similar posts
 * @param simIds array of similar users
 * @returns array of unrated posts (as ids) from similar users
 */
export const unratedSimilarPosts = async (userId: string, simIds: string[]) => {
  try {
    const ratedPosts = await getLikedPosts(userId);
    const similarPosts = await similarLikedPosts(simIds);

    return _.difference(_.unique(similarPosts), ratedPosts);
  } catch {
    throw 'error';
  }
};

/**
 * checks similarity based on users that have liked the same posts
 * @param userId id of user to update similarity for posts
 */
export const updateSimilarPostsSimilarity = async (userId: string) => {
  try {
    const postIds = await getLikedPosts(userId);

    const promise = Promise.all(
      postIds.map(async (postId) => {
        const users = await getLikedPostUsers(postId);

        return users.filter((u) => u !== userId);
      }),
    );

    const users = _.unique(_.flatten(await promise));

    // compute similarity right now
    // for each user: get liked posts, calc similarity
    const format = Promise.all(
      users.map(async (user) => {
        const otherPostIds = await getLikedPosts(user);

        // jacard's indices
        const sim =
          _.intersection(postIds, otherPostIds).length /
          _.union(postIds, otherPostIds).length;

        return {
          user: user,
          similarity: sim.toString(),
        };
      }),
    );

    const similarity = await format;

    await updateSimilarUsersForPosts(userId, similarity);
  } catch {
    throw 'error';
  }
};

export const updateSimilarPostsSuggestions = async (userId: string) => {
  try {
    const simUsers = await getSimilarUsersForPosts(userId);
    const simIds = simUsers.map((i) => i.user);

    const unratedPosts = await unratedSimilarPosts(userId, simIds);

    const promise = Promise.all(
      unratedPosts.map(async (postId) => {
        let similarity: number = 0;

        const users = await getLikedPostUsers(postId);

        users.map((userId) => {
          const isSimilar = simIds.includes(userId);

          if (isSimilar) {
            const ind = simUsers.findIndex((sim) => sim.user === userId);

            similarity += Number(simUsers[ind].similarity);
          }
        });

        return {
          item: postId,
          weight: (similarity / users.length).toString(),
        };
      }),
    );

    const suggestions = await promise;

    await updateSimilarPosts(userId, suggestions);
  } catch {
    throw 'error';
  }
};

export const suggestedPosts = async (userId: string) => {
  try {
    const posts: Suggestion[] = await getSimilarPosts(userId);

    if (posts.length > 0) {
      const desc = posts.sort((a, b) => (a.weight > b.weight ? -1 : 1));

      const filtered = desc.map((p) => p.item);

      return filtered;
    }

    return posts;
  } catch {
    throw 'error';
  }
};
