import { Request, Response } from "express";

export interface IAuthController {
  register(req: Request, res: Response): Promise<Response>;
  login(req: Request, res: Response): Promise<Response>;
  profile(req: Request, res: Response): Promise<Response>;
}

export interface IUserController {
  index(req: Request, res: Response): Promise<Response>;
  show(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
}

export interface ITodoController extends IUserController {
  create(req: Request, res: Response): Promise<Response>;
}
