<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { saleBooks } from '@/data/SaleBooks.js'

const currentSlide = ref(0)
const windowWidth = ref(window.innerWidth)

function updateWidth() {
  windowWidth.value = window.innerWidth
  currentSlide.value = 0
}

onMounted(() => window.addEventListener('resize', updateWidth))
onUnmounted(() => window.removeEventListener('resize', updateWidth))

const visibleCount = computed(() => {
  if (windowWidth.value < 768) return 1
  if (windowWidth.value < 1380) return 3
  return 4
})

function prev() {
  if (currentSlide.value > 0) currentSlide.value--
}
function next() {
  if (currentSlide.value < saleBooks.length - visibleCount.value) currentSlide.value++
}

const visibleBooks = computed(() =>
  saleBooks.slice(currentSlide.value, currentSlide.value + visibleCount.value)
)
</script>

<template>
  <section id="sale" class="mt-[80px] lg:mt-[180px] px-6 md:px-16 lg:px-36 text-stone-900">
    <h1 class="text-[40px] lg:text-[70px]" style="font-family: 'MontserratAlternates-SemiBold', sans-serif; font-weight: 600;">
      Распродажа
    </h1>

    <div class="flex items-center gap-4 mt-10 lg:mt-16 -mx-4 lg:-mx-16">
      <button @click="prev" class="text-stone-400 hover:text-stone-800 text-3xl transition-colors">←</button>

      <div class="flex gap-4 lg:gap-14 flex-1 justify-center">
        <div v-for="(book, i) in visibleBooks" :key="i">
          <img
            :src="book.img"
            class="rounded-2xl object-cover cursor-pointer hover:-translate-y-2 transition-transform duration-300"
            style="width: min(80vw, 360px); height: min(107vw, 480px);"
          >
        </div>
      </div>

      <button @click="next" class="text-stone-400 hover:text-stone-800 text-3xl transition-colors">→</button>
    </div>

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