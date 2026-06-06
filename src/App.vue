<script setup>
import TheNavbar from '@/components/TheNavbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import BestsellersSection from '@/components/BestsellersSection.vue'


</script>

<template>
  <div class="min-h-screen font-sans" style="background-color: #FFFBF2;">
    <TheNavbar />
    <HeroSection />
    <AboutSection />
    <BestsellersSection />
   

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