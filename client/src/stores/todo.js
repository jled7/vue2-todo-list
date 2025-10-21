import Vue from "vue";
import Vuex from "vuex";

import {
  SET_LOADING,
  SET_FILTER,
  SET_TASKS,
  ADD_TASK,
  TOGGLE_TASK,
} from "./mutation-types.js";
import { setupEventSource } from "../services/eventSource.js";
import { addTask, fetchTasks, toggleTask } from "../services/api.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tasks: [],
    loading: true,
    filter: "all",
  },
  getters: {
    filter: (state) => state.filter,
    loading: (state) => state.loading,
    allTasks: (state) => state.tasks,
    filteredTasks(state) {
      if (state.filter === "all") {
        return state.tasks;
      }
      if (state.filter === "pending") {
        return state.tasks.filter((t) => !t.completed);
      }
      if (state.filter === "completed") {
        return state.tasks.filter((t) => t.completed);
      }
      return state.tasks;
    },
    allTaskCount(state) {
      return state.tasks.length;
    },
    completedTaskCount(state) {
      return state.tasks.filter((t) => t.completed).length;
    },
    pendingTaskCount(state) {
      return state.tasks.filter((t) => !t.completed).length;
    },
  },
  mutations: {
    [SET_LOADING]: function (state, isLoading) {
      state.loading = isLoading;
    },
    [SET_FILTER]: function (state, filter) {
      state.filter = filter;
    },
    [SET_TASKS]: function (state, tasks) {
      state.tasks = tasks;
    },
    [ADD_TASK]: function (state, task) {
      state.tasks.unshift(task);
    },
    [TOGGLE_TASK]: function (state, { id, taskCompleted }) {
      const t = state.tasks.find((t) => t.id === id);
      console.log(t, id, taskCompleted);
      if (t) t.completed = taskCompleted;
    },
  },
  actions: {
    setFilter({ commit }, filter) {
      commit(SET_FILTER, filter);
    },
    async fetchTasks({ commit }) {
      commit(SET_LOADING, true);
      const tasks = await fetchTasks();
      commit(SET_TASKS, tasks);
      commit(SET_LOADING, false);
    },
    async addTask({ commit }, title) {
      await addTask(title.trim());
    },
    async toggleTask({ commit }, id) {
      await toggleTask(id);
    },
  },
});

setupEventSource(store);

export default store;
