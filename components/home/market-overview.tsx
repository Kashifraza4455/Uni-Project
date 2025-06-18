"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, RefreshCw, AlertCircle, Wifi, WifiOff } from "lucide-react"
import { useRealTimeData } from "@/hooks/use-real-time-data"

export function MarketOverview() {
  const {
    data: commodities,
    loading,
    error,
    lastUpdated,
    refresh,
  } = useRealTimeData({
    symbols: ["GLD", "SLV", "USO", "UNG", "COPX", "PPLT"],
    refreshInterval: 60000, // 1 minute
  })

  // Determine if we're using live or fallback data
  const isLiveData = commodities.length > 0 && !error
  const dataSource = isLiveData ? "Live Data" : "Demo Data"

  if (loading && commodities.length === 0) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Live Market Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold">Live Market Overview</h2>
            <p className="text-muted-foreground mt-2">
              {isLiveData
                ? "Real-time commodity ETF prices powered by Yahoo Finance"
                : "Demo commodity ETF data with realistic market simulation"}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge
              variant="outline"
              className={`${
                isLiveData ? "bg-green-50 text-green-700 border-green-200" : "bg-blue-50 text-blue-700 border-blue-200"
              }`}
            >
              {isLiveData ? <Wifi className="h-3 w-3 mr-1" /> : <WifiOff className="h-3 w-3 mr-1" />}
              {dataSource}
            </Badge>
            {lastUpdated && (
              <span className="text-sm text-muted-foreground">Updated: {lastUpdated.toLocaleTimeString()}</span>
            )}
            <Button variant="outline" size="sm" onClick={refresh} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {!isLiveData && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-blue-800 font-medium">Demo Mode Active</p>
              <p className="text-blue-700 text-sm mt-1">
                Currently showing simulated market data with realistic price movements. This demonstrates the platform's
                capabilities while API access is being configured.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commodities.map((commodity) => (
            <Card key={commodity.symbol} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{commodity.name}</div>
                    <div className="text-sm font-normal text-muted-foreground">{commodity.symbol}</div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge variant="secondary" className="text-xs">
                      ETF
                    </Badge>
                    <Badge variant={commodity.marketState === "REGULAR" ? "default" : "outline"} className="text-xs">
                      {commodity.marketState}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-2xl font-bold">
                      {commodity.currency === "USD" ? "$" : ""}
                      {commodity.price.toFixed(2)}
                    </p>
                    <div
                      className={`flex items-center space-x-1 ${
                        commodity.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {commodity.change >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span className="text-sm font-medium">
                        {commodity.change >= 0 ? "+" : ""}
                        {commodity.change.toFixed(2)} ({commodity.changePercent >= 0 ? "+" : ""}
                        {commodity.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">High</p>
                      <p className="font-medium">${commodity.high.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Low</p>
                      <p className="font-medium">${commodity.low.toFixed(2)}</p>
                    </div>
                  </div>

                  {commodity.volume > 0 && (
                    <div className="text-sm">
                      <p className="text-muted-foreground">Volume</p>
                      <p className="font-medium">{commodity.volume.toLocaleString()}</p>
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground">
                    Last updated: {new Date(commodity.lastUpdated).toLocaleTimeString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {isLiveData
              ? "Data provided by Yahoo Finance RapidAPI. ETF prices represent underlying commodity exposure."
              : "Demo data simulates real market conditions. ETF prices represent underlying commodity exposure."}
            <br />
            {isLiveData
              ? "Real-time updates every minute during market hours."
              : "Data updates with realistic variations."}
          </p>
        </div>
      </div>
    </section>
  )
}
