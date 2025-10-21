<template>
  <div class="add-task">
    <input
      type="text"
      placeholder="Add a new task"
      @keyup.enter="addTask"
      v-model="newTask"
    />
    <button @click="addTask">Add Task</button>
  </div>
</template>

<script>
export default {
  name: "AddTaskInput",
  data() {
    return {
      newTask: "",
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim()) {
        this.$emit("addTask", this.newTask.trim());
        this.newTask = "";
      }
    },
  },
};
</script>
