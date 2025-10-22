import { describe, it, expect, vi } from "vitest";
import addTaskUseCase from "./addTask.js";

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
    expect(mockEventBus.publish).toHaveBeenCalled();
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
