import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MarketOverview } from "@/components/dashboard/market-overview"
import { TrendCharts } from "@/components/dashboard/trend-charts"
import { TopMovers } from "@/components/dashboard/top-movers"
import { MarketNews } from "@/components/dashboard/market-news"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          <MarketOverview />
          <TrendCharts />
        </div>
        <div className="space-y-8">
          <TopMovers />
          <MarketNews />
        </div>
      </div>
    </div>
  )
}
