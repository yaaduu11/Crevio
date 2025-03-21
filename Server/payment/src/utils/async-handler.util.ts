import { Request, Response, NextFunction } from "express";
import { httpStatusCodes } from "../constants/statusCodes.constant";
import { Messages } from "../constants/messages.constant";
import { HttpError } from "./http-error.util";

export const asyncHandler = (fn: Function) => {
    return async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await fn(req, res, next);
        } catch (err) {
            if (err instanceof HttpError) {
                res.status(err.statusCode).json({ error: err.message });
            } else {
                res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: Messages.SERVER_ERROR });
            }
        }
    };
};
