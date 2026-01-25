"use client"

import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { CheckCircle2, Award, Users, Lightbulb, BookOpen, Globe, Zap, Target } from "lucide-react"
import { useState } from "react"

const services = [
  {
    id: 1,
    title: "Expert Counseling Sessions",
    icon: Users,
    description: "Expert guidance for students and parents to navigate the complex educational landscape",
    features: [
      "Personalized Career Guidance based on interests, strengths & future goals",
      "Certified & Experienced Counselors guiding students with proven methods",
      "Emotional Wellness Support to reduce stress, anxiety & academic pressure",
      "Mindset & Confidence Building Programs designed for students of all age groups",
      "Goal-Oriented Roadmaps for academic, personal & competitive exam growth",
    ],
    benefits: [
      "One-on-one Counseling Sessions",
      "Comprehensive Career Assessments",
      "Access to Industry Experts",
      "Parent Counseling Support to help create a positive and supportive environment",
    ],
    gradient: "from-blue-500/20 to-cyan-500/20",
    hoverGradient: "from-blue-500/30 to-cyan-500/30",
    stats: { value: "500+", label: "Students Counseled" },
  },
  {
    id: 2,
    title: "Pre-Recorded Video Lectures",
    icon: Lightbulb,
    description: "Engaging educational content delivered by industry experts and experienced educators",
    features: [
      "Recorded Lectures For Class 9 to 12 across various subjects",
      "High Quality Recorded Lectures On Demand",
      "Specific Subject Matter Experts",
      "Q & A Sessions",
      "Study Materials Included",
    ],
    benefits: [
      "Learn At Your Own Pace",
      "Access to Expert Knowledge",
      "Interactive Learning Experience",
      "Lifetime Access to Recordings",
    ],
    gradient: "from-purple-500/20 to-pink-500/20",
    hoverGradient: "from-purple-500/30 to-pink-500/30",
    stats: { value: "300+", label: "Hours of Content" },
  },
  {
    id: 3,
    title: "Custom School Websites",
    icon: Globe,
    description: "Professional, responsive websites tailored specifically for educational institutions",
    features: [
      "Responsive Design",
      "One Year Free Hosting & Maintenance",
      "Online Presence With SEO Optimization",
      "School Portfolio Showcase",
      "News And Updates Section",
    ],
    benefits: [
      "Modern, professional appearance",
      "Improved student engagement",
      "Streamlined administration",
      "Enhanced online presence",
    ],
    gradient: "from-green-500/20 to-emerald-500/20",
    hoverGradient: "from-green-500/30 to-emerald-500/30",
    stats: { value: "10+", label: "Websites Delivered" },
  },
  {
    id: 4,
    title: "Extra Consulting Services",
    icon: Target,
    description: "Strategic guidance and implementation support for educational institutions",
    features: [
      "Curriculum Development",
      "Technology Integration",
      "Staff Training Programs",
      "Quality Assurance",
      "Performance Analytics",
    ],
    benefits: [
      "Improved Institutional Performance",
      "Modern Teaching Methodologies",
      "Data-Driven Decision Making",
      "Competitive Advantage in Education Sector",
    ],
    gradient: "from-orange-500/20 to-yellow-500/20",
    hoverGradient: "from-orange-500/30 to-yellow-500/30",
    stats: { value: "10+", label: "Institutions Served" },
  },
]

export default function ServicesPage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHeader
        title="Our Core Services"
        description="Comprehensive solutions designed to transform educational experiences and empower institutions"
      />

      {/* Services Overview Stats */}
      <section className="py-12 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.id} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{service.stats.value}</div>
                <div className="text-sm text-foreground/70">{service.stats.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => {
              const Icon = service.icon
              const isEven = index % 2 === 0
              const isHovered = hoveredService === service.id

              return (
                <div 
                  key={service.id} 
                  className="grid md:grid-cols-2 gap-12 items-center"
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  {/* Service Icon & Title */}
                  <div className={isEven ? "order-1" : "order-2"}>
                    <div className="relative">
                      {/* Animated Icon Container */}
                      <div className={`flex items-center gap-4 mb-6 transition-all duration-500 ${isHovered ? "scale-105" : ""}`}>
                        <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center transition-all duration-500 ${isHovered ? "rotate-6 shadow-2xl shadow-accent/30" : ""}`}>
                          <Icon className={`w-10 h-10 text-accent transition-all duration-500 ${isHovered ? "scale-110" : ""}`} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-accent mb-1">Service {String(index + 1).padStart(2, '0')}</div>
                          <h2 className={`text-3xl md:text-4xl font-bold transition-all duration-300 ${isHovered ? "text-accent" : ""}`}>
                            {service.title}
                          </h2>
                        </div>
                      </div>

                      <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-accent" />
                            Key Features
                          </h3>
                          <ul className="space-y-3">
                            {service.features.map((feature, i) => (
                              <li 
                                key={i} 
                                className="flex items-center gap-3 group"
                                style={{ animationDelay: `${i * 50}ms` }}
                              >
                                <div className={`transition-all duration-300 ${isHovered ? "scale-125" : ""}`}>
                                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                                </div>
                                <span className={`transition-all duration-300 ${isHovered ? "translate-x-2" : ""}`}>
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Benefits Card */}
                  <div className={isEven ? "order-2" : "order-1"}>
                    <div 
                      className={`relative bg-card rounded-3xl p-8 md:p-10 border-2 border-border transition-all duration-500 ${
                        isHovered 
                          ? "scale-105 border-accent/50 shadow-2xl shadow-accent/20" 
                          : "scale-100"
                      }`}
                    >
                      {/* Gradient Background */}
                      <div
                        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.hoverGradient} transition-all duration-500 ${
                          isHovered ? "opacity-100" : "opacity-0"
                        }`}
                      ></div>

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-6">
                          <Award className="w-6 h-6 text-accent" />
                          <h3 className="font-semibold text-2xl">Why Choose This?</h3>
                        </div>
                        <ul className="space-y-4">
                          {service.benefits.map((benefit, i) => (
                            <li 
                              key={i} 
                              className="flex items-start gap-3 group"
                              style={{ animationDelay: `${i * 50}ms` }}
                            >
                              <div className={`w-6 h-6 bg-gradient-to-br ${service.gradient} rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0 transition-all duration-300 ${
                                isHovered ? "scale-110 rotate-12" : ""
                              }`}>
                                <div className="w-2 h-2 bg-accent rounded-full"></div>
                              </div>
                              <span className="text-foreground/80 leading-relaxed">{benefit}</span>
                            </li>
                          ))}
                        </ul>

                        {/* CTA Button */}
                        <div className="mt-8 pt-6 border-t border-border/50">
                          <a
                            href="https://forms.office.com/r/EvDTiBr8fE"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                              isHovered
                                ? "bg-accent text-accent-foreground shadow-lg shadow-accent/30 scale-105"
                                : "bg-accent/10 text-accent"
                            }`}
                          >
                            Get Started
                            <Zap className="w-4 h-4" />
                          </a>
                        </div>
                      </div>

                      {/* Shine Effect */}
                      <div className="absolute inset-0 rounded-3xl overflow-hidden">
                        <div className={`absolute inset-0 transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 ${
                          isHovered ? "translate-x-[100%]" : "translate-x-[-100%]"
                        }`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-secondary to-secondary/90 text-secondary-foreground py-16 md:py-24 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-2xl mb-6 animate-bounce">
            <BookOpen className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Institution?</h2>
          <p className="text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get in touch with our team to discuss how Gyan Rich can help you achieve your educational goals and create lasting impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://forms.office.com/r/EvDTiBr8fE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-xl font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300"
            >
              Contact Us Today
              <Zap className="w-5 h-5" />
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 border-2 border-accent text-accent px-8 py-4 rounded-xl font-semibold hover:bg-accent/10 transition-all duration-300"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
