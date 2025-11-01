/**
 * Router Configuration
 * Centralized route definitions with navigation guards
 */
import { createRouter, createWebHistory } from "vue-router"
import { ROUTE_NAMES } from '../constants/routes'
import { STORAGE_KEYS } from '../constants/routes'

import Login from "../pages/auth/Login.vue"
import Register from "../pages/auth/Register.vue"
import Home from "../pages/Home.vue"
import BoardView from "../pages/BoardView.vue"

const routes = [
  { 
    path: "/", 
    redirect: "/login" 
  },
  { 
    path: "/login", 
    name: ROUTE_NAMES.LOGIN,
    component: Login, 
    meta: { hideLayout: true, requiresAuth: false } 
  },
  { 
    path: "/register", 
    name: ROUTE_NAMES.REGISTER,
    component: Register, 
    meta: { hideLayout: true, requiresAuth: false } 
  },
  { 
    path: "/home", 
    name: ROUTE_NAMES.HOME,
    component: Home, 
    meta: { requiresAuth: true } 
  },
  { 
    path: "/board/:id", 
    name: ROUTE_NAMES.BOARD,
    component: BoardView, 
    meta: { requiresAuth: true } 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard - Check authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
  const requiresAuth = to.meta.requiresAuth !== false

  // If route requires auth and user is not authenticated
  if (requiresAuth && !token) {
    return next({ name: ROUTE_NAMES.LOGIN })
  }

  // If user is authenticated and trying to access auth pages
  if (token && (to.path === "/login" || to.path === "/register")) {
    return next({ name: ROUTE_NAMES.HOME })
  }

  next()
})

export default router
