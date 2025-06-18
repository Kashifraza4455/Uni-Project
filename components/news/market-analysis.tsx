import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

const marketSentiment = [
  { commodity: "Gold", sentiment: "bullish", change: "+2.3%" },
  { commodity: "Silver", sentiment: "bearish", change: "-1.8%" },
  { commodity: "Oil", sentiment: "bullish", change: "+4.1%" },
  { commodity: "Copper", sentiment: "neutral", change: "+0.2%" },
  { commodity: "Natural Gas", sentiment: "bullish", change: "+6.7%" },
]

export function MarketAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Sentiment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {marketSentiment.map((item) => (
          <div key={item.commodity} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {item.sentiment === "bullish" && <TrendingUp className="h-4 w-4 text-green-600" />}
              {item.sentiment === "bearish" && <TrendingDown className="h-4 w-4 text-red-600" />}
              {item.sentiment === "neutral" && <Minus className="h-4 w-4 text-gray-600" />}
              <span className="text-sm font-medium">{item.commodity}</span>
            </div>
            <div className="text-right">
              <span
                className={`text-sm font-medium ${
                  item.sentiment === "bullish"
                    ? "text-green-600"
                    : item.sentiment === "bearish"
                      ? "text-red-600"
                      : "text-gray-600"
                }`}
              >
                {item.change}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
