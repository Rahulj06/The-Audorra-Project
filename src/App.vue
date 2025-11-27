<template>
  <main class="min-h-screen flex flex-col">
    <!-- Header / Branding -->
    <HeaderHero />

    <!-- Song of the Day -->
    <section class="px-3 sm:px-4 md:px-8 lg:px-12 mt-6">
      <SongOfTheDay class="max-w-4xl mx-auto" />
    </section>

    <!-- Recommend Next Cover -->
    <section class="px-3 sm:px-4 md:px-8 lg:px-12 mt-8 md:mt-10">
      <SongRequest class="max-w-4xl mx-auto" />
    </section>

    <!-- Collaborate bar -->
    <section class="px-3 sm:px-4 md:px-8 lg:px-12 mt-10 md:mt-12">
      <CollaborateBar class="max-w-5xl mx-auto" />
    </section>

    <SiteFooter />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import HeaderHero from './components/HeaderHero.vue'
import SongOfTheDay from './components/SongOfTheDay.vue'
import SongRequest from './components/SongRequest.vue'
import CollaborateBar from './components/CollaborateBar.vue'
import SiteFooter from './components/SiteFooter.vue'
import { useGoogleAnalytics } from './composables/useAnalytics'

const { trackPageView } = useGoogleAnalytics()

onMounted(() => {
  // Track initial page view
  trackPageView('Home')
})
</script>

