import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateProductView from '../views/CreateProductView.vue'
import EditeProductView from '../views/EditeProductView.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      // Apply the route guard to this route
      beforeEnter: requireAuth,
    },
    {
      path: '/create',
      name: 'create',
      component: CreateProductView,
      // Apply the route guard to this route
      beforeEnter: requireAuth,
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditeProductView,
      // Apply the route guard to this route
      beforeEnter: requireAuth,
    },
    {
      path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: requireGuest,


  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: requireGuest,

  },
  ]
})

export function requireAuth(to, from, next) {
  const isAuthenticated = localStorage.getItem('token');
  
  if (isAuthenticated) {
      // If the user is authenticated, allow access to the route
      next();
  } else {
      // If the user is not authenticated, redirect to the login page or another appropriate route
      next('/login');
  }
}

export function requireGuest(to, from, next) {
  const isAuthenticated = localStorage.getItem('token');
  
  if (!isAuthenticated) {
      // If the user is authenticated, allow access to the route
      next();
  } else {
      // If the user is not authenticated, redirect to the login page or another appropriate route
      next('/');
  }
}

export default router
