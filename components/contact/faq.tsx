"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, HelpCircle } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    question: "How do I get started with commodity investing?",
    answer:
      "Start by taking our AI-powered advisory questionnaire to understand your risk tolerance and investment goals. Then explore our learning center for educational resources, and consider booking a consultation with our experts.",
  },
  {
    question: "What commodities can I invest in through your platform?",
    answer:
      "We provide analysis and recommendations for major commodities including precious metals (gold, silver, platinum), energy (crude oil, natural gas), industrial metals (copper, aluminum), and agricultural products (wheat, corn, soybeans).",
  },
  {
    question: "How accurate are your AI-powered recommendations?",
    answer:
      "Our AI system analyzes historical data, market trends, and economic indicators to provide recommendations. While we strive for accuracy, all investments carry risk and past performance doesn't guarantee future results.",
  },
  {
    question: "Do you offer real-time market data?",
    answer:
      "Yes, our dashboard provides real-time commodity prices, market trends, and news updates. Premium subscribers get access to advanced charting tools and detailed market analysis.",
  },
  {
    question: "What are your consultation fees?",
    answer:
      "We offer free 30-minute consultations for basic guidance. Premium 60-minute sessions with detailed analysis are available for $99. Group sessions and ongoing advisory services have different pricing structures.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel your subscription anytime through your account settings or by contacting our support team. There are no cancellation fees, and you'll retain access until the end of your billing period.",
  },
]

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <HelpCircle className="h-5 w-5" />
          <span>Frequently Asked Questions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqs.map((faq, index) => (
          <Collapsible key={index} open={openItems.includes(index)} onOpenChange={() => toggleItem(index)}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left border rounded-lg hover:bg-muted/50 transition-colors">
              <span className="font-medium text-sm">{faq.question}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${openItems.includes(index) ? "rotate-180" : ""}`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 pb-3">
              <p className="text-sm text-muted-foreground mt-2">{faq.answer}</p>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  )
}
