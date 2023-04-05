import BaseRoutes from "./BaseRoutes";
import UserController from "../controllers/UserController";
class UserRoutes extends BaseRoutes {
  public routes(): void {
    /**
     * @openapi
     * /api/v1/users:
     *  get:
     *     tags:
     *     - User
     *     description: get all users
     *     responses:
     *       200:
     *         description: all users success
     */
    this.router.get("/", UserController.index);

    /**
     * @openapi
     * /api/v1/users/{id}:
     *  get:
     *     tags:
     *     - User
     *     description: get user by ID
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The id of the user
     *        required: true
     *     responses:
     *       200:
     *         description: get user by ID success
     */
    this.router.get("/:id", UserController.show);

    /**
     * @openapi
     * /api/v1/users/{id}:
     *  post:
     *     tags:
     *     - User
     *     summary: edit username by ID
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The id of the user
     *        required: true
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/UpdateUser'
     *     responses:
     *      200:
     *        description: Success
     */
    this.router.put("/:id", UserController.update);

    /**
     * @openapi
     * /api/v1/users/{id}:
     *  delete:
     *     tags:
     *     - User
     *     description: delete a user by ID
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The id of the user
     *        required: true
     *     responses:
     *       200:
     *         description: delete user by ID success
     */
    this.router.delete("/:id", UserController.delete);
  }

  /**
   * @openapi
   * components:
   *  schemas:
   *    UpdateUser:
   *      type: object
   *      required:
   *        - username
   *      properties:
   *        username:
   *          type: string
   *          default: user_400
   */
}

export default new UserRoutes().router;
