<script setup>
import { ref, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { cartCount } from '@/data/CartStore.js'
import { favoriteCount } from '@/data/favoriteStore.js'

const router = useRouter()
const route = useRoute() // Знаем, на какой мы странице
const isOpen = ref(false)

const navLinks = [
  { label: 'О нас',       id: 'about' },
  { label: 'Каталог',      id: 'catalog' },
  { label: 'Бестселлеры', id: 'bestsellers' },
  { label: 'Распродажа',  id: 'sale' },
  { label: 'Контакты',    id: 'contacts' },
]

function scrollTo(id) {
  isOpen.value = false // Закрываем мобильное меню сразу

  // 1. Если кликнули на каталог — просто уходим на страницу каталога
  if (id === 'catalog') {
    router.push('/catalog')
    return
  }

  // 2. Если мы СЕЙЧАС в каталоге (или на другой странице) и хотим попасть на секцию главной
  if (route.path !== '/') {
    // Сначала переходим на главную
    router.push('/').then(() => {
      // Ждем, пока Vue отрендерит главную страницу, и только потом скроллим
      nextTick(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      })
    })
  } else {
    // 3. Если мы уже на главной — просто плавно скроллим
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<template>
  <nav class="flex items-center justify-between px-6 md:px-16 lg:px-36 pt-10 md:pt-[66px] pb-5 bg-[#FFFBF2] relative">
    
    <span style="font-family: 'Hakim', serif; font-size: 22px;" class="font-bold text-stone-800">
      Книжный уголок
    </span>

    <ul class="hidden lg:flex gap-4 xl:gap-[100px]">
      <a v-for="link in navLinks" :key="link.id"
         @click="scrollTo(link.id)"
         class="cursor-pointer text-stone-600 hover:text-stone-900 transition-colors duration-200"
         style="font-family: 'Montserrat', sans-serif; font-size: 20px;"
      >
        {{ link.label }}
      </a>
    </ul>

    <div class="hidden lg:flex items-center gap-4 xl:gap-6 text-stone-600">
      
      <div class="relative w-8 h-8 flex items-center justify-center">
        <button class="hover:text-stone-900 transition-colors duration-200 w-full h-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
        
        <span 
          v-if="favoriteCount > 0"
          class="absolute -bottom-1 -right-1.5 bg-stone-800 text-white font-bold rounded-full flex items-center justify-center pointer-events-none select-none animate-scale-up"
          style="font-family: 'Montserrat', sans-serif; font-size: 11px; min-width: 16px; height: 16px; padding: 0 4px;"
        >
          {{ favoriteCount }}
        </span>
      </div>

      <div class="relative w-8 h-8 flex items-center justify-center">
        <button class="hover:text-stone-900 transition-colors duration-200 w-full h-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
        </button>

        <span 
          v-if="cartCount > 0"
          class="absolute -bottom-1 -right-1.5 bg-stone-800 text-white font-bold rounded-full flex items-center justify-center pointer-events-none select-none animate-scale-up"
          style="font-family: 'Montserrat', sans-serif; font-size: 11px; min-width: 16px; height: 16px; padding: 0 4px;"
        >
          {{ cartCount }}
        </span>
      </div>

    </div>

    <button class="lg:hidden text-stone-800" @click="isOpen = !isOpen">
      <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

  </nav>

  <div v-if="isOpen" class="lg:hidden bg-[#FFFBF2] px-6 pb-6 flex flex-col gap-6">
    <a v-for="link in navLinks" :key="link.id"
       @click="scrollTo(link.id)"
       class="cursor-pointer text-stone-600 hover:text-stone-900 transition-colors duration-200"
       style="font-family: 'Montserrat', sans-serif; font-size: 20px;"
    >
      {{ link.label }}
    </a>
    
    <div class="flex gap-6 text-stone-600 mt-2">
      
      <div class="relative w-7 h-7 flex items-center justify-center">
        <button class="hover:text-stone-900 w-full h-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
        
        <span 
          v-if="favoriteCount > 0"
          class="absolute -bottom-1 -right-1.5 bg-stone-800 text-white font-bold rounded-full flex items-center justify-center pointer-events-none select-none animate-scale-up"
          style="font-family: 'Montserrat', sans-serif; font-size: 10px; min-width: 14px; height: 14px; padding: 0 3px;"
        >
          {{ favoriteCount }}
        </span>
      </div>

      <div class="relative w-7 h-7 flex items-center justify-center">
        <button class="hover:text-stone-900 w-full h-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
        </button>

        <span 
          v-if="cartCount > 0"
          class="absolute -bottom-1 -right-1.5 bg-stone-800 text-white font-bold rounded-full flex items-center justify-center pointer-events-none select-none animate-scale-up"
          style="font-family: 'Montserrat', sans-serif; font-size: 10px; min-width: 14px; height: 14px; padding: 0 3px;"
        >
          {{ cartCount }}
        </span>
      </div>

    </div>
  </div>

  <div class="px-6 md:px-16 lg:px-36">
    <hr class="border border-stone-200" />
  </div>
</template>

<style scoped>
/* Плавное масштабирование при появлении/изменении цифры */
@keyframes scaleUp {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.animate-scale-up {
  animation: scaleUp 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
</style>