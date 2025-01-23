import { Request, Response, NextFunction } from "express";

const asyncHandler = (fn: Function) => {
    return async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        Promise.resolve(fn(req, res, next)).catch(next)
    };
};

export default asyncHandler