import { IUserRepository } from "../interface/user-repository.interface";
import { ISubscription } from "../../types";
import Subscription from "../../models/subscription.model";

class UserRepository implements IUserRepository {
    async createSubscription(subscriptionData: ISubscription): Promise<void> {
        try {
            await Subscription.create(subscriptionData)
        } catch (error) {
            console.error(error);
            throw new Error("Error when creating subscription")
        }
    }
}

export default new UserRepository