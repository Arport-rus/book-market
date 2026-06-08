<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' 
import { toggleFavoriteCount } from '@/data/favoriteStore.js'

const props = defineProps({
  book: Object
})

const router = useRouter()
const isFavorite = ref(false)

// Функция перехода на страницу книги
const goToBook = () => {
  router.push('/catalog/' + props.book.id)
}

const handleLike = () => {
  isFavorite.value = !isFavorite.value
  // Передаем true, если добавили, и false, если убрали
  toggleFavoriteCount(isFavorite.value)
}
</script>

<template>
  <div @click="goToBook" class="flex flex-col gap-2 cursor-pointer group">
    
    <div class="relative overflow-hidden rounded-2xl">
      <img
        :src="book.image ? 'http://localhost:3001' + book.image : (book.images && book.images[0] ? 'http://localhost:3001' + book.images[0] : '')"
        :alt="book.title"
        class="object-cover transition-transform duration-300 group-hover:scale-105 w-full"
        style="height: 430px;"
      >
    </div>

    <p class="text-stone-900" style="font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 700;">
      {{ book.price }} ₽
    </p>

    <p class="text-stone-800 leading-tight" style="font-family: 'Montserrat', sans-serif; font-size: 20px;">
      {{ book.title }}
    </p>

    <p class="text-stone-400" style="font-family: 'Montserrat', sans-serif; font-size: 18px;">
      {{ book.author }}
    </p>

    <div class="flex items-center gap-3 mt-1">
      <button class="py-2 bg-[#DED8E6] hover:bg-[#BACCE2] text-stone-800 rounded-full transition-all duration-300" style="font-family: 'Montserrat', sans-serif; font-size: 15px; width: 260px;">
        Подробнее
      </button>
      
      <button 
        @click.stop="handleLike" 
        class="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="w-8 h-8 transition-colors duration-300" 
          :style="{ 
            color: isFavorite ? '#DED8E6' : '#a8a29e', 
            fill: isFavorite ? '#DED8E6' : 'none' 
          }"
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          stroke-width="1.5"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </svg>
      </button>
    </div>
  </div>
</template>