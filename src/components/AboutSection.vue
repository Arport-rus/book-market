<script setup>
import bibliot from '@/assets/bibli.jpg'
import pinkG from '@/assets/pink-girl.jpg'
import womanImage from '@/assets/portret-girl.jpg'
</script>
<template>
    <section class="px-8 md:px-16 lg:px-36 py-24 bg-[#FFFBF2]">
      
        <h2 class="text-[40px] lg:text-[70px] pb-6 font-black text-stone-900 mb-12" style="font-family: 'MontserratAlternates-SemiBold', sans-serif;">
          О нас
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-start">
          <!-- Left: Text -->
          <div class="space-y-8 leading-relaxed text-stone-700 text-[16px] lg:text-[24px]" style="font-family: 'Montserrat', sans-serif;">
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
          <div class="hidden lg:block relative" style="height: 50vw; max-height: 720px; min-width: 40vw;">

  <!-- Большой круг -->
  <div class="absolute rounded-full overflow-hidden shadow-2xl z-50"
    style="width: 32vw; height: 32vw; max-width: 550px; max-height: 550px; left: 2vw; bottom: 5vw;">
    <img :src="bibliot" alt="Книжные полки" class="w-full h-full object-cover">
  </div>

  <!-- Средний круг -->
  <div class="absolute rounded-full overflow-hidden shadow-2xl z-20"
    style="width: 22vw; height: 22vw; max-width: 420px; max-height: 420px; right: -3vw; top: -10vw;">
    <img :src="pinkG" alt="Девочка с книгой" class="w-full h-full object-cover">
  </div>

  <!-- Маленький круг -->
  <div class="absolute rounded-full overflow-hidden shadow-2xl z-30"
    style="width: 20vw; height: 20vw; max-width: 410px; max-height: 410px; right: -2vw; bottom: -7vw;">
    <img :src="womanImage" alt="Продавец в магазине" class="w-full h-full object-cover">
  </div>

</div>
        </div>
    </section>
    
</template>
