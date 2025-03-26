import { Messages, httpStatusCodes } from "../../constants";
import { SubscriptionPlanType, SubscriptionType } from "../../types";
import { generateHttpError } from "../../utils";
import { IAdminRepository } from "../../repositories/interface/admin-repository.interface";
import { IAdminService } from "../interface/admin-service.interface"

export class AdminService implements IAdminService {
    constructor(private adminRepository: IAdminRepository) {}

    async getAllPlans(): Promise<{ plans: SubscriptionPlanType[]; }> {
        const plans = await this.adminRepository.getAllPlans()
        return {plans}
    }

    async createPlan(plan: SubscriptionType): Promise<{newPlan:SubscriptionType}> {        
        if(!plan) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.PLAN_NOT_FOUND)
        }

        const newPlanData: SubscriptionType = {
            price: plan.price,
            freelancer_services: plan.freelancer_services,
            client_services: plan.client_services,
        };
        
        const newPlan = await this.adminRepository.create(newPlanData)
        return {newPlan}
    }
}