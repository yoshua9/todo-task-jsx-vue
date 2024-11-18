import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    list: [] as Task[],
  }),
  actions: {
    addTask(t: Task) {
      this.list.push(t);
    },
    updateTaskState(id: string, state: boolean) {
      const index = this.list.findIndex((task: Task) => task.id === id);

      if (index !== -1) {
        const task = { ...this.list[index] };
        task.completed = !state;
        this.list.splice(index, 1, task);
      }
    },
    deleteTask(id: string) {
      this.list = this.list.filter((t: Task) => t.id !== id);
    },
  },
});
