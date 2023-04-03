import { Request, Response } from "express";

class AuthController {
  constructor() {}

  index(req: Request, res: Response): Response {
    return res.send("index: 200!");
  }

  create(req: Request, res: Response): Response {
    return res.send("create: 200!");
  }
}

export default new AuthController();
