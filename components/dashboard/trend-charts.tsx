"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const chartData = [
  { date: "Jan", GLD: 180, SLV: 22, USO: 75, UNG: 12 },
  { date: "Feb", GLD: 185, SLV: 23, USO: 78, UNG: 13 },
  { date: "Mar", GLD: 182, SLV: 21, USO: 76, UNG: 11 },
  { date: "Apr", GLD: 188, SLV: 24, USO: 80, UNG: 14 },
  { date: "May", GLD: 186, SLV: 23, USO: 79, UNG: 13 },
  { date: "Jun", GLD: 190, SLV: 25, USO: 82, UNG: 15 },
]

export function TrendCharts() {
  const [selectedSymbol, setSelectedSymbol] = useState("GLD")
  const [chartType, setChartType] = useState<"line" | "area">("line")

  const symbols = [
    { symbol: "GLD", name: "Gold ETF", color: "#FFD700" },
    { symbol: "SLV", name: "Silver ETF", color: "#C0C0C0" },
    { symbol: "USO", name: "Oil ETF", color: "#000000" },
    { symbol: "UNG", name: "Natural Gas ETF", color: "#4169E1" },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Price Trends</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant={chartType === "line" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("line")}
            >
              Line
            </Button>
            <Button
              variant={chartType === "area" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("area")}
            >
              Area
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {symbols.map((item) => (
              <Button
                key={item.symbol}
                variant={selectedSymbol === item.symbol ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSymbol(item.symbol)}
                className="text-xs"
              >
                <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                {item.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, selectedSymbol]} />
                <Line
                  type="monotone"
                  dataKey={selectedSymbol}
                  stroke={symbols.find((s) => s.symbol === selectedSymbol)?.color || "#8884d8"}
                  strokeWidth={2}
                  dot={{ fill: symbols.find((s) => s.symbol === selectedSymbol)?.color || "#8884d8" }}
                />
              </LineChart>
            ) : (
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, selectedSymbol]} />
                <Area
                  type="monotone"
                  dataKey={selectedSymbol}
                  stroke={symbols.find((s) => s.symbol === selectedSymbol)?.color || "#8884d8"}
                  fill={symbols.find((s) => s.symbol === selectedSymbol)?.color || "#8884d8"}
                  fillOpacity={0.3}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            6-month price trend for {symbols.find((s) => s.symbol === selectedSymbol)?.name}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
