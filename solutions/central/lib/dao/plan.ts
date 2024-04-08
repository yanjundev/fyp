import { db } from '@/lib/db';
import { getProfileId } from './profile';
import { Activity } from '@prisma/client';

export const createPlan = async (
  name: string,
  description: string,
  activities: Activity[],
  tags: string[],
  created: Date,
  isPublic: boolean,
) => {
  try {
    const profileId = await getProfileId();

    if (profileId) {
      await db.plan.create({
        data: {
          creator: { connect: { id: profileId } },
          name,
          description,
          activities,
          tags,
          created,
          public: isPublic,
        },
      });
    }
  } catch (error) {
    console.log('error', error);

    return null;
  }
};

export const updatePlan = async (
  id: string,
  name: string,
  description: string | undefined,
  activities: Activity[],
  tags: string[],
  edited: Date,
  isPublic: boolean,
) => {
  try {
    await db.plan.update({
      where: { id },
      data: {
        name,
        description: description || null,
        activities,
        tags,
        edited,
        public: isPublic,
      },
    });
  } catch {
    return null;
  }
};

export const getPlans = async () => {
  try {
    const profileId = await getProfileId();

    const plans = await db.plan.findMany({ where: { creatorId: profileId } });

    return plans;
  } catch {
    return null;
  }
};

export const getPlanById = async (id: string) => {
  try {
    const plan = await db.plan.findUnique({ where: { id } });
    return plan;
  } catch {
    return null;
  }
};

export const deletePlan = async (id: string) => {
  try {
    await db.plan.delete({ where: { id } });
  } catch {
    return null;
  }
};

export const getPlansByTag = async (tag: string) => {
  try {
    const plans = await db.plan.findMany({
      where: { tags: { has: tag }, public: true },
    });

    return plans;
  } catch {
    return null;
  }
};
