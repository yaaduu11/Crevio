import { SubscriptionPlanType, SubscriptionType } from "../../types";

export interface IAdminService {
    getAllPlans(): Promise<{plans: SubscriptionPlanType[]}>
    createPlan(plan: SubscriptionType): Promise<{newPlan :SubscriptionType}>;
}