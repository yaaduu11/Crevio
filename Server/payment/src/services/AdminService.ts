import { Messages } from "../constants/messages";
import { httpStatusCodes } from "../constants/statusCodes";
import { IAdminRepository } from "../interfaces/admin/IAdminRepository";
import { IAdminService } from "../interfaces/admin/IAdminService"
import { SubscriptionPlanType, SubscriptionType } from "../types/subscriptionType";
import { generateHttpError } from "../utils/httpError";

export class AdminService implements IAdminService {
    constructor(private adminRepository: IAdminRepository) {}

    async getAllPlans(): Promise<{ plans: SubscriptionPlanType[]; }> {
        const plans = await this.adminRepository.getAllPlans()
        return {plans}
    }

    async createPlan(plan: SubscriptionType): Promise<{newPlan:SubscriptionType}> {
        console.log('in service');
        
        if(!plan) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.PLAN_NOT_FOUND)
        }

        console.log('to repo');

        const newPlanData: SubscriptionType = {
            price: plan.price,
            freelancer_services: plan.freelancer_services,
            client_services: plan.client_services,
        };
        
        const newPlan = await this.adminRepository.create(newPlanData)
        console.log('service ok')
        return {newPlan}
    }
}