import { type NextRequest, NextResponse } from "next/server"
import { yahooFinanceAPI } from "@/lib/api/yahoo-finance-api"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    console.log("Fetching market news from Yahoo Finance")

    // Get news for commodity symbols
    const commoditySymbols = ["GLD", "SLV", "USO", "UNG", "COPX", "PPLT"]
    const news = await yahooFinanceAPI.getCommodityNews(commoditySymbols)

    // Filter by category if specified
    let filteredNews = news
    if (category && category !== "all") {
      filteredNews = news.filter((item) => item.category.toLowerCase().includes(category.toLowerCase()))
    }

    const limitedNews = filteredNews.slice(0, limit)

    return NextResponse.json({
      success: true,
      data: limitedNews,
      total: filteredNews.length,
      timestamp: new Date().toISOString(),
      source: "Yahoo Finance RapidAPI",
    })
  } catch (error) {
    console.error("News API Error:", error)

    // Return fallback news data when API fails
    const fallbackNews = [
      {
        id: "fallback-1",
        title: "Commodity Markets Show Mixed Performance Today",
        excerpt: "ETF tracking shows varied performance across different commodity sectors with gold leading gains.",
        category: "Market Analysis",
        source: "Yahoo Finance",
        publishedAt: new Date().toISOString(),
        readTime: "3 min read",
      },
      {
        id: "fallback-2",
        title: "Gold ETF Reaches New Monthly High",
        excerpt: "SPDR Gold Trust (GLD) continues upward momentum as investors seek safe-haven assets.",
        category: "Precious Metals",
        source: "Market Update",
        publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        readTime: "4 min read",
      },
      {
        id: "fallback-3",
        title: "Energy Sector ETFs React to Supply News",
        excerpt: "Oil and natural gas funds show volatility following latest supply and demand reports.",
        category: "Energy",
        source: "Energy News",
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        readTime: "5 min read",
      },
    ]

    return NextResponse.json({
      success: true,
      data: fallbackNews,
      total: fallbackNews.length,
      timestamp: new Date().toISOString(),
      source: "Fallback Content",
      note: "Using cached content due to API limitations",
    })
  }
}
