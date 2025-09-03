import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/RegisterView.vue'
import TodoListView from '@/views/TodoListView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/todolist',
      name: 'todolist',
      component: TodoListView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },

  ],
})

export default router
