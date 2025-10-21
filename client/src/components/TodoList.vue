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
    <ErrorComponent v-if="$store.getters.error">
      <template #error>
        {{ $store.getters.error }}
      </template>
    </ErrorComponent>
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";
import ErrorComponent from "./ErrorComponent.vue";

export default {
  name: "TodoList",
  components: {
    TodoItem,
    ErrorComponent,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
};
</script>
