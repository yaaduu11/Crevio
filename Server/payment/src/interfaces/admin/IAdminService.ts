import { SubscriptionPlanType, SubscriptionType } from "../../types/subscriptionType";

export interface IAdminService {
    getAllPlans(): Promise<{plans: SubscriptionPlanType[]}>
    createPlan(plan: SubscriptionType): Promise<{newPlan :SubscriptionType}>;
}