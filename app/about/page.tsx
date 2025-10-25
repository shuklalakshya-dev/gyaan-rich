"use client"

import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { Target, Heart, Zap } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack"

export default function AboutPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const cards = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To empower students and institutions through innovative educational solutions and expert guidance.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      hoverGradient: "from-blue-500/30 to-cyan-500/30",
    },
    {
      icon: Heart,
      title: "Our Values",
      description:
        "Excellence, integrity, innovation, and a commitment to transforming students through education.",
      gradient: "from-purple-500/20 to-pink-500/20",
      hoverGradient: "from-purple-500/30 to-pink-500/30",
    },
    {
      icon: Zap,
      title: "Our Vision",
      description:
        "To be the leading educational platform that bridges the gap between aspirations and achievements.",
      gradient: "from-orange-500/20 to-yellow-500/20",
      hoverGradient: "from-orange-500/30 to-yellow-500/30",
    },
  ]

  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHeader
        title="About Gyaan Rich"
        description="Pioneering educational excellence through innovation, expertise, and dedication"
      />

      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story </h2>
              <p className="text-lg text-foreground/70 mb-4">
                At Gyaan Rich, our journey began with a simple vision — to make learning meaningful and personal for every student. We realized that schools often focus on academics but lack the emotional and digital support that truly helps students grow. That’s where we stepped in. Gyaan Rich bridges this gap by providing expert counselling sessions, interactive video lectures, and customized digital platforms for schools. Our mission is to empower institutions to go beyond textbooks — helping students discover their potential, schools scale their impact, and learning become an inspiring journey for all.
              </p>
              <p className="text-lg text-foreground/70">
                Over the years, we have helped thousands of students achieve their dreams and supported numerous
                educational institutions in their digital transformation journey.
              </p>
            </div>

            <div className="flex items-center justify-center">
              <Image
                src="/1000274331.png"
                alt="Gyaan Rich - We will light the lamp of knowledge"
                width={400}
                height={400}
                className="object-contain w-full h-auto"
                priority
              />
            </div>
          </div>

          <div className="h-screen mb-20">
            <ScrollStack className="h-full">
              <ScrollStackItem itemClassName="bg-red-600 border-2 border-red-700">
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-red-700 rounded-2xl flex items-center justify-center mb-6 border-2 border-red-800">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold mb-6 text-white">Our Mission</h2>
                  <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                    To empower students and institutions through innovative educational solutions and expert guidance.
                  </p>
                </div>
              </ScrollStackItem>

              <ScrollStackItem itemClassName="bg-red-600 border-2 border-red-700">
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-red-700 rounded-2xl flex items-center justify-center mb-6 border-2 border-red-800">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold mb-6 text-white">Our Values</h2>
                  <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                    Excellence, integrity, innovation, and a commitment to transforming students through education.
                  </p>
                </div>
              </ScrollStackItem>

              <ScrollStackItem itemClassName="bg-red-600 border-2 border-red-700">
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-red-700 rounded-2xl flex items-center justify-center mb-6 border-2 border-red-800">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold mb-6 text-white">Our Vision</h2>
                  <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                    To be the leading educational platform that bridges the gap between aspirations and achievements.
                  </p>
                </div>
              </ScrollStackItem>
            </ScrollStack>
          </div>

          <div className="bg-gradient-to-br from-secondary to-secondary/90 text-secondary-foreground rounded-2xl p-12 md:p-16 mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Why Choose Gyaan Rich?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                "Expert team with years of experience",
                "Personalized solutions for each client",
                "Proven track record of success",
                "Cutting-edge technology and tools",
                "24/7 customer support",
                "Affordable and flexible pricing",
              ].map((reason, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-foreground text-sm font-bold">✓</span>
                  </div>
                  <span className="text-lg">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
