<script setup>
import RadioCheckbox from "./RadioCheckbox.vue";
</script>

<template>
  <div class="todo-item" @click="$emit('toggleTask')">
    <div class="todo-title" :class="{ completed: task.completed }">
      <RadioCheckbox :checked="task.completed">
        {{ task.title }}
      </RadioCheckbox>
    </div>
    <div class="todo-meta">
      <span class="todo-date">{{ formatDate(task.createdAt) }}</span>
    </div>
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
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diff = now - date;
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (minutes < 1) return "Just now";
      if (minutes < 60) return `${minutes}m ago`;
      if (hours < 24) return `${hours}h ago`;
      if (days < 7) return `${days}d ago`;

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    },
  },
};
</script>
