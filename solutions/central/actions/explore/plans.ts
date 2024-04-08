'use server';

import { searchPlansByTag } from '@/lib/services/plan';

export const plansByTag = async (tag: string) => {
  try {
    const plans = await searchPlansByTag(tag);

    return plans;
  } catch {
    return null;
  }
};
