<script setup lang="ts">
import { ref, watch } from 'vue'
import { useGoogleAnalytics } from '../composables/useAnalytics'

type ITunesTrack = {
  trackName: string
  artistName: string
  trackId: number
  artworkUrl100: string
}

const { trackSongRequest } = useGoogleAnalytics()

const search = ref('')
const results = ref<ITunesTrack[]>([])
const loading = ref(false)
const selected = ref<ITunesTrack | null>(null)
const why = ref('')
const submitted = ref(false)

let timer: number | null = null

async function doSearch(q: string) {
  if (!q.trim()) { results.value = []; return }
  loading.value = true
  try {
    const url = new URL('https://itunes.apple.com/search')
    url.searchParams.set('term', q)
    url.searchParams.set('entity', 'song')
    url.searchParams.set('limit', '8')
    url.searchParams.set('country', 'IN')
    const res = await fetch(url.toString())
    const data = await res.json()
    results.value = (data.results || []).map((r: any) => ({
      trackName: r.trackName,
      artistName: r.artistName,
      trackId: r.trackId,
      artworkUrl100: r.artworkUrl100
    }))
  } finally { loading.value = false }
}

watch(search, (q) => {
  if (timer) window.clearTimeout(timer)
  timer = window.setTimeout(() => doSearch(q), 350)
})

function choose(track: ITunesTrack) {
  selected.value = track
  results.value = []
  search.value = `${track.trackName} — ${track.artistName}`
}

function saveLocalFallback(payload: Record<string, any>) {
  const key = 'audorra-requests'
  const arr = JSON.parse(localStorage.getItem(key) || '[]')
  arr.push({ ...payload, at: new Date().toISOString() })
  localStorage.setItem(key, JSON.stringify(arr))
}

async function handleSubmit(e: Event) {
  e.preventDefault()
  const payload = {
    song: selected.value ? `${selected.value.trackName} — ${selected.value.artistName}` : search.value,
    why: why.value
  }

  // Netlify Forms POST
  try {
    const formData = new FormData()
    formData.append('form-name', 'next-song-form')
    formData.append('song', payload.song)
    formData.append('why', payload.why)

    const resp = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(Object.fromEntries(formData as any)).toString()
    })
    if (!resp.ok) throw new Error('Netlify submit failed')
  } catch (err) {
    // Fallback local storage so no submission is lost in dev/preview
    saveLocalFallback(payload)
  }

  // Track the song request
  trackSongRequest(payload.song)

  submitted.value = true
  search.value = ''
  selected.value = null
  why.value = ''
}
</script>

<template>
  <section id="request" class="card">
    <h2 class="text-2xl md:text-3xl font-extrabold mb-2">Recommend my next cover</h2>
    <p class="text-black/60 mb-5">Search a song and submit. I'll pick from your top suggestions!</p>

    <!-- Hidden Netlify form (for build-time detection) -->
    <form name="next-song-form" data-netlify="true" netlify-honeypot="bot-field" hidden>
      <input name="song" />
      <textarea name="why"></textarea>
    </form>

    <form @submit="handleSubmit" class="space-y-4">
      <div>
        <label class="label">Song</label>
        <input v-model="search" class="input" placeholder="Type a song (e.g., 'Kesariya', 'Perfect')" required />
        <!-- Suggestions dropdown -->
        <div v-if="results.length" class="mt-2 bg-white rounded-2xl border border-black/5 shadow-soft divide-y">
          <button
            v-for="r in results"
            :key="r.trackId"
            type="button"
            class="w-full text-left px-4 py-3 hover:bg-cream/60 flex items-center gap-3"
            @click="choose(r)"
          >
            <img :src="r.artworkUrl100" class="w-10 h-10 rounded-xl" alt=""/>
            <div>
              <div class="font-semibold">{{ r.trackName }}</div>
              <div class="text-sm opacity-70">{{ r.artistName }}</div>
            </div>
          </button>
        </div>
        <div v-if="loading" class="text-sm mt-2 opacity-60">Searching…</div>
      </div>

      <div>
        <label class="label">Why this song? (optional)</label>
        <textarea v-model="why" class="input h-28" placeholder="Tell me the moment, mood, or reason"></textarea>
      </div>

      <button class="btn btn-primary" type="submit">Submit Request</button>

      <p v-if="submitted" class="text-green-700 bg-green-50 border border-green-200 rounded-2xl p-3">
        ✔ Thanks! Your recommendation is noted.
      </p>
    </form>
  </section>
</template>

