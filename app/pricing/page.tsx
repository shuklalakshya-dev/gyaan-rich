import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { Check } from "lucide-react"

const pricingPlans = [
  {
    name: "Basic",
    price: "₹17,999",
    period: "/ 3 months",
    description: "Perfect for small schools getting started",
    features: [
      "Each Month One Career Counselling Session. ",
      "One Workshop On Career Guidance.",
      "One I.Q (aptitude test) For Enhancing The Students Knowledge.",
      "One Workshop On A.I &  Coding.",
      
    ],
    highlighted: false,
  },
  {
    name: "Advanced",
    price: "₹34,999",
    period: "/3 months",
    description: "Ideal for schools aiming for growth",
    features: [
      "All Basic Package Features. ",
      "One Extra  I.Q (Aptitude test). ",
      "One Any Function Recording Of Your School. ",
      "Portfolio Building For Your School.",
    
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    price: "₹59,999",
    period: "/3 months",
    description: "Ideal for those Schools who want to grow fast",
    features: [
      "All Advance Features.",
      "Your Own Campus Teachers Pre- Recording Lectures For Class 9-12 (Specific Subject Only)",
      "Custom Website Building To Increase Trust Value And Brand Value.",
      "Priority Support And Academic Growth.",
   
    ],
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHeader
        title="Simple & Transparent Pricing"
        description="Choose the perfect plan for your institute needs"
      />

      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 border-2 transition-all duration-300 ${
                  plan.highlighted
                    ? "border-accent bg-accent/5 shadow-lg scale-105"
                    : "border-border bg-card hover:border-accent"
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-accent text-accent-foreground px-4 py-1 rounded-full inline-block text-sm font-semibold mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-foreground/70 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-foreground/70 ml-2">{plan.period}</span>
                </div>
                <button
                  className={`w-full py-3 rounded-lg font-semibold mb-8 transition-colors ${
                    plan.highlighted
                      ? "bg-accent text-accent-foreground hover:opacity-90"
                      : "border-2 border-accent text-accent hover:bg-accent/10"
                  }`}
                >
                  Get Started
                </button>
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-secondary text-secondary-foreground rounded-2xl p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Have Questions About Pricing?</h2>
            <p className="text-secondary-foreground/80 mb-6">
              Contact our sales team for custom quotes and special offers for institutions.
            </p>
            <a
              href="https://forms.office.com/r/EvDTiBr8fE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
