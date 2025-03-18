import { Request, Response, NextFunction } from "express";
import { IAdminController } from "../../interfaces/admin/IAdminController";
import { IAdminService } from "../../interfaces/admin/IAdminService";
import asyncHandler from "../../utils/asyncHandler";
import { httpStatusCodes } from "../../constants/statusCodes";
import { sendResponse } from "../../utils/responseModel";

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
            console.log('in controller');
            
            const {formData} = req.body
            console.log(formData);
            
            const {newPlan} = await this.adminService.createPlan(formData)
            console.log('success in everywhere');
            
            sendResponse(res, httpStatusCodes.OK, true, {newPlan})
        })(req ,res ,next)
    }
}   