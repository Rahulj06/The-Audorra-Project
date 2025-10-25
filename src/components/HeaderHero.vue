<template>
  <header class="pt-10 pb-6">
    <div class="px-4 md:px-8 lg:px-12">
      <div class="max-w-6xl mx-auto card relative overflow-hidden">
        <div class="absolute -top-10 -left-10 w-56 h-56 bg-blush rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        <div class="absolute -bottom-16 -right-16 w-72 h-72 bg-mint rounded-full blur-3xl opacity-60 pointer-events-none"></div>

        <div class="relative flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div class="flex-1 text-center md:text-left order-2 md:order-1">
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              The Audorra Project
            </h1>
            <p class="mt-2 text-base sm:text-lg md:text-xl opacity-80">Retune. Relive. Repeat.</p>
            <div class="mt-5 flex flex-col sm:flex-row flex-wrap items-center gap-3 justify-center md:justify-start">
              <a href="#song-of-day" class="btn btn-primary w-full sm:w-auto">Song of the Day</a>
              <a href="#request" class="btn btn-ghost w-full sm:w-auto">Suggest the Next Song</a>
            </div>
          </div>
          <div class="flex-1 order-1 md:order-2">
            <img src="/public/avatar.jpg" alt="Audorra avatar" class="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 object-cover rounded-full ring-4 ring-white shadow-soft mx-auto" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

