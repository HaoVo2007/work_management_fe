import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/auth/Login.vue";
import Register from "../pages/auth/Register.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
