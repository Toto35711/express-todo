import BaseRoutes from "./BaseRoutes";
import TodoController from "../controllers/TodoController";
import { auth } from "../middlewares/AuthMiddleware";
import validate from "../middlewares/TodoValidator";

class TodoRoutes extends BaseRoutes {
  public routes(): void {
    /**
     * @openapi
     * /api/v1/todos:
     *  get:
     *     tags:
     *     - Todo
     *     security:
     *      - bearerAuth: []
     *     summary: get all todos
     *     description: get all todos
     *     responses:
     *       200:
     *         description: get all todos success
     */
    this.router.get("/", auth, TodoController.index);
    this.router.post("/", auth, validate, TodoController.create);
    this.router.get("/:id", auth, TodoController.show);
    this.router.put("/:id", auth, validate, TodoController.update);
    this.router.delete("/:id", auth, TodoController.delete);
  }
}

export default new TodoRoutes().router;
