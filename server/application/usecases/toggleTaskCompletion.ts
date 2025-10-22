import Task from "../../domain/entities/Task";
import TaskToggleCompleted from "../../domain/events/TaskToggleCompleted";
import TaskRepository from "../../domain/repositories/TaskRepository";
import EventBus from "../services/EventBus";

export interface IToggleTaskCompletionDependencies {
  repository: TaskRepository;
  eventBus?: EventBus;
}

export interface IToggleTaskCompletionInput {
  id: any;
}

export type ToggleTaskCompletionFunction = (
  input: IToggleTaskCompletionInput
) => Promise<Task>;

export default function toggleTaskCompletion({
  repository,
  eventBus,
}: IToggleTaskCompletionDependencies): ToggleTaskCompletionFunction {
  return async ({ id }: IToggleTaskCompletionInput): Promise<Task> => {
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
