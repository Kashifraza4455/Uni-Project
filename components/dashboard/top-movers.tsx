"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"
import { useRealTimeData } from "@/hooks/use-real-time-data"

export function TopMovers() {
  const { data: commodities, loading } = useRealTimeData({
    symbols: ["GLD", "SLV", "USO", "UNG", "COPX", "PPLT"],
    refreshInterval: 300000,
  })

  if (loading && commodities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Movers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-12"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Sort by absolute change percentage
  const sortedCommodities = [...commodities].sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))

  const gainers = sortedCommodities.filter((c) => c.changePercent > 0).slice(0, 3)
  const losers = sortedCommodities.filter((c) => c.changePercent < 0).slice(0, 3)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>Top Movers</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Top Gainers */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <h4 className="font-semibold text-green-600">Top Gainers</h4>
          </div>
          <div className="space-y-2">
            {gainers.length > 0 ? (
              gainers.map((commodity) => (
                <div key={commodity.symbol} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{commodity.name}</p>
                    <p className="text-xs text-muted-foreground">{commodity.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">${commodity.price.toFixed(2)}</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      +{commodity.changePercent.toFixed(2)}%
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No gainers today</p>
            )}
          </div>
        </div>

        {/* Top Losers */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <TrendingDown className="h-4 w-4 text-red-600" />
            <h4 className="font-semibold text-red-600">Top Losers</h4>
          </div>
          <div className="space-y-2">
            {losers.length > 0 ? (
              losers.map((commodity) => (
                <div key={commodity.symbol} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{commodity.name}</p>
                    <p className="text-xs text-muted-foreground">{commodity.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">${commodity.price.toFixed(2)}</p>
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      {commodity.changePercent.toFixed(2)}%
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No losers today</p>
            )}
          </div>
        </div>

        {/* Market Summary */}
        <div className="border-t pt-4">
          <h4 className="font-semibold mb-2">Market Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Total Symbols</p>
              <p className="font-medium">{commodities.length}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Avg Change</p>
              <p
                className={`font-medium ${
                  commodities.reduce((sum, c) => sum + c.changePercent, 0) / commodities.length >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {(commodities.reduce((sum, c) => sum + c.changePercent, 0) / commodities.length || 0).toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
