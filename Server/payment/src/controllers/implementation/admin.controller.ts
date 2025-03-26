import { Request, Response, NextFunction } from "express";
import { IAdminController } from "../interface/admin-controller.interface";
import { IAdminService } from "../../services/interface/admin-service.interface";
import { asyncHandler, sendResponse } from "../../utils";
import { httpStatusCodes } from "../../constants";

export class AdminController implements IAdminController {
    constructor(private adminService: IAdminService) {}

    getAllPlans(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req:Request, res: Response): Promise<void> => {
            const {plans} = await this.adminService.getAllPlans()
            sendResponse(res, httpStatusCodes.OK, true, {plans})
        })(req, res, next)
    }

    createPlan(req: Request, res: Response, next: NextFunction) : Promise<void> {
        return asyncHandler(async(req: Request, res: Response):Promise<void> => {
            const {formData} = req.body
            const {newPlan} = await this.adminService.createPlan(formData)
            
            sendResponse(res, httpStatusCodes.OK, true, {newPlan})
        })(req ,res ,next)
    }
}   