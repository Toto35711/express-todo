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

    /**
     * @openapi
     * /api/v1/todos:
     *  post:
     *     tags:
     *     - Todo
     *     summary: create a new todo
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/UpdateTodo'
     *     responses:
     *      200:
     *        description: create a new todo success
     */
    this.router.post("/", auth, validate, TodoController.create);

    /**
     * @openapi
     * /api/v1/todos/{id}:
     *  get:
     *     tags:
     *     - Todo
     *     summary: get todo by ID
     *     description: get todo by ID
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The id of the todo
     *        required: true
     *     responses:
     *       200:
     *         description: get todo by ID success
     */
    this.router.get("/:id", auth, TodoController.show);

    /**
     * @openapi
     * /api/v1/todos/{id}:
     *  put:
     *     tags:
     *     - Todo
     *     summary: edit description by ID
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The id of the todo
     *        required: true
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/UpdateTodo'
     *     responses:
     *      200:
     *        description: edit todo success
     */
    this.router.put("/:id", auth, validate, TodoController.update);

    /**
     * @openapi
     * /api/v1/todos/{id}:
     *  delete:
     *     tags:
     *     - Todo
     *     summary: delete a todo by ID
     *     description: delete a todo by ID
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The id of the todo
     *        required: true
     *     responses:
     *       200:
     *         description: delete todo by ID success
     */
    this.router.delete("/:id", auth, TodoController.delete);
  }

  /**
   * @openapi
   * components:
   *  schemas:
   *    UpdateTodo:
   *      type: object
   *      required:
   *        - description
   *      properties:
   *        description:
   *          type: string
   *          default: walking into the void the realm of despair
   */
}

export default new TodoRoutes().router;
