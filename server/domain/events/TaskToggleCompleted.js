const EVENT_NAME = "task.toggle.completed";

export default class TaskToggleCompleted {
  constructor({ task }) {
    this.task = task;
  }
  get name() {
    return EVENT_NAME;
  }
}
