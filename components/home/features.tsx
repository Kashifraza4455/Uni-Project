import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, TrendingUp, Shield, BookOpen, Bell, PieChart } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Advisory",
    description: "Get personalized investment recommendations based on your risk profile and goals.",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Market Data",
    description: "Access live commodity prices, trends, and market analysis updated in real-time.",
  },
  {
    icon: PieChart,
    title: "Portfolio Management",
    description: "Build and track diversified commodity portfolios with expert guidance.",
  },
  {
    icon: Shield,
    title: "Risk Analysis",
    description: "Comprehensive risk assessment and management strategies for your investments.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Receive notifications for price movements and market opportunities.",
  },
  {
    icon: BookOpen,
    title: "Learning Center",
    description: "Educational resources and guides to improve your commodity trading knowledge.",
  },
]

export function Features() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to make informed commodity investment decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
