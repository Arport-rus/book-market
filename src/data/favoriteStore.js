import { ref } from 'vue'

// Глобальный счетчик, доступный любому компоненту
export const favoriteCount = ref(0)

// Функция для изменения счетчика
export function toggleFavoriteCount(isAdded) {
  if (isAdded) {
    favoriteCount.value++
  } else {
    favoriteCount.value--
  }
}