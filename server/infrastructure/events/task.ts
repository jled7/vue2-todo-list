import TaskCreated from "../../domain/events/TaskCreated";
import TaskToggleCompleted from "../../domain/events/TaskToggleCompleted";
import EventBus from "../../application/services/EventBus";
import ServerSideEvents from "./serverSideEvents";

export interface ISetupTaskEventsDependencies {
  eventBus: EventBus;
  sse: ServerSideEvents;
}

export default function setupTaskEvents({
  eventBus,
  sse,
}: ISetupTaskEventsDependencies): void {
  eventBus.on(TaskCreated.name, ({ task }: TaskCreated) => {
    sse.broadcast(TaskCreated.name, task);
  });

  eventBus.on(TaskToggleCompleted.name, ({ task }: TaskToggleCompleted) => {
    sse.broadcast(TaskToggleCompleted.name, {
      taskId: task.id,
      completed: task.completed,
    });
  });
}
