import { Hero } from "@/components/home/hero"
import { Features } from "@/components/home/features"
import { MarketOverview } from "@/components/home/market-overview"
import { Testimonials } from "@/components/home/testimonials"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <MarketOverview />
      <Features />
      <Testimonials />
    </div>
  )
}
