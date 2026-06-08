<script setup>
import TheNavbar from '@/components/TheNavbar.vue'
import { ref } from 'vue'
import { catalogCategories } from '@/data/catalogCategories.js'
import { filters } from '@/data/filters.js'
import { computed } from 'vue'
import { catalogBooks } from '@/data/catalogBooks.js'
import BookCard from '@/components/BookCard.vue'

const filteredBooks = computed(() =>
  catalogBooks.filter(book => book.category === activeCategory.value)
)

const activeCategory = ref(catalogCategories[0])
const selectedStatus = ref([])
const selectedReader = ref([])
const selectedCover = ref([])
const selectedIllustrated = ref([])
const priceFrom = ref(20)
const priceTo = ref(200000)
const isFilterOpen = ref(false)
</script>

<template>
  <div class="min-h-screen font-sans overflow-x-hidden" style="background-color: #FFFBF2;">
    <TheNavbar />

    <section class="pt-10 pb-36">

      <!-- Категории -->
      <div class="flex gap-2 lg:gap-3 justify-center py-3 lg:py-4 mx-4 lg:mx-auto flex-wrap" style="background-color: #BACCE2; border-radius: 30px; max-width: 1590px;">
        <button
          v-for="cat in catalogCategories" :key="cat"
          @click="activeCategory = cat"
          class="px-6 py-2 rounded-full transition-all duration-300 cursor-pointer"
          :class="activeCategory === cat
            ? 'outline outline-2 outline-white text-stone-800'
            : 'text-stone-700 hover:outline hover:outline-2 hover:outline-white'"
          style="font-family: 'Montserrat', sans-serif; font-size: clamp(14px, 2vw, 26px);"
        >
          {{ cat }}
        </button>
      </div>

      <div class="px-6 md:px-16 lg:px-36 pt-10">

        <!-- Кнопка фильтра на мобилке -->
        <button
          @click="isFilterOpen = !isFilterOpen"
          class="lg:hidden flex items-center gap-2 px-6 py-2 bg-[#BACCE2] rounded-full text-stone-800 mb-6"
          style="font-family: 'Montserrat', sans-serif;"
        >
          {{ isFilterOpen ? 'Скрыть фильтры' : 'Фильтры' }}
        </button>

        <div class="flex flex-col lg:flex-row gap-40">

          <!-- Фильтр -->
          <div
            :class="['flex-col gap-6 min-w-[200px]', isFilterOpen ? 'flex' : 'hidden lg:flex']"
            style="font-family: 'Montserrat', sans-serif;"
          >

            <!-- Цена -->
            <div>
              <p class="font-bold text-stone-900 mb-3" style="font-family: 'Montserrat', sans-serif; font-size: 30px;">Цена</p>
              <div class="flex items-center gap-2 mb-3">
                <span class="text-stone-500" style="font-size: 25px;">от</span>
                <input v-model="priceFrom" type="number" class="w-24 px-2 py-1 rounded-lg bg-[#FFE8E8] text-stone-700 outline-none" style="font-size: 18px;">
                <span class="text-stone-500" style="font-size: 25px;">до</span>
                <input v-model="priceTo" type="number" class="w-24 px-2 py-1 rounded-lg bg-[#FFE8E8] text-stone-700 text-sm outline-none" style="font-size: 18px;">
              </div>
              <div class="flex flex-col gap-2">
                <label v-for="s in filters.status" :key="s" class="flex items-center gap-2 text-stone-700 text-sm cursor-pointer"style="font-size: 20px;">
                  <input type="checkbox" :value="s" v-model="selectedStatus" style="accent-color: #FFE8E8; width: 16px; height: 16px;">
                  {{ s }}
                </label>
              </div>
            </div>

            <!-- Читатель -->
            <div>
              <p class="font-bold text-stone-900 text-lg mb-3" style="font-family: 'Montserrat', sans-serif; font-size: 30px;">Читатель</p>
              <div class="flex flex-col gap-2">
                <label v-for="r in filters.reader" :key="r" class="flex items-center gap-2 text-stone-700 text-sm cursor-pointer">
                  <input type="checkbox" :value="r" v-model="selectedReader" style="accent-color: #FFE8E8; width: 16px; height: 16px;">
                  {{ r }}
                </label>
              </div>
            </div>

            <!-- Обложка -->
            <div>
              <p class="font-bold text-stone-900 text-lg mb-3" style="font-family: 'Montserrat', sans-serif; font-size: 30px;">Обложка</p>
              <div class="flex flex-col gap-2">
                <label v-for="c in filters.cover" :key="c" class="flex items-center gap-2 text-stone-700 text-sm cursor-pointer">
                  <input type="checkbox" :value="c" v-model="selectedCover" style="accent-color: #FFE8E8; width: 16px; height: 16px;">
                  {{ c }}
                </label>
              </div>
            </div>

            <!-- С иллюстрациями -->
            <div>
              <p class="font-bold text-stone-900 text-lg mb-3" style="font-family: 'Montserrat', sans-serif; font-size: 30px;">С иллюстрациями</p>
              <div class="flex flex-col gap-2">
                <label v-for="il in filters.illustrated" :key="il" class="flex items-center gap-2 text-stone-700 text-sm cursor-pointer">
                  <input type="checkbox" :value="il" v-model="selectedIllustrated" style="accent-color: #FFE8E8; width: 16px; height: 16px;">
                  {{ il }}
                </label>
              </div>
            </div>

            <!-- Кнопка -->
            <button class="px-6 py-2 bg-[#BACCE2] hover:bg-stone-800 hover:text-amber-50 text-stone-800 rounded-full transition-all duration-300" style="font-family: 'Montserrat', sans-serif; font-size: 16px;">
              Применить
            </button>

          </div>

          <div class="flex-1">
  <div class="grid gap-10" style="grid-template-columns: repeat(3, 335px);">
    <BookCard v-for="book in filteredBooks" :key="book.id" :book="book" />
  </div>
</div>

        </div>
      </div>

    </section>
  </div>
</template>