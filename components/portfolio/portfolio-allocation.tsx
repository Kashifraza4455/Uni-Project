"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PieChart } from "lucide-react"

const allocationData = [
  { name: "Gold", value: 81.3, color: "bg-yellow-500" },
  { name: "Crude Oil", value: 6.3, color: "bg-black" },
  { name: "Silver", value: 4.0, color: "bg-gray-400" },
  { name: "Copper", value: 1.5, color: "bg-orange-600" },
  { name: "Cash", value: 6.9, color: "bg-green-500" },
]

const targetAllocation = [
  { name: "Precious Metals", target: 60, current: 85.3 },
  { name: "Energy", target: 25, current: 6.3 },
  { name: "Industrial Metals", target: 10, current: 1.5 },
  { name: "Cash", target: 5, current: 6.9 },
]

export function PortfolioAllocation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <PieChart className="h-5 w-5" />
          <span>Portfolio Allocation</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Allocation */}
        <div>
          <h4 className="font-semibold mb-3">Current Holdings</h4>
          <div className="space-y-3">
            {allocationData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.value.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Target vs Current */}
        <div>
          <h4 className="font-semibold mb-3">Target vs Current</h4>
          <div className="space-y-4">
            {targetAllocation.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>
                    {item.current.toFixed(1)}% / {item.target}%
                  </span>
                </div>
                <div className="space-y-1">
                  <Progress value={item.current} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Current: {item.current.toFixed(1)}%</span>
                    <span>Target: {item.target}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
