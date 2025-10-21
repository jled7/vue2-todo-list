import { SERVER_URL } from "../config";

export const fetchTasks = async () => {
  const response = await fetch(`${SERVER_URL}/api/tasks`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch tasks");
  }

  return await response.json();
};

export const addTask = async (title) => {
  const response = await fetch(`${SERVER_URL}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to add task");
  }
};

export const toggleTask = async (id) => {
  const response = await fetch(`${SERVER_URL}/api/tasks/${id}/toggle`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to toggle task");
  }
};
