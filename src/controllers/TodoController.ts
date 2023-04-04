import { Request, Response } from "express";
import { IController } from "./ControllerInterface";
const db = require("../db/models");

class TodoController implements IController {
  constructor() {}

  index = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.app.locals.credential;
    const todos = await db.todo.findAll({
      where: { user_id: id },
      attributes: ["id", "description"],
    });
    return res.send({ data: todos, message: "success" });
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.app.locals.credential;
    const { description } = req.body;

    const todo = await db.todo.create({
      user_id: id,
      description,
    });

    return res.send({ data: [todo], message: "success" });
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    const { id: user_id } = req.app.locals.credential;
    const { id } = req.params;

    const todo = await db.todo.findOne({
      where: { id, user_id },
      attributes: ["id", "description"],
    });

    return res.send({ data: [todo], message: "success" });
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id: user_id } = req.app.locals.credential;
    const { id } = req.params;
    const { description } = req.body;

    const todo = await db.todo.update(
      { description },
      {
        where: { id, user_id },
      }
    );

    return res.send({ data: [], message: "success" });
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id: user_id } = req.app.locals.credential;
    const { id } = req.params;

    const todo = await db.todo.destroy({
      where: { id, user_id },
    });

    return res.send({ data: [], message: "success" });
  };
}

export default new TodoController();
