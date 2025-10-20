import mongoose from "mongoose";
import Task from "../../../domain/entities/Task.js";
import TaskRepository from "../../../domain/repositories/TaskRepository.js";

import TaskModel from "./TaskModel.js";

import { MONGODB_URI } from "../../../config/index.js";

export class MongoDBTaskRepository extends TaskRepository {
  constructor() {
    super();
    mongoose.connect(MONGODB_URI);
  }

  idGenerator() {
    return new mongoose.Types.ObjectId();
  }

  async save(task) {
    const taskData = { ...task };

    if (task.id) {
      await TaskModel.updateOne(
        { _id: taskData.id },
        { $set: taskData },
        { upsert: true }
      );
    } else {
      await TaskModel.insert(task);
    }
  }
  async list() {
    const tasksData = await TaskModel.find({}, null, {
      sort: { createdAt: -1 },
    });

    return tasksData.map(
      (data) =>
        new Task({
          id: data._id,
          title: data.title,
          completed: data.completed,
          createdAt: data.createdAt,
        })
    );
  }
  async get(id) {
    const data = await TaskModel.findOne({ _id: id });

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
