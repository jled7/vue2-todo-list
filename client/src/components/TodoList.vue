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
import TodoItem from "./TodoItem.vue";

export default {
  name: "TodoList",
  components: {
    TodoItem,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
};
</script>
