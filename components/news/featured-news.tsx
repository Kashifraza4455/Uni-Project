"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingUp, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMarketNews } from "@/hooks/use-market-news"
import Image from "next/image"

export function FeaturedNews() {
  const { news, loading, error, lastUpdated, refresh } = useMarketNews({
    category: "all",
    limit: 6,
    refreshInterval: 300000, // 5 minutes
  })

  const featuredArticles = news.slice(0, 2)

  if (loading && news.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Featured Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Featured Stories</h2>
        <div className="flex items-center space-x-4">
          {lastUpdated && (
            <span className="text-sm text-muted-foreground">Updated: {lastUpdated.toLocaleTimeString()}</span>
          )}
          <Button variant="outline" size="sm" onClick={refresh} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">Unable to fetch latest news: {error}. Showing cached articles.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredArticles.map((article) => (
          <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative">
              <Image
                src={article.image || "/placeholder.svg?height=200&width=400"}
                alt={article.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              {article.trending && (
                <Badge className="absolute top-3 left-3 bg-red-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Trending
                </Badge>
              )}
            </div>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-3">
                <Badge variant="secondary">{article.category}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {article.readTime}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">{new Date(article.publishedAt).toLocaleDateString()}</p>
                <p className="text-sm text-muted-foreground">{article.source}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
