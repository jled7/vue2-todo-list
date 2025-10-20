export default class Task {
  constructor({ id, title, completed = false, createdAt = new Date() }) {
    this.validateTitle(title);

    this.id = id;
    this.title = title;
    this.completed = !!completed;
    this.createdAt = createdAt;
  }

  validateTitle(title) {
    if (!title || typeof title !== "string") {
      throw new Error("Title must be a non-empty string");
    }

    if (title.trim().length === 0) {
      throw new Error("Title cannot be empty or only whitespace");
    }

    if (title.length > 200) {
      throw new Error("Title cannot exceed 200 characters");
    }
  }

  static create({ title, idGenerator }) {
    const task = new Task({
      id: idGenerator(),
      title,
      completed: false,
      createdAt: new Date(),
    });

    return task;
  }
}
