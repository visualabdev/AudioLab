"use client"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Music, ShoppingBag, TrendingUp } from "lucide-react"
import { AdminTracksTab } from "@/components/admin/tracks-tab"
import { AdminPurchasesTab } from "@/components/admin/purchases-tab"
import { AdminAnalyticsTab } from "@/components/admin/analytics-tab"
import { StemsGenerator } from "@/components/admin/stems-generator"
import { StemsList } from "@/components/admin/stems-list"

export default function AdminPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your tracks, view sales, and track performance</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-3xl font-bold text-primary">$2,847</p>
                    <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tracks</p>
                    <p className="text-3xl font-bold">6</p>
                    <p className="text-xs text-muted-foreground mt-1">3 featured</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Music className="h-6 w-6 text-secondary" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Sales</p>
                    <p className="text-3xl font-bold">127</p>
                    <p className="text-xs text-muted-foreground mt-1">+8% from last month</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Sale Price</p>
                    <p className="text-3xl font-bold">$27.99</p>
                    <p className="text-xs text-muted-foreground mt-1">Across all tracks</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-secondary" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="beats" className="space-y-6">
              <TabsList className="grid w-full max-w-3xl grid-cols-6">
                <TabsTrigger value="beats">Beats</TabsTrigger>
                <TabsTrigger value="samples">Samples</TabsTrigger>
                <TabsTrigger value="midi">MIDI</TabsTrigger>
                <TabsTrigger value="stems">Stems IA</TabsTrigger>
                <TabsTrigger value="purchases">Purchases</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="beats">
                <AdminTracksTab category="beat" />
              </TabsContent>

              <TabsContent value="samples">
                <AdminTracksTab category="sample" />
              </TabsContent>

              <TabsContent value="midi">
                <AdminTracksTab category="midi" />
              </TabsContent>

              <TabsContent value="stems" className="space-y-6">
                <StemsGenerator />
                <div className="pt-8 border-t">
                  <h3 className="text-xl font-bold mb-6">Historial de Stems</h3>
                  <StemsList />
                </div>
              </TabsContent>

              <TabsContent value="purchases">
                <AdminPurchasesTab />
              </TabsContent>

              <TabsContent value="analytics">
                <AdminAnalyticsTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
