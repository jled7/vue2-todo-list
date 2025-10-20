import TaskCreated from "../../domain/events/TaskCreated.js";
import TaskToggleCompleted from "../../domain/events/TaskToggleCompleted.js";

export default function setupTaskEvents({ eventBus, sse }) {
  eventBus.on(TaskCreated.name, ({ task }) => {
    sse.broadcast(TaskCreated.name, { task: JSON.stringify(task) });
  });

  eventBus.on(TaskToggleCompleted.name, ({ task }) => {
    sse.broadcast(TaskToggleCompleted.name, {
      taskId: task.id,
      completed: task.completed,
    });
  });
}
