'use server';

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
    const following = getUserSocialInfo();

    return following;
  } catch (error) {
    throw error;
  }
};
