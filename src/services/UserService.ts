import { Request } from "express";
const db = require("../db/models");

class UserService {
  credential: {
    id: number;
  };
  body: Request["body"];
  params: Request["params"];

  constructor(req: Request) {
    this.credential = req.app.locals.credential;
    this.body = req.body;
    this.params = req.params;
  }

  getAll = async () => {
    const users = await db.user.findAll({
      attributes: ["id", "username"],
    });
    return users;
  };

  getOne = async () => {
    const { id } = this.params;

    const user = await db.user.findOne({
      where: { id },
      attributes: ["id", "username"],
    });

    return user;
  };

  update = async () => {
    const { id } = this.params;
    const { username } = this.body;

    const user = await db.user.update(
      { username },
      {
        where: { id },
      }
    );

    return user;
  };

  delete = async () => {
    const { id } = this.params;

    const user = await db.user.destroy({
      where: { id },
    });

    return user;
  };
}

export default UserService;
