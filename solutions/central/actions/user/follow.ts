'use server';

import {
  getFollowers,
  getFollowing,
  getProfileId,
  updateFollowing,
} from '@/lib/dao/profile';

/**
 * @returns all accounts that follow the user
 */
export const fetchFollowers = async () => {
  try {
    const followers = await getFollowers();

    if (followers) return followers;

    return [];
  } catch {
    return null;
  }
};

/**
 * @returns all accounts the user followers
 */
export const fetchFollowing = async () => {
  try {
    const following = await getFollowing();

    if (following) return following;

    return [];
  } catch {
    return null;
  }
};

/**
 * updates user's following with profile
 * @param followId id of the profile to follow
 */
export const followProfile = async (followId: string) => {
  try {
    const profileId = await getProfileId();

    if (profileId) {
      await updateFollowing(profileId, followId, true);
    }
  } catch {
    return null;
  }
};

/**
 * updates the user's following without the profile
 * @param followId id of the profile to unfollow
 */
export const unfollowProfile = async (followId: string) => {
  try {
    const profileId = await getProfileId();

    if (profileId) {
      await updateFollowing(profileId, followId);
    }
  } catch {
    return null;
  }
};

/**
 * removes the follow entry
 * @param followerId id of the follower's profile
 */
export const removeFollow = async (followerId: string) => {
  try {
    const profileId = await getProfileId();

    if (profileId) {
      await updateFollowing(followerId, profileId);
    }
  } catch {
    return null;
  }
};
