import { db } from '@/lib/db';

import {
  MIN_LEVEL,
  MAX_LEVEL,
  BASE_EXP,
  EXP_GROWTH_MULTIPLIER,
} from '@/lib/constants';

const calculateThresholdForLevel = (level: number): number => {
  const maxExp = Math.floor(
    BASE_EXP * Math.pow(EXP_GROWTH_MULTIPLIER, level - 1),
  );

  return maxExp;
};

export const createDefaultLevels = async () => {
  await db.level.deleteMany({});

  for (let i = MIN_LEVEL; i <= MAX_LEVEL; i++) {
    await db.level.create({
      data: {
        level: i.toString(),
        threshold: calculateThresholdForLevel(i).toString(),
      },
    });
  }
};
