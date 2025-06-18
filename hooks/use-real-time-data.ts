"use client"

import { useState, useEffect, useCallback } from "react"

interface CommodityData {
  name: string
  symbol: string
  price: number
  change: number
  changePercent: number
  high: number
  low: number
  volume: number
  lastUpdated: string
  currency: string
  marketState: string
}

interface UseRealTimeDataOptions {
  symbols?: string[]
  refreshInterval?: number
}

export function useRealTimeData(options: UseRealTimeDataOptions = {}) {
  const {
    // Default to commodity ETFs that work well with Yahoo Finance
    symbols = ["GLD", "SLV", "USO", "UNG", "COPX", "PPLT"],
    refreshInterval = 60000, // 1 minute (Yahoo Finance allows more frequent updates)
  } = options

  const [data, setData] = useState<CommodityData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setError(null)
      const params = new URLSearchParams({
        symbols: symbols.join(","),
      })

      

      const response = await fetch(`/api/commodities?${params}`)
      const result = await response.json()

      if (result.success) {
        setData(result.data)
        setLastUpdated(new Date())
        // console.log("Successfully fetched commodity data:", result.data.length, "items")
      } else {
        throw new Error(result.error || "Failed to fetch data")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      setError(errorMessage)
      console.error("Error fetching real-time data:", err)
    } finally {
      setLoading(false)
    }
  }, [symbols])

  useEffect(() => {
    fetchData()

    // Set up interval for periodic updates
    const interval = setInterval(fetchData, refreshInterval)
    return () => clearInterval(interval)
  }, [fetchData, refreshInterval])

  const refresh = useCallback(() => {
    setLoading(true)
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh,
  }
}
