import { describe, it, expect, vi } from "vitest";
import listTasksUseCase from "./listTasks.js";

describe("listTasks UseCase", () => {
  it("should return tasks from repository", async () => {
    const mockTasks = [
      { id: "1", title: "Task 1", completed: false },
      { id: "2", title: "Task 2", completed: true },
    ];
    const mockRepository = {
      list: vi.fn().mockResolvedValue(mockTasks),
    };

    const listTasks = listTasksUseCase({ repository: mockRepository });

    const result = await listTasks();

    expect(result).toEqual(mockTasks);
    expect(mockRepository.list).toHaveBeenCalledOnce();
  });

  it("should return empty array when no tasks", async () => {
    const mockRepository = {
      list: vi.fn().mockResolvedValue([]),
    };

    const listTasks = listTasksUseCase({ repository: mockRepository });

    const result = await listTasks();

    expect(result).toEqual([]);
    expect(mockRepository.list).toHaveBeenCalledOnce();
  });
});
