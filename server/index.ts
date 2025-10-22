import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import winston from "winston";

import { APP_PORT } from "./config";

import { MongoDBTaskRepository } from "./infrastructure/persistence/mongoDB/MongoDBTaskRepository";
import ServerSideEvents from "./infrastructure/events/serverSideEvents";
import buildTaskRoutes from "./infrastructure/http/taskRoutes";
import EventBusMap from "./application/services/EventBusMap";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
app.use(helmet());

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

const eventBus = new EventBusMap();
const repository = new MongoDBTaskRepository();
const sse = new ServerSideEvents();

app.use(
  "/api/tasks",
  buildTaskRoutes({
    repository,
    eventBus,
    sse,
    logger,
  })
);

app.listen(APP_PORT, () => {
  console.log(`Todo app backend listening on port ${APP_PORT}`);
});
