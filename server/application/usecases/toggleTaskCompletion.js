import TaskToggleCompleted from "../../domain/events/TaskToggleCompleted.js";

export function toggleTaskCompletion({ repository } = {}) {
  return async ({ id }) => {
    const task = await repository.get(id);

    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

    task.toggleCompletion();
    await repository.save(task);
    eventBus?.publish?.(new TaskToggleCompleted({ task }));

    return task;
  };
}
