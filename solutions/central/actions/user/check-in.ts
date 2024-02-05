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
            await levelUp(profile);
          }
        }
      }
    }
  } catch (error) {
    throw error;
  }
};

export const checkInStatus = async () => {
  try {
    const status = await getHasCheckedIn();

    return status;
  } catch (error) {
    throw error;
  }
};
