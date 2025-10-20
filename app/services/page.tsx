import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { CheckCircle2, Award, Users, Lightbulb } from "lucide-react"

const services = [
  {
    id: 1,
    title: "Educational Counselling",
    icon: Users,
    description: "Expert guidance for students and parents",
    features: [
      "Career path planning",
      "College selection assistance",
      "Entrance exam preparation",
      "Personalized mentoring",
      "Skill development programs",
    ],
    benefits: [
      "One-on-one counselling sessions",
      "Comprehensive career assessments",
      "Access to industry experts",
      "Flexible scheduling",
    ],
  },
  {
    id: 2,
    title: "Interactive Lectures",
    icon: Lightbulb,
    description: "Engaging educational content delivered by experts",
    features: [
      "Live interactive sessions",
      "Recorded lectures on demand",
      "Subject matter experts",
      "Q&A sessions",
      "Study materials included",
    ],
    benefits: [
      "Learn at your own pace",
      "Access to expert knowledge",
      "Interactive learning experience",
      "Lifetime access to recordings",
    ],
  },
  {
    id: 3,
    title: "Custom School Websites",
    icon: Award,
    description: "Professional websites tailored for educational institutions",
    features: [
      "Responsive design",
      "Student portal",
      "Online admission system",
      "Event management",
      "News and updates section",
    ],
    benefits: [
      "Modern, professional appearance",
      "Improved student engagement",
      "Streamlined administration",
      "Enhanced online presence",
    ],
  },
  {
    id: 4,
    title: "Consulting Services",
    icon: CheckCircle2,
    description: "Strategic guidance for educational institutions",
    features: [
      "Curriculum development",
      "Technology integration",
      "Staff training programs",
      "Quality assurance",
      "Performance analytics",
    ],
    benefits: [
      "Improved institutional performance",
      "Modern teaching methodologies",
      "Data-driven decision making",
      "Competitive advantage",
    ],
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHeader
        title="Our Services"
        description="Comprehensive solutions designed to transform educational experiences and empower institutions"
      />

      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon
              const isEven = index % 2 === 0

              return (
                <div key={service.id} className="grid md:grid-cols-2 gap-12 items-center">
                  <div className={isEven ? "order-1" : "order-2"}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                      <h2 className="text-3xl font-bold">{service.title}</h2>
                    </div>
                    <p className="text-lg text-foreground/70 mb-8">{service.description}</p>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Key Features</h3>
                        <ul className="space-y-2">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className={isEven ? "order-2" : "order-1"}>
                    <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-8 border border-accent/20">
                      <h3 className="font-semibold text-lg mb-4">Benefits</h3>
                      <ul className="space-y-4">
                        {service.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-secondary text-secondary-foreground py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Institution?</h2>
          <p className="text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Get in touch with our team to discuss how Gyaan Rich can help you achieve your educational goals.
          </p>
          <a
            href="/contact"
            className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Contact Us Today
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
