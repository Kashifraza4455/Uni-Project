"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react"

const portfolioData = {
  totalValue: 125750.5,
  totalGain: 8750.5,
  totalGainPercent: 7.48,
  dayChange: 1250.75,
  dayChangePercent: 1.01,
  holdings: [
    {
      symbol: "GOLD",
      name: "Gold",
      quantity: 50,
      avgPrice: 1950.0,
      currentPrice: 2045.5,
      value: 102275.0,
      gain: 4775.0,
      gainPercent: 4.89,
    },
    {
      symbol: "SILVER",
      name: "Silver",
      quantity: 200,
      avgPrice: 26.5,
      currentPrice: 24.85,
      value: 4970.0,
      gain: -330.0,
      gainPercent: -6.23,
    },
    {
      symbol: "OIL",
      name: "Crude Oil",
      quantity: 100,
      avgPrice: 75.2,
      currentPrice: 78.92,
      value: 7892.0,
      gain: 372.0,
      gainPercent: 4.95,
    },
    {
      symbol: "COPPER",
      name: "Copper",
      quantity: 500,
      avgPrice: 3.95,
      currentPrice: 3.85,
      value: 1925.0,
      gain: -50.0,
      gainPercent: -2.53,
    },
  ],
}

export function PortfolioOverview() {
  return (
    <div className="space-y-6">
      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolioData.totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gain/Loss</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${portfolioData.totalGain >= 0 ? "text-green-600" : "text-red-600"}`}>
              ${portfolioData.totalGain.toLocaleString()}
            </div>
            <p className={`text-xs ${portfolioData.totalGainPercent >= 0 ? "text-green-600" : "text-red-600"}`}>
              {portfolioData.totalGainPercent >= 0 ? "+" : ""}
              {portfolioData.totalGainPercent.toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Day Change</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${portfolioData.dayChange >= 0 ? "text-green-600" : "text-red-600"}`}>
              ${portfolioData.dayChange.toLocaleString()}
            </div>
            <p className={`text-xs ${portfolioData.dayChangePercent >= 0 ? "text-green-600" : "text-red-600"}`}>
              {portfolioData.dayChangePercent >= 0 ? "+" : ""}
              {portfolioData.dayChangePercent.toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Holdings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioData.holdings.length}</div>
            <p className="text-xs text-muted-foreground">Active positions</p>
          </CardContent>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Asset</th>
                  <th className="text-right py-2">Quantity</th>
                  <th className="text-right py-2">Avg Price</th>
                  <th className="text-right py-2">Current Price</th>
                  <th className="text-right py-2">Value</th>
                  <th className="text-right py-2">Gain/Loss</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.holdings.map((holding) => (
                  <tr key={holding.symbol} className="border-b">
                    <td className="py-3">
                      <div>
                        <div className="font-medium">{holding.name}</div>
                        <div className="text-sm text-muted-foreground">{holding.symbol}</div>
                      </div>
                    </td>
                    <td className="text-right py-3">{holding.quantity}</td>
                    <td className="text-right py-3">${holding.avgPrice.toFixed(2)}</td>
                    <td className="text-right py-3">${holding.currentPrice.toFixed(2)}</td>
                    <td className="text-right py-3">${holding.value.toLocaleString()}</td>
                    <td className="text-right py-3">
                      <div
                        className={`flex items-center justify-end space-x-1 ${holding.gain >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {holding.gain >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        <span>${Math.abs(holding.gain).toFixed(2)}</span>
                        <span>
                          ({holding.gainPercent >= 0 ? "+" : ""}
                          {holding.gainPercent.toFixed(2)}%)
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
