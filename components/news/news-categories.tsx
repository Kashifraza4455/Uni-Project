import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Newspaper } from "lucide-react"

const categories = [
  { name: "Precious Metals", count: 24, active: true },
  { name: "Energy", count: 18, active: false },
  { name: "Industrial Metals", count: 12, active: false },
  { name: "Agricultural", count: 15, active: false },
  { name: "Market Analysis", count: 31, active: false },
  { name: "Economic Reports", count: 8, active: false },
]

export function NewsCategories() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Newspaper className="h-5 w-5" />
          <span>Categories</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
              category.active ? "bg-primary/10 text-primary" : "hover:bg-muted"
            }`}
          >
            <span className="text-sm font-medium">{category.name}</span>
            <Badge variant="secondary" className="text-xs">
              {category.count}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
