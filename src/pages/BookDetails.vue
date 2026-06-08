<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from '@/components/TheNavbar.vue'
import Contacts from '@/components/ContactsSection.vue'
import Footer from '@/components/FooterSection.vue'

// Инструменты Vue Router, чтобы брать айди книги из ссылки и переходить по страницам
const route = useRoute()
const router = useRouter()

// Переменные-реактивные состояния (меняются — меняется и визуал)
const currentBook = ref(null) // сюда загружается книга, которую открыл пользователь
const recommendations = ref([]) // массив для 4-х похожих книг снизу
const activeImageIndex = ref(0) // Индекс фотки, которую сейчас показываем большой в галерее

/**
 * Безопасное извлечение массива книг
 * защита от сбоя. json-сервер может прислать либо сразу массив `[]`, 
 * либо объект, где внутри лежит `books`. Функция проверяет это, чтобы код не сломался.
 */
const getBooksArray = (rawData) => {
  // Если пришел массив, возвращаем его, если объект — вытаскиваем массив из ключа books
  return Array.isArray(rawData) ? rawData : (rawData.books || [])
}

/**
 * Подготовка картинок для галереи
 * под большой фоткой должно быть 3 маленьких. 
 * Если в базе у книги всего 1-2 картинки, функция дублирует первую, чтобы сетка не поехала.
 */
const prepareBookImages = (book) => {
  // Если у книги есть нормальный массив картинок и он не пустой
  if (book.images && Array.isArray(book.images) && book.images.length > 0) {
    const imgs = [...book.images] // Копируем массив, чтобы не испортить оригинал
    return imgs // Отдаем готовый массив из 3 элементов
  }
}

/**
 * подсчет схожести книг
 * Зачем нужна: Сравнивает две книги. За каждое совпадение тегов начисляет баллы.
 * На выходе выдает общую сумму баллов. Чем она выше — тем книги более похожи.
 */
const calculateSimilarity = (current, candidate) => {
  let score = 0 // Изначально баллов ноль

  // 1. Сравниваем жанр/категорию (Самый важный тег, за него сразу +4 балла)
  if (current.category === candidate.category) score += 4

  // 2. Сравниваем аудиторию: для детей или взрослых (+3 балла)
  if (current.reader === candidate.reader) score += 3

  // 3. Сравниваем автора (Если автор один и тот же, это круто, +2 балла)
  if (current.author === candidate.author) score += 2

  // 4. Сравниваем тип обложки (+1 балл)
  if (current.cover === candidate.cover) score += 1

  // 5. Проверяем галочки: новинка, скидка, в продаже, с картинками (по +1 баллу за совпадение)
  if (current.isNew === candidate.isNew) score += 1
  if (current.hasDiscount === candidate.hasDiscount) score += 1
  if (current.inSale === candidate.inSale) score += 1
  if (current.hasIllustrations === candidate.hasIllustrations) score += 1

  return score // Возвращаем итоговый вес схожести
}

/**
 * загрузка всех данных на страницу
 * берет из базы нужную книгу по айдии и считает для нее рекомендации.
 */
const loadBookData = async (bookId) => {
  console.log('loadBookData вызван с id:', bookId)
  try {
    // загружаем саму книгу. и посылаем сигнал на локальный json-server (порт 3001)
    const responseBook = await fetch(`http://localhost:3001/books/${bookId}`)
    
    if (responseBook.ok) {
      // если сервер ответил успешно — закидываем данные в переменную
      const bookData = await responseBook.json()
      bookData.images = prepareBookImages(bookData) // чиним картинки
      currentBook.value = bookData
    } else {
      // ЗАПАСНОЙ ВАРИАНТ: Если json-server не запущен, берем статический файл books.json из папки public
      const responseFallback = await fetch('/books.json')
      const fallbackData = await responseFallback.json()
      const booksList = getBooksArray(fallbackData)
      // Ищем книгу перебором вручную по айди
      const foundBook = booksList.find(b => b.id === parseInt(bookId))
      
      foundBook.images = prepareBookImages(foundBook) // чиним картинки для запасного варианта
      currentBook.value = foundBook
    }

    activeImageIndex.value = 0 // Сбрасываем галерею на первую вкладку при открытии новой книги

    // Подбор рекомендаций по тегам
    try {
      // Снова качаем весь список книг
      const responseAll = await fetch('http://localhost:3001/books')
      let allData = []
      if (responseAll.ok) {
        allData = getBooksArray(await responseAll.json())
      } else {
        const responseFallbackAll = await fetch('/books.json')
        allData = getBooksArray(await responseFallbackAll.json())
      }
      
      /**
       * ЦЕПОЧКА ОБРАБОТКИ МАССИВА:
       * 1. filter — Убираем текущую книгу из списка, чтобы она сама себя не рекомендовала.
       * 2. map — Проходимся по всем книгам и временно добавляем им свойство 'similarity' с баллами схожести.
       * 3. sort — Сортируем массив: у кого больше баллов, тот летит наверх (b - a).
       * 4. slice — Отрезаем топ-4 самых похожих книг для вывода на экран.
       */
      console.log('Все книги:', allData)
      recommendations.value = allData
        .filter(item => item.id !== parseInt(bookId))
        .map(item => {
          return {
            ...item,//1. Берем старые данные книги (title, price, author)
            similarity: calculateSimilarity(currentBook.value, item)// 2. Приклеиваем к ним новое свойство 'similarity'
          }
        })
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 4)

    } catch (e) {
      console.warn('Не удалось загрузить рекомендации, но книга открылась:', e)
    }

  } catch (error) {
    console.error('Вообще всё сломалось при загрузке:', error)
    router.push('/catalog') // При любой критической ошибке спасаем юзера — уводим в каталог
  }
  console.log('Данные книги:', bookData)
console.log('Картинки:', bookData.images)
}

// Когда страница только-только смонтировалась в браузере, запускаем загрузку


// Наблюдатель (watch): Если пользователь кликнул на рекомендацию снизу, ID в ссылке изменится.
// Этот хук заметит смену ID и заново вызовет загрузку, чтобы страница обновилась.
onMounted(() => {
  console.log('onMounted сработал, id:', route.params.id)
  loadBookData(route.params.id)
})

watch(() => route.params.id, (newId) => {
  if (newId) loadBookData(newId)
})
/**
 * добавление книги в корзину
 * сохраняет товар в localStorage, чтобы корзина не стиралась при перезагрузке сайта.
 */
const addToCart = () => {
  if (!currentBook.value) return // Если книга почему-то не загрузилась, ничего не делаем

  // Достаем текущую корзину из памяти браузера
  const savedCart = localStorage.getItem('cart')
  let cart = savedCart ? JSON.parse(savedCart) : []
  
  //если в localStorage лежит фигня, сбрасываем в чистый массив
  if (!Array.isArray(cart)) {
    cart = []
  }

  // Проверяем: может, эта книга уже лежит в корзине?
  const existingItem = cart.find(item => item.id === currentBook.value.id)
  if (existingItem) {
    existingItem.quantity += 1 // Если нашли — просто увеличиваем ее количество на +1
  } else {
    // Если книги в корзине еще нет — создаем компактный объект товара и добавляем в массив
    cart.push({
      id: currentBook.value.id,
      title: currentBook.value.title,
      price: currentBook.value.price,
      src: currentBook.value.images[0], // Для корзины берем самую первую картинку
      quantity: 1
    })
  }

  // записывает обновленный массив обратно в память браузера в виде строки
  localStorage.setItem('cart', JSON.stringify(cart))
  // генерирует событие, чтобы шапка сайта сразу увидела, что в корзину что-то упало
  window.dispatchEvent(new Event('cart-updated'))
}
</script>

<template>
  <div v-if="currentBook" class="min-h-screen bg-[#FFFDF6] flex flex-col font-opensans pt-16">
    <!-- //v-if="currentBook"- не дает браузеру
    //рисовать страницу пока переменаня пусатая,  min-h-screen- инимальная высота во весь экран, flex-col- друг под друга
    //font-opensans - меняет шрифт. pt-16 сокращение от padding-top: 16 -->
    <Navbar />

    <main class="flex-grow max-w-5xl w-full mx-auto px-8 py-12 space-y-16">
      
      <nav class="text-xs uppercase tracking-wider text-gray-400 font-medium space-x-2">
        <router-link to="/catalog" class="hover:text-black transition-colors">Каталог</router-link>
        <span>/</span>
        <span class="text-gray-500">{{ currentBook.category }}</span>
        <span>/</span>
        <span class="text-gray-900 normal-case font-semibold">{{ currentBook.title }}</span>
      </nav>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        
        <div class="md:col-span-5 space-y-4">
          <div class="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gray-50 shadow-sm border border-gray-100">
            <img 
              :src="'http://localhost:3001' + currentBook.images[activeImageIndex]"
              :alt="currentBook.title" 
              class="w-full h-full object-cover"
            />
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div 
              v-for="(img, index) in currentBook.images" 
              :key="index"
              @click="activeImageIndex = index"
              :class="[
                'aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 cursor-pointer border transition-all duration-200',
                activeImageIndex === index ? 'border-black scale-[1.02] shadow-sm' : 'border-gray-200 opacity-60 hover:opacity-100'
              ]"
            >
              <img :src="'http://localhost:3001' + img" :alt="currentBook.title" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div class="md:col-span-7 space-y-8 pt-2">
          <div class="space-y-3">
            <h1 class="text-3xl md:text-4xl font-bold font-philosopher text-gray-900 leading-tight">
              {{ currentBook.title }}
            </h1>
            <p class="text-base md:text-lg text-gray-400 font-medium">{{ currentBook.author }}</p>
          </div>

          <p class="text-sm md:text-base text-gray-700 leading-relaxed font-normal">
            {{ currentBook.description || 'Описание временно отсутствует.' }}
          </p>

          <div class="flex items-center space-x-6 border-t border-b border-gray-200/60 py-6">
            <span class="text-3xl font-extrabold font-philosopher text-black">
              {{ currentBook.price }} ₽
            </span>
            <button 
              @click="addToCart"
              class="bg-[#D2DAE6] hover:bg-[#C1CBDC] text-black font-semibold px-8 py-2.5 rounded-xl transition-colors cursor-pointer text-sm active:scale-95 duration-100"
            >
              В корзину
            </button>
          </div>
        </div>

      </div>

      <section class="space-y-6 border-t border-gray-200/60 pt-12">
        <h2 class="text-2xl font-bold font-philosopher">Вам может понравиться</h2>
        
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div v-for="item in recommendations" :key="item.id" class="space-y-2 group">
            <router-link :to="'/catalog/' + item.id" class="block space-y-2">
              <div class="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 transform group-hover:scale-[1.02] transition-transform duration-300">
                <img :src="item.images && item.images[0] ? 'http://localhost:3001' + item.images[0] : ''" :alt="item.title" class="w-full h-full object-cover" />
              </div>
              <div>
                <h4 class="text-sm font-semibold text-gray-900 line-clamp-1 leading-tight group-hover:text-black transition-colors">{{ item.title }}</h4>
                <p class="text-xs text-gray-400 mt-0.5">{{ item.author }}</p>
                <p class="text-sm font-bold text-gray-900 mt-1 font-philosopher">{{ item.price }} ₽</p>
              </div>
            </router-link>
          </div>
        </div>
      </section>

    </main>

    <Contacts />
    <Footer />
  </div>
</template>