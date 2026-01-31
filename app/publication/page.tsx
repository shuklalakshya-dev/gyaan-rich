"use client"

import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { 
  CheckCircle2, 
  BookOpen, 
  FileEdit, 
  Search, 
  LayoutGrid, 
  Award, 
  Users, 
  Clock, 
  Shield,
  Sparkles,
  Target,
  Zap
} from "lucide-react"
import { useState } from "react"

const services = [
  {
    id: 1,
    title: "Book Editing",
    icon: FileEdit,
    description: "Professional editing services to refine your manuscript and bring your vision to life with clarity and precision",
    features: [
      "Developmental Editing for structure, plot, and content flow",
      "Line Editing for sentence-level improvements and readability",
      "Copy Editing for grammar, punctuation, and consistency",
      "Manuscript Assessment and feedback reports",
      "Multiple revision rounds with author collaboration",
    ],
    benefits: [
      "Enhanced readability and flow",
      "Professional publication-ready content",
      "Consistent style throughout",
      "Expert feedback and suggestions",
    ],
    gradient: "from-blue-500/20 to-indigo-500/20",
    hoverGradient: "from-blue-500/30 to-indigo-500/30",
    stats: { value: "500+", label: "Books Edited" },
  },
  {
    id: 2,
    title: "Proofreading",
    icon: Search,
    description: "Meticulous proofreading to catch every error and ensure your publication is polished and error-free",
    features: [
      "Spelling and Grammar Corrections",
      "Punctuation and Formatting Review",
      "Consistency Checks for terminology and style",
      "Cross-Reference Verification",
      "Final Quality Assurance before publication",
    ],
    benefits: [
      "Error-free publications",
      "Professional credibility",
      "Consistent formatting",
      "Ready for print or digital release",
    ],
    gradient: "from-green-500/20 to-emerald-500/20",
    hoverGradient: "from-green-500/30 to-emerald-500/30",
    stats: { value: "1000+", label: "Pages Proofread" },
  },
  {
    id: 3,
    title: "Quality Analysis",
    icon: Award,
    description: "Comprehensive quality analysis to ensure your publication meets the highest industry standards",
    features: [
      "Content Accuracy Verification",
      "Style Guide Compliance Checks",
      "Image and Graphics Quality Review",
      "ISBN and Metadata Validation",
      "Print and Digital Format Testing",
    ],
    benefits: [
      "Industry-standard compliance",
      "Reduced post-publication issues",
      "Enhanced reader experience",
      "Comprehensive quality reports",
    ],
    gradient: "from-purple-500/20 to-pink-500/20",
    hoverGradient: "from-purple-500/30 to-pink-500/30",
    stats: { value: "100%", label: "Quality Assured" },
  },
  {
    id: 4,
    title: "DTP Services",
    icon: LayoutGrid,
    description: "Expert Desktop Publishing to transform your content into visually stunning, publication-ready layouts",
    features: [
      "Professional Book Layout Design",
      "Cover Design and Typography",
      "Image Processing and Enhancement",
      "Multi-format Output (Print, eBook, PDF)",
      "Custom Templates and Style Sheets",
    ],
    benefits: [
      "Visually appealing layouts",
      "Print-ready files",
      "Multiple format compatibility",
      "Consistent brand identity",
    ],
    gradient: "from-orange-500/20 to-amber-500/20",
    hoverGradient: "from-orange-500/30 to-amber-500/30",
    stats: { value: "200+", label: "Projects Completed" },
  },
]

const whyChooseUs = [
  {
    icon: Users,
    title: "Expert Team",
    description: "Our team consists of experienced editors, proofreaders, and designers with years of publishing industry experience",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "We understand deadlines matter. Get your projects completed on time without compromising on quality",
  },
  {
    icon: Shield,
    title: "Confidentiality",
    description: "Your manuscripts and content are safe with us. We maintain strict confidentiality protocols",
  },
  {
    icon: Target,
    title: "Client-Focused",
    description: "We work closely with you to understand your specific needs and deliver tailored solutions",
  },
]

const processSteps = [
  {
    step: 1,
    title: "Submit Your Manuscript",
    description: "Share your manuscript or content with our team along with your specific requirements and preferences",
  },
  {
    step: 2,
    title: "Analysis & Quote",
    description: "Our experts analyze your project and provide a detailed quote with timeline estimates",
  },
  {
    step: 3,
    title: "Professional Processing",
    description: "Our team works on your project with regular updates and collaborative feedback sessions",
  },
  {
    step: 4,
    title: "Quality Delivery",
    description: "Receive your polished, publication-ready content with comprehensive quality assurance",
  },
]

export default function PublicationPage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHeader
        title="Publication Outsourcing"
        description="End-to-end publishing solutions including editing, proofreading, quality analysis, and DTP services tailored to your needs"
      />

      {/* Services Overview Stats */}
      {/* <section className="py-12 bg-secondary/30">
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
      </section> */}

      {/* Main Services Section */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Publication Services</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Comprehensive publishing solutions designed to transform your manuscript into a polished, professional publication
            </p>
          </div>

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
                      {/* Decorative Element */}
                      <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${service.gradient} rounded-full blur-xl opacity-50`}></div>
                      
                      <h3 className="font-semibold text-xl mb-6 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-accent" />
                        Benefits
                      </h3>
                      <ul className="space-y-4">
                        {service.benefits.map((benefit, i) => (
                          <li 
                            key={i} 
                            className="flex items-start gap-3"
                          >
                            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle2 className="w-4 h-4 text-accent" />
                            </div>
                            <span className="text-foreground/80">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Stats Badge */}
                      <div className="mt-8 pt-6 border-t border-border">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl font-bold text-accent">{service.stats.value}</div>
                          <div className="text-sm text-foreground/70">{service.stats.label}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Partner with industry experts who understand your publishing needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon
              return (
                <div 
                  key={index}
                  className="bg-card rounded-2xl p-6 border border-border hover:border-accent/50 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              A streamlined workflow designed to deliver exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((item, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent/50 to-accent/10"></div>
                )}
                
                <div className="bg-card rounded-2xl p-6 border border-border hover:border-accent/50 hover:shadow-xl transition-all duration-300 relative z-10">
                  <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-4 text-accent-foreground font-bold text-xl">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-accent/10 to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="w-16 h-16 text-accent mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Publish Your Book?</h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            Let our expert team help you transform your manuscript into a professionally published book. 
            Get in touch today for a free consultation and quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity inline-block"
            >
              Get a Free Quote
            </a>
            <a
              href="https://forms.office.com/r/EvDTiBr8fE"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity inline-block border border-border"
            >
              Submit Your Project
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
