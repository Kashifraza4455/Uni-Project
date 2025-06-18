import { type NextRequest, NextResponse } from "next/server"
import { yahooFinanceAPI } from "@/lib/api/yahoo-finance-api"

// Optional: In-memory cache to reduce repeated API calls (dev/demo use only)
const cache: Record<string, { timestamp: number; data: any }> = {}
const CACHE_DURATION_MS = 2 * 60 * 1000 // 2 minutes

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get("symbol")
    const interval = searchParams.get("interval") || "1d"
    const range = searchParams.get("range") || "1mo"

    if (!symbol) {
      return NextResponse.json(
        {
          success: false,
          error: "Symbol parameter is required",
        },
        { status: 400 },
      )
    }

    const cacheKey = `${symbol}_${interval}_${range}`
    const now = Date.now()
    const cached = cache[cacheKey]

    if (cached && now - cached.timestamp < CACHE_DURATION_MS) {
      return NextResponse.json({
        success: true,
        data: cached.data,
        symbol,
        interval,
        range,
        timestamp: new Date(cached.timestamp).toISOString(),
        source: "Cache",
        note: "Served from in-memory cache",
      })
    }

    const data = await yahooFinanceAPI.getHistoricalData(symbol, interval, range)

    // Cache the data
    cache[cacheKey] = { data, timestamp: now }

    return NextResponse.json({
      success: true,
      data,
      symbol,
      interval,
      range,
      timestamp: new Date(now).toISOString(),
      source: "Yahoo Finance RapidAPI",
    })
  } catch (error: any) {
    console.error("Historical Data API Error:", error)

    const isRateLimited = error?.response?.status === 429 || error?.message?.includes("429")
    const statusCode = isRateLimited ? 429 : 500

    return NextResponse.json(
      {
        success: false,
        error: isRateLimited
          ? "Rate limit exceeded (429 Too Many Requests)"
          : "Failed to fetch historical data from Yahoo Finance",
        timestamp: new Date().toISOString(),
      },
      { status: statusCode },
    )
  }
}
