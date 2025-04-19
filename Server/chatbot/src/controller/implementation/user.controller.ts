import { Request, Response, NextFunction } from 'express';
import { IUserService } from "../../services/interface/user-service.interface";
import { IUserController } from "../interface/user-controller.interface";
import { asyncHandler } from "../../utils/async-handler.util";
import { sendResponse } from "../../utils/response.util";
import { httpStatusCodes } from '../../constants/status-codes.constant';

export class UserController implements IUserController {
    constructor(private userService : IUserService) {}

    handleUserMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
        return asyncHandler(async (req: Request, res: Response): Promise<void> => {
            const { message } = req.body;
            console.log('the prompt is getting here');
            console.log(message);

            if (!message) {
                return sendResponse(res, httpStatusCodes.BAD_REQUEST, false, { error: "Missing 'message' in request body" });
            }

            const chatbotResponse = await this.userService.generateChatbotResponse(message);

            if (chatbotResponse === null) {
                return sendResponse(res, httpStatusCodes.INTERNAL_SERVER_ERROR, false, { error: "Failed to get response from chatbot" });
            }

            sendResponse(res, httpStatusCodes.OK, true, { response: chatbotResponse });
        })(req, res, next);
    }
}