import { Request } from "express";
import Authentication from "../utils/Authentication";
const db = require("../db/models");

class AuthService {
  credential: {
    id: number;
    username: string;
  };
  body: Request["body"];
  params: Request["params"];

  constructor(req: Request) {
    this.credential = req.app.locals.credential;
    this.body = req.body;
    this.params = req.params;
  }

  store = async () => {
    const { username, password } = this.body;
    const hashedPassword = await Authentication.passwordHash(password);

    const user = await db.user.create({
      username,
      password: hashedPassword,
    });

    return user;
  };

  login = async () => {
    let response = {
      statusCode: 200,
      statusMessage: "success",
      token: "",
    };

    // find user
    const { username, password } = this.body;
    const user = await db.user.findOne({
      where: { username },
    });

    // check password
    if (!user) {
      response.statusCode = 401;
      response.statusMessage = "User is not registered";
      return response;
    }

    const isPasswordCorrect = await Authentication.isPasswordCorrect(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      response.statusCode = 404;
      response.statusMessage = "Password is incorrect";
      return response;
    }

    const token = Authentication.token(user.id, user.username, user.password);
    response.token = token;

    return response;
  };

  getProfile = async () => {
    return { id: this.credential.id, username: this.credential.username };
  };
}

export default AuthService;
