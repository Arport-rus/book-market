<template>
  <footer class="mt-[80px] lg:mt-[180px] px-6 md:px-16 lg:px-36 py-10 lg:py-16 bg-[#FFFBF2]">
    <div class="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between">

      <!-- Левая часть -->
      <div class="flex flex-col gap-5">
        <p class="text-stone-900" style="font-family: 'Hakim', serif; font-size: 32px; font-weight: 700; line-height: 1.1;">
          Книжный<br>уголок
        </p>

        <ul class="flex flex-col items-center lg:items-start gap-3 text-stone-700" style="font-family: 'Montserrat', sans-serif; font-size: 16px;">
          <li><a href="#" class="hover:text-stone-900 transition-colors duration-200">О нас</a></li>
          <li><a href="#" class="hover:text-stone-900 transition-colors duration-200">Каталог</a></li>
          <li><a href="#" class="hover:text-stone-900 transition-colors duration-200">Бестселлеры</a></li>
          <li><a href="#" class="hover:text-stone-900 transition-colors duration-200">Распродажа</a></li>
          <li><a href="#" class="hover:text-stone-900 transition-colors duration-200">Контакты</a></li>
        </ul>
      </div>

      <!-- Правая часть -->
      <div class="flex flex-col items-start lg:items-end gap-4">
        <div class="flex flex-col items-center lg:items-end gap-2 text-stone-700" style="font-family: 'Montserrat', sans-serif; font-size: 16px;">
          <p>+7 (777) 777-77-77</p>
          <p>book@mail.ru</p>
        </div>

        <div class="flex gap-3 mt-4">
          <a href="#"><img src="@/assets/icons/telegram.svg" class="w-8 h-8 hover:opacity-70 transition-opacity duration-300"></a>
          <a href="#"><img src="@/assets/icons/vk.svg" class="w-8 h-8 hover:opacity-70 transition-opacity duration-300"></a>
          <a href="#"><img src="@/assets/icons/youtube.svg" class="w-8 h-8 hover:opacity-70 transition-opacity duration-300"></a>
          <a href="#"><img src="@/assets/icons/instagram.svg" class="w-8 h-8 hover:opacity-70 transition-opacity duration-300"></a>
          <a href="#"><img src="@/assets/icons/Wp.svg" class="w-8 h-8 hover:opacity-70 transition-opacity duration-300"></a>
        </div>
      </div>

    </div>

    <!-- Копирайт -->
    <div class="mt-10 pt-6 border-t border-stone-200 text-stone-400 text-sm text-center" style="font-family: 'Montserrat', sans-serif;">
      © 2024 Книжный уголок. Все права защищены.
    </div>

  </footer>
</template>