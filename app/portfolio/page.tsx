import { PortfolioOverview } from "@/components/portfolio/portfolio-overview"
import { PortfolioAllocation } from "@/components/portfolio/portfolio-allocation"
import { PortfolioPerformance } from "@/components/portfolio/portfolio-performance"
import { RecommendedActions } from "@/components/portfolio/recommended-actions"

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Your Portfolio</h1>
        <p className="text-xl text-muted-foreground">
          Track your commodity investments and get personalized recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PortfolioOverview />
          <PortfolioPerformance />
        </div>
        <div className="space-y-8">
          <PortfolioAllocation />
          <RecommendedActions />
        </div>
      </div>
    </div>
  )
}
