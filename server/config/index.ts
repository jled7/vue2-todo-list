import dotenv from "dotenv";
dotenv.config();

export const APP_PORT: number = Number(process.env.APP_PORT) || 3000;
export const MONGODB_DB_NAME: string = "todo_list";
export const MONGODB_URI: string =
  process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${MONGODB_DB_NAME}`;