import { NextFunction, Request, Response } from "express";
import { IUserController } from "../interface/user-controller.interface";
import { IUserService } from "../../services/interface/user-service.interface";
import { asyncHandler, sendResponse } from "../../utils";
import { httpStatusCodes } from "../../constants";


export class UserController implements IUserController {
    constructor(private userService: IUserService) {}

    createCheckoutSession(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async (req: Request, res: Response): Promise<void> => {
            const { planId, amount, userId } = req.body;
            const sessionUrl = await this.userService.createStripeSession(planId, amount, userId);
            if (!sessionUrl) {                
                return sendResponse(res, httpStatusCodes.BAD_REQUEST, false, { error: "Failed to generate Stripe checkout URL" });
            }

            sendResponse(res, httpStatusCodes.OK, true, { url: sessionUrl });
        })(req, res, next);

    }

    handleWebhook(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async (req: Request, res: Response): Promise<void> => {
            const sig = req.headers["stripe-signature"] as string;    
            const event = this.userService.verifyStripeWebhook(Buffer.from(req.body), sig);
            if (!event) {
                return sendResponse(res, httpStatusCodes.BAD_REQUEST, false, undefined, "Invalid Stripe event");
            }
        
            res.json({ received: true });
            this.userService.processStripeEvent(event);
        })(req, res, next);
    }
    
    
    checkUserSubscribed(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async(req: Request, res: Response): Promise<void> => {
            const {userId} = JSON.parse(req.headers['x-user-payload'] as string)
            const {planName} = await this.userService.checkUserSubscribed(userId)
            
            sendResponse(res, httpStatusCodes.OK, true, {planName})
        })(req, res, next)
    }
}