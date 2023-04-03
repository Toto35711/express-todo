import BaseRoutes from "./BaseRoutes";
import AuthController from "../controllers/AuthController";
import { auth } from "../middlewares/AuthMiddleware";

class AuthRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("/register", auth, AuthController.index);
    this.router.post("/login", AuthController.create);
  }
}

export default new AuthRoutes().router;
