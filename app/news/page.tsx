import { MarketNewsHeader } from "@/components/news/market-news-header"
import { FeaturedNews } from "@/components/news/featured-news"
import { NewsCategories } from "@/components/news/news-categories"
import { NewsList } from "@/components/news/news-list"
import { MarketAnalysis } from "@/components/news/market-analysis"

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <MarketNewsHeader />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        <div className="lg:col-span-3 space-y-8">
          <FeaturedNews />
          <NewsList />
        </div>
        <div className="space-y-8">
          <NewsCategories />
          <MarketAnalysis />
        </div>
      </div>
    </div>
  )
}
