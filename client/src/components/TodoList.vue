<template>
  <div class="todo-list">
    <ul>
      <li
        v-for="task in tasks"
        :key="task.id"
        @click="$emit('toggleTask', task.id)"
      >
        {{ task.title }} - {{ task.completed ? "Completed" : "Pending" }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
};
</script>
