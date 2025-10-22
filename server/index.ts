import express from "express";
import cors from "cors";
import { APP_PORT } from "./config";

import { MongoDBTaskRepository } from "./infrastructure/persistence/mongoDB/MongoDBTaskRepository";
import ServerSideEvents from "./infrastructure/events/serverSideEvents";
import buildTaskRoutes from "./infrastructure/http/taskRoutes";
import EventBusMap from "./application/services/EventBusMap";

const app = express();

app.use(cors());
app.use(express.json());

const eventBus = new EventBusMap();
const repository = new MongoDBTaskRepository();
const sse = new ServerSideEvents();

app.use(
  "/api/tasks",
  buildTaskRoutes({
    repository,
    eventBus,
    sse,
  })
);

app.listen(APP_PORT, () => {
  console.log(`Todo app backend listening on port ${APP_PORT}`);
});
