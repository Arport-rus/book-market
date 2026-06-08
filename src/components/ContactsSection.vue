

<template>
  <section id="contacts" class="mt-[80px] lg:mt-[180px] px-6 md:px-16 lg:px-36 pb-16 lg:pb-36 text-stone-900">
    <h1 class="text-[40px] lg:text-[70px] text-center lg:text-left" style="font-family: 'MontserratAlternates-SemiBold', sans-serif; font-weight: 600;">
      Контакты
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mt-10 lg:mt-16">
      <!-- Левая часть -->
      <div class="flex flex-col gap-8">
        <p style="font-family: 'Hakim', serif; font-size: 48px; font-weight: 700;">Книжный уголок</p>

        <div class="flex flex-col gap-6 text-stone-600" style="font-family: 'Montserrat', sans-serif; font-size: 32px;">
          <p>г. Санкт-Петербург</p>
          <p>Литейный пр., 57</p>
          <p>+7 (777) 777-77-77</p>
        </div>

        <!-- Иконки соцсетей -->
        <div class="flex gap-10 mt-4">
       <!-- Telegram -->
          <a href="#" class="hover:opacity-70 transition-opacity duration-300">
                <img src="@/assets/icons/telegram.svg" class="w-14 h-14">
            </a>
            <!-- VK -->
          <a href="#" class="hover:opacity-70 transition-opacity duration-300">
                <img src="@/assets/icons/vk.svg" class="w-14 h-14">
            </a>
           <!-- YouTube -->
          <a href="#" class="hover:opacity-70 transition-opacity duration-300">
                <img src="@/assets/icons/youtube.svg" class="w-14 h-14">
            </a>
           <!-- Instagram -->
          <a href="#" class="hover:opacity-70 transition-opacity duration-300">
                <img src="@/assets/icons/instagram.svg" class="w-14 h-14">
            </a>
           <!-- WhatsApp -->
          <a href="#" class="hover:opacity-70 transition-opacity duration-300">
                <img src="@/assets/icons/Wp.svg" class="w-14 h-14">
            </a>
        </div>

        <!-- Кнопка рассылка -->
        <div class="flex lg:block justify-center">
          <button class="mt-4 px-8 py-4 bg-[#CFDBE7] hover:bg-[#BACCE2] text-stone-800 rounded-full transition-all duration-300" style="font-family: 'Montserrat', sans-serif; font-size: 16px; width: 260px;">
             Подписаться на рассылку
          </button>
        </div>
      </div>

      <!-- Правая часть: форма -->
      <div class="bg-[#BACCE2] rounded-3xl p-10">
        <h2 class="text-center font-bold mb-8 tracking-widest" style="font-family: 'MontserratAlternates-SemiBold', sans-serif; font-size: 40px;">
         ОБРАТНАЯ СВЯЗЬ
        </h2>

        <div class="flex flex-col gap-6">
          <div>
            <label class=" text-stone-600 mb-2 block" style="font-size: 19px;font-family: 'Montserrat', sans-serif;">Ваше Имя*</label>
            <input type="text" class="w-full px-5 py-3 rounded-full bg-[#FFE8E8] outline-none text-stone-800" style="font-family: 'Montserrat', sans-serif;">
          </div>
          <div>
            <label class=" text-stone-600 mb-2 block" style="font-size: 19px;font-family: 'Montserrat', sans-serif;">Телефон/Email*</label>
            <input type="text" class="w-full px-5 py-3 rounded-full bg-[#FFE8E8] outline-none text-stone-800" style="font-family: 'Montserrat', sans-serif;">
          </div>
          <div>
            <label class=" text-stone-600 mb-2 block" style="font-size: 19px;font-family: 'Montserrat', sans-serif;">Вопрос</label>
            <textarea rows="4" class="w-full px-5 py-3 rounded-2xl bg-[#FFE8E8] outline-none text-stone-800 resize-none" style="font-family: 'Montserrat', sans-serif;"></textarea>
          </div>

          <p class="text-base text-stone-500" style="font-family: 'Montserrat', sans-serif;">
            Нажимая кнопку, вы даете согласие на обработку ваших персональных данных.
            <a href="#" class="underline">Политика конфиденциальности</a>
          </p>

          <div class="flex justify-center">
            <button class="py-3 px-12 bg-[#DED8E6] hover:bg-stone-300 text-stone-800 rounded-full transition-all duration-300" style="font-family: 'Montserrat', sans-serif; font-size: 18px;">
              Отправить
            </button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>