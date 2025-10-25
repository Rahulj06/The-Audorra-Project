<template>
  <section class="card grid md:grid-cols-2 gap-8 items-center">
    <div class="order-2 md:order-1">
      <h2 class="text-2xl md:text-3xl font-extrabold mb-3">About Me</h2>
      <p class="opacity-80 leading-relaxed text-base md:text-lg">
        Hey, I'm <strong>Audorra</strong>. I reimagine songs you already love and make them feel new again. 
        Welcome to <em>The Audorra Project</em> — where familiar melodies find fresh soul.
      </p>
      <div class="mt-5 flex flex-wrap items-center gap-3">
        <a 
          href="https://www.linkedin.com/" 
          target="_blank"
          class="btn btn-ghost"
          aria-label="LinkedIn"
        >
          <span class="mr-1">🔗</span> LinkedIn
        </a>
      </div>
    </div>
    <div class="flex justify-center order-1 md:order-2">
      <img src="/public/avatar.jpg" alt="Audorra photo" class="w-48 h-48 md:w-56 md:h-56 object-cover rounded-3xl shadow-soft ring-4 ring-white" />
    </div>
  </section>
</template>

