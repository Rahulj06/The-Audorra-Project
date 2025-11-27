<script setup lang="ts">
import { useGoogleAnalytics } from '../composables/useAnalytics'

const { trackSocialClick } = useGoogleAnalytics()
</script>

<template>
  <footer class="mt-auto pt-8 pb-10">
    <div class="px-4 md:px-8 lg:px-12">
      <div class="max-w-6xl mx-auto flex flex-col items-center gap-4 text-center">
        <div class="text-sm opacity-70">Follow</div>
        <div class="flex flex-col sm:flex-row items-center gap-3">
          <a 
            href="https://www.linkedin.com/in/rahul-jain-a37235183/" 
            target="_blank" 
            class="btn btn-ghost w-full sm:w-auto"
            @click="trackSocialClick('LinkedIn')"
          >
            LinkedIn
          </a>
          <a 
            href="https://www.instagram.com/itsaudorra/" 
            target="_blank" 
            class="btn btn-ghost w-full sm:w-auto"
            @click="trackSocialClick('Instagram')"
          >
            Instagram
          </a>
          <a 
            href="https://www.youtube.com/@ItsAudorra" 
            target="_blank" 
            class="btn btn-ghost w-full sm:w-auto"
            @click="trackSocialClick('YouTube')"
          >
            YouTube
          </a>
        </div>
        <div class="opacity-60 text-sm mt-2">Retune. Relive. Repeat.</div>
        <a href="mailto:audorra9@gmail.com" class="opacity-60 text-sm hover:opacity-100 transition">audorra9@gmail.com</a>
        <div class="opacity-40 text-xs">© {{ new Date().getFullYear() }} The Audorra Project</div>
      </div>
    </div>
  </footer>
</template>

