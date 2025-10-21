import { SERVER_URL } from "../config";
import { ADD_TASK, TOGGLE_TASK } from "../stores/mutation-types";

const TASK_CREATED_EVENT = "task.created";
const TASK_TOGGLE_COMPLETED_EVENT = "task.toggle.completed";

export function setupEventSource(store) {
  const sseEventSource = new EventSource(`${SERVER_URL}/api/tasks/stream`);

  sseEventSource.addEventListener(TASK_CREATED_EVENT, function (event) {
    const parsedData = JSON.parse(event.data);
    store.commit(ADD_TASK, parsedData);
  });

  sseEventSource.addEventListener(
    TASK_TOGGLE_COMPLETED_EVENT,
    function (event) {
      const parsedData = JSON.parse(event.data);
      store.commit(TOGGLE_TASK, {
        id: parsedData.taskId,
        taskCompleted: parsedData.completed,
      });
    }
  );
}
