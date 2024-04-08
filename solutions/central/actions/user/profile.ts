'use server';

import { shuffle } from '@fyp/utils';

import { getProfiles } from '@/lib/dao/profile';
import { getUser, getUserSocialInfo } from '@/lib/services/user';

export const getLevelInfo = async () => {
  try {
    const user = await getUser();

    return user;
  } catch (error) {
    throw error;
  }
};

export const getFollowing = async () => {
  try {
    const following = await getUserSocialInfo();

    return following;
  } catch (error) {
    throw error;
  }
};

export const discoverUsers = async () => {
  try {
    const profiles = await getProfiles();

    return shuffle(profiles);
  } catch {
    return null;
  }
};
