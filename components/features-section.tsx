"use client"

import { BookOpen, Users, Zap, Globe } from "lucide-react"
import { useState } from "react"

const features = [
  {
    icon: BookOpen,
    title: "Expert Counselling",
    description: "PPersonalized sessions by certified counsellors to help students build confidence, emotional strength, and career clarity. We guide students beyond academics — shaping their mindset, motivation, and mental well-being.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    hoverGradient: "from-blue-500/30 to-cyan-500/30",
  },
  {
    icon: Users,
    title: "Interactive Lectures",
    description: "Engaging, easy-to-understand video lessons designed by expert educators. Each lecture helps students learn faster with visuals, real-life examples, and interactive explanations — making learning simple, smart, and fun.",
    gradient: "from-purple-500/20 to-pink-500/20",
    hoverGradient: "from-purple-500/30 to-pink-500/30",
  },
  {
    icon: Globe,
    title: "Custom Websites",
    description: "A personalized, mobile-friendly website built to showcase your school’s strengths, connect with parents, and attract new admissions.  We handle everything — from design to hosting — so your school can shine online effortlessly.",
    gradient: "from-green-500/20 to-emerald-500/20",
    hoverGradient: "from-green-500/30 to-emerald-500/30",
  },
  {
    icon: Zap,
    title: "Future-Ready Vision",
    description: "In a rapidly changing education system, we equip schools with the tools, technology, and training needed to stay ahead.",
    gradient: "from-orange-500/20 to-yellow-500/20",
    hoverGradient: "from-orange-500/30 to-yellow-500/30",
  },
]

export function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden">
      {/* Animated Background Elements - Removed animate-pulse for performance */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Why Choose GyaanRich ?
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Factors that set us apart in transforming education
          </p>
        </div>

        {/* Roadmap Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent/50 via-accent to-accent/50 transform -translate-x-1/2"></div>
          
          {/* Vertical Line - Mobile */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/50 via-accent to-accent/50"></div>

          <div className="space-y-12 lg:space-y-20">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const isHovered = hoveredIndex === index
              const isEven = index % 2 === 0

              return (
                <div
                  key={index}
                  className={`relative flex items-center ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} flex-row gap-8`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 lg:left-1/2 transform lg:-translate-x-1/2 z-20">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.gradient} border-4 border-background flex items-center justify-center transition-transform duration-300 will-change-transform ${isHovered ? "scale-110" : "scale-100"}`}>
                      <Icon className={`w-8 h-8 text-accent transition-transform duration-300 ${isHovered ? "rotate-6" : ""}`} />
                    </div>
                    
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 ${isEven ? "lg:pr-12 lg:text-right" : "lg:pl-12 lg:text-left"} pl-24 lg:pl-0 text-left`}>
                    <div
                      className={`group relative bg-card rounded-2xl p-8 border-2 border-border transition-all duration-300 cursor-pointer will-change-transform ${isHovered ? "scale-[1.02] shadow-xl shadow-accent/10 border-accent/50" : "scale-100"}`}
                    >
                      {/* Gradient Background */}
                      <div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
                      ></div>

                      {/* Content */}
                      <div className="relative z-10">
                        <h3 className={`text-2xl font-bold mb-3 transition-colors duration-200 ${isHovered ? "text-accent" : ""}`}>
                          {feature.title}
                        </h3>
                        <p className={`text-foreground/70 text-lg transition-colors duration-200 ${isHovered ? "text-foreground/90" : ""}`}>
                          {feature.description}
                        </p>
                      </div>

                      {/* Simplified Corner Accent - No animation */}
                      <div className={`absolute top-0 ${isEven ? "lg:right-0" : "lg:left-0"} right-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} opacity-20`} style={{ clipPath: isEven ? "polygon(100% 0, 0 0, 100% 100%)" : "polygon(0 0, 100% 0, 0 100%)" }}></div>
                    </div>
                  </div>

                  {/* Spacer for alternating layout on desktop */}
                  <div className="hidden lg:block flex-1"></div>
                </div>
              )
            })}
          </div>

          {/* End Cap */}
          <div className="mt-12 flex justify-center">
            <div className="w-4 h-4 rounded-full bg-accent shadow-lg shadow-accent/50"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
