import { env } from "./config";
import { Server } from "./presentation/server";

async function main() {
  const options = {
    port: env.PORT,
  };
  
  const server = new Server(options);
  await server.start();
}
main();