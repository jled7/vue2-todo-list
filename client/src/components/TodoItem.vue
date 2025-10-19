<template>
  <div class="todo-item" @click="$emit('click')">
    <li>{{ task.title }} - {{ task.completed ? "Completed" : "Pending" }}</li>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>
