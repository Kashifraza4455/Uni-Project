import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Video } from "lucide-react"
import Image from "next/image"

const consultationOptions = [
  {
    type: "Free Consultation",
    duration: "30 minutes",
    price: "Free",
    description: "Basic investment guidance and platform overview",
    features: ["Portfolio review", "Basic recommendations", "Q&A session"],
    popular: false,
  },
  {
    type: "Premium Consultation",
    duration: "60 minutes",
    price: "$99",
    description: "Comprehensive investment strategy session",
    features: ["Detailed portfolio analysis", "Custom investment plan", "Risk assessment", "Follow-up email"],
    popular: true,
  },
]

export function ExpertConsultation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Video className="h-5 w-5" />
          <span>Expert Consultation</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">Book a one-on-one session with our commodity investment experts</p>

        <div className="space-y-4">
          {consultationOptions.map((option, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3 relative">
              {option.popular && <Badge className="absolute -top-2 left-4 bg-primary">Most Popular</Badge>}
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{option.type}</h4>
                  <p className="text-sm text-muted-foreground">{option.duration}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{option.price}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{option.description}</p>
              <ul className="text-xs space-y-1">
                {option.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant={option.popular ? "default" : "outline"}>
                <Calendar className="h-4 w-4 mr-2" />
                Book Now
              </Button>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center space-x-3">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Expert"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-medium">Dr. Sarah Johnson</p>
              <p className="text-xs text-muted-foreground">Senior Investment Advisor</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
