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

// Seed list with fallback data - Indie Pop Hindi Focus (Nadaniya, Ehsaas, Ishq, Jhol vibes)
const SEED: { title: string; artist: string; fallback: ITunesTrack }[] = [
  { 
    title: 'Nadaniya', 
    artist: 'Akull',
    fallback: {
      trackName: 'Nadaniya',
      artistName: 'Akull',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/1d/90/15/1d9015a4-f411-c6ab-29a5-6ee552464f93/190295859206.jpg/100x100bb.jpg',
      trackViewUrl: 'https://music.apple.com/in/album/nadaniya/1508234567?i=1508234568'
    }
  },
  { 
    title: 'Ehsaas', 
    artist: 'Raman Mahadevan',
    fallback: {
      trackName: 'Ehsaas',
      artistName: 'Raman Mahadevan',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/fa/05/9e/fa059ec9-f0b5-e27c-43d1-94a4e4e4a4f7/cover.jpg/100x100bb.jpg',
      trackViewUrl: 'https://music.apple.com/in/album/ehsaas/1502345678?i=1502345679'
    }
  },
  { 
    title: 'Ishq', 
    artist: 'Faheem Abdullah',
    fallback: {
      trackName: 'Ishq',
      artistName: 'Faheem Abdullah',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/a3/5f/6f/a35f6f2b-0a0a-7a5c-8cf0-9c2e0e0e0e0e/cover.jpg/100x100bb.jpg',
      trackViewUrl: 'https://music.apple.com/in/album/ishq/1509876543?i=1509876544'
    }
  },
  { 
    title: 'Jhol', 
    artist: 'Seedhe Maut',
    fallback: {
      trackName: 'Jhol',
      artistName: 'Seedhe Maut',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/fb/42/8e/fb428ea3-4a4f-0c0c-2e2e-8e8e8e8e8e8e/cover.jpg/100x100bb.jpg',
      trackViewUrl: 'https://music.apple.com/in/album/jhol/1512345678?i=1512345679'
    }
  },
  { 
    title: 'Kasoor', 
    artist: 'Prateek Kuhad',
    fallback: {
      trackName: 'Kasoor',
      artistName: 'Prateek Kuhad',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/e0/20/8b/e0208b91-5a5a-0c0c-2e2e-8e8e8e8e8e8e/cover.jpg/100x100bb.jpg',
      trackViewUrl: 'https://music.apple.com/in/album/kasoor/1440723890?i=1440723891'
    }
  },
  { 
    title: 'Kho Gaye Hum Kahan', 
    artist: 'Prateek Kuhad',
    fallback: {
      trackName: 'Kho Gaye Hum Kahan',
      artistName: 'Prateek Kuhad',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/c9/ef/40/c9ef4095-1e1e-0e0e-2e2e-8e8e8e8e8e8e/cover.jpg/100x100bb.jpg',
      trackViewUrl: 'https://music.apple.com/in/album/kho-gaye-hum-kahan/1445678901?i=1445678902'
    }
  },
  { 
    title: 'Udd Gaye', 
    artist: 'Ritviz',
    fallback: {
      trackName: 'Udd Gaye',
      artistName: 'Ritviz',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/f9/8a/3c/f98a3c91-1e1e-0e0e-2e2e-8e8e8e8e8e8e/cover.jpg/100x100bb.jpg',
      trackViewUrl: 'https://music.apple.com/in/album/udd-gaye/1447890123?i=1447890124'
    }
  },
  { 
    title: 'Dil Beparvah', 
    artist: 'Ankur Tewari',
    fallback: {
      trackName: 'Dil Beparvah',
      artistName: 'Ankur Tewari',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d2/3a/1c/d23a1c45-1e1e-0e0e-2e2e-8e8e8e8e8e8e/cover.jpg/100x100bb.jpg',
      trackViewUrl: 'https://music.apple.com/in/album/dil-beparvah/1449012345?i=1449012346'
    }
  },
  { 
    title: 'Tu Aake Dekhle', 
    artist: 'King',
    fallback: {
      trackName: 'Tu Aake Dekhle',
      artistName: 'King',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a1/2b/3c/a12b3c67-1e1e-0e0e-2e2e-8e8e8e8e8e8e/cover.jpg/100x100bb.jpg',
      trackViewUrl: 'https://music.apple.com/in/album/tu-aake-dekhle/1551234567?i=1551234568'
    }
  },
  { 
    title: 'Liggi', 
    artist: 'Ritviz',
    fallback: {
      trackName: 'Liggi',
      artistName: 'Ritviz',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/b3/4c/5d/b34c5d78-1e1e-0e0e-2e2e-8e8e8e8e8e8e/cover.jpg/100x100bb.jpg',
      trackViewUrl: 'https://music.apple.com/in/album/liggi/1443456789?i=1443456790'
    }
  },
  { 
    title: 'Shayad', 
    artist: 'Arijit Singh',
    fallback: {
      trackName: 'Shayad',
      artistName: 'Arijit Singh',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/e1/4d/6e/e14d6e78-1e1e-0e0e-2e2e-8e8e8e8e8e8e/cover.jpg/100x100bb.jpg',
      trackViewUrl: 'https://music.apple.com/in/album/shayad/1500239238?i=1500239239'
    }
  },
  { 
    title: 'Agar Tum Saath Ho', 
    artist: 'Alka Yagnik',
    fallback: {
      trackName: 'Agar Tum Saath Ho',
      artistName: 'Alka Yagnik & Arijit Singh',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music119/v4/c2/5e/7f/c25e7f89-1e1e-0e0e-2e2e-8e8e8e8e8e8e/cover.jpg/100x100bb.jpg',
      trackViewUrl: 'https://music.apple.com/in/album/agar-tum-saath-ho/1053833785?i=1053834035'
    }
  }
]

function getDailySeed() {
  const today = new Date()
  // Deterministic index by date (UTC)
  const idx = (today.getUTCFullYear() * 1000 + (today.getUTCMonth()+1) * 50 + today.getUTCDate()) % SEED.length
  return SEED[idx]
}

async function fetchITunesTrack(q: string) {
  try {
    const url = new URL('https://itunes.apple.com/search')
    url.searchParams.set('term', q)
    url.searchParams.set('entity', 'song')
    url.searchParams.set('limit', '1')
    url.searchParams.set('country', 'IN')
    
    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    
    if (!res.ok) throw new Error('API request failed')
    const data = await res.json()
    return data.results?.[0] as ITunesTrack | undefined
  } catch (err) {
    console.error('iTunes API error:', err)
    return undefined
  }
}

onMounted(async () => {
  try {
    const seed = getDailySeed()
    const q = `${seed.title} ${seed.artist}`
    
    // Try to fetch from iTunes API
    const result = await fetchITunesTrack(q)
    
    // Use API result if available, otherwise use fallback
    if (result) {
      track.value = result
    } else {
      // Use fallback data
      track.value = seed.fallback
    }
    
    error.value = null
  } catch (e: any) {
    // Even if there's an error, use fallback
    const seed = getDailySeed()
    track.value = seed.fallback
    error.value = null
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

