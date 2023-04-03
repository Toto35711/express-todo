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

  login = async (req: Request, res: Response): Promise<Response> => {
    // cari data user by username
    const { username, password } = req.body;
    const user = await db.user.findOne({
      where: { username },
    });
    // check password
    // generate token
    return res.send(user);
  };
}

export default new AuthController();
