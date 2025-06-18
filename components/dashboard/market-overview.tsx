"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react"
import { useRealTimeData } from "@/hooks/use-real-time-data"

export function MarketOverview() {
  const { data: commodities, loading } = useRealTimeData({
    symbols: ["GLD", "SLV", "USO", "UNG"],
    refreshInterval: 300000,
  })

  if (loading && commodities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Calculate market summary
  const totalValue = commodities.reduce((sum, commodity) => sum + commodity.price, 0)
  const gainers = commodities.filter((c) => c.change > 0).length
  const losers = commodities.filter((c) => c.change < 0).length
  const avgChange = commodities.reduce((sum, c) => sum + c.changePercent, 0) / commodities.length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>Market Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">${totalValue.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">Total Index Value</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{gainers}</div>
            <p className="text-xs text-muted-foreground">Gainers</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600">{losers}</div>
            <p className="text-xs text-muted-foreground">Losers</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className={`text-2xl font-bold ${avgChange >= 0 ? "text-green-600" : "text-red-600"}`}>
              {avgChange >= 0 ? "+" : ""}
              {avgChange.toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground">Avg Change</p>
          </div>
        </div>

        <div className="space-y-3">
          {commodities.slice(0, 4).map((commodity) => (
            <div key={commodity.symbol} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div>
                  <p className="font-medium">{commodity.name}</p>
                  <p className="text-sm text-muted-foreground">{commodity.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${commodity.price.toFixed(2)}</p>
                <div
                  className={`flex items-center space-x-1 ${commodity.change >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {commodity.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  <span className="text-sm">
                    {commodity.changePercent >= 0 ? "+" : ""}
                    {commodity.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
