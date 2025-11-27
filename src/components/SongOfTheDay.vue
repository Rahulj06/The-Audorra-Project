<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGoogleAnalytics } from '../composables/useAnalytics'

type ITunesTrack = {
  trackName: string
  artistName: string
  artworkUrl100: string
  previewUrl?: string
  trackViewUrl?: string
  collectionName?: string
}

const loading = ref(true)
const error = ref<string | null>(null)
const track = ref<ITunesTrack | null>(null)
const { trackSongPlay } = useGoogleAnalytics()

// Feel free to customize this seed list
const SEED: { title: string; artist: string }[] = [
  { title: 'Perfect', artist: 'Ed Sheeran' },
  { title: 'Kesariya', artist: 'Arijit Singh' },
  { title: 'Tum Se Hi', artist: 'Mohit Chauhan' },
  { title: 'Apna Bana Le', artist: 'Arijit Singh' },
  { title: 'Tera Ban Jaunga', artist: 'Akhil Sachdeva' },
  { title: 'Shayad', artist: 'Arijit Singh' },
  { title: 'Pasoori', artist: 'Ali Sethi' }
]

function getDailySeed() {
  const today = new Date()
  // Deterministic index by date (UTC)
  const idx = (today.getUTCFullYear() * 1000 + (today.getUTCMonth()+1) * 50 + today.getUTCDate()) % SEED.length
  return SEED[idx]
}

async function fetchITunesTrack(q: string) {
  const url = new URL('https://itunes.apple.com/search')
  url.searchParams.set('term', q)
  url.searchParams.set('entity', 'song')
  url.searchParams.set('limit', '1')
  url.searchParams.set('country', 'IN')
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Failed to fetch iTunes')
  const data = await res.json()
  return data.results?.[0] as ITunesTrack | undefined
}

onMounted(async () => {
  try {
    const seed = getDailySeed()
    const q = `${seed.title} ${seed.artist}`
    const result = await fetchITunesTrack(q)
    if (!result) throw new Error('No result for seed track')
    track.value = result
  } catch (e: any) {
    error.value = e?.message ?? 'Something went wrong'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section id="song-of-day" class="card">
    <h2 class="text-2xl md:text-3xl font-extrabold mb-5">Song of the Day</h2>

    <div v-if="loading" class="animate-pulse grid md:grid-cols-[120px_1fr] gap-4 items-center">
      <div class="w-28 h-28 bg-black/5 rounded-2xl"></div>
      <div>
        <div class="h-6 w-1/3 bg-black/5 rounded mb-2"></div>
        <div class="h-4 w-1/2 bg-black/5 rounded"></div>
      </div>
    </div>

    <div v-else-if="error" class="p-4 bg-red-50 rounded-2xl text-red-700">{{ error }}</div>

    <div v-else-if="track" class="flex flex-col sm:grid sm:grid-cols-[120px_1fr] gap-4 items-center sm:items-start">
      <img :src="track.artworkUrl100.replace('100x100','300x300')" :alt="track.trackName" class="w-32 h-32 md:w-36 md:h-36 rounded-2xl object-cover mx-auto sm:mx-0" />
      <div class="text-center sm:text-left w-full">
        <h3 class="text-lg sm:text-xl font-extrabold">{{ track.trackName }}</h3>
        <p class="opacity-70 text-sm sm:text-base">{{ track.artistName }}</p>
        <div class="mt-4 flex flex-col sm:flex-row items-center sm:items-start gap-3">
          <a 
            v-if="track.trackViewUrl" 
            :href="track.trackViewUrl" 
            target="_blank" 
            class="btn btn-primary w-full sm:w-auto"
            @click="trackSongPlay(track.trackName, track.artistName)"
          >
            Listen
          </a>
          <audio v-if="track.previewUrl" class="w-full sm:w-auto max-w-xs" controls :src="track.previewUrl"></audio>
        </div>
      </div>
    </div>
  </section>
</template>

