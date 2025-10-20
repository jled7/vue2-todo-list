const EVENT_NAME = "task.created";

export default class TaskCreated {
  constructor({ task }) {
    this.task = task;
  }
  static get name() {
    return EVENT_NAME;
  }

  get name() {
    return TaskCreated.name;
  }
}
