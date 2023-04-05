import BaseRoutes from "./BaseRoutes";
import AuthController from "../controllers/AuthController";
import validate from "../middlewares/AuthValidator";
import { auth } from "../middlewares/AuthMiddleware";

class AuthRoutes extends BaseRoutes {
  public routes(): void {
    /**
     * @openapi
     * /api/v1/auth/register:
     *  post:
     *     tags:
     *     - Auth
     *     summary: register user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/Login'
     *     responses:
     *      200:
     *        description: register success
     */
    this.router.post("/register", validate, AuthController.register);

    /**
     * @openapi
     * /api/v1/auth/login:
     *  post:
     *     tags:
     *     - Auth
     *     summary: login
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/Login'
     *     responses:
     *      200:
     *        description: login success
     *      401:
     *        description: password is incorrect
     *      404:
     *        description: the user is not registered
     */
    this.router.post("/login", validate, AuthController.login);

    /**
     * @openapi
     * /api/v1/auth/profile:
     *  get:
     *     tags:
     *     - Auth
     *     summary: get profile
     *     responses:
     *      200:
     *        description: get profile success
     */
    this.router.get("/profile", auth, AuthController.profile);
  }

  /**
   * @openapi
   * components:
   *  schemas:
   *    Login:
   *      type: object
   *      required:
   *        - username
   *        - password
   *      properties:
   *        username:
   *          type: string
   *          default: user1
   *        password:
   *          type: string
   *          default: user1-password
   */
}

export default new AuthRoutes().router;
