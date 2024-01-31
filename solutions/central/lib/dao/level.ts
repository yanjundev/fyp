import { db } from '@/lib/db';

export const getThresholdByLevel = async (level: string) => {
  try {
    const data = await db.level.findUnique({ where: { level } });

    if (data) {
      return data.threshold;
    }
    return '100';
  } catch {
    return null;
  }
};
