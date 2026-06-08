<script setup>
import TheNavbar from '@/components/TheNavbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import BestsellersSection from '@/components/BestsellersSection.vue'
import SaleSection from '@/components/SaleSection.vue';
import ContactsSection from '@/components/ContactsSection.vue'
import FooterSection from '@/components/FooterSection.vue'
</script>


<template>
<div class="min-h-screen font-sans overflow-x-hidden" style="background-color: #FFFBF2;">
    <TheNavbar />
    <HeroSection />
    <AboutSection />
    <BestsellersSection />
    <SaleSection/>
    <ContactsSection /> 
     <FooterSection /> 
  </div>
  </template>