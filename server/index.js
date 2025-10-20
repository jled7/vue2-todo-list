import express from "express";
import cors from "cors";
import { APP_PORT } from "./config/index.js";

import addTaskUseCase from "./application/usecases/addTask.js";
import listTasksUseCase from "./application/usecases/listTasks.js";
import toggleTaskCompletionUseCase from "./application/usecases/toggleTaskCompletion.js";
import EventBus from "./application/services/EventBus.js";

import { MongoDBTaskRepository } from "./infrastructure/persistence/mongoDB/MongoDBTaskRepository.js";
import ServerSideEvents from "./infrastructure/events/serverSideEvents.js";
import buildTaskRoutes from "./infrastructure/http/taskRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

const eventBus = new EventBus();
const repository = new MongoDBTaskRepository();
const sse = new ServerSideEvents({ eventBus });

app.use(
  "/api/tasks",
  buildTaskRoutes({
    addTask: addTaskUseCase({ repository, eventBus }),
    listTasks: listTasksUseCase({ repository }),
    toggleTaskCompletion: toggleTaskCompletionUseCase({ repository, eventBus }),
    sse,
  })
);

app.listen(APP_PORT, () => {
  console.log(`Todo app backend listening on port ${APP_PORT}`);
});
