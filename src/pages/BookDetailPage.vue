<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TheNavbar from '@/components/TheNavbar.vue'
import ContactsSection from '@/components/ContactsSection.vue'
import FooterSection from '@/components/FooterSection.vue'
import BookCard from '@/components/BookCard.vue'

const route = useRoute()
const router = useRouter()

// Состояния
const currentBook = ref(null) 
const recommendations = ref([]) 
const activeImageIndex = ref(0) 

/**
 * Безопасное извлечение массива книг
 */
const getBooksArray = (rawData) => {
  return Array.isArray(rawData) ? rawData : (rawData.books || [])
}

/**
 * ПОДГОТОВКА КАРТИНОК ИЗ BOOKS.JSON
 * Теперь эта функция в первую очередь берет твой массив `images`, 
 * а если его нет — смотрит на поле `image`.
 */
const prepareBookImages = (book) => {
  if (!book) return []

  // 1. ПРИОРИТЕТ: Если в books.json прописан массив "images" (как сделал ты)
  if (book.images && Array.isArray(book.images) && book.images.length > 0) {
    return [...book.images]
  }

  // 2. ЗАПАСНОЙ ВАРИАНТ: Если бэкенд вернет одиночную строку "image"
  if (book.image && typeof book.image === 'string') {
    return [book.image, book.image, book.image]
  }
  
  // 3. Заглушка, если картинок вообще нет
  return ['/images/placeholder.png', '/images/placeholder.png', '/images/placeholder.png']
}

/**
 * Подсчет схожести книг
 */
const calculateSimilarity = (current, candidate) => {
  let score = 0
  if (current.category === candidate.category) score += 4
  if (current.reader === candidate.reader) score += 3
  if (current.author === candidate.author) score += 2
  if (current.cover === candidate.cover) score += 1

  if (current.is_new === candidate.is_new) score += 1
  if (current.is_on_sale === candidate.is_on_sale) score += 1

  return score
}

/**
 * Загрузка данных книги с локального сервера 3001
 */
const loadBookData = async (bookId) => {
  console.log('Загрузка книги с локального сервера 3001. ID:', bookId)
  try {
    const responseBook = await fetch(`http://localhost:3001/books/${bookId}`)
    
    if (responseBook.ok) {
      const bookData = await responseBook.json()
      // Обрабатываем картинки функцией
      bookData.images = prepareBookImages(bookData) 
      currentBook.value = bookData
    } else {
      // Запасной вариант напрямую из файла public/books.json
      const responseFallback = await fetch('/books.json')
      const fallbackData = await responseFallback.json()
      const booksList = getBooksArray(fallbackData)
      const foundBook = booksList.find(b => b.id === parseInt(bookId))
      
      if (foundBook) {
        foundBook.images = prepareBookImages(foundBook)
        currentBook.value = foundBook
      }
    }

    activeImageIndex.value = 0 

    // Загрузка рекомендаций
    try {
      const responseAll = await fetch('http://localhost:3001/books')
      let allData = []
      if (responseAll.ok) {
        allData = getBooksArray(await responseAll.json())
      } else {
        const responseFallbackAll = await fetch('/books.json')
        allData = getBooksArray(await responseFallbackAll.json())
      }
      
      recommendations.value = allData
        .filter(item => item.id !== parseInt(bookId))
        .map(item => {
          return {
            ...item,
            similarity: calculateSimilarity(currentBook.value, item)
          }
        })
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 4)

    } catch (e) {
      console.warn('Не удалось загрузить рекомендации:', e)
    }

  } catch (error) {
    console.error('Ошибка при загрузке:', error)
  }
}

onMounted(() => {
  loadBookData(route.params.id)
})

watch(() => route.params.id, (newId) => {
  if (newId) loadBookData(newId)
})

/**
 * Добавление в корзину
 */
const addToCart = () => {
  if (!currentBook.value) return

  const savedCart = localStorage.getItem('cart')
  let cart = savedCart ? JSON.parse(savedCart) : []
  
  if (!Array.isArray(cart)) {
    cart = []
  }

  const existingItem = cart.find(item => item.id === currentBook.value.id)
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      id: currentBook.value.id,
      title: currentBook.value.title,
      price: currentBook.value.price,
      src: currentBook.value.images[0], 
      quantity: 1
    })
  }

  localStorage.setItem('cart', JSON.stringify(cart))
  window.dispatchEvent(new Event('cart-updated'))
}
</script>

<template>
  <div class="min-h-screen overflow-x-hidden" style="background-color: #FFFBF2;">
    <TheNavbar />

    <div v-if="currentBook" class="px-6 md:px-16 lg:px-36 pt-12 pb-24">
      
      <div class="flex flex-col lg:flex-row gap-16 items-start">
        
        <div class="w-full lg:w-[450px] flex flex-col gap-5 flex-shrink-0">
          
          <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 flex justify-center items-center h-[580px]">
            <img 
              v-if="currentBook && currentBook.images && currentBook.images.length > 0"
              :src="currentBook.images[activeImageIndex].startsWith('http') 
                    ? currentBook.images[activeImageIndex] 
                    : 'http://localhost:3001' + currentBook.images[activeImageIndex]"
              :alt="currentBook.title" 
              class="object-cover w-full h-full rounded-3xl"
            />
          </div>

          <div class="flex gap-3 justify-start" v-if="currentBook && currentBook.images">
            <div 
              v-for="(thumb, index) in currentBook.images"
              :key="index"
              @click="activeImageIndex = index"
              class="w-[100px] h-[135px] bg-white rounded-2xl p-1 border-2 cursor-pointer transition-all overflow-hidden shadow-sm"
              :class="activeImageIndex === index ? 'border-[#DED8E6] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'"
            >
              <img 
                :src="thumb.startsWith('http') ? thumb : 'http://localhost:3001' + thumb" 
                class="w-full h-full object-cover rounded-xl" 
              />
            </div>
          </div>
        </div>

        <div class="flex-1" style="font-family: 'Montserrat', sans-serif;">
          <h1 class="text-stone-900 font-bold text-4xl mb-2">{{ currentBook.title }}</h1>
          <p class="text-stone-400 text-xl mb-8">
            <span class="text-stone-300 text-base">автор </span>{{ currentBook.author }}
          </p>

          <div class="mb-8">
            <h3 class="text-stone-900 font-bold text-2xl mb-3">О товаре</h3>
            <p class="text-stone-600 text-base leading-relaxed max-w-3xl">
              {{ currentBook.annotation || 'Трогательное, доброе и философское произведение.' }}
            </p>
          </div>

          <div class="flex items-center gap-4 pt-4">
            <div class="px-10 py-3 bg-[#EFEBE3] text-stone-900 font-bold text-2xl rounded-2xl min-w-[140px] text-center">
              {{ currentBook.price }} ₽
            </div>
            <button 
              @click="addToCart" 
              class="px-12 py-4 bg-[#FFDCDC] hover:bg-stone-800 hover:text-amber-50 text-stone-800 font-bold rounded-full transition-all duration-300 cursor-pointer"
              style="font-family: 'Montserrat', sans-serif; font-size: 18px;"
            >
              Добавить в корзину
            </button>
          </div>
        </div>

      </div>

      <div class="mt-32" v-if="recommendations.length > 0">
        <h2 class="text-stone-900 font-bold text-3xl mb-10" style="font-family: 'Montserrat', sans-serif;">
          Вам может понравиться
        </h2>
        
        <div class="grid gap-10" style="grid-template-columns: repeat(auto-fill, 335px);">
          <BookCard 
            v-for="recBook in recommendations"
            :key="recBook.id" 
            :book="recBook" 
          />
        </div>
      </div>

    </div>

    <div v-else class="text-center py-32 text-stone-500 text-xl" style="font-family: 'Montserrat', sans-serif;">
      Книга не найдена. Вернитесь в <a href="/catalog" class="text-stone-800 underline">каталог</a>.
    </div>

    <ContactsSection />
    <FooterSection />
  </div>
</template>