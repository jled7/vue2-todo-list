import TaskCreated from "../../domain/events/TaskCreated";
import TaskToggleCompleted from "../../domain/events/TaskToggleCompleted";
import EventBus from "../../domain/events/EventBus";
import ILogger from "../../domain/logging/ILogger";
import ServerSideEvents from "./serverSideEvents";

export interface ISetupTaskEventsDependencies {
  eventBus: EventBus;
  sse: ServerSideEvents;
  logger: ILogger;
}

export default function setupTaskEvents({
  eventBus,
  sse,
  logger,
}: ISetupTaskEventsDependencies): void {
  eventBus.on(TaskCreated.name, ({ task }: TaskCreated) => {
    logger.info('Task created event', { taskId: task.id, title: task.title });
    sse.broadcast(TaskCreated.name, task);
  });

  eventBus.on(TaskToggleCompleted.name, ({ task }: TaskToggleCompleted) => {
    logger.info('Task toggle completed event', { taskId: task.id, completed: task.completed });
    sse.broadcast(TaskToggleCompleted.name, {
      taskId: task.id,
      completed: task.completed,
    });
  });
}
