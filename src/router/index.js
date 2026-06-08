import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import CatalogPage from '@/pages/CatalogPage.vue'
import BookDetailPage from '@/pages/BookDetailPage.vue'

const router = createRouter({
  // Включаем хэш-режим, чтобы VPN не перехватывал локальные переходы
  history: createWebHashHistory(),
  routes: [
    { 
      path: '/', 
      component: HomePage 
    },
    { 
      path: '/catalog', 
      component: CatalogPage 
    },
    { 
      path: '/catalog/:id', 
      component: BookDetailPage, 
      props: true 
    },
  ]
})

export default router

