"use client"

import { useState, useEffect, useCallback } from "react"

interface HistoricalDataPoint {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

interface UseHistoricalDataOptions {
  symbol: string
  interval?: string
  range?: string
}

export function useHistoricalData(options: UseHistoricalDataOptions) {
  const { symbol, interval = "1d", range = "1mo" } = options

  const [data, setData] = useState<HistoricalDataPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchHistoricalData = useCallback(async () => {
    if (!symbol) return

    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams({
        symbol,
        interval,
        range,
      })

      const response = await fetch(`/api/historical-data?${params}`)
      const result = await response.json()

      if (result.success) {
        setData(result.data)
      } else {
        throw new Error(result.error || "Failed to fetch historical data")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      setError(errorMessage)
      console.error("Error fetching historical data:", err)
    } finally {
      setLoading(false)
    }
  }, [symbol, interval, range])

  useEffect(() => {
    fetchHistoricalData()
  }, [fetchHistoricalData])

  return {
    data,
    loading,
    error,
    refetch: fetchHistoricalData,
  }
}
