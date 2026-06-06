<script setup>
 const navLinks = ['О нас', 'Каталог', 'Бестселлеры', 'Распродажа', 'Контакты']
</script>
<template>
    <nav class="flex items-center justify-between px-36 pt-[66px] pb-5 bg-[#FFFBF2]">
      <span class="font-bold text-sm tracking-wide text-stone-800" style="font-family: 'Hakim', serif; font-size: 22px;">
        Книжный уголок
      </span>

      <ul class="flex gap-[100px]">
        <li v-for="link in navLinks" :key="link">
          <a
            href="#"
            class="text-sm text-stone-600 hover:text-stone-900 transition-colors duration-200 tracking-wide"
            style="font-family: 'Montserrat', sans-serif; font-size: 20px; "
          >
            {{ link }}
          </a>
        </li>
      </ul>

      <div class="flex items-center gap-4 text-stone-600">
        <button class="hover:text-stone-900 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
        <button class="hover:text-stone-900 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Horizontal line -->
    <div class="px-36">
      <hr class="border border-stone-200" />
    </div>
</template>

