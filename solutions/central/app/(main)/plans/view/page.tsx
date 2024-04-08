import { checkPlanCreator, userPlan } from '@/actions/user/plans';
import { PlanView } from '@/components/plans/plan-view';

interface ViewPlanProps {
  searchParams: { planId: string };
}

const ViewPlan = async ({ searchParams }: ViewPlanProps) => {
  const plan = await userPlan(searchParams.planId);

  let isCreator;

  if (plan?.creatorId) {
    isCreator = await checkPlanCreator(plan.creatorId);
  }

  return plan && (isCreator || plan.isPublic) ? (
    <PlanView plan={plan} isCreator={isCreator!!} />
  ) : (
    '404 this plan doesnt exist : )'
  );
};

export default ViewPlan;
