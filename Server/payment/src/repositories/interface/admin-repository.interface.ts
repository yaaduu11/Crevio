import { SubscriptionPlanType, SubscriptionType } from "../../types";

export interface IAdminRepository {
    getAllPlans(): Promise<SubscriptionPlanType[]>
    editPlan(plan: SubscriptionType , planId: string): Promise<SubscriptionType>;
}