import { type NextRequest, NextResponse } from "next/server"
import { yahooFinanceAPI } from "@/lib/api/yahoo-finance-api"

// Simple in-memory cache (per deployment instance)
const cache: Record<string, { timestamp: number; data: any }> = {}
const CACHE_TTL_MS = 2 * 60 * 1000 // 2 minutes

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const symbolsParam = searchParams.get("symbols")

  const defaultSymbols = ["GLD", "SLV", "USO", "UNG", "COPX", "PPLT"]
  const symbols = symbolsParam ? symbolsParam.split(",") : defaultSymbols
  const cacheKey = symbols.sort().join(",")

  const now = Date.now()

  // Serve from cache if available and fresh
  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_TTL_MS) {
    return NextResponse.json({
      success: true,
      data: cache[cacheKey].data,
      timestamp: new Date(cache[cacheKey].timestamp).toISOString(),
      source: "Cache",
      note: "Serving from cache to avoid API rate limits",
    })
  }

  try {
    const data = await yahooFinanceAPI.getCommodityPrices(symbols)

    // Cache result
    cache[cacheKey] = {
      timestamp: now,
      data,
    }

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
      source: "Yahoo Finance RapidAPI",
      note: "Fresh data from API",
    })
  } catch (error: any) {
    const statusCode = error?.response?.status || 500
    const isRateLimit = statusCode === 429

    console.error("Commodities API Error:", error)

    const fallbackData = [
      {
        name: "SPDR Gold Trust",
        symbol: "GLD",
        price: 185.5,
        change: 2.3,
        changePercent: 1.26,
        high: 186.2,
        low: 183.1,
        volume: 1250000,
        lastUpdated: new Date().toISOString(),
        currency: "USD",
        marketState: "REGULAR",
      },
      {
        name: "iShares Silver Trust",
        symbol: "SLV",
        price: 22.85,
        change: -0.45,
        changePercent: -1.93,
        high: 23.4,
        low: 22.6,
        volume: 890000,
        lastUpdated: new Date().toISOString(),
        currency: "USD",
        marketState: "REGULAR",
      },
      {
        name: "United States Oil Fund",
        symbol: "USO",
        price: 78.92,
        change: 1.85,
        changePercent: 2.4,
        high: 79.5,
        low: 77.2,
        volume: 2100000,
        lastUpdated: new Date().toISOString(),
        currency: "USD",
        marketState: "REGULAR",
      },
    ]

    return NextResponse.json({
      success: true,
      data: fallbackData,
      timestamp: new Date().toISOString(),
      source: "Fallback Data",
      note: isRateLimit
        ? "Rate limit reached. Using fallback data."
        : "Error fetching data. Using fallback.",
      rateLimited: isRateLimit,
    })
  }
}
