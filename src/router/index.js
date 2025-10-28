import { createRouter, createWebHistory } from "vue-router"

// Auth
import Login from "../pages/auth/Login.vue"
import Register from "../pages/auth/Register.vue"

// App pages
import Home from "../pages/Home.vue"
// import BoardsView from "../pages/BoardsView.vue"
// import BoardView from "../pages/BoardView.vue"

const routes = [
  { path: "/", redirect: "/login" },

  // Auth
  { path: "/login", component: Login, meta: { public: true } },
  { path: "/register", component: Register, meta: { public: true } },

  // Home (hiển thị sau khi login)
  { path: "/home", component: Home, meta: { requiresAuth: true } },

  // Boards
  // { path: "/boards", component: BoardsView, meta: { requiresAuth: true } },
  // { path: "/boards/:id", component: BoardView, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("access_token")
  if (!token && !to.meta.public) return next("/login")
  if (token && (to.path === "/login" || to.path === "/register")) {
    return next("/home")
  }
  next()
})

export default router
