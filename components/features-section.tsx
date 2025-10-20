import { BookOpen, Users, Zap, Globe } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Expert Counselling",
    description: "Personalized guidance from experienced educational counsellors",
  },
  {
    icon: Users,
    title: "Interactive Lectures",
    description: "Engaging live and recorded lectures by industry experts",
  },
  {
    icon: Globe,
    title: "Custom Websites",
    description: "Professional school websites tailored to your needs",
  },
  {
    icon: Zap,
    title: "Fast Implementation",
    description: "Quick deployment and seamless integration",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Gyaan Rich?</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            We combine expertise, innovation, and dedication to deliver exceptional educational solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border border-border hover:border-accent hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
