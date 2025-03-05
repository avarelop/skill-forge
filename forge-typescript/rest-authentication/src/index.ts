import { env } from "./config";
import { MongoDatabase } from "./db/index.db";
import { AppRoutes } from "./presentation/router";
import { Server } from "./presentation/server";

async function main() {
  await MongoDatabase.connect({
    mongoURL: env.MONGO_URL,
    dbName: env.MONGO_DB_NAME,
  });
  const options = {
    port: env.PORT,
    router: AppRoutes.routes,
  };
  const server = new Server(options);
  await server.start();
}

main();
