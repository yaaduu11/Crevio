import { SubscriptionPlanType, SubscriptionType } from "../../types";

export interface IAdminService {
    getAllPlans(): Promise<{plans: SubscriptionPlanType[]}>
    editPlan(plan: SubscriptionType, planId: string): Promise<{newPlan :SubscriptionType}>;
}