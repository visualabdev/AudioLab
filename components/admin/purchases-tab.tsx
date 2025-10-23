"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Mail, Search } from "lucide-react"
import { useState } from "react"

interface Purchase {
  id: string
  track_title: string
  buyer_email: string
  buyer_name: string
  amount: number
  status: "completed" | "pending" | "failed"
  date: string
  transaction_id: string
}

const mockPurchases: Purchase[] = [
  {
    id: "1",
    track_title: "Midnight Dreams",
    buyer_email: "john@example.com",
    buyer_name: "John Doe",
    amount: 29.99,
    status: "completed",
    date: "2025-01-20",
    transaction_id: "TXN123456",
  },
  {
    id: "2",
    track_title: "Summer Vibes",
    buyer_email: "jane@example.com",
    buyer_name: "Jane Smith",
    amount: 24.99,
    status: "completed",
    date: "2025-01-19",
    transaction_id: "TXN123457",
  },
  {
    id: "3",
    track_title: "Electronic Dreams",
    buyer_email: "mike@example.com",
    buyer_name: "Mike Johnson",
    amount: 27.99,
    status: "completed",
    date: "2025-01-18",
    transaction_id: "TXN123458",
  },
  {
    id: "4",
    track_title: "Trap Energy",
    buyer_email: "sarah@example.com",
    buyer_name: "Sarah Williams",
    amount: 34.99,
    status: "pending",
    date: "2025-01-17",
    transaction_id: "TXN123459",
  },
]

export function AdminPurchasesTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [purchases] = useState(mockPurchases)

  const filteredPurchases = purchases.filter(
    (purchase) =>
      purchase.track_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.buyer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.buyer_name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "failed":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Purchase History</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search purchases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Track</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Transaction ID</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchases.map((purchase) => (
                <tr key={purchase.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="p-4 text-sm text-muted-foreground">{new Date(purchase.date).toLocaleDateString()}</td>
                  <td className="p-4">
                    <div className="font-medium">{purchase.track_title}</div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="font-medium text-sm">{purchase.buyer_name}</div>
                      <div className="text-xs text-muted-foreground">{purchase.buyer_email}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-primary">${purchase.amount.toFixed(2)}</div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className={getStatusColor(purchase.status)}>
                      {purchase.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <code className="text-xs text-muted-foreground">{purchase.transaction_id}</code>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredPurchases.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No purchases found matching your search</p>
        </div>
      )}
    </div>
  )
}
