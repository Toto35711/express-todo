import BaseRoutes from "./BaseRoutes";
import AuthController from "../controllers/AuthController";
import validate from "../middlewares/AuthValidator";

class AuthRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("/register", validate, AuthController.register);
    this.router.post("/login", validate, AuthController.login);
  }
}

export default new AuthRoutes().router;
