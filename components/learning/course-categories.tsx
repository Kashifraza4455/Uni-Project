import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen } from "lucide-react"

const categories = [
  { name: "Beginner Basics", count: 8, active: true },
  { name: "Technical Analysis", count: 12, active: false },
  { name: "Risk Management", count: 6, active: false },
  { name: "Portfolio Strategy", count: 9, active: false },
  { name: "Market Psychology", count: 4, active: false },
  { name: "Advanced Trading", count: 7, active: false },
]

export function CourseCategories() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5" />
          <span>Course Categories</span>
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
