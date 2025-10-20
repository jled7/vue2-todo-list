import express from "express";

export default function buildTaskRoutes({
  addTask,
  listTasks,
  toggleTaskCompletion,
  sse,
}) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const data = await listTasks();
    res.json(data);
  });

  router.post("/", async (req, res) => {
    try {
      const dto = await addTask({ text: req.body.text });
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
