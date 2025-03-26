import { ISubscription, SubscriptionPlanType } from "../../types"

export interface IUserRepository {
    createSubscription(subscriptionData: ISubscription): Promise<void> 
    findSubscriptionDataByUserId(userId: string): Promise<Partial<ISubscription> | null>;
    getPlansById(id: string| undefined): Promise<string | undefined>
}