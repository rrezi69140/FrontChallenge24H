import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import Prediction from "@/views/Prediction.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/prediction',
      name: 'Prediction',
      component: Prediction,
    },


  ],
})

export default router
