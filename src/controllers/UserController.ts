import { Request, Response } from "express";
import UserService from "../services/UserService";
class UserController {
  constructor() {}

  index = async (req: Request, res: Response): Promise<Response> => {
    const service = new UserService(req);
    const users = await service.getAll();
    return res.send({ data: users, message: "success" });
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    const service = new UserService(req);
    const user = await service.getOne();
    return res.send({ data: [user], message: "success" });
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const service = new UserService(req);
    const user = await service.update();
    return res.send({ data: [user], message: "success" });
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const service = new UserService(req);
    const user = await service.delete();
    return res.send({ data: [user], message: "success" });
  };
}

export default new UserController();
