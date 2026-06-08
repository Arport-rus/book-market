import { ref } from 'vue'

// Глобальная переменная количества товаров в корзине
export const cartCount = ref(0)

// Функция для добавления товара в корзину (+1)
export const addToCart = () => {
  cartCount.value++
}