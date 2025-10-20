const EVENT_NAME = "task.created";

export default class TaskCreated {
  constructor({ task }) {
    this.task = task;
  }
  get name() {
    return EVENT_NAME;
  }
}
