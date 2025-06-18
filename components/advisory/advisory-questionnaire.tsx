"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { AdvisoryResults } from "./advisory-results"

interface QuestionnaireData {
  riskTolerance: string
  investmentPeriod: string
  budget: string
  preferredCommodities: string[]
  experience: string
  goals: string
}

export function AdvisoryQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<QuestionnaireData>({
    riskTolerance: "",
    investmentPeriod: "",
    budget: "",
    preferredCommodities: [],
    experience: "",
    goals: "",
  })
  const [showResults, setShowResults] = useState(false)

  const totalSteps = 6

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCommodityChange = (commodity: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        preferredCommodities: [...prev.preferredCommodities, commodity],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        preferredCommodities: prev.preferredCommodities.filter((c) => c !== commodity),
      }))
    }
  }

  if (showResults) {
    return <AdvisoryResults formData={formData} onReset={() => setShowResults(false)} />
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Investment Advisory Questionnaire
          <span className="text-sm font-normal text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </span>
        </CardTitle>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">What is your risk tolerance level?</Label>
            <RadioGroup
              value={formData.riskTolerance}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, riskTolerance: value }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="risk-low" />
                <Label htmlFor="risk-low">Low - I prefer stable, low-risk investments</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="risk-medium" />
                <Label htmlFor="risk-medium">Medium - I can accept moderate risk for better returns</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="risk-high" />
                <Label htmlFor="risk-high">High - I'm comfortable with high-risk, high-reward investments</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">What is your investment time horizon?</Label>
            <RadioGroup
              value={formData.investmentPeriod}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, investmentPeriod: value }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="short" id="period-short" />
                <Label htmlFor="period-short">Short Term (Less than 1 year)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="period-medium" />
                <Label htmlFor="period-medium">Medium Term (1-5 years)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="long" id="period-long" />
                <Label htmlFor="period-long">Long Term (5+ years)</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">What is your investment budget?</Label>
            <RadioGroup
              value={formData.budget}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="budget-small" />
                <Label htmlFor="budget-small">$1,000 - $10,000</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="budget-medium" />
                <Label htmlFor="budget-medium">$10,000 - $50,000</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="budget-large" />
                <Label htmlFor="budget-large">$50,000 - $200,000</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="xlarge" id="budget-xlarge" />
                <Label htmlFor="budget-xlarge">$200,000+</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Which commodities interest you? (Select all that apply)</Label>
            <div className="grid grid-cols-2 gap-4">
              {["Gold", "Silver", "Crude Oil", "Natural Gas", "Copper", "Platinum", "Palladium", "Agricultural"].map(
                (commodity) => (
                  <div key={commodity} className="flex items-center space-x-2">
                    <Checkbox
                      id={commodity}
                      checked={formData.preferredCommodities.includes(commodity)}
                      onCheckedChange={(checked) => handleCommodityChange(commodity, checked as boolean)}
                    />
                    <Label htmlFor={commodity}>{commodity}</Label>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">What is your investment experience level?</Label>
            <RadioGroup
              value={formData.experience}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, experience: value }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="beginner" id="exp-beginner" />
                <Label htmlFor="exp-beginner">Beginner - New to commodity investing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intermediate" id="exp-intermediate" />
                <Label htmlFor="exp-intermediate">Intermediate - Some experience with investments</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="advanced" id="exp-advanced" />
                <Label htmlFor="exp-advanced">Advanced - Experienced commodity trader</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">What are your primary investment goals?</Label>
            <RadioGroup
              value={formData.goals}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, goals: value }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="wealth-preservation" id="goal-preservation" />
                <Label htmlFor="goal-preservation">Wealth Preservation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="steady-income" id="goal-income" />
                <Label htmlFor="goal-income">Steady Income Generation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="capital-growth" id="goal-growth" />
                <Label htmlFor="goal-growth">Capital Growth</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="diversification" id="goal-diversification" />
                <Label htmlFor="goal-diversification">Portfolio Diversification</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
            Previous
          </Button>
          <Button onClick={handleNext}>{currentStep === totalSteps ? "Get Recommendations" : "Next"}</Button>
        </div>
      </CardContent>
    </Card>
  )
}
