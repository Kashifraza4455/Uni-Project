import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Settings, TrendingUp } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <h1 className="text-3xl font-bold">Market Dashboard Test</h1>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <TrendingUp className="h-3 w-3 mr-1" />
            Live Data
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Real-time commodity market overview and analysis powered by Alpha Vantage
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh All
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  )
}
