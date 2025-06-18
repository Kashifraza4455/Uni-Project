import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"

export function MarketNewsHeader() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-4">Market News & Analysis</h1>
        <p className="text-xl text-muted-foreground">
          Stay updated with the latest commodity market news and expert insights
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search news articles..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
    </div>
  )
}
