import { ISubscription } from "../../types"

export interface IUserRepository {
    createSubscription(subscriptionData: ISubscription): Promise<void> 
}