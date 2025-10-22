import Task from "../entities/Task";

export default abstract class TaskRepository {
  abstract idGenerator(): string | number | object;
  abstract save(task: Task): Promise<void>;
  abstract list(): Promise<Task[]>;
  abstract get(id: any): Promise<Task | null>;
}
