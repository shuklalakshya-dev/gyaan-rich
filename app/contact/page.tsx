"use client"

import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  useEffect(() => {
    // Replace this URL with your actual Google Form link
    const googleFormUrl = "https://forms.office.com/r/EvDTiBr8fE"
    window.location.href = googleFormUrl
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHeader
        title="Contact Us"
        description="We're here to help. Reach out to us with any questions or inquiries."
      />

      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg">Redirecting to contact form...</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
