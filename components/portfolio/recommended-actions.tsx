import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingUp, ScalingIcon as Rebalance } from "lucide-react"

const recommendations = [
  {
    type: "rebalance",
    priority: "high",
    title: "Rebalance Portfolio",
    description: "Your gold allocation is 21% above target. Consider reducing exposure.",
    action: "Rebalance Now",
  },
  {
    type: "opportunity",
    priority: "medium",
    title: "Energy Sector Opportunity",
    description: "Natural gas prices are down 15%. Good entry point for diversification.",
    action: "View Analysis",
  },
  {
    type: "alert",
    priority: "low",
    title: "Review Silver Position",
    description: "Silver has underperformed by 6%. Monitor for potential exit strategy.",
    action: "Set Alert",
  },
]

export function RecommendedActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Rebalance className="h-5 w-5" />
          <span>Recommended Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                {rec.type === "rebalance" && <Rebalance className="h-4 w-4 text-blue-600" />}
                {rec.type === "opportunity" && <TrendingUp className="h-4 w-4 text-green-600" />}
                {rec.type === "alert" && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                <h4 className="font-medium text-sm">{rec.title}</h4>
              </div>
              <Badge
                variant={rec.priority === "high" ? "destructive" : rec.priority === "medium" ? "default" : "secondary"}
              >
                {rec.priority}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{rec.description}</p>
            <Button size="sm" variant="outline" className="w-full">
              {rec.action}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
