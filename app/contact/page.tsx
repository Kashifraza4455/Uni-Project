import { ContactHeader } from "@/components/contact/contact-header"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { FAQ } from "@/components/contact/faq"
import { ExpertConsultation } from "@/components/contact/expert-consultation"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ContactHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          <ContactForm />
          <FAQ />
        </div>
        <div className="space-y-8">
          <ContactInfo />
          <ExpertConsultation />
        </div>
      </div>
    </div>
  )
}
