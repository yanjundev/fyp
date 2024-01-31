import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';

/**
 * returns profile with additional info (level threshold)
 * @returns {Promise<Object>}
 */
export const getProfile = async () => {
  try {
    const user = await getCurrentUser();

    const profile = await db.profile.findUnique({
      where: { userId: user?.id },
    });

    const level = await db.level.findUnique({
      where: { level: profile?.level },
    });

    if (profile && level) {
      return { ...profile, threshold: level.threshold };
    }
  } catch {
    return null;
  }
};

/**
 * returns an object of the follower and following count
 * @param id the user id
 * @returns {Object}
 */
export const getFollowsInfoByUserId = async (id: string) => {
  try {
    const followsInfo = await db.profile.findMany({
      where: { userId: id },
      select: {
        _count: {
          select: { followers: true, following: true },
        },
      },
    });

    return followsInfo[0]._count;
  } catch {
    return null;
  }
};

/**
 * create a follow
 * @param followerId profile id of account of the follower
 * @param followedId profile id of account being followed
 */
export const updateFollowing = async (
  followerId: string,
  followedId: string,
) => {
  try {
    const following = await db.user.findFirst({
      where: { profile: { id: followedId } },
    });

    await db.follow.create({
      data: {
        name: following?.name,
        username: following?.username,
        profile: {
          connect: {
            id: followerId,
          },
        },
        following: { connect: { id: followedId } },
      },
    });
  } catch {
    return null;
  }
};

/**
 * updates the profile's exp
 * @param id the profile id
 * @param experience the new experience value
 */
export const updateExperience = async (id: string, experience: string) => {
  try {
    await db.profile.update({
      where: { id },
      data: {
        experience,
      },
    });
  } catch {
    return null;
  }
};

/**
 * updates the profile's level and exp
 * @param id the profile id
 * @param level the new level
 * @param experience the new experience value
 */
export const updateLevelAndExp = async (
  id: string,
  level: string,
  experience: string,
) => {
  try {
    await db.profile.update({
      where: { id },
      data: {
        level,
        experience,
      },
    });
  } catch {
    return null;
  }
};

/**
 * sets lastCheckIn to today's date
 * @param id the profile id
 */
export const updateLastCheckIn = async (id: string) => {
  try {
    await db.profile.update({
      where: { id },
      data: { lastCheckIn: new Date() },
    });
  } catch {
    return null;
  }
};
