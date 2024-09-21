import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue';
import Country from '@/views/CountryView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/country/:id',
      name: 'Country',
      component: Country,
      props: true
    }
  ]
})

export default router
