<script setup lang="ts">
import { useGoogleAnalytics } from '../composables/useAnalytics'

const { trackCollaborateClick } = useGoogleAnalytics()
</script>

<template>
  <div class="card bg-gradient-to-r from-peach to-lilac">
    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="text-center md:text-left">
        <h3 class="text-xl sm:text-2xl font-extrabold">Want to collaborate?</h3>
        <p class="opacity-80 text-sm sm:text-base">Let's make something beautiful together 💫</p>
      </div>
      <a 
        href="mailto:theaudorraproject@gmail.com" 
        class="btn btn-primary w-full md:w-auto whitespace-nowrap"
        @click="trackCollaborateClick"
      >
        Email to Collaborate
      </a>
    </div>
  </div>
</template>

