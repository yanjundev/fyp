import { getPlansByTag } from '../dao/plan';

export const searchPlansByTag = async (tag: string) => {
  try {
    const plans = await getPlansByTag(tag);

    return plans;
  } catch {
    return null;
  }
};
