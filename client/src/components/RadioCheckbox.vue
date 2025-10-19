<template>
  <div id="radio-checkbox">
    <label class="container" @click.self.stop
      ><slot></slot>
      <input type="checkbox" v-bind:checked="checked" />
      <span class="radio"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: "RadioCheckbox",
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.radio {
  position: absolute;
  top: 4px;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

.radio:after {
  content: "";
  position: absolute;
  display: none;
}

.container:hover > input ~ .radio {
  background-color: #ccc;
}

.container > input:checked ~ .radio {
  background-color: #2196f3;
}

.container > input:checked ~ .radio:after {
  display: block;
}

.container .radio:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}
</style>
