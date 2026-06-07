<script setup>
import { ref, computed } from 'vue'
import { saleBooks } from '@/data/SaleBooks.js'

const currentSlide = ref(0)
const visibleCount = 4 // сколько книг видно одновременно

function prev() {
  if (currentSlide.value > 0) currentSlide.value--
}
function next() {
  if (currentSlide.value < saleBooks.length - visibleCount) currentSlide.value++
}

// книги которые сейчас видны
const visibleBooks = computed(() => 
  saleBooks.slice(currentSlide.value, currentSlide.value + visibleCount)
)
</script>
<template>
  <section id="sale" class="mt-[180px] px-36 text-stone-900">
    <h1 style="font-family: 'MontserratAlternates-SemiBold', sans-serif; font-size: 70px; font-weight: 600;">
      Распродажа
    </h1>

    <div class="flex items-center gap-4 mt-16 -mx-16">
      <!-- Стрелка влево -->
      <button @click="prev" class="text-stone-400 hover:text-stone-800 text-3xl transition-colors">←</button>

      
      <!-- Книги -->
<div class="flex gap-14 flex-1 justify-center">
  <div v-for="(book, i) in visibleBooks" :key="i">
    <img
      :src="book.img"
      class="rounded-2xl object-cover cursor-pointer hover:-translate-y-2 transition-transform duration-300"
      style="width: 360px; height: 480px;"
    >
  </div>
</div>

      <!-- Стрелка вправо -->
      <button @click="next" class="text-stone-400 hover:text-stone-800 text-3xl transition-colors">→</button>
    </div>

    
    <!-- Точки -->
<div class="flex justify-center gap-3 mt-10">
  <span
    v-for="i in saleBooks.length - visibleCount + 1" :key="i"
    @click="currentSlide = i - 1"
    class="w-3 h-3 rounded-full cursor-pointer transition-all duration-300"
    :class="i - 1 === currentSlide ? 'bg-stone-700' : 'bg-stone-300'"
  />
</div>
  </section>
</template>