import Task from "domain/entities/Task";
import MongoDBTaskRepository from "infrastructure/persistence/mongoDB/MongoDBTaskRepository";

const mongoDBTaskRepository = new MongoDBTaskRepository();

const tasksToAdd = [
  {
    title: "Overengineer a To-Do list app",
    completed: true,
    createdAt: new Date("2025-10-22T11:20:21.929+00:00"),
  },
  {
    title: "Try to make the error popup look nice although i am not a designer",
    completed: false,
    createdAt: new Date("2025-10-22T11:20:33.192+00:00"),
  },
];

mongoDBTaskRepository.list().then(async (tasks) => {
  if (tasks.length === 0) {
    for (let taskData of tasksToAdd) {
      const task = new Task({
        id: mongoDBTaskRepository.idGenerator(),
        title: taskData.title,
        completed: taskData.completed,
        createdAt: taskData.createdAt,
      });
      await mongoDBTaskRepository.save(task);
    }
  }

  process.exit();
});
