const EVENT_NAME = "task.toggle.completed";

export default class TaskToggleCompleted {
  constructor({ task }) {
    this.task = task;
  }
  static get name() {
    return EVENT_NAME;
  }

  get name() {
    return TaskToggleCompleted.name;
  }
}
