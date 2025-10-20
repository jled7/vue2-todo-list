import express from "express";
import { APP_PORT } from "./config/index.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(APP_PORT, () => {
  console.log(`Todo app backend listening on port ${APP_PORT}`);
});
