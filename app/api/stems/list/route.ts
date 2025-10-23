import { NextResponse } from "next/server"
import { mockStems } from "@/lib/mock-data"

export async function GET() {
  try {
    // In production, fetch from Supabase:
    // const { data, error } = await supabase
    //   .from('stems')
    //   .select('*')
    //   .order('created_at', { ascending: false })

    return NextResponse.json({ stems: mockStems })
  } catch (error) {
    console.error("[v0] Error fetching stems:", error)
    return NextResponse.json({ error: "Failed to fetch stems" }, { status: 500 })
  }
}
