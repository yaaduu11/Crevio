import { SubscriptionPlanType, SubscriptionType } from "../../types";

export interface IAdminRepository {
    getAllPlans(): Promise<SubscriptionPlanType[]>
    create(plan: SubscriptionType): Promise<SubscriptionType>;
}