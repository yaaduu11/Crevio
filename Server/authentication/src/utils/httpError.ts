import { Request, Response, NextFunction } from 'express';

export class HttpError extends Error {
    statusCode: number;
  
    constructor(statusCode: number, message: string, ) {
      super(message);
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
}

export const generateHttpError = (statusCode: number, message: string) =>{
    return new HttpError(statusCode, message)
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ message: err.message });
  }
  res.status(500).json({ message: "Internal server error" });
};