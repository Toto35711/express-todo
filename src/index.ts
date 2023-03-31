import express, { Application, Request, Response } from "express";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.routes();
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("Hello world!");
    });
  }
}

const port: number = 8080;
const app: Application = new App().app;

app.listen(port, () => {
  console.log("app is running in port: ", port);
});
