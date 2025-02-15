import { Request, Response, NextFunction } from 'express'

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  const statusCode = 500
  const message = 'Internal Server Error'

  res.status(statusCode).json({ error: message })
};

export default errorHandler;
