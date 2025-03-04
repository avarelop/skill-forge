import express, { Router } from "express";

interface Options {
  port?: number;
  router: Router;
}

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly router: Router;

  constructor(options: Options) {
    const { port = 3100, router } = options;
    this.port = port;
    this.router = router;
  }

  async start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    this.app.use(this.router);
    this.app.listen(this.port, () => {
      // Health check.
      console.log(`Server is running on port ${this.port}`);
    });
  }
}