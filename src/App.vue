<script setup>
const categories = [
  { label: 'Детская литература', color: 'bg-pink-200', rotate: 13, width: 80, height: 500, left: 0, top: 0, shadow: '16px 24px 40px rgba(0,0,0,0.25)' },
  { label: 'Художественная литература', color: 'bg-blue-200', rotate: 3, width: 94, height: 709, left: 0, top: 0, shadow: '20px 30px 50px rgba(0,0,0,0.28)' },
  { label: 'Бизнес-литература', color: 'bg-indigo-200', rotate: 20, width: 101, height: 625, left: 50, top: 30, shadow: '16px 24px 40px rgba(0,0,0,0.25)' },
  { label: 'Учебная литература', color: 'bg-purple-200', rotate: 13, width: 110, height: 800, left: 80, top: 0, shadow: '20px 30px 50px rgba(0,0,0,0.28)' },
]

const navLinks = ['О нас', 'Каталог', 'Бестселлеры', 'Распродажа', 'Контакты']
</script>

<template>
  <div class="min-h-screen font-sans" style="background-color: #FFFBF2; font-family: 'Georgia', serif;">

    <!-- Navbar -->
    <nav class="flex items-center justify-between px-24 py-5" style=" background-color: #FFFBF2;">

      <span class="font-bold text-sm tracking-wide text-stone-800" style="font-family: 'Georgia', serif;">
        Книжный уголок
      </span>

      <ul class="flex gap-8">
        <li v-for="link in navLinks" :key="link">
          <a
            href="#"
            class="text-sm text-stone-600 hover:text-stone-900 transition-colors duration-200 tracking-wide"
            style="font-family: 'Arial', sans-serif; font-size: 13px;"
          >
            {{ link }}
          </a>
        </li>
      </ul>

      <div class="flex items-center gap-4 text-stone-600">
        <button class="hover:text-stone-900 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
        <button class="hover:text-stone-900 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
        </button>
      </div>
    </nav>
     <div class="px-24">
      <hr class="border bg-stone-950">
    </div>
    <!-- Hero -->
    <section class="flex px-24 pt-16 pb-20 relative overflow-visible" style="min-height: 80vh;">

      <!-- Left content -->
      <div class="flex-1 max-w-sm z-10 mt-3.5">
        <h1
          class="text-6xl font-black text-stone-900 leading-none mb-60"
          style="font-family: 'Georgia', serif; letter-spacing: -1px;"
        >
          Книжный<br>уголок
        </h1>

        <p class="text-stone-500 text-sm leading-relaxed mb-8 max-w-xs" style="font-family: 'Arial', sans-serif;">
          Мы верим, что литература способна изменить мир, и поэтому собрали для вас самые интересные и разнообразные произведения от классики до современных бестселлеров.
        </p>

        <button
          class="px-6 py-2.5 border border-stone-800 text-stone-800 text-sm rounded-full hover:bg-stone-800 hover:text-amber-50 transition-all duration-300 tracking-wide"
          style="font-family: 'Arial', sans-serif;"
        >
          Каталог
        </button>
      </div>

      <!-- Right: Book spines -->
      <div class="flex-1 flex items-end justify-center gap-12 relative overflow-visible" style="height: 820px;">
        <div
          v-for="(cat, i) in categories"
          :key="i"
          :class="[
            cat.color,
            'relative flex items-center justify-center cursor-pointer transition-all duration-500 hover:-translate-y-4 rounded-xl group'
          ]"
          :style="{
            transform: `rotate(${cat.rotate}deg)`,
            width: cat.width + 'px',
            height: cat.height + 'px',
            left: cat.left + 'px',
            top: cat.top + 'px',
            boxShadow: cat.shadow
          }"
        >
          <!-- Arrow по умолчанию -->
          <div
            v-if="i !== 3"
            class="absolute top-5 right-4 w-7 h-7 rounded-full bg-white/60 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>

          <!-- Arrow на hover -->
          <div class="absolute top-5 right-4 w-7 h-7 rounded-full bg-white/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>

          <!-- Подпись -->
          <span
            class="text-stone-700 text-xs font-medium select-none"
            style="writing-mode: vertical-rl; transform: rotate(180deg); font-family: 'Arial', sans-serif; letter-spacing: 0.15em;"
          >
            {{ cat.label }}
          </span>
        </div>
      </div>

    </section>

  </div>
</template>

<style>
  html, body {
    background-color: #FFFBF2;
  }
</style>