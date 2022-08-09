import mongoose from "mongoose";
import { config } from "dotenv";

config();

class Database {
  connect() {
    mongoose
      .connect(process.env.MONGODB_URI, {})
      .catch((error) => console.log(error));
  }
}

export default Database;
