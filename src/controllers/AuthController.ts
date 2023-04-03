import { Request, Response } from "express";
const db = require("../db/models");
import Authentication from "../utils/Authentication";
class AuthController {
  constructor() {}

  register = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;
    const hashedPassword = await Authentication.passwordHash(password);
    const createdUser = await db.user.create({
      username,
      password: hashedPassword,
    });
    return res.send(createdUser);
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    // find user
    const { username, password } = req.body;
    const user = await db.user.findOne({
      where: { username },
    });

    // check password
    if (!user) {
      return res.status(404).send("user not found!");
    }

    const isPasswordCorrect = await Authentication.isPasswordCorrect(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).send("incorrect password!");
    }

    // generate token
    const token = Authentication.token(user.id, user.username, user.password);
    return res.send({ token });
  };
}

export default new AuthController();
