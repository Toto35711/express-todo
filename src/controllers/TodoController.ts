import { Request, Response } from "express";
import { ITodoController } from "./ControllerInterface";
import TodoService from "../services/TodoService";

class TodoController implements ITodoController {
  constructor() {}

  index = async (req: Request, res: Response): Promise<Response> => {
    const service = new TodoService(req);
    const todos = await service.getAll();

    return res.send({ data: todos, message: "success" });
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const service = new TodoService(req);
    const todo = await service.store();

    return res.send({ data: [todo], message: "success" });
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    const service = new TodoService(req);
    const todo = await service.getOne();

    return res.send({ data: [todo], message: "success" });
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const service = new TodoService(req);
    const todo = await service.update();

    return res.send({ data: [todo], message: "success" });
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const service = new TodoService(req);
    const todo = await service.delete();

    return res.send({ data: [todo], message: "success" });
  };
}

export default new TodoController();
