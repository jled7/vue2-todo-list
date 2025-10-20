import Task from "../../domain/entities/Task.js";
import TaskCreated from "../../domain/events/TaskCreated.js";

export function addTask({ repository, idGenerator, eventBus } = {}) {
  return async ({ title }) => {
    const task = Task.create({ idGenerator, title });
    await repository.save(task);
    eventBus?.publish?.(new TaskCreated({ task }));

    return task;
  };
}
