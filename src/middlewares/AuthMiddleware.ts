import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  // TO DO: check some credentials
  if (!req.headers.authorization) {
    return res.status(401).send("not authenticated");
  }

  const secretKey: string = process.env.JWT_SECRET_KEY || "trapsilo";
  const token: string = req.headers.authorization.split(" ")[1];

  try {
    const credential: string | object = jwt.verify(token, secretKey);

    if (credential) {
      req.app.locals.credential = credential;
      next();
    } else {
      return res.send("token invalid");
    }
  } catch (error) {
    return res.send(error);
  }
};
