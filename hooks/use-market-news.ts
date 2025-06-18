"use client"

import { useState, useEffect, useCallback } from "react"

interface NewsItem {
  id: string
  title: string
  excerpt: string
  category: string
  source: string
  publishedAt: string
  readTime: string
  image?: string
  trending?: boolean
}

interface UseMarketNewsOptions {
  category?: string
  limit?: number
  refreshInterval?: number
}

export function useMarketNews(options: UseMarketNewsOptions = {}) {
  const {
    category = "all",
    limit = 10,
    refreshInterval = 300000, // 5 minutes
  } = options

  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchNews = useCallback(async () => {
    try {
      setError(null)
      const params = new URLSearchParams({
        category,
        limit: limit.toString(),
      })

      const response = await fetch(`/api/market-news?${params}`)
      const result = await response.json()

      if (result.success) {
        setNews(result.data)
        setLastUpdated(new Date())
      } else {
        throw new Error(result.error || "Failed to fetch news")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      console.error("Error fetching market news:", err)
    } finally {
      setLoading(false)
    }
  }, [category, limit])

  useEffect(() => {
    fetchNews()

    const interval = setInterval(fetchNews, refreshInterval)
    return () => clearInterval(interval)
  }, [fetchNews, refreshInterval])

  const refresh = useCallback(() => {
    setLoading(true)
    fetchNews()
  }, [fetchNews])

  return {
    news,
    loading,
    error,
    lastUpdated,
    refresh,
  }
}
