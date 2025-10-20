import express from "express";
import cors from "cors";
import { APP_PORT } from "./config/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(APP_PORT, () => {
  console.log(`Todo app backend listening on port ${APP_PORT}`);
});
