import Task from "../../domain/entities/Task";
import TaskCreated from "../../domain/events/TaskCreated";
import TaskRepository from "../../domain/repositories/TaskRepository";
import EventBus from "../services/EventBus";

export interface IAddTaskDependencies {
  repository: TaskRepository;
  idGenerator: () => any;
  eventBus?: EventBus;
}

export interface IAddTaskInput {
  title: string;
}

export type AddTaskFunction = (input: IAddTaskInput) => Promise<Task>;

export default function addTask({
  repository,
  idGenerator,
  eventBus,
}: IAddTaskDependencies): AddTaskFunction {
  return async ({ title }: IAddTaskInput): Promise<Task> => {
    const task = Task.create({ idGenerator, title });
    await repository.save(task);
    eventBus?.publish?.(new TaskCreated({ task }));

    return task;
  };
}
