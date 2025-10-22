import { describe, it, expect, vi } from "vitest";
import listTasksUseCase from "./listTasks.ts";
import TaskRepository from "../../domain/repositories/TaskRepository.ts";

describe("listTasks UseCase", () => {
  it("should return tasks from repository", async () => {
    const mockTasks = [
      { id: "1", title: "Task 1", completed: false },
      { id: "2", title: "Task 2", completed: true },
    ];
    const mockRepository: TaskRepository = {
      list: vi.fn().mockResolvedValue(mockTasks),
      save: vi.fn(),
      idGenerator: vi.fn(),
      get: vi.fn(),
    };

    const listTasks = listTasksUseCase({ repository: mockRepository });

    const result = await listTasks();

    expect(result).toEqual(mockTasks);
    expect(mockRepository.list).toHaveBeenCalledOnce();
  });

  it("should return empty array when no tasks", async () => {
    const mockRepository: TaskRepository = {
      list: vi.fn().mockResolvedValue([]),
      save: vi.fn(),
      idGenerator: vi.fn(),
      get: vi.fn(),
    };

    const listTasks = listTasksUseCase({ repository: mockRepository });

    const result = await listTasks();

    expect(result).toEqual([]);
    expect(mockRepository.list).toHaveBeenCalledOnce();
  });
});
