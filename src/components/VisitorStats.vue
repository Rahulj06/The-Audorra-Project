<script setup lang="ts">
import { useVisitCounter } from '../composables/useAnalytics'

const { visitCount, todayVisits, uniqueVisitors } = useVisitCounter()
</script>

<template>
  <div class="card bg-gradient-to-br from-mint to-blush">
    <h3 class="text-lg font-extrabold mb-4 flex items-center gap-2">
      📊 Visitor Stats
    </h3>
    <div class="grid grid-cols-3 gap-4">
      <div class="text-center">
        <div class="text-2xl md:text-3xl font-extrabold">{{ visitCount }}</div>
        <div class="text-xs md:text-sm opacity-70 mt-1">Total Visits</div>
      </div>
      <div class="text-center">
        <div class="text-2xl md:text-3xl font-extrabold">{{ todayVisits }}</div>
        <div class="text-xs md:text-sm opacity-70 mt-1">Today</div>
      </div>
      <div class="text-center">
        <div class="text-2xl md:text-3xl font-extrabold">{{ uniqueVisitors }}</div>
        <div class="text-xs md:text-sm opacity-70 mt-1">Unique</div>
      </div>
    </div>
    <p class="text-xs opacity-60 mt-4 text-center">
      💡 For accurate analytics across all devices, check Google Analytics dashboard
    </p>
  </div>
</template>

