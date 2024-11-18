// taskStore.spec.ts
import { describe, expect, test } from "@jest/globals";
import { setActivePinia, createPinia } from "pinia";
import { useTaskStore } from "@/stores/tasks";

describe("Test Task Store", () => {
  /* Create pinia instance for tests */
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should add a task", () => {
    const taskStore = useTaskStore();

    const task = { id: "1", text: "Test Task", completed: false };

    taskStore.addTask(task);

    expect(taskStore.list).toHaveLength(1);
    expect(taskStore.list[0]).toEqual(task);
  });

  it("should update task state", () => {
    const taskStore = useTaskStore();

    const task = { id: "1", text: "Test Task", completed: false };
    taskStore.list = [task];

    taskStore.updateTaskState("1", false);

    expect(taskStore.list[0].completed).toBe(true);
  });

  it("should delete a task", () => {
    const taskStore = useTaskStore();

    const task = { id: "1", text: "Test Task", completed: false };
    taskStore.list = [task];

    taskStore.deleteTask("1");

    expect(taskStore.list).toHaveLength(0);
  });
});
