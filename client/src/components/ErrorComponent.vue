<template>
  <div v-if="error" id="error-component" @click="clearError">
    <span class="error-message">{{ error }}</span>
    <button class="error-close" @click.stop="clearError">&times;</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ErrorComponent",
  computed: {
    ...mapGetters(["error"]),
  },
  methods: {
    ...mapActions(["clearError"]),
  },
};
</script>

<style scoped>
#error-component {
  position: fixed;
  bottom: 0;
  left: 0;
  background: white;
  width: calc(100% - 20px);
  text-align: center;
  color: red;
  border: 1px solid red;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.error-message {
  flex: 1;
}

.error-close {
  background: none;
  border: none;
  color: red;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-close:hover {
  background-color: rgba(255, 0, 0, 0.1);
  border-radius: 50%;
}
</style>
