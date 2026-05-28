<script setup>
import bibliot from '@/assets/bibli.jpg'
import pinkG from '@/assets/pink-girl.jpg'
import womanImage from '@/assets/portret-girl.jpg'
const categories = [
  { label: 'Детская литература', color: 'bg-[#AEB9D7]', rotate: 13, width: 80, height: 500, left: 0, top: 0, shadow: '16px 24px 40px rgba(0,0,0,0.25)' },
  { label: 'Художественная литература', color: 'bg-[#FFE8E8]', rotate: 3, width: 94, height: 709, left: 0, top: 0, shadow: '20px 30px 50px rgba(0,0,0,0.28)', },
  { label: 'Бизнес-литература', color: 'bg-[#BACCE2]', rotate: 20, width: 101, height: 625, left: 50, top: 30, shadow: '16px 24px 40px rgba(0,0,0,0.25)' },
  { label: 'Учебная литература', color: 'bg-[#DED8E6]', rotate: 13, width: 110, height: 800, left: 80, top: 0, shadow: '20px 30px 50px rgba(0,0,0,0.28)' },
]

const navLinks = ['О нас', 'Каталог', 'Бестселлеры', 'Распродажа', 'Контакты']



</script>

<template>
  <div class="min-h-screen font-sans" style="background-color: #FFFBF2;">

    <!-- Navbar -->
    <nav class="flex items-center justify-between px-36 pt-[66px] pb-5 bg-[#FFFBF2]">
      <span class="font-bold text-sm tracking-wide text-stone-800" style="font-family: 'Hakim', serif; font-size: 22px;">
        Книжный уголок
      </span>

      <ul class="flex gap-[100px]">
        <li v-for="link in navLinks" :key="link">
          <a
            href="#"
            class="text-sm text-stone-600 hover:text-stone-900 transition-colors duration-200 tracking-wide"
            style="font-family: 'Montserrat', sans-serif; font-size: 20px; "
          >
            {{ link }}
          </a>
        </li>
      </ul>

      <div class="flex items-center gap-4 text-stone-600">
        <button class="hover:text-stone-900 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
        <button class="hover:text-stone-900 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Horizontal line -->
    <div class="px-36">
      <hr class="border border-stone-200" />
    </div>

    <!-- Hero -->
    <section class="flex px-36 pt-44 pb-26 relative overflow-visible" style="min-height: 80vh;">

      <!-- Left content -->
      <div class="flex-1 max-w-2xl z-10 mt-3.5">   
        <h1
          class="text-[92px] font-black text-stone-900  "
          style="font-family: 'Hakim', serif; line-height: 130%;padding-bottom: 67px;"
        >
          Книжный<br>уголок
        </h1>

        <p class="text-stone-500 text-[20px] leading-[1.25] mb-10 max-w-prose" style="font-family: 'Montserrat', sans-serif; text-wrap:balance;padding-bottom: 45px; ">
          Мы верим, что литература способна изменить мир, и поэтому собрали для вас самые интересные и разнообразные произведения от классики до современных бестселлеров.
        </p>

        <button
          class=" bg-[#BACCE2] px-8 py-3  text-stone-800 text-base rounded-full hover:bg-stone-800 hover:text-amber-50 transition-all duration-300 tracking-wide"
          style="font-family: 'Montserrat', sans-serif; width: 245px; font-size:19px;cursor: pointer;"
        >
          Каталог
        </button>
      </div>

      <!-- Right: Book spines -->
      <div class="flex-1 flex items-end justify-center gap-12 relative overflow-visible" style="height: 820px;">
        <div
          v-for="(cat, i) in categories"
          :key="i"
          :class="[
            cat.color,
            'relative flex items-center justify-center cursor-pointer transition-all duration-500 hover:-translate-y-4 rounded-xl group'
          ]"
          :style="{
            transform: `rotate(${cat.rotate}deg)`,
            width: cat.width + 'px',
            height: cat.height + 'px',
            left: cat.left + 'px',
            top: cat.top + 'px',
            boxShadow: cat.shadow
          }"
        >
          <!-- Arrow по умолчанию -->
          <div
            class="absolute top-5 right-4 w-7 h-7 rounded-full bg-white/60 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300 " 
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-stone-700 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>

          <!-- Arrow на hover -->
          <div class="absolute top-5 right-4 w-7 h-7 rounded-full bg-white/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style="cursor:pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-stone-700 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>

          <!-- Подпись -->
          <span
            class="text-stone-700 text-xs font-medium select-none"
            style="writing-mode: vertical-rl; transform: rotate(180deg); font-family: 'Montserrat', sans-serif;font-size: 24px; letter-spacing: 0.15em;"
          >
            {{ cat.label }}
          </span>
        </div>
      </div>

    </section>

    <!-- ==================== НОВАЯ СЕКЦИЯ "О НАС" ==================== -->
    <section class="px-36 py-24 bg-[#FFFBF2]">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-[70px] pb-6 font-black text-stone-900 mb-12" style="font-family: 'MontserratAlternates-SemiBold', sans-serif;">
          О нас
        </h2>

        <div class="grid grid-cols-[2fr_1fr] gap-16 items-start">
          <!-- Left: Text -->
          <div class="space-y-8 text-[17px] leading-relaxed text-stone-700" style="font-family: 'Montserrat', sans-serif;font-size: 24px;">
            <p>
              В нашем каталоге представлено более 60 000 товаров от таких издательств, как «Эксмо», «АСТ», «Манн, Иванов и Фербер», а также брендов «БОМБОРА», «Corpus», «Mainstream», «Редакция Елены Шубиной», «Вилли-Винки», «Fanzon», «Комильфо», «Канц-Эксмо» и многих других.
            </p><br>
            <p>
              Наш магазин одним из первых предлагает новинки ведущих российских издательств и гарантирует лучшие цены на них. Для книг, которые только собираются выйти, доступен предзаказ.
            </p><br>
            <p>
              В нашем ассортименте вы найдёте художественную и бизнес-литературу, детские книги, учебники, научно-популярные издания, а также книги с автографами известных авторов и многое другое.
            </p><br>
            <p>
              Мы регулярно проводим увлекательные акции и конкурсы, участие в которых позволяет сделать выгодные покупки. Наши клиенты могут рассчитывать на персональные скидки, подарки и кэшбэк в рамках программы лояльности. Специальные предложения также доступны для сотрудников компаний-партнёров.
            </p><br>
            <p>
              Вы можете выбрать и заказать товары в любое время суток и оформить доставку удобным для вас способом.
            </p>

            <!-- Buttons -->
            <div class="flex gap-4 pt-10">
              <button class="px-8 py-3.5 bg-[#FFEBE8] hover:bg-pink-200 text-stone-800 rounded-full text-base font-medium transition-all duration-300" style="font-family: 'Montserrat', sans-serif;width:245px;font-size:20px;font-weight: 500; ">
                Контакты
              </button>
              <button class="px-8 py-3.5 bg-[#BACCE2] hover:bg-blue-200 text-stone-800 rounded-full text-base font-medium transition-all duration-300" style="font-family: 'Montserrat', sans-serif; width: 245px; font-size:20px; font-weight: 500;">
                Распродажа
              </button>
            </div>
          </div>

          <!-- Right: Images -->
          <div class="relative h-[720px]">

            <!-- Самый большой круг - Книжные полки -->
            <div class="absolute left-[100px] bottom-[100px] w-[520px] h-[520px] rounded-full overflow-hidden  shadow-2xl z-30">
              <img :src="bibliot" alt="Книжные полки" class="w-full h-full object-cover ">
            </div>

            <!-- Средний круг - Девочка с книгой -->
            <div class="absolute left-[500px] bottom-[450px] w-[419px] h-[419px] rounded-full overflow-hidden  shadow-2xl z-20">
              <img :src="pinkG" alt="Девочка с книгой" class="w-full h-full object-cover " >
            </div>

            <!-- Маленький круг - Женщина -->
            <div class="absolute left-[500px] top-[380px] w-[410px] h-[410px] rounded-full overflow-hidden  shadow-2xl z-10">
              <img :src="womanImage" alt="Продавец в магазине" class="w-full h-full object-cover">
            </div>

          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style>
  @font-face {
    font-family: 'Montserrat';
    src: url('/shrift/Montserrat-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'MontserratAlternates-SemiBold';
    src: url('/shrift/MontserratAlternates-SemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Hakim';
    src: url('/shrift/Hakim_0.ttf');  
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  html, body {
    background-color: #FFFBF2;
  }
</style>