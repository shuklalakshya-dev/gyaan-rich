"use client"

import { BookOpen, Users, Zap, Globe } from "lucide-react"
import { useState } from "react"

const features = [
  {
    icon: BookOpen,
    title: "Expert Counselling",
    description: "Personalized sessions by certified counsellors to help students build confidence, emotional strength, and career clarity. We guide students beyond academics — shaping their mindset, motivation, and mental well-being.",
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
    <section className="relative py-12 md:py-20 lg:py-32 bg-background overflow-hidden">
      {/* Animated Background Elements - Removed animate-pulse for performance */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 md:top-20 left-5 md:left-10 w-48 md:w-72 h-48 md:h-72 bg-accent/5 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-10 md:bottom-20 right-5 md:right-10 w-64 md:w-96 h-64 md:h-96 bg-accent/10 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Why Choose GyanRich ?
          </h2>
          <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto px-4">
            Factors that set us apart in transforming education
          </p>
        </div>

        {/* Grid Container */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const isHovered = hoveredIndex === index

              return (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className={`group relative bg-card rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 border-2 border-border transition-all duration-300 cursor-pointer will-change-transform h-full ${isHovered ? "scale-[1.02] shadow-xl shadow-accent/20 border-accent/50" : "scale-100"}`}
                  >
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="mb-3 md:mb-4">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center transition-transform duration-300 will-change-transform ${isHovered ? "scale-110" : "scale-100"}`}>
                          <Icon className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent transition-transform duration-300 ${isHovered ? "rotate-6" : ""}`} />
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold mb-2 md:mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-foreground/70 text-sm sm:text-base md:text-lg">
                        {feature.description}
                      </p>
                    </div>

                    {/* Corner Accent */}
                    <div className={`absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br ${feature.gradient} opacity-20`} style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
