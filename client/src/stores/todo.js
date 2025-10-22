import Vue from "vue";
import Vuex from "vuex";

import {
  SET_LOADING,
  SET_FILTER,
  SET_TASKS,
  ADD_TASK,
  TOGGLE_TASK,
  SET_ERROR,
  CLEAR_ERROR,
} from "./mutation-types.js";
import { setupEventSource } from "../services/eventSource.js";
import { addTask, fetchTasks, toggleTask } from "../services/api.js";

Vue.use(Vuex);

const ERROR_DISPLAY_DURATION = 3000;
// Variable to track the error timeout
let errorTimeout = null;

const store = new Vuex.Store({
  state: {
    error: "",
    tasks: [],
    loading: true,
    filter: "all",
  },
  getters: {
    error: (state) => state.error,
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
    [SET_ERROR]: function (state, error) {
      state.error = error;
    },
    [CLEAR_ERROR]: function (state) {
      state.error = "";
    },
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
      if (t) t.completed = taskCompleted;
    },
  },
  actions: {
    setFilter({ commit }, filter) {
      commit(SET_FILTER, filter);
    },
    showError({ commit }, errorMessage) {
      // Clear any existing timeout to restart the countdown
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }

      // Set the error immediately
      commit(SET_ERROR, errorMessage);

      // Set a new timeout to clear the error after 3 seconds
      errorTimeout = setTimeout(() => {
        commit(CLEAR_ERROR);
        errorTimeout = null;
      }, ERROR_DISPLAY_DURATION);
    },
    clearError({ commit }) {
      // Manual clear error action
      if (errorTimeout) {
        clearTimeout(errorTimeout);
        errorTimeout = null;
      }
      commit(CLEAR_ERROR);
    },
    async fetchTasks({ commit, dispatch }) {
      try {
        commit(SET_LOADING, true);
        const tasks = await fetchTasks();
        commit(SET_TASKS, tasks);
        commit(SET_LOADING, false);
      } catch (error) {
        dispatch("showError", error.message);
      }
    },
    async addTask({ dispatch }, title) {
      try {
        await addTask(title.trim());
      } catch (error) {
        dispatch("showError", error.message);
      }
    },
    async toggleTask({ dispatch }, id) {
      try {
        await toggleTask(id);
      } catch (error) {
        dispatch("showError", error.message);
      }
    },
  },
});

setupEventSource(store);

export default store;
