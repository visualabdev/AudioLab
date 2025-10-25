import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AnalyticsData {
  // Sales metrics
  totalSales: number
  totalRevenue: number
  averageOrderValue: number
  
  // Track metrics
  totalTracks: number
  totalPlays: number
  totalDownloads: number
  
  // User metrics
  totalUsers: number
  activeUsers: number
  newUsers: number
  
  // Popular content
  topTracks: Array<{
    id: string
    title: string
    artist: string
    plays: number
    sales: number
    revenue: number
  }>
  
  topGenres: Array<{
    genre: string
    tracks: number
    sales: number
    revenue: number
  }>
  
  // Time series data
  salesByDay: Array<{
    date: string
    sales: number
    revenue: number
  }>
  
  playsByDay: Array<{
    date: string
    plays: number
  }>
}

export interface AnalyticsStore {
  data: AnalyticsData
  isLoading: boolean
  
  // Actions
  fetchAnalytics: () => Promise<void>
  trackPlay: (trackId: string) => void
  trackSale: (trackId: string, amount: number) => void
  trackUserActivity: (userId: string) => void
}

// Mock analytics data generator
const generateMockAnalytics = (): AnalyticsData => {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  
  // Generate daily data for the last 30 days
  const salesByDay = []
  const playsByDay = []
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(thirtyDaysAgo.getTime() + i * 24 * 60 * 60 * 1000)
    const dateStr = date.toISOString().split('T')[0]
    
    salesByDay.push({
      date: dateStr,
      sales: Math.floor(Math.random() * 50) + 10,
      revenue: Math.floor(Math.random() * 2000) + 500
    })
    
    playsByDay.push({
      date: dateStr,
      plays: Math.floor(Math.random() * 500) + 100
    })
  }
  
  return {
    totalSales: 1247,
    totalRevenue: 45680.50,
    averageOrderValue: 36.65,
    
    totalTracks: 156,
    totalPlays: 12450,
    totalDownloads: 3240,
    
    totalUsers: 892,
    activeUsers: 234,
    newUsers: 45,
    
    topTracks: [
      {
        id: '1',
        title: 'Dark Trap Beat',
        artist: 'Producer X',
        plays: 1250,
        sales: 89,
        revenue: 2670
      },
      {
        id: '2',
        title: 'Melodic Hip Hop',
        artist: 'Beat Maker',
        plays: 980,
        sales: 67,
        revenue: 2010
      },
      {
        id: '3',
        title: 'Future Bass Drop',
        artist: 'Electronic Pro',
        plays: 875,
        sales: 54,
        revenue: 1620
      },
      {
        id: '4',
        title: 'Lo-Fi Chill',
        artist: 'Chill Beats',
        plays: 756,
        sales: 43,
        revenue: 1290
      },
      {
        id: '5',
        title: 'Drill Type Beat',
        artist: 'Urban Sounds',
        plays: 689,
        sales: 38,
        revenue: 1140
      }
    ],
    
    topGenres: [
      {
        genre: 'Trap',
        tracks: 45,
        sales: 234,
        revenue: 7020
      },
      {
        genre: 'Hip Hop',
        tracks: 38,
        sales: 189,
        revenue: 5670
      },
      {
        genre: 'R&B',
        tracks: 29,
        sales: 156,
        revenue: 4680
      },
      {
        genre: 'Pop',
        tracks: 22,
        sales: 134,
        revenue: 4020
      },
      {
        genre: 'Electronic',
        tracks: 18,
        sales: 98,
        revenue: 2940
      }
    ],
    
    salesByDay,
    playsByDay
  }
}

export const useAnalyticsStore = create<AnalyticsStore>()(
  persist(
    (set, get) => ({
      data: generateMockAnalytics(),
      isLoading: false,

      fetchAnalytics: async () => {
        set({ isLoading: true })
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        set({ 
          data: generateMockAnalytics(),
          isLoading: false 
        })
      },

      trackPlay: (trackId) => {
        const currentData = get().data
        set({
          data: {
            ...currentData,
            totalPlays: currentData.totalPlays + 1,
            topTracks: currentData.topTracks.map(track =>
              track.id === trackId
                ? { ...track, plays: track.plays + 1 }
                : track
            )
          }
        })
      },

      trackSale: (trackId, amount) => {
        const currentData = get().data
        set({
          data: {
            ...currentData,
            totalSales: currentData.totalSales + 1,
            totalRevenue: currentData.totalRevenue + amount,
            totalDownloads: currentData.totalDownloads + 1,
            topTracks: currentData.topTracks.map(track =>
              track.id === trackId
                ? { 
                    ...track, 
                    sales: track.sales + 1,
                    revenue: track.revenue + amount
                  }
                : track
            )
          }
        })
      },

      trackUserActivity: (userId) => {
        // Track user activity for analytics
        console.log('User activity tracked:', userId)
      }
    }),
    {
      name: 'analytics-storage',
      partialize: (state) => ({ data: state.data })
    }
  )
)