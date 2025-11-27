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

// Seed list from Spotify Indie India Playlist
// https://open.spotify.com/playlist/37i9dQZF1DX5q67ZpWyRrZ
const SEED: { title: string; artist: string; fallback: ITunesTrack }[] = [
  { 
    title: 'nadaaniyan', 
    artist: 'Akshath',
    fallback: {
      trackName: 'nadaaniyan',
      artistName: 'Akshath',
      artworkUrl100: '',
      trackViewUrl: 'https://music.apple.com/in/search?term=nadaaniyan+Akshath'
    }
  },
  { 
    title: 'Ishq', 
    artist: 'Faheem Abdullah',
    fallback: {
      trackName: 'Ishq',
      artistName: 'Faheem Abdullah',
      artworkUrl100: '',
      trackViewUrl: 'https://music.apple.com/in/search?term=Ishq+Faheem+Abdullah'
    }
  },
  { 
    title: 'Jo Tum Mere Ho', 
    artist: 'Anuv Jain',
    fallback: {
      trackName: 'Jo Tum Mere Ho',
      artistName: 'Anuv Jain',
      artworkUrl100: '',
      trackViewUrl: 'https://music.apple.com/in/search?term=Jo+Tum+Mere+Ho+Anuv+Jain'
    }
  },
  { 
    title: 'Baarishein', 
    artist: 'Anuv Jain',
    fallback: {
      trackName: 'Baarishein',
      artistName: 'Anuv Jain',
      artworkUrl100: '',
      trackViewUrl: 'https://music.apple.com/in/search?term=Baarishein+Anuv+Jain'
    }
  },
  { 
    title: 'Husn', 
    artist: 'Anuv Jain',
    fallback: {
      trackName: 'Husn',
      artistName: 'Anuv Jain',
      artworkUrl100: '',
      trackViewUrl: 'https://music.apple.com/in/search?term=Husn+Anuv+Jain'
    }
  },
  { 
    title: 'Co2', 
    artist: 'Prateek Kuhad',
    fallback: {
      trackName: 'Co2',
      artistName: 'Prateek Kuhad',
      artworkUrl100: '',
      trackViewUrl: 'https://music.apple.com/in/search?term=Co2+Prateek+Kuhad'
    }
  },
  { 
    title: 'Choo Lo', 
    artist: 'The Local Train',
    fallback: {
      trackName: 'Choo Lo',
      artistName: 'The Local Train',
      artworkUrl100: '',
      trackViewUrl: 'https://music.apple.com/in/search?term=Choo+Lo+The+Local+Train'
    }
  },
  { 
    title: 'Aaoge Tum Kabhi', 
    artist: 'The Local Train',
    fallback: {
      trackName: 'Aaoge Tum Kabhi',
      artistName: 'The Local Train',
      artworkUrl100: '',
      trackViewUrl: 'https://music.apple.com/in/search?term=Aaoge+Tum+Kabhi+The+Local+Train'
    }
  },
  { 
    title: 'Samjho Na', 
    artist: 'Aditya Rikhari',
    fallback: {
      trackName: 'Samjho Na',
      artistName: 'Aditya Rikhari',
      artworkUrl100: '',
      trackViewUrl: 'https://music.apple.com/in/search?term=Samjho+Na+Aditya+Rikhari'
    }
  },
  { 
    title: 'Sahiba', 
    artist: 'Aditya Rikhari',
    fallback: {
      trackName: 'Sahiba',
      artistName: 'Aditya Rikhari',
      artworkUrl100: '',
      trackViewUrl: 'https://music.apple.com/in/search?term=Sahiba+Aditya+Rikhari'
    }
  },
  { 
    title: 'Alfaazo', 
    artist: 'Mitraz',
    fallback: {
      trackName: 'Alfaazo',
      artistName: 'Mitraz',
      artworkUrl100: '',
      trackViewUrl: 'https://music.apple.com/in/search?term=Alfaazo+Mitraz'
    }
  },
  { 
    title: 'Akhiyaan', 
    artist: 'Mitraz',
    fallback: {
      trackName: 'Akhiyaan',
      artistName: 'Mitraz',
      artworkUrl100: '',
      trackViewUrl: 'https://music.apple.com/in/search?term=Akhiyaan+Mitraz'
    }
  },
  { 
    title: 'Sukoon', 
    artist: 'gini',
    fallback: {
      trackName: 'Sukoon',
      artistName: 'gini',
      artworkUrl100: '',
      trackViewUrl: 'https://music.apple.com/in/search?term=Sukoon+gini'
    }
  },
  { 
    title: 'Paro', 
    artist: 'Aditya Rikhari',
    fallback: {
      trackName: 'Paro',
      artistName: 'Aditya Rikhari',
      artworkUrl100: '',
      trackViewUrl: 'https://music.apple.com/in/search?term=Paro+Aditya+Rikhari'
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

    <div v-else-if="track" class="flex flex-col" :class="track.artworkUrl100 ? 'sm:grid sm:grid-cols-[120px_1fr]' : ''" class="gap-4 items-center sm:items-start">
      <img 
        v-if="track.artworkUrl100" 
        :src="track.artworkUrl100.replace('100x100','300x300')" 
        :alt="track.trackName" 
        class="w-32 h-32 md:w-36 md:h-36 rounded-2xl object-cover mx-auto sm:mx-0"
        @error="(e) => (e.target as HTMLElement).style.display = 'none'"
      />
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

