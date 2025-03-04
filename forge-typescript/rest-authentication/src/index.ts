import { env } from "./config";
import { AppRoutes } from "./presentation/router";
import { Server } from "./presentation/server";

async function main() {
  const options = {
    port: env.PORT,
    router: AppRoutes.routes,
  };
  const server = new Server(options);
  await server.start();
}

main();
