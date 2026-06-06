<script setup>
import { categories } from '@/data/categories'
</script>

<template>
<section class="flex px-36 pt-44 pb-26 relative overflow-visible" style="min-height: 80vh;">

      <!-- Left content -->
      <div class="flex-1 max-w-2xl z-10 mt-3.5">   
        <h1
          class="text-[92px] font-black text-stone-900  "
          style="font-family: 'Hakim', serif; line-height: 130%;padding-bottom: 67px;"
        >
          Книжный<br>уголок
        </h1>

        <p class="text-stone-500 text-[20px] leading-[1.25] mb-10 max-w-prose" style="font-family: 'Montserrat', sans-serif; text-wrap:balance;padding-bottom: 45px; ">
          Мы верим, что литература способна изменить мир, и поэтому собрали для вас самые интересные и разнообразные произведения от классики до современных бестселлеров.
        </p>

        <button
          class=" bg-[#BACCE2] px-8 py-3  text-stone-800 text-base rounded-full hover:bg-stone-800 hover:text-amber-50 transition-all duration-300 tracking-wide"
          style="font-family: 'Montserrat', sans-serif; width: 245px; font-size:19px;cursor: pointer;"
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
            class="absolute top-5 right-4 w-7 h-7 rounded-full bg-white/60 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300 " 
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-stone-700 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>

          <!-- Arrow на hover -->
          <div class="absolute top-5 right-4 w-7 h-7 rounded-full bg-white/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style="cursor:pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-stone-700 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>

          
          <span
            class="text-stone-700 text-xs font-medium select-none"
            style="writing-mode: vertical-rl; transform: rotate(180deg); font-family: 'Montserrat', sans-serif;font-size: 24px; letter-spacing: 0.15em;"
          >
            {{ cat.label }}
          </span>
        </div>
      </div>

    </section></template>