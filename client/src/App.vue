<template>
  <div id="app">
    <div class="container card">
      <AddTaskInput @addTask="addTask" />
      <div class="todo-controls">
        <div class="tabs">
          <button
            :class="{ active: filter === 'all' }"
            @click="setFilter('all')"
          >
            All ({{ allTaskCount }})
          </button>
          <button
            :class="{ active: filter === 'pending' }"
            @click="setFilter('pending')"
          >
            Pending ({{ pendingTaskCount }})
          </button>
          <button
            :class="{ active: filter === 'completed' }"
            @click="setFilter('completed')"
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
    <ErrorComponent />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import TodoList from "./components/TodoList.vue";
import AddTaskInput from "./components/AddTaskInput.vue";
import ErrorComponent from "./components/ErrorComponent.vue";

export default {
  name: "App",
  components: {
    TodoList,
    AddTaskInput,
    ErrorComponent,
  },
  mounted() {
    this.fetchTasks();
  },
  computed: {
    ...mapGetters([
      "filter",
      "loading",
      "filteredTasks",
      "allTaskCount",
      "completedTaskCount",
      "pendingTaskCount",
    ]),
  },
  methods: {
    ...mapActions(["fetchTasks", "addTask", "toggleTask", "setFilter"]),
  },
};
</script>
