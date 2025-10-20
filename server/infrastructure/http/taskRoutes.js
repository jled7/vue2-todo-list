import express from "express";
import addTaskUseCase from "../../application/usecases/addTask.js";
import listTasksUseCase from "../../application/usecases/listTasks.js";
import toggleTaskCompletionUseCase from "../../application/usecases/toggleTaskCompletion.js";

export default function buildTaskRoutes({ repository, eventBus, sse }) {
  const router = express.Router();

  const addTask = addTaskUseCase({
    repository,
    eventBus,
    idGenerator: repository.idGenerator,
  });
  const listTasks = listTasksUseCase({ repository });
  const toggleTaskCompletion = toggleTaskCompletionUseCase({
    repository,
    eventBus,
  });

  router.get("/", async (req, res) => {
    const data = await listTasks();
    res.json(data);
  });

  router.post("/", async (req, res) => {
    try {
      const dto = await addTask({ title: req.body.title });
      res.status(201).json(dto);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

  router.patch("/:id/toggle", async (req, res) => {
    try {
      const dto = await toggleTaskCompletion({ id: req.params.id });
      res.json(dto);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

  router.get("/api/stream", (req, res) => sse.handle(req, res));

  return router;
}
