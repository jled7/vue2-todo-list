export interface ITask {
  id: any;
  title: string;
  completed?: boolean;
  createdAt?: Date;
}

export interface ITaskCreate {
  title: string;
  idGenerator: () => any;
}

export default class Task {
  public readonly id: any;
  public title: string;
  public completed: boolean;
  public readonly createdAt: Date;

  constructor({ id, title, completed = false, createdAt = new Date() }: ITask) {
    this.validateTitle(title);

    this.id = id;
    this.title = title;
    this.completed = !!completed;
    this.createdAt = createdAt;
  }

  private validateTitle(title: string): void {
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

  public toggleCompletion(): void {
    this.completed = !this.completed;
  }

  static create({ title, idGenerator }: ITaskCreate): Task {
    const task = new Task({
      id: idGenerator(),
      title,
      completed: false,
      createdAt: new Date(),
    });

    return task;
  }
}