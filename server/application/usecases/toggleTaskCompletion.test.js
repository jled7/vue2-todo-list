import { describe, it, expect, vi } from "vitest";
import toggleTaskCompletionUseCase from "./toggleTaskCompletion.js";
import Task from "../../domain/entities/Task.js";

describe("toggleTaskCompletion UseCase", () => {
  it("should toggle task completion and save", async () => {
    const task = new Task({
      id: "test-id",
      title: "Test task",
      completed: false,
    });

    const mockRepository = {
      get: vi.fn().mockResolvedValue(task),
      save: vi.fn(),
    };
    const mockEventBus = {
      publish: vi.fn(),
    };

    const toggleTaskCompletion = toggleTaskCompletionUseCase({
      repository: mockRepository,
      eventBus: mockEventBus,
    });

    const result = await toggleTaskCompletion({ id: "test-id" });

    expect(result.completed).toBe(true);
    expect(mockRepository.get).toHaveBeenCalledWith("test-id");
    expect(mockRepository.save).toHaveBeenCalledWith(result);
    expect(mockEventBus.publish).toHaveBeenCalled();
  });

  it("should throw error when task not found", async () => {
    const mockRepository = {
      get: vi.fn().mockResolvedValue(null),
    };

    const toggleTaskCompletion = toggleTaskCompletionUseCase({
      repository: mockRepository,
    });

    await expect(toggleTaskCompletion({ id: "nonexistent" })).rejects.toThrow(
      "Task with id nonexistent not found"
    );
  });
});
