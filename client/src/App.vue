<script setup>
import AddTaskInput from "./components/AddTaskInput.vue";
import TodoList from "./components/TodoList.vue";
</script>

<template>
  <div id="app">
    <div class="container">
      <h1>To-Do List</h1>
      <p>Welcome to your To-Do App!</p>
      <div v-if="loading">Loading tasks...</div>
      <div v-else-if="tasks.length === 0">
        No tasks available. Add a new task!
      </div>
      <div v-else>
        <AddTaskInput @addTask="addTask" />
        <TodoList :tasks="tasks" @toggleTask="toggleTask" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      tasks: [],
      loading: true,
    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    fetchTasks() {
      // Simulate fetching tasks from an API
      setTimeout(() => {
        this.tasks = [
          { id: 1, title: "Sample Task 1", completed: false },
          { id: 2, title: "Sample Task 2", completed: true },
        ];
        this.loading = false;
      }, 1000);
    },
    addTask(task) {
      this.tasks.push(task);
    },
    toggleTask(taskId) {
      const task = this.tasks.find((t) => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
};
</script>
