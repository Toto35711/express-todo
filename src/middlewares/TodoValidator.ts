import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const validate = [
  check("description").isString(),
  (req: Request, res: Response, next: NextFunction): Response | void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).send({ error: errors.array() });
    }

    return next();
  },
];

export default validate;
