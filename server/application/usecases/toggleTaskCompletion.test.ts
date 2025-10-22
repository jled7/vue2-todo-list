import { describe, it, expect, vi, Mock } from "vitest";
import toggleTaskCompletionUseCase from "./toggleTaskCompletion.ts";
import Task from "../../domain/entities/Task.ts";
import TaskToggleCompleted from "../../domain/events/TaskToggleCompleted.ts";
import TaskRepository from "../../domain/repositories/TaskRepository.ts";
import EventBus from "../../domain/events/EventBus.ts";

describe("toggleTaskCompletion UseCase", () => {
  it("should toggle task completion and save", async () => {
    const task = new Task({
      id: "test-id",
      title: "Test task",
      completed: false,
    });

    const mockRepository: TaskRepository = {
      get: vi.fn().mockResolvedValue(task),
      save: vi.fn(),
      idGenerator: vi.fn(),
      list: vi.fn(),
    };
    const mockEventBus: EventBus = {
      on: vi.fn(),
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

    // Check that the correct event was published
    expect(mockEventBus.publish).toHaveBeenCalledOnce();
    const publishedEvent = (mockEventBus.publish as Mock).mock.calls[0][0];
    expect(publishedEvent).toBeInstanceOf(TaskToggleCompleted);
    expect(publishedEvent.name).toBe(TaskToggleCompleted.name);
    expect(publishedEvent.task).toBe(result);
  });

  it("should throw error when task not found", async () => {
    const mockRepository: TaskRepository = {
      get: vi.fn().mockResolvedValue(null),
      save: vi.fn(),
      idGenerator: vi.fn(),
      list: vi.fn(),
    };

    const toggleTaskCompletion = toggleTaskCompletionUseCase({
      repository: mockRepository,
    });

    await expect(toggleTaskCompletion({ id: "nonexistent" })).rejects.toThrow(
      "Task with id nonexistent not found"
    );
  });
});
