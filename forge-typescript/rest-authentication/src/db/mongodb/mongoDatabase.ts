import mongoose from "mongoose";

interface Options {
  mongoURL: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: Options) {
    const { mongoURL, dbName } = options;
    try {
      await mongoose.connect(mongoURL, {
        dbName,
      });
      console.log("Connected to MongoDB");
      return mongoose;
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }
}
