import Task from "../../domain/entities/Task";
import TaskRepository from "../../domain/repositories/TaskRepository";

export interface IListTasksDependencies {
  repository: TaskRepository;
}

export type ListTasksFunction = () => Promise<Task[]>;

export default function listTasks({
  repository,
}: IListTasksDependencies): ListTasksFunction {
  return async (): Promise<Task[]> => {
    return repository.list();
  };
}
