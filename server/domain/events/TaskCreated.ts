import Task from '../entities/Task.js';

const EVENT_NAME = "task.created";

export interface IEventTaskCreated {
  task: Task;
}

export default class TaskCreated {
  public readonly task: Task;

  constructor({ task }: IEventTaskCreated) {
    this.task = task;
  }

  static get name(): string {
    return EVENT_NAME;
  }

  get name(): string {
    return TaskCreated.name;
  }
}