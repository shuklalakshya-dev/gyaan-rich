"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/publication", label: "Publication" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blogs" },
    { href: "/career", label: "Career" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-secondary text-secondary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="bg-white p-1  m-2 rounded-lg border border-gray-200">
              <Image 
                src="/logo_gyanrich_withbg.png" 
                alt="GyanRich Logo" 
                width={40} 
                height={40}
                className="object-contain"
              />
            </div>
            <span>GyanRich</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-accent transition-colors duration-200">
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex gap-3">
            <a
              href="https://forms.office.com/r/EvDTiBr8fE"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-accent-foreground px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 hover:bg-primary hover:text-primary-foreground rounded transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://forms.office.com/r/EvDTiBr8fE"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 bg-accent text-accent-foreground rounded font-semibold text-center"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
