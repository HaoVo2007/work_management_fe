import { createRouter, createWebHistory } from "vue-router"

import Login from "../pages/auth/Login.vue"
import Register from "../pages/auth/Register.vue"
import Home from "../pages/Home.vue"
import BoardView from "../pages/BoardView.vue"


const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login, meta: { hideLayout: true } },
  { path: "/register", component: Register, meta: { hideLayout: true } },
  { path: "/home", component: Home, meta: { requiresAuth: true } },
  { path: "/board/:id", component: BoardView, meta: { requiresAuth: true } },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem("access_token")
//   if (!token && !to.meta.public) return next("/login")
//   if (token && (to.path === "/login" || to.path === "/register")) {
//     return next("/home")
//   }
//   next()
// })

export default router
