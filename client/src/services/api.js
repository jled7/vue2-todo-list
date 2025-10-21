import { SERVER_URL } from "../config";

export const fetchTasks = async () => {
  const response = await fetch(`${SERVER_URL}/api/tasks`);
  return await response.json();
};

export const addTask = async (title) => {
  await fetch(`${SERVER_URL}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
};

export const toggleTask = async (id) => {
  await fetch(`${SERVER_URL}/api/tasks/${id}/toggle`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
