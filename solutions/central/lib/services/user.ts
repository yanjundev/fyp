import { getCurrentUser } from '@/lib/session';

import {
  getFollowsInfoByUserId,
  getProfile,
  getProfileByUserId,
  updateExperience,
  updateLastCheckIn,
  updateLevelAndExp,
} from '@/lib/dao/profile';
import { createProfileForUser } from '@/lib/dao/user';

const CHECK_IN_EXP = 15;

export const getUser = async () => {
  try {
    const user = await getCurrentUser();

    if (user) {
      const profileCheck = await getProfileByUserId(user.id);

      if (!profileCheck) {
        await createProfileForUser(user.id);
      }

      const profile = await getProfile();

      if (profile) {
        return { ...user, ...profile };
      }
    }
  } catch {
    return null;
  }
};

interface SocialInfo {
  followers: number;
  following: number;
}

export const getUserSocialInfo = async (): Promise<SocialInfo | null> => {
  try {
    const user = await getCurrentUser();

    if (user) {
      const info = await getFollowsInfoByUserId(user.id);

      return info;
    }

    return { followers: 0, following: 0 };
  } catch {
    return null;
  }
};

export const dailyCheckIn = async (id: string, experience: string) => {
  try {
    const newExp = Number(experience) + CHECK_IN_EXP;

    await updateLastCheckIn(id);
    await updateExperience(id, newExp.toString());

    return newExp;
  } catch {
    return null;
  }
};

export const levelUp = async (profile: profile) => {
  try {
    // increment profile level
    const newLevel = (Number(profile.level) + 1).toString();
    // calculate leftover and return
    const newExp = (
      Number(profile.threshold) - Number(profile.experience)
    ).toString();

    await updateLevelAndExp(profile.id, newLevel, newExp);
  } catch {
    return null;
  }
};

interface profile {
  threshold: string;
  id: string;
  userId: string;
  bio: string;
  level: string;
  experience: string;
  lastCheckIn: Date | null;
  badgeIds: string[];
}
