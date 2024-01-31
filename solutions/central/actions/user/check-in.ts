'use server';

import { getProfile } from '@/lib/dao/profile';
import { dailyCheckIn, levelUp } from '@/lib/services/user';
import { getHasCheckedIn } from '@/lib/session';

export const checkIn = async () => {
  try {
    const profile = await getProfile();

    if (profile) {
      const checkedIn = await getHasCheckedIn();

      if (!checkedIn) {
        const newExp = await dailyCheckIn(profile.id, profile.experience);

        if (newExp) {
          if (newExp >= Number(profile.threshold)) {
            const leftover = await levelUp(profile);
            return leftover;
          }

          return {
            level: profile.level,
            exp: newExp.toString(),
            threshold: profile.threshold,
          };
        }
      }

      return {
        level: profile.level,
        exp: profile.experience,
        threshold: profile.threshold,
      };
    }
  } catch (error) {
    throw error;
  }

  return {
    level: '1',
    exp: '0',
    threshold: '100',
  };
};

export const checkInStatus = async () => {
  try {
    const status = getHasCheckedIn();

    return status;
  } catch (error) {
    throw error;
  }
};
