import { SubscriptionPlanType, SubscriptionType } from "../../types/subscriptionType";

export interface IAdminRepository {
    getAllPlans(): Promise<SubscriptionPlanType[]>
    create(plan: SubscriptionType): Promise<SubscriptionType>;
}