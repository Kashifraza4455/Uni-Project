import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ExternalLink } from "lucide-react"

const newsArticles = [
  {
    id: 1,
    title: "Copper Demand Rises as Green Energy Projects Accelerate",
    excerpt:
      "Industrial copper consumption expected to increase by 15% as renewable energy infrastructure projects gain momentum worldwide.",
    category: "Industrial Metals",
    source: "Commodity Weekly",
    publishedAt: "6 hours ago",
    readTime: "4 min read",
  },
  {
    id: 2,
    title: "Silver Market Outlook: Industrial Applications Drive Growth",
    excerpt:
      "Silver prices show potential for recovery as industrial demand, particularly in solar panels and electronics, continues to expand.",
    category: "Precious Metals",
    source: "Metal Markets Today",
    publishedAt: "8 hours ago",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "Natural Gas Futures Volatile Amid Weather Forecasts",
    excerpt: "Natural gas prices fluctuate as seasonal weather patterns and storage levels impact market sentiment.",
    category: "Energy",
    source: "Energy Insider",
    publishedAt: "12 hours ago",
    readTime: "3 min read",
  },
  {
    id: 4,
    title: "Agricultural Commodities: Wheat Prices Stabilize After Recent Volatility",
    excerpt:
      "Global wheat markets show signs of stabilization following recent supply chain disruptions and weather-related concerns.",
    category: "Agricultural",
    source: "Agri Markets",
    publishedAt: "1 day ago",
    readTime: "5 min read",
  },
  {
    id: 5,
    title: "Federal Reserve Policy Impact on Commodity Markets",
    excerpt:
      "Analysis of how recent Federal Reserve decisions are affecting commodity prices and investor sentiment across various sectors.",
    category: "Market Analysis",
    source: "Financial Times",
    publishedAt: "1 day ago",
    readTime: "8 min read",
  },
]

export function NewsList() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Latest News</h2>
      <div className="space-y-4">
        {newsArticles.map((article) => (
          <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="outline">{article.category}</Badge>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">{article.title}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">{article.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <span>{article.source}</span>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {article.readTime}
                  </div>
                </div>
                <span>{article.publishedAt}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
