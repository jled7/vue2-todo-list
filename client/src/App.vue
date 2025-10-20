<script setup>
import TodoList from "./components/TodoList.vue";
import AddTaskInput from "./components/AddTaskInput.vue";
</script>

<template>
  <div id="app">
    <div class="container card">
      <AddTaskInput @addTask="addTask" />
      <div class="todo-controls">
        <div class="tabs">
          <button :class="{ active: filter === 'all' }" @click="filter = 'all'">
            All ({{ allTaskCount }})
          </button>
          <button
            :class="{ active: filter === 'pending' }"
            @click="filter = 'pending'"
          >
            Pending ({{ pendingTaskCount }})
          </button>
          <button
            :class="{ active: filter === 'completed' }"
            @click="filter = 'completed'"
          >
            Completed ({{ completedTaskCount }})
          </button>
        </div>
      </div>
      <div v-if="loading" class="loading">Loading tasks...</div>
      <div v-else-if="filteredTasks.length === 0" class="empty">
        No tasks available.
      </div>
      <TodoList v-else :tasks="filteredTasks" @toggleTask="toggleTask" />
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
      filter: "all",
    };
  },
  mounted() {
    this.fetchTasks();
  },
  computed: {
    filteredTasks() {
      if (this.filter === "all") {
        return this.tasks;
      }
      if (this.filter === "pending") {
        return this.tasks.filter((t) => !t.completed);
      }
      if (this.filter === "completed") {
        return this.tasks.filter((t) => t.completed);
      }
      return this.tasks;
    },
    allTaskCount() {
      return this.tasks.length;
    },
    completedTaskCount() {
      return this.tasks.filter((t) => t.completed).length;
    },
    pendingTaskCount() {
      return this.tasks.filter((t) => !t.completed).length;
    },
  },
  methods: {
    fetchTasks() {
      // Simulate fetching tasks from an API
      setTimeout(() => {
        this.tasks = [
          {
            id: 1,
            title: "Renew gym membership",
            completed: false,
            createdAt: new Date(),
          },
          {
            id: 2,
            title: "Create a video for YouTube",
            completed: true,
            createdAt: new Date(),
          },
          {
            id: 3,
            title: "Write a blog about new trends",
            completed: false,
            createdAt: new Date(),
          },
          {
            id: 4,
            title: "Send project file to the client",
            completed: false,
            createdAt: new Date(),
          },
          {
            id: 5,
            title: "Discuss new project with team",
            completed: false,
            createdAt: new Date(),
          },
        ];
        this.loading = false;
      }, 1000);
    },
    addTask(task) {
      task.id = this.tasks.length + 1;
      this.tasks.unshift(task);
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
