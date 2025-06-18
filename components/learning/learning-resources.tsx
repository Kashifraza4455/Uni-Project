import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Download, ExternalLink } from "lucide-react"

const resources = [
  {
    id: 1,
    title: "Commodity Market Glossary",
    type: "Guide",
    description: "Complete glossary of commodity trading terms and definitions.",
    readTime: "10 min read",
    downloadable: true,
    category: "Reference",
  },
  {
    id: 2,
    title: "Risk Management Strategies",
    type: "Article",
    description: "Essential risk management techniques for commodity investors.",
    readTime: "15 min read",
    downloadable: false,
    category: "Strategy",
  },
  {
    id: 3,
    title: "Gold Investment Calculator",
    type: "Tool",
    description: "Calculate potential returns and risks for gold investments.",
    readTime: "Interactive",
    downloadable: false,
    category: "Tools",
  },
  {
    id: 4,
    title: "Commodity Market Report 2024",
    type: "Report",
    description: "Annual comprehensive analysis of global commodity markets.",
    readTime: "45 min read",
    downloadable: true,
    category: "Research",
  },
  {
    id: 5,
    title: "Getting Started Checklist",
    type: "Checklist",
    description: "Step-by-step checklist for new commodity investors.",
    readTime: "5 min read",
    downloadable: true,
    category: "Beginner",
  },
  {
    id: 6,
    title: "Market Analysis Webinar Series",
    type: "Video",
    description: "Weekly webinars covering current market trends and analysis.",
    readTime: "60 min watch",
    downloadable: false,
    category: "Education",
  },
]

export function LearningResources() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Learning Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Badge variant="outline">{resource.type}</Badge>
                  <CardTitle className="text-lg line-clamp-1">{resource.title}</CardTitle>
                </div>
                {resource.downloadable ? (
                  <Download className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{resource.readTime}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {resource.category}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
