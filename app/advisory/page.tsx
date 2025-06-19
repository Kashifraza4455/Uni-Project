import { AdvisoryQuestionnaire } from "@/components/advisory/advisory-questionnaire"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Target, TrendingUp } from "lucide-react"

export default function AdvisoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI Invest-Mate Advisory</h1>
          <p className="text-xl text-muted-foreground">
            Get personalized commodity investment recommendations based on your profile
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="text-center">
              <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">AI-Powered Analysis</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Advanced algorithms analyze your preferences and market conditions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Personalized Advice</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Tailored recommendations based on your risk tolerance and goals
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Growth Forecasts</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Expected returns and growth trends for recommended investments
              </p>
            </CardContent>
          </Card>
        </div>

        <AdvisoryQuestionnaire />
      </div>
    </div>
  )
}
