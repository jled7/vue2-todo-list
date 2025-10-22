import { describe, it, expect, vi } from "vitest";
import addTaskUseCase from "./addTask.js";
import TaskCreated from "../../domain/events/TaskCreated.js";

describe("addTask UseCase", () => {
  it("should create and save a task", async () => {
    const mockRepository = {
      save: vi.fn(),
    };
    const mockEventBus = {
      publish: vi.fn(),
    };
    const mockIdGenerator = vi.fn(() => "test-id");

    const addTask = addTaskUseCase({
      repository: mockRepository,
      eventBus: mockEventBus,
      idGenerator: mockIdGenerator,
    });

    const result = await addTask({ title: "Test task" });

    expect(result.id).toBe("test-id");
    expect(result.title).toBe("Test task");
    expect(result.completed).toBe(false);
    expect(mockRepository.save).toHaveBeenCalledWith(result);

    // Check that the correct event was published
    expect(mockEventBus.publish).toHaveBeenCalledOnce();
    const publishedEvent = mockEventBus.publish.mock.calls[0][0];
    expect(publishedEvent).toBeInstanceOf(TaskCreated);
    expect(publishedEvent.name).toBe(TaskCreated.name);
    expect(publishedEvent.task).toBe(result);
  });

  it("should throw error for invalid title", async () => {
    const mockRepository = { save: vi.fn() };
    const mockIdGenerator = vi.fn();

    const addTask = addTaskUseCase({
      repository: mockRepository,
      idGenerator: mockIdGenerator,
    });

    await expect(addTask({ title: "" })).rejects.toThrow();
  });
});
