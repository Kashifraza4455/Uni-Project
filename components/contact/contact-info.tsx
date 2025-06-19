import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

const contactDetails = [
  {
    icon: MapPin,
    title: "Office Address",
    details: ["123 Financial District", "New York, NY 10004", "United States"],
  },
  {
    icon: Phone,
    title: "Phone Number",
    details: ["+923474436638"],
  },
  {
    icon: Mail,
    title: "Email Address",
    details: ["Irfan.70376@iqra.edu.pk"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Friday: 9:00 AM - 6:00 PM EST", "Saturday: 10:00 AM - 2:00 PM EST", "Sunday: Closed"],
  },
]

export function ContactInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {contactDetails.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center space-x-2">
              <item.icon className="h-4 w-4 text-primary" />
              <h4 className="font-semibold text-sm">{item.title}</h4>
            </div>
            <div className="ml-6 space-y-1">
              {item.details.map((detail, detailIndex) => (
                <p key={detailIndex} className="text-sm text-muted-foreground">
                  {detail}
                </p>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
