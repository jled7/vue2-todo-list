import Task from "../entities/Task";

const EVENT_NAME = "task.toggle.completed";

export interface IEventTaskToggleCompleted {
  task: Task;
}

export default class TaskToggleCompleted {
  public readonly task: Task;

  constructor({ task }: IEventTaskToggleCompleted) {
    this.task = task;
  }

  static get name(): string {
    return EVENT_NAME;
  }

  get name(): string {
    return TaskToggleCompleted.name;
  }
}
