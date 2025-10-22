import express, { Request, Response, Router } from "express";
import addTaskUseCase from "../../application/usecases/addTask";
import listTasksUseCase from "../../application/usecases/listTasks";
import toggleTaskCompletionUseCase from "../../application/usecases/toggleTaskCompletion";
import TaskRepository from "../../domain/repositories/TaskRepository";
import EventBus from "../../domain/events/EventBus";
import ILogger from "../../domain/logging/ILogger";
import setupTaskEvents from "../events/task";

export interface ITaskRoutesDependencies {
  repository: TaskRepository;
  eventBus: EventBus;
  sse: any; // Type this properly when we convert SSE
  logger: ILogger;
}

export default function buildTaskRoutes({
  repository,
  eventBus,
  sse,
  logger,
}: ITaskRoutesDependencies): Router {
  const router = express.Router();

  const addTask = addTaskUseCase({
    repository,
    eventBus,
    idGenerator: repository.idGenerator?.bind(repository),
  });
  const listTasks = listTasksUseCase({ repository });
  const toggleTaskCompletion = toggleTaskCompletionUseCase({
    repository,
    eventBus,
  });

  setupTaskEvents({ eventBus, sse, logger });

  router.get("/", async (req: Request, res: Response): Promise<void> => {
    const data = await listTasks();
    res.json(data);
  });

  router.post("/", async (req: Request, res: Response): Promise<void> => {
    try {
      const dto = await addTask({ title: req.body.title });
      res.status(201).json(dto);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  router.patch(
    "/:id/toggle",
    async (req: Request, res: Response): Promise<void> => {
      try {
        const dto = await toggleTaskCompletion({ id: req.params.id });
        res.json(dto);
      } catch (e: any) {
        res.status(400).json({ error: e.message });
      }
    }
  );

  router.get("/stream", (req: Request, res: Response) => sse.handle(req, res));

  return router;
}
