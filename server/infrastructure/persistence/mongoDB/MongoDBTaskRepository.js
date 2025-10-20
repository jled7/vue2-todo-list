import Task from "../../../domain/entities/Task";
import TaskRepository from "../../../domain/repositories/TaskRepository";

import TaskModel from "./TaskModel";

export class MongoDBTaskRepository extends TaskRepository {
  async save(task) {
    if (task.id) {
      await TaskModel.updateOne(
        { _id: task.id },
        { $set: task },
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
