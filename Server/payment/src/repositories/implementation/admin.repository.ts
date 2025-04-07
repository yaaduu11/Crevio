import { IAdminRepository } from "../interface/admin-repository.interface";
import SubscriptionPlan from "../../models/subscription-plan.model";
import { SubscriptionPlanType, SubscriptionType } from "../../types";


class AdminRepository implements IAdminRepository {
    async getAllPlans(): Promise<SubscriptionPlanType[]> {
        try {
            const plans = await SubscriptionPlan.find().lean()
            return plans
        } catch (error) {
            console.error(error);
            throw new Error("Error when getting all plans")
        }
    }


    async editPlan(plan: SubscriptionType , planId: string) : Promise<SubscriptionType> {
        try {
            const updatedPlan = await SubscriptionPlan.findByIdAndUpdate(
                planId,
                { $set: plan },
                { new: true }
            );
    
            if (!updatedPlan) {
                throw new Error("Plan not found");
            }
    
            return updatedPlan;
        } catch (error) {
            console.error(error);
            throw new Error("Error when creating the plan")
        }
    }
}

export default new AdminRepository