<script setup>
import { ref } from 'vue'

// Поля формы обратной связи
const name = ref('')
const contactInfo = ref('')
const question = ref('')

// Ошибки валидации
const errors = ref({
  name: '',
  contactInfo: ''
})

// Состояния показа двух разных плашек Apple
const showToast = ref(false)          // Для обратной связи
const showSubscribeToast = ref(false) // Для рассылки

/**
 * Проверка правильности заполнения формы обратной связи
 */
const validateForm = () => {
  let isValid = true
  errors.value = { name: '', contactInfo: '' }

  if (!name.value.trim()) {
    errors.value.name = 'Введите ваше имя'
    isValid = false
  }

  const value = contactInfo.value.trim()
  if (!value) {
    errors.value.contactInfo = 'Введите телефон или Email'
    isValid = false
  } else {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const phonePattern = /^(\+7|8)?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/

    if (!emailPattern.test(value) && !phonePattern.test(value)) {
      errors.value.contactInfo = 'Неверный формат телефона или Email'
      isValid = false
    }
  }

  return isValid
}

/**
 * Логика отправки формы
 */
const handleSubmit = () => {
  if (validateForm()) {
    showToast.value = true
    
    name.value = ''
    contactInfo.value = ''
    question.value = ''

    setTimeout(() => {
      showToast.value = false
    }, 4000)
  }
}

/**
 * Логика подписки на рассылку
 */
const handleSubscribe = () => {
  console.log('Пользователь подписался на рассылку!')
  
  // Показываем плашку рассылки
  showSubscribeToast.value = true

  // Через 4 секунды плашка улетит обратно
  setTimeout(() => {
    showSubscribeToast.value = false
  }, 4000)
}
</script>

<template>
  <section id="contacts" class="mt-[80px] lg:mt-[180px] px-6 md:px-16 lg:px-36 pb-16 lg:pb-36 text-stone-900 relative overflow-visible">
    <h1 class="text-[40px] lg:text-[70px] text-center lg:text-left" style="font-family: 'MontserratAlternates-SemiBold', sans-serif; font-weight: 600;">
      Контакты
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mt-10 lg:mt-16">
      <div class="flex flex-col gap-8">
        <p style="font-family: 'Hakim', serif; font-size: 48px; font-weight: 700;">Книжный уголок</p>

        <div class="flex flex-col gap-6 text-stone-600" style="font-family: 'Montserrat', sans-serif; font-size: 32px;">
          <p>г. Санкт-Петербург</p>
          <p>Литейный пр., 57</p>
          <p>+7 (777) 777-77-77</p>
        </div>

        <div class="flex gap-10 mt-4">
          <a href="#" class="hover:opacity-70 transition-opacity duration-300">
            <img src="@/assets/icons/telegram.svg" class="w-14 h-14">
          </a>
          <a href="#" class="hover:opacity-70 transition-opacity duration-300">
            <img src="@/assets/icons/vk.svg" class="w-14 h-14">
          </a>
          <a href="#" class="hover:opacity-70 transition-opacity duration-300">
            <img src="@/assets/icons/youtube.svg" class="w-14 h-14">
          </a>
          <a href="#" class="hover:opacity-70 transition-opacity duration-300">
            <img src="@/assets/icons/instagram.svg" class="w-14 h-14">
          </a>
          <a href="#" class="hover:opacity-70 transition-opacity duration-300">
            <img src="@/assets/icons/Wp.svg" class="w-14 h-14">
          </a>
        </div>

        <div class="flex lg:block justify-center">
          <button 
            @click="handleSubscribe"
            class="mt-4 px-8 py-4 bg-[#CFDBE7] hover:bg-[#BACCE2] text-stone-800 rounded-full transition-all duration-300 cursor-pointer" 
            style="font-family: 'Montserrat', sans-serif; font-size: 16px; width: 260px;"
          >
             Подписаться на рассылку
          </button>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="bg-[#BACCE2] rounded-3xl p-10">
        <h2 class="text-center font-bold mb-8 tracking-widest" style="font-family: 'MontserratAlternates-SemiBold', sans-serif; font-size: 40px;">
           ОБРАТНАЯ СВЯЗЬ
        </h2>

        <div class="flex flex-col gap-6">
          <div>
            <label class="text-stone-600 mb-2 block" style="font-size: 19px; font-family: 'Montserrat', sans-serif;">Ваше Имя*</label>
            <input 
              v-model="name"
              type="text" 
              class="w-full px-5 py-3 rounded-full bg-[#FFE8E8] outline-none text-stone-800 transition-all border"
              :class="errors.name ? 'border-red-400 focus:border-red-400' : 'border-transparent focus:border-[#DED8E6]'"
              style="font-family: 'Montserrat', sans-serif;"
            >
            <span v-if="errors.name" class="text-red-500 text-sm pl-4 mt-1 block">{{ errors.name }}</span>
          </div>

          <div>
            <label class="text-stone-600 mb-2 block" style="font-size: 19px; font-family: 'Montserrat', sans-serif;">Телефон/Email*</label>
            <input 
              v-model="contactInfo"
              type="text" 
              class="w-full px-5 py-3 rounded-full bg-[#FFE8E8] outline-none text-stone-800 transition-all border"
              :class="errors.contactInfo ? 'border-red-400 focus:border-red-400' : 'border-transparent focus:border-[#DED8E6]'"
              style="font-family: 'Montserrat', sans-serif;"
            >
            <span v-if="errors.contactInfo" class="text-red-500 text-sm pl-4 mt-1 block">{{ errors.contactInfo }}</span>
          </div>

          <div>
            <label class="text-stone-600 mb-2 block" style="font-size: 19px; font-family: 'Montserrat', sans-serif;">Вопрос</label>
            <textarea 
              v-model="question"
              rows="4" 
              class="w-full px-5 py-3 rounded-2xl bg-[#FFE8E8] outline-none text-stone-800 resize-none transition-all border border-transparent focus:border-[#DED8E6]" 
              style="font-family: 'Montserrat', sans-serif;"
            ></textarea>
          </div>

          <p class="text-base text-stone-500" style="font-family: 'Montserrat', sans-serif;">
             Нажимая кнопку, вы даете согласие на обработку ваших персональных данных.
            <a href="#" class="underline">Политика конфиденциальности</a>
          </p>

          <div class="flex justify-center">
            <button type="submit" class="py-3 px-12 bg-[#DED8E6] hover:bg-stone-800 hover:text-amber-50 text-stone-800 rounded-full transition-all duration-300 cursor-pointer" style="font-family: 'Montserrat', sans-serif; font-size: 18px;">
               Отправить
            </button>
          </div>
        </div>
      </form>
    </div>

    <Transition name="apple-toast">
      <div 
        v-if="showToast" 
        class="fixed top-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-4 bg-white/80 backdrop-blur-md rounded-3xl border border-stone-200/60 shadow-[0_15px_40px_rgba(0,0,0,0.08)] min-w-[320px] sm:min-w-[420px]"
        style="font-family: 'Montserrat', sans-serif;"
      >
        <div class="w-10 h-10 rounded-full bg-[#DED8E6] flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-stone-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div class="flex flex-col">
          <p class="text-stone-900 font-bold text-base leading-tight">Письмо отправлено</p>
          <p class="text-stone-500 text-sm leading-tight mt-0.5">Мы получили ваше сообщение!</p>
        </div>
        <button @click="showToast = false" class="ml-auto text-stone-400 hover:text-stone-700 transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </Transition>

    <Transition name="apple-toast">
      <div 
        v-if="showSubscribeToast" 
        class="fixed top-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-4 bg-white/80 backdrop-blur-md rounded-3xl border border-stone-200/60 shadow-[0_15px_40px_rgba(0,0,0,0.08)] min-w-[320px] sm:min-w-[420px]"
        style="font-family: 'Montserrat', sans-serif;"
      >
        <div class="w-10 h-10 rounded-full bg-[#BACCE2] flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-stone-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div class="flex flex-col">
          <p class="text-stone-900 font-bold text-base leading-tight">Успешная подписка</p>
          <p class="text-stone-500 text-sm leading-tight mt-0.5">Вы подписались на рассылку уведомлений</p>
        </div>
        <button @click="showSubscribeToast = false" class="ml-auto text-stone-400 hover:text-stone-700 transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
/* Анимация плавного парения для обеих Apple-плашек */
.apple-toast-enter-active {
  transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.apple-toast-leave-active {
  transition: all 0.3s cubic-bezier(0.7, 0, 0.84, 0);
}

.apple-toast-enter-from {
  transform: translate(-50%, -40px);
  opacity: 0;
}
.apple-toast-leave-to {
  transform: translate(-50%, -20px);
  opacity: 0;
}
</style>