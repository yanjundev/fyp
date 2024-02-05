import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { getUserById } from '@/lib/dao/user';

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
      return { ...user, ...profile, threshold: level.threshold };
    }
  } catch {
    return null;
  }
};

/**
 * returns the user profile
 * @param id profile id
 */
export const getProfileById = async (id: string) => {
  try {
    const profile = await db.profile.findUnique({ where: { id } });

    return profile;
  } catch {
    return null;
  }
};

/**
 * returns the user profile
 * @param userId id of profile user
 */
export const getProfileByUserId = async (userId: string) => {
  try {
    const profile = await db.profile.findUnique({ where: { userId } });

    return profile;
  } catch {
    return null;
  }
};

/**
 * returns the profile id
 */
export const getProfileId = async () => {
  try {
    const user = await getCurrentUser();

    const profile = await db.profile.findUnique({
      where: { userId: user?.id },
    });

    return profile?.id;
  } catch {
    return null;
  }
};

/**
 *  returns all profiles excluding self and following
 */
export const getProfiles = async () => {
  try {
    const profileId = await getProfileId();

    if (profileId) {
      const excludeIds = [{ id: profileId }];

      const following = await getFollowing();

      if (following) {
        following.map((f) => excludeIds.push({ id: f.profileId }));
      }

      const profiles = await db.profile.findMany({
        where: {
          NOT: excludeIds,
        },
        include: { user: true },
        take: 10,
      });

      return profiles;
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
 * returns all the followers of the user
 */
export const getFollowers = async () => {
  try {
    const profileId = await getProfileId();

    if (profileId) {
      const follows = await db.follow.findMany({
        where: { followingId: profileId },
        select: { profile: true },
      });

      const followers = Promise.all(
        follows.map(async (follow) => {
          const following = follow.profile;

          const user = await getUserById(following.userId);

          if (user) {
            return {
              image: user.image,
              profileId: following.id,
              name: user.name,
              username: user.username,
            };
          }
        }),
      );

      return followers;
    }
  } catch {
    return null;
  }
};

/**
 * returns all the user's followed accounts
 */
export const getFollowing = async () => {
  try {
    const profileId = await getProfileId();

    if (profileId) {
      const follows = await db.follow.findMany({
        where: { profileId },
        select: { following: true },
      });

      const followed = Promise.all(
        follows.map(async (follow) => {
          const following = follow.following;

          const user = await getUserById(following.userId);

          if (user) {
            return {
              image: user.image,
              profileId: following.id,
              name: user.name,
              username: user.username,
            };
          }
        }),
      );

      return followed;
    }
  } catch {
    return null;
  }
};

/**
 * create/delete followers
 * @param followerId profile id of account of the follower
 * @param followedId profile id of account being followed
 */
export const updateFollowing = async (
  followerId: string,
  followedId: string,
  following?: boolean,
) => {
  try {
    if (following) {
      await db.follow.create({
        data: {
          profile: {
            connect: {
              id: followerId,
            },
          },
          following: { connect: { id: followedId } },
        },
      });
    } else {
      await db.follow.deleteMany({
        where: {
          profileId: followerId,
          followingId: followedId,
        },
      });
    }
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
