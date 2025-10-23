"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Music, DollarSign } from "lucide-react"

export function AdminAnalyticsTab() {
  const topTracks = [
    { title: "Midnight Dreams", sales: 45, revenue: 1349.55, trend: "up" },
    { title: "Electronic Dreams", sales: 38, revenue: 1063.62, trend: "up" },
    { title: "Summer Vibes", sales: 22, revenue: 549.78, trend: "down" },
    { title: "Trap Energy", sales: 15, revenue: 524.85, trend: "up" },
    { title: "R&B Smooth", sales: 7, revenue: 209.93, trend: "down" },
  ]

  const genreStats = [
    { genre: "Hip Hop", sales: 45, percentage: 35 },
    { genre: "Electronic", sales: 38, percentage: 30 },
    { genre: "Pop", sales: 22, percentage: 17 },
    { genre: "Trap", sales: 15, percentage: 12 },
    { genre: "R&B", sales: 7, percentage: 6 },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics & Insights</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Tracks */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Music className="h-5 w-5 text-primary" />
            Top Performing Tracks
          </h3>
          <div className="space-y-4">
            {topTracks.map((track, index) => (
              <div key={track.title} className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm truncate">{track.title}</h4>
                    {track.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{track.sales} sales</span>
                    <span>•</span>
                    <span className="text-primary font-semibold">${track.revenue.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Genre Performance */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Sales by Genre
          </h3>
          <div className="space-y-4">
            {genreStats.map((stat) => (
              <div key={stat.genre} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{stat.genre}</span>
                  <span className="text-muted-foreground">{stat.sales} sales</span>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all"
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground text-right">{stat.percentage}%</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Revenue Chart Placeholder */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-6">Revenue Over Time</h3>
        <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg border-2 border-dashed border-border">
          <div className="text-center space-y-2">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">Revenue chart visualization</p>
            <p className="text-xs text-muted-foreground">Connect to database to see real-time data</p>
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 pb-4 border-b border-border">
            <div className="h-2 w-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">New purchase:</span> Midnight Dreams by john@example.com
              </p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
            <Badge variant="outline" className="text-green-500 border-green-500/20">
              $29.99
            </Badge>
          </div>
          <div className="flex items-start gap-4 pb-4 border-b border-border">
            <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">Track updated:</span> Summer Vibes marked as featured
              </p>
              <p className="text-xs text-muted-foreground">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4 pb-4 border-b border-border">
            <div className="h-2 w-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">New purchase:</span> Electronic Dreams by sarah@example.com
              </p>
              <p className="text-xs text-muted-foreground">1 day ago</p>
            </div>
            <Badge variant="outline" className="text-green-500 border-green-500/20">
              $27.99
            </Badge>
          </div>
          <div className="flex items-start gap-4">
            <div className="h-2 w-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">New track added:</span> Trap Energy
              </p>
              <p className="text-xs text-muted-foreground">2 days ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
