"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Target, PieChart, AlertTriangle, CheckCircle } from "lucide-react"

interface AdvisoryResultsProps {
  formData: {
    riskTolerance: string
    investmentPeriod: string
    budget: string
    preferredCommodities: string[]
    experience: string
    goals: string
  }
  onReset: () => void
}

export function AdvisoryResults({ formData, onReset }: AdvisoryResultsProps) {
  // Mock AI-generated recommendations based on form data
  const generateRecommendations = () => {
    const recommendations = []

    if (formData.riskTolerance === "low") {
      recommendations.push({
        commodity: "Gold",
        allocation: 40,
        expectedReturn: "5-8%",
        riskLevel: "Low",
        reason: "Safe haven asset with stable long-term growth",
      })
      recommendations.push({
        commodity: "Silver",
        allocation: 30,
        expectedReturn: "6-10%",
        riskLevel: "Low-Medium",
        reason: "Industrial demand provides steady growth potential",
      })
    } else if (formData.riskTolerance === "medium") {
      recommendations.push({
        commodity: "Crude Oil",
        allocation: 35,
        expectedReturn: "8-15%",
        riskLevel: "Medium",
        reason: "Strong demand recovery and supply constraints",
      })
      recommendations.push({
        commodity: "Copper",
        allocation: 25,
        expectedReturn: "10-18%",
        riskLevel: "Medium",
        reason: "Green energy transition driving demand",
      })
    } else {
      recommendations.push({
        commodity: "Natural Gas",
        allocation: 30,
        expectedReturn: "12-25%",
        riskLevel: "High",
        reason: "Volatile but high potential returns",
      })
      recommendations.push({
        commodity: "Platinum",
        allocation: 25,
        expectedReturn: "15-30%",
        riskLevel: "High",
        reason: "Automotive and industrial applications",
      })
    }

    return recommendations
  }

  const recommendations = generateRecommendations()
  const totalAllocation = recommendations.reduce((sum, rec) => sum + rec.allocation, 0)

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <span>Your Personalized Investment Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Based on your responses, here are our AI-powered recommendations tailored to your profile:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Risk Level</p>
              <Badge
                variant={
                  formData.riskTolerance === "low"
                    ? "secondary"
                    : formData.riskTolerance === "medium"
                      ? "default"
                      : "destructive"
                }
              >
                {formData.riskTolerance.charAt(0).toUpperCase() + formData.riskTolerance.slice(1)}
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Time Horizon</p>
              <Badge variant="outline">
                {formData.investmentPeriod.charAt(0).toUpperCase() + formData.investmentPeriod.slice(1)} Term
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Budget Range</p>
              <Badge variant="outline">
                {formData.budget === "small"
                  ? "$1K-$10K"
                  : formData.budget === "medium"
                    ? "$10K-$50K"
                    : formData.budget === "large"
                      ? "$50K-$200K"
                      : "$200K+"}
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Experience</p>
              <Badge variant="outline">
                {formData.experience.charAt(0).toUpperCase() + formData.experience.slice(1)}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Recommended Portfolio Allocation</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{rec.commodity}</span>
                  <span className="text-sm text-muted-foreground">{rec.allocation}%</span>
                </div>
                <Progress value={rec.allocation} className="h-2" />
                <p className="text-xs text-muted-foreground">{rec.reason}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Expected Returns & Risk Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{rec.commodity}</p>
                  <p className="text-sm text-muted-foreground">Expected: {rec.expectedReturn}</p>
                </div>
                <Badge
                  variant={
                    rec.riskLevel === "Low" ? "secondary" : rec.riskLevel === "Medium" ? "default" : "destructive"
                  }
                >
                  {rec.riskLevel}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Investment Strategy Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Key Strengths</span>
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Diversified across multiple commodity sectors</li>
                <li>• Aligned with your risk tolerance level</li>
                <li>• Suitable for your investment timeline</li>
                <li>• Includes your preferred commodities</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span>Important Considerations</span>
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Commodity prices can be volatile</li>
                <li>• Consider dollar-cost averaging</li>
                <li>• Monitor global economic factors</li>
                <li>• Review and rebalance quarterly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center space-x-4">
        <Button onClick={onReset} variant="outline">
          Take Quiz Again
        </Button>
        <Button>Create Portfolio</Button>
        <Button variant="outline">Download Report</Button>
      </div>
    </div>
  )
}
