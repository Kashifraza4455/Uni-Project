"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ExternalLink, Newspaper } from "lucide-react"
import { useMarketNews } from "@/hooks/use-market-news"

export function MarketNews() {
  const { news, loading } = useMarketNews({
    category: "all",
    limit: 5,
    refreshInterval: 300000,
  })

  if (loading && news.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Market News</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Newspaper className="h-5 w-5" />
          <span>Market News</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.slice(0, 5).map((article) => (
            <div key={article.id} className="border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-start justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  {article.category}
                </Badge>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </div>
              <h4 className="font-medium text-sm mb-2 line-clamp-2 hover:text-primary cursor-pointer transition-colors">
                {article.title}
              </h4>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{article.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <span>{article.source}</span>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {article.readTime}
                  </div>
                </div>
                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
