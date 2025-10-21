<template>
  <div id="error-component">Error: <slot name="error"></slot></div>
</template>

<script>
export default {
  name: "ErrorComponent",
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
}
</style>
