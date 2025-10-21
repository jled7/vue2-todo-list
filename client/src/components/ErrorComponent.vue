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
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%);
  max-width: 500px;
  width: calc(100% - 40px);
  min-width: 300px;
  color: #dc2626;
  border: 1px solid #fecaca;
  border-radius: 12px;
  padding: 16px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 25px rgba(220, 38, 38, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);
}

#error-component:hover {
  transform: translateX(-50%) translateY(-2px);
  box-shadow: 0 15px 35px rgba(220, 38, 38, 0.2), 0 6px 16px rgba(0, 0, 0, 0.12);
}

.error-message {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  text-align: left;
  margin-right: 12px;
}

.error-close {
  background: rgba(220, 38, 38, 0.1);
  border: none;
  color: #dc2626;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  padding: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.error-close:hover {
  background: rgba(220, 38, 38, 0.2);
  transform: scale(1.1);
}

.error-close:active {
  transform: scale(0.95);
}
</style>
