<script setup>
import { categories } from '@/data/categories'
</script>

<template>
<section id="hero" class="flex flex-col lg:flex-row px-6 md:px-16 lg:px-36 pt-24 lg:pt-44 pb-10 lg:pb-26 relative overflow-visible" style="min-height: 80vh;">

  <div class="flex-1 max-w-2xl z-10 mt-3.5">   
    <h1
      class="font-black text-stone-900 text-[52px] md:text-[72px] lg:text-[92px]"
      style="font-family: 'Hakim', serif; line-height: 130%; padding-bottom: 30px;"
    >
      Книжный<br>уголок
    </h1>

    <p class="text-stone-500 leading-[1.25] mb-10 text-[16px] md:text-[18px] lg:text-[20px]" style="font-family: 'Montserrat', sans-serif; text-wrap: balance; padding-bottom: 30px;">
      Мы верим, что литература способна изменить мир, и поэтому собрали для вас самые интересные и разнообразные произведения от классики до современных бестселлеров.
    </p>

    <div class="flex lg:block justify-center">
      <router-link 
        to="/catalog"
        class="bg-[#BACCE2] px-8 py-3 text-stone-800 text-base rounded-full hover:bg-stone-800 hover:text-amber-50 hover:-translate-y-2 hover:scale-[1.02] active:-translate-y-2 active:scale-[1.02] transition-all duration-300 tracking-wide inline-block text-center no-underline" 
        style="font-family: 'Montserrat', sans-serif; width: 245px; font-size: 19px; cursor: pointer;"
      >
        Каталог
      </router-link>
    </div>
  </div>

  <div class="flex flex-col items-center gap-6 mt-16 lg:hidden">
    <router-link
      v-for="(cat, i) in categories"
      :key="i"
      :to="{ path: '/catalog', query: { category: cat.label } }"
      :class="[cat.color, 'relative flex items-center justify-between px-6 cursor-pointer rounded-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] active:-translate-y-2 active:scale-[1.02] no-underline']"
      style="width: 90%; height: 80px;"
    >
      <span class="text-stone-700 select-none" style="font-family: 'Montserrat', sans-serif; font-size: 20px; letter-spacing: 0.15em;">
        {{ cat.label }}
      </span>
      <div class="w-7 h-7 rounded-full bg-white/60 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </router-link>
  </div>

  <div class="hidden lg:flex flex-1 items-end justify-center gap-4 xl:gap-12 relative overflow-visible" style="height: 820px;">
    <router-link
      v-for="(cat, i) in categories"
      :key="i"
      :to="{ path: '/catalog', query: { category: cat.label } }"
      :class="[cat.color, 'relative flex items-center justify-center cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02] rounded-xl group no-underline']"
      :style="{
        transform: `rotate(${cat.rotate}deg)`,
        width: cat.width + 'px',
        height: cat.height + 'px',
        left: cat.left + 'px',
        top: cat.top + 'px',
        boxShadow: cat.shadow
      }"
    >
      <div class="absolute top-5 right-4 w-7 h-7 rounded-full bg-white/60 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
      <div class="absolute top-5 right-4 w-7 h-7 rounded-full bg-white/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
      <span class="text-stone-700 select-none" style="writing-mode: vertical-rl; transform: rotate(180deg); font-family: 'Montserrat', sans-serif; font-size: 24px; letter-spacing: 0.15em;">
        {{ cat.label }}
      </span>
    </router-link>
  </div>

</section>
</template>