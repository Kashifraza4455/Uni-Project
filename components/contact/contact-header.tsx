import { MessageSquare, Phone, Mail } from "lucide-react"

export function ContactHeader() {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center mb-4">
        <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
          <MessageSquare className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">Get in Touch</span>
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-4">Contact Our Experts</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Have questions about commodity investing? Our team of experts is here to help you make informed decisions.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-8">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Phone className="h-4 w-4" />
          <span>+1 (555) 123-4567</span>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span>support@commoditypro.com</span>
        </div>
      </div>
    </div>
  )
}
