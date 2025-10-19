<script setup>
import TodoItem from "./TodoItem.vue";
</script>

<template>
  <div class="todo-list">
    <ul>
      <TodoItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggleTask="$emit('toggleTask', task.id)"
      />
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
