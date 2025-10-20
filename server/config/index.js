import dotenv from "dotenv";
dotenv.config();

const APP_PORT = process.env.APP_PORT || 3000;
const MONGODB_DB_NAME = "todo_list";
const MONGODB_URI =
  process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${MONGODB_DB_NAME}`;

export { APP_PORT, MONGODB_URI };
