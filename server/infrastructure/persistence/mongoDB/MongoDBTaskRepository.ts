import mongoose from "mongoose";
import Task from "../../../domain/entities/Task";
import TaskRepository from "../../../domain/repositories/TaskRepository";
import TaskModel, { ITaskDocument } from "./TaskModel";
import { MONGODB_URI } from "../../../config/index";

export default class MongoDBTaskRepository extends TaskRepository {
  constructor() {
    super();
    mongoose.connect(MONGODB_URI);
  }

  idGenerator(): mongoose.Types.ObjectId {
    return new mongoose.Types.ObjectId();
  }

  async save(task: Task): Promise<void> {
    const taskData = { ...task };

    if (task.id) {
      await TaskModel.updateOne(
        { _id: taskData.id },
        { $set: taskData },
        { upsert: true }
      );
    } else {
      await TaskModel.insertMany([task]);
    }
  }

  async list(): Promise<Task[]> {
    const tasksData: ITaskDocument[] = await TaskModel.find({}, null, {
      sort: { createdAt: -1 },
    });

    return tasksData.map(
      (data: ITaskDocument) =>
        new Task({
          id: data._id,
          title: data.title,
          completed: data.completed,
          createdAt: data.createdAt,
        })
    );
  }

  async get(id: any): Promise<Task | null> {
    const data: ITaskDocument | null = await TaskModel.findOne({ _id: id });

    if (!data) {
      return null;
    }

    return new Task({
      id: data._id,
      title: data.title,
      completed: data.completed,
      createdAt: data.createdAt,
    });
  }
}
