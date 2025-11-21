"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Loader2 } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    schoolName: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      setSubmitted(true)
      setFormData({ name: "", email: "", phone: "", schoolName: "", message: "" })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError("Failed to submit. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-12">
      {/* Contact Information */}
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
          <p className="text-foreground/70 mb-8">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="space-y-6">
                      <div className="flex items-center gap-3">
              <Mail className="text-accent" size={24} />
              <a href="mailto:gyanrich@outlook.in" className="text-foreground/70 hover:text-accent transition-colors">
                gyanrich@outlook.in
              </a>
            </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Phone</h4>
              <a href="tel:+919876543210" className="text-foreground/70 hover:text-accent transition-colors">
                +91 98765 43210
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Location</h4>
              <p className="text-foreground/70">India</p>
            </div>
          </div>
        </div>

        <div className="bg-accent/10 rounded-xl p-6 border border-accent/20">
          <h4 className="font-semibold mb-2">Response Time</h4>
          <p className="text-foreground/70">We typically respond within 24 hours during business days.</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-card rounded-2xl p-8 border border-border">
        {submitted ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">✓</span>
            </div>
            <h4 className="text-xl font-semibold mb-2">Thank You!</h4>
            <p className="text-foreground/70">We've received your message and will get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-accent focus:outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-accent focus:outline-none transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-accent focus:outline-none transition-colors"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label htmlFor="schoolName" className="block text-sm font-semibold mb-2">
                School/Institution Name (Optional)
              </label>
              <input
                type="text"
                id="schoolName"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-accent focus:outline-none transition-colors"
                placeholder="Your School Name"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-accent focus:outline-none transition-colors resize-none"
                placeholder="Tell us about your needs..."
              />
            </div>

            {error && <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
