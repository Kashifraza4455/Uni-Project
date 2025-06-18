import { Input } from "@/components/ui/input"
import { Search, BookOpen } from "lucide-react"

export function LearningHeader() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Learn & Grow</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Learning Center</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Master commodity investing with our comprehensive courses, guides, and expert insights
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search courses and articles..." className="pl-10" />
        </div>
      </div>
    </div>
  )
}
