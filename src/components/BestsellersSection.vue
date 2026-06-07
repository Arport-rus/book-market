<script setup>
import { ref } from 'vue'
import { books } from '@/data/books'

const currentSlide = ref(0)
function prevSlide() {
  currentSlide.value = currentSlide.value > 0 ? currentSlide.value - 1 : books.length - 1
}
function nextSlide() {
  currentSlide.value = currentSlide.value < books.length - 1 ? currentSlide.value + 1 : 0
}
</script>

<template>
  <section id="bestsellers" class="mt-[80px] lg:mt-[180px] px-6 md:px-16 lg:px-36 text-stone-900">
    <h1 class="text-[40px] lg:text-[70px] text-center lg:text-left" style="font-family: 'MontserratAlternates-SemiBold', sans-serif; font-weight: 600;">
      Бестселлеры
    </h1>

    <!-- Мобилка: картинка сверху, текст снизу -->
    <div class="flex flex-col items-center lg:hidden mt-8 gap-8">
      <img class="rounded-3xl w-full max-w-[300px]" :src="books[currentSlide].img" alt="книга">
      <p class="text-[16px] font-light whitespace-pre-line text-center" style="font-family: 'Montserrat', sans-serif;">
        {{ books[currentSlide].description }}
      </p>
    </div>

    <!-- Десктоп: картинка слева, текст справа -->
    <div class="hidden lg:grid mt-10" style="grid-template-columns: auto 1fr; column-gap: 40px;">
      <div>
       <img class="rounded-3xl" style="width: 565px; height: 770px; object-fit: cover;" :src="books[currentSlide].img" alt="книга">
      </div>
      <div class="text-[24px] font-light flex flex-col justify-start pt-16" style="font-family: 'Montserrat', sans-serif;">
        <p class="text-balance whitespace-pre-line">{{ books[currentSlide].description }}</p>
      </div>
    </div>

    <!-- Точки -->
    <div class="flex justify-center gap-3 mt-10">
      <span
        v-for="(book, i) in books" :key="i"
        @click="currentSlide = i"
        class="w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300"
        :class="i === currentSlide ? 'bg-stone-800' : 'bg-stone-300'"
      />
    </div>
  </section>
</template>