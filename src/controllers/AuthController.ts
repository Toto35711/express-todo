import { Request, Response } from "express";
const db = require("../db/models");
import Authentication from "../utils/Authentication";
import AuthService from "../services/AuthService";
class AuthController {
  constructor() {}

  register = async (req: Request, res: Response): Promise<Response> => {
    const authService = new AuthService(req);
    const createdUser = await authService.store();

    return res.send({ data: createdUser, message: "success" });
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    const authService = new AuthService(req);
    const loginResponse = await authService.login();

    return res.status(loginResponse.statusCode).send({
      token: loginResponse.token,
      message: loginResponse.statusMessage,
    });
  };

  profile = async (req: Request, res: Response): Promise<Response> => {
    const authService = new AuthService(req);
    const profile = await authService.getProfile();

    return res.send(profile);
  };
}

export default new AuthController();
