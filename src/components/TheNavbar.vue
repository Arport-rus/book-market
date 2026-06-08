<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = ref(false)

const navLinks = [
  { label: 'О нас',       id: 'about' },
  { label: 'Каталог',     id: 'catalog' },
  { label: 'Бестселлеры', id: 'bestsellers' },
  { label: 'Распродажа',  id: 'sale' },
  { label: 'Контакты',    id: 'contacts' },
]

function scrollTo(id) {
  if (id === 'catalog') {
    router.push('/catalog')
    isOpen.value = false
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  isOpen.value = false
}
</script>

<template>
  <nav class="flex items-center justify-between px-6 md:px-16 lg:px-36 pt-10 md:pt-[66px] pb-5 bg-[#FFFBF2] relative">
    
    <span style="font-family: 'Hakim', serif; font-size: 22px;" class="font-bold text-stone-800">
      Книжный уголок
    </span>

    <!-- Десктоп меню -->
    <ul class="hidden lg:flex gap-4 xl:gap-[100px]">
      <a v-for="link in navLinks" :key="link.id"
  @click="scrollTo(link.id)"
  class="cursor-pointer text-stone-600 hover:text-stone-900 transition-colors duration-200"
  style="font-family: 'Montserrat', sans-serif; font-size: 20px;"
>
  {{ link.label }}
</a>
    </ul>

    <!-- Иконки -->
    <div class="hidden lg:flex items-center gap-2 xl:gap-4 text-stone-600">
      <button class="hover:text-stone-900 transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </button>
      <button class="hover:text-stone-900 transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
        </svg>
      </button>
    </div>

    <!-- Бургер кнопка -->
    <button class="lg:hidden text-stone-800" @click="isOpen = !isOpen">
      <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

  </nav>

  <!-- Мобильное меню -->
  <div v-if="isOpen" class="lg:hidden bg-[#FFFBF2] px-6 pb-6 flex flex-col gap-6">
   <a v-for="link in navLinks" :key="link.id"
  @click="scrollTo(link.id)"
  class="cursor-pointer text-stone-600 hover:text-stone-900 transition-colors duration-200"
  style="font-family: 'Montserrat', sans-serif; font-size: 20px;"
>
  {{ link.label }}
</a>
    <!-- Иконки в мобильном меню -->
    <div class="flex gap-4 text-stone-600 mt-2">
      <button class="hover:text-stone-900">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </button>
      <button class="hover:text-stone-900">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
        </svg>
      </button>
    </div>
  </div>

  <div class="px-6 md:px-16 lg:px-36">
    <hr class="border border-stone-200" />
  </div>
</template>