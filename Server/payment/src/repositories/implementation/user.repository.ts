import { IUserRepository } from "../interface/user-repository.interface";
import { ISubscription, SubscriptionPlanType } from "../../types";
import Subscription from "../../models/subscription.model";
import SubscriptionPlan from "../../models/subscription-plan.model"

class UserRepository implements IUserRepository {
    async createSubscription(subscriptionData: ISubscription): Promise<void> {
        try {
            await Subscription.create(subscriptionData);
        } catch (error) {
            console.error("Error when creating subscription:", error);
            throw new Error("Error when creating subscription");
        }
    }

    async findSubscriptionDataByUserId(userId: string): Promise<Partial<ISubscription> | null> {
        try {
            const plan = await Subscription.findOne({userId: userId}).lean().exec()
            return plan
        } catch (error) {
            console.error("Error when finding subscription:", error);
            throw new Error("Error when finding subscription");
        }
    }

    async getPlansById(id: string|undefined): Promise<string | undefined> {
        try {
            const plan = await SubscriptionPlan.findById(id)
            return plan?.planName
        } catch (error) {
            console.error("Error when finding plan:", error);
            throw new Error("Error when finding plan");
        }
    }
    
}

export default new UserRepository