import { onMounted, ref } from 'vue'

/**
 * Simple local visit counter (for demonstration)
 * Note: This only tracks visits in the current browser
 * For real analytics, use Google Analytics (see index.html)
 */
export function useVisitCounter() {
  const visitCount = ref(0)
  const todayVisits = ref(0)
  const uniqueVisitors = ref(0)

  onMounted(() => {
    // Get or initialize counters
    const totalVisits = parseInt(localStorage.getItem('audorra-total-visits') || '0')
    const lastVisit = localStorage.getItem('audorra-last-visit') || ''
    const today = new Date().toDateString()
    
    // Increment total visits
    visitCount.value = totalVisits + 1
    localStorage.setItem('audorra-total-visits', visitCount.value.toString())
    
    // Track today's visits
    if (lastVisit === today) {
      const todayCount = parseInt(localStorage.getItem('audorra-today-visits') || '1')
      todayVisits.value = todayCount + 1
      localStorage.setItem('audorra-today-visits', todayVisits.value.toString())
    } else {
      todayVisits.value = 1
      localStorage.setItem('audorra-today-visits', '1')
      localStorage.setItem('audorra-last-visit', today)
    }
    
    // Track unique visitor flag
    if (!localStorage.getItem('audorra-visitor-id')) {
      const visitorId = `visitor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('audorra-visitor-id', visitorId)
      
      const uniqueCount = parseInt(localStorage.getItem('audorra-unique-visitors') || '0')
      uniqueVisitors.value = uniqueCount + 1
      localStorage.setItem('audorra-unique-visitors', uniqueVisitors.value.toString())
    } else {
      uniqueVisitors.value = parseInt(localStorage.getItem('audorra-unique-visitors') || '1')
    }
  })

  return {
    visitCount,
    todayVisits,
    uniqueVisitors
  }
}

/**
 * Google Analytics event tracking helper
 */
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params)
  }
}

/**
 * Track custom events throughout the app
 */
export function useGoogleAnalytics() {
  const trackPageView = (pageName: string) => {
    trackEvent('page_view', { page_title: pageName })
  }

  const trackSongPlay = (songName: string, artist: string) => {
    trackEvent('song_play', {
      song_name: songName,
      artist: artist
    })
  }

  const trackSongRequest = (songName: string) => {
    trackEvent('song_request', {
      song_name: songName
    })
  }

  const trackSocialClick = (platform: string) => {
    trackEvent('social_click', {
      platform: platform
    })
  }

  const trackCollaborateClick = () => {
    trackEvent('collaborate_click')
  }

  return {
    trackPageView,
    trackSongPlay,
    trackSongRequest,
    trackSocialClick,
    trackCollaborateClick
  }
}

