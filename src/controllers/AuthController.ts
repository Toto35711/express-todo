import { Request, Response } from "express";
const db = require("../db/models");
import PasswordHash from "../utils/PasswordHash";
class AuthController {
  constructor() {}

  register = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;
    const hashedPassword = await PasswordHash.hash(password);
    const createdUser = await db.user.create({
      username,
      password: hashedPassword,
    });
    return res.send(createdUser);
  };

  login(req: Request, res: Response): Response {
    return res.send("create: 200!");
  }
}

export default new AuthController();
