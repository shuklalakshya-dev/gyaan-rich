"use client"

import { useState } from "react"
import { MessageSquare, FileSearch, Lightbulb, Rocket, CheckCircle, ArrowRight } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Initial Consultation",
    description: "We begin with a detailed discussion to understand your needs, goals, and challenges",
    icon: MessageSquare,
    gradient: "from-blue-500/20 to-cyan-500/20",
    hoverGradient: "from-blue-500/30 to-cyan-500/30",
    details: [
      "Free consultation call",
      "Requirement analysis",
      "Goal identification",
      "Timeline discussion"
    ]
  },
  {
    id: 2,
    title: "Custom Planning",
    description: "Our experts create a tailored strategy and roadmap specifically for your institution",
    icon: FileSearch,
    gradient: "from-purple-500/20 to-pink-500/20",
    hoverGradient: "from-purple-500/30 to-pink-500/30",
    details: [
      "Customized proposal",
      "Resource allocation",
      "Budget planning",
      "Milestone setting"
    ]
  },
  {
    id: 3,
    title: "Solution Design",
    description: "We design and develop the perfect solution aligned with your educational objectives",
    icon: Lightbulb,
    gradient: "from-green-500/20 to-emerald-500/20",
    hoverGradient: "from-green-500/30 to-emerald-500/30",
    details: [
      "Solution architecture",
      "Content development",
      "Quality assurance",
      "Stakeholder feedback"
    ]
  },
  {
    id: 4,
    title: "Implementation",
    description: "Seamless deployment and integration with comprehensive training and support",
    icon: Rocket,
    gradient: "from-orange-500/20 to-yellow-500/20",
    hoverGradient: "from-orange-500/30 to-yellow-500/30",
    details: [
      "Smooth deployment",
      "Staff training",
      "System integration",
      "Performance testing"
    ]
  },
  {
    id: 5,
    title: "Ongoing Support",
    description: "Continuous support, updates, and optimization to ensure long-term success",
    icon: CheckCircle,
    gradient: "from-red-500/20 to-rose-500/20",
    hoverGradient: "from-red-500/30 to-rose-500/30",
    details: [
      "24/7 support",
      "Regular updates",
      "Performance monitoring",
      "Continuous improvement"
    ]
  }
]

export function Workflow() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden">
      {/* Background Elements - Static for better performance */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent font-semibold text-sm mb-4">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            How It Works
          </div>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Our Simple 5-Step Process
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            From initial consultation to ongoing support, we guide you every step of the way
          </p>
        </div>

        {/* Desktop Timeline View */}
        <div className="hidden lg:block relative">
          <div className="grid grid-cols-5 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = activeStep === step.id
              
              return (
                <div
                  key={step.id}
                  className="relative"
                  onMouseEnter={() => setActiveStep(step.id)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* Step Number Circle */}
                  <div className="flex justify-center mb-8">
                    <div className={`relative w-48 h-48 rounded-full bg-gradient-to-br ${step.gradient} border-4 border-background flex items-center justify-center transition-transform duration-300 will-change-transform ${
                      isActive ? "scale-105" : "scale-100"
                    }`}>
                      <div className={`w-40 h-40 rounded-full bg-card flex flex-col items-center justify-center transition-opacity duration-200 ${
                        isActive ? "bg-gradient-to-br " + step.hoverGradient : ""
                      }`}>
                        <Icon className={`w-12 h-12 text-accent mb-2 transition-transform duration-200 ${
                          isActive ? "scale-110 rotate-6" : ""
                        }`} />
                        <div className="text-3xl font-bold text-accent">{String(index + 1).padStart(2, '0')}</div>
                      </div>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className={`text-center transition-transform duration-200 ${
                    isActive ? "scale-102" : ""
                  }`}>
                    <h3 className={`text-xl font-bold mb-3 transition-colors duration-200 ${
                      isActive ? "text-accent" : ""
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details List */}
                    <div className={`mt-4 space-y-2 transition-all duration-300 ${
                      isActive ? "opacity-100 max-h-96" : "opacity-0 max-h-0 overflow-hidden"
                    }`}>
                      {step.details.map((detail, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-foreground/80"
                        >
                          <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile/Tablet Timeline View */}
        <div className="lg:hidden relative">
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = activeStep === step.id

              return (
                <div
                  key={step.id}
                  className="relative flex gap-6"
                  onMouseEnter={() => setActiveStep(step.id)}
                  onMouseLeave={() => setActiveStep(null)}
                  onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                >
                  {/* Timeline Node */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} border-4 border-background flex items-center justify-center transition-transform duration-300 will-change-transform ${
                      isActive ? "scale-110" : "scale-100"
                    }`}>
                      <Icon className={`w-8 h-8 text-accent transition-transform duration-200 ${
                        isActive ? "rotate-6" : ""
                      }`} />
                    </div>
                    
                    {/* Step Number Badge */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 pb-8">
                    <div className={`bg-card rounded-2xl p-6 border-2 border-border transition-all duration-300 will-change-transform ${
                      isActive ? "scale-[1.02] border-accent/50 shadow-xl shadow-accent/10" : ""
                    }`}>
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}></div>

                      {/* Content */}
                      <div className="relative z-10">
                        <h3 className={`text-xl md:text-2xl font-bold mb-3 transition-colors duration-200 ${
                          isActive ? "text-accent" : ""
                        }`}>
                          {step.title}
                        </h3>
                        <p className="text-foreground/70 mb-4 leading-relaxed">
                          {step.description}
                        </p>

                        {/* Details List */}
                        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 transition-all duration-300 ${
                          isActive ? "opacity-100 max-h-96 mt-4" : "opacity-0 max-h-0 overflow-hidden"
                        }`}>
                          {step.details.map((detail, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-sm text-foreground/80"
                            >
                              <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 bg-yellow-400 text-accent-foreground px-8 py-4 rounded-xl font-semibold hover:scale-[1.02] transition-transform duration-200"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="/services"
              className="inline-flex items-center gap-2 border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-xl font-semibold hover:bg-yellow-400/10 transition-colors duration-200"
            >
              View All Services
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
