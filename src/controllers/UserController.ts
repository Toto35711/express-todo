import { Request, Response } from "express";
import { IController } from "./ControllerInterface";

let data: any[] = [
  { id: 1, name: "Jack", power: "375" },
  { id: 2, name: "Queen", power: "450" },
  { id: 3, name: "King", power: "500" },
  { id: 4, name: "Ace", power: "500" },
];
class UserController implements IController {
  constructor() {}

  index(req: Request, res: Response): Response {
    return res.send(data);
  }

  create(req: Request, res: Response): Response {
    const { name, power } = req.body;

    const newHero = {
      id: data.length + 1,
      name: name,
      power: power,
    };

    data.push(newHero);

    return res.send("added!");
  }

  show(req: Request, res: Response): Response {
    const { id } = req.params;

    return res.send(data.find((x) => x.id == id));
  }

  update(req: Request, res: Response): Response {
    const { id } = req.params;
    const body = req.body;
    let hero = data.find((x) => x.id == id);

    hero.name = body.name;
    hero.power = body.power;

    return res.send("updated!");
  }

  delete(req: Request, res: Response): Response {
    const { id } = req.params;

    data = data.filter((x) => x.id != id);

    return res.send("deleted!");
  }
}

export default new UserController();
