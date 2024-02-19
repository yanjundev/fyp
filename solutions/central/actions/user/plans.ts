'use server';

import * as z from 'zod';

import { PlanSchema } from '@/schemas';
import {
  createPlan,
  deletePlan,
  getPlanById,
  getPlans,
  updatePlan,
} from '@/lib/dao/plan';
import { getProfileId } from '@/lib/dao/profile';

export const checkPlanCreator = async (creatorId: string) => {
  try {
    const profileId = await getProfileId();

    return profileId === creatorId;
  } catch {
    return null;
  }
};
export const userPlans = async (type?: 'simple') => {
  try {
    const plans = await getPlans();

    if (!plans) {
      return;
    }

    if (type === 'simple') {
      const stripped = plans.map((p) => {
        return { id: p.id, name: p.name };
      });
      return stripped;
    }

    return plans;
  } catch {
    return null;
  }
};

export const userPlan = async (id: string) => {
  try {
    const plan = await getPlanById(id);

    return { ...plan, isPublic: plan?.public };
  } catch {
    return null;
  }
};

export const makePlan = async (values: z.infer<typeof PlanSchema>) => {
  const validateFields = PlanSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'invalid fields' };
  }

  const { name, activities, isPublic } = values;
  const createDate = new Date();

  try {
    await createPlan(name, activities, isPublic, createDate);
    return { success: 'yay' };
  } catch (error) {
    console.log('error', error);

    return null;
  }
};

export const editPlan = async (
  id: string,
  values: z.infer<typeof PlanSchema>,
) => {
  const validateFields = PlanSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'invalid fields' };
  }

  const { name, activities, isPublic } = values;
  const created = new Date();

  try {
    await updatePlan(id, name, activities, created, isPublic);
  } catch (error) {
    console.log('error', error);

    return null;
  }
};

export const removePlan = async (id: string) => {
  try {
    await deletePlan(id);
  } catch {
    return null;
  }
};
