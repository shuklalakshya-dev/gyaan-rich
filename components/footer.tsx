import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-4">
              <div className="bg-white p-1 rounded-lg border border-gray-200">
                <Image 
                  src="/logo_gyanrich_withbg.png" 
                  alt="GyanRich Logo" 
                  width={32} 
                  height={32}
                  className="object-contain"
                />
              </div>
              <span>Gyan Rich</span>
            </div>
            <p className="text-secondary-foreground/70">Transforming education through innovation and expertise.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                // { href: "/blog", label: "Blog" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-yellow-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {["Counselling", "Webinar", "", "Consulting"].map((service) => (
                <li key={service}>
                  <Link href="/services" className="hover:text-yellow-400 transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-yellow-400" />
                <a href="mailto:gyanrich@outlook.in" className="hover:text-yellow-400 transition-colors">
                  gyanrich@outlook.in
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-yellow-400" />
                <a href="tel:+919876543210" className="hover:text-yellow-400 transition-colors">
                  +91 9453805716
                
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-yellow-400 mt-1" />
                <span>India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-foreground/70">© 2025 Gyan Rich. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              {/* <Link href="#" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link> */}
              {/* <Link href="#" className="hover:text-accent transition-colors">
                Terms of Service
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
