import { Request, Response, NextFunction } from "express";

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  // TO DO: check some credentials
  next();
};
