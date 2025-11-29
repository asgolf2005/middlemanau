'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Send } from 'lucide-react'
import { useState } from 'react'
import { imagePaths } from '@/lib/image-paths'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to newsletter service
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 5000)
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <Link href="/" className="inline-block mb-4 group">
              <Image
                src={imagePaths.logoWhite}
                alt="Star Smiles Dental Centre"
                width={200}
                height={60}
                className="h-14 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-gray-400 mb-2 font-medium">
              Making Beautiful Smiles a Reality
            </p>
            <p className="text-gray-400 mb-6 text-sm">
              Excellence in Family Dentistry. Creating amazing smiles for over 10 years in Wheelers Hill.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/starsmilesdentalcentre"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-star-blue hover:bg-star-blue-light flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/starsmilesdentalcentre"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-star-blue hover:bg-star-blue-light flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Our Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services/general-dentistry" className="hover:text-star-blue-light transition-colors">General Dentistry</Link></li>
              <li><Link href="/services/cosmetic-dentistry" className="hover:text-star-blue-light transition-colors">Cosmetic Dentistry</Link></li>
              <li><Link href="/services/dental-implants" className="hover:text-star-blue-light transition-colors">Dental Implants</Link></li>
              <li><Link href="/services/orthodontics" className="hover:text-star-blue-light transition-colors">Orthodontics</Link></li>
              <li><Link href="/services/children-dentistry" className="hover:text-star-blue-light transition-colors">Children's Dentistry</Link></li>
              <li><Link href="/services/emergency-care" className="hover:text-star-blue-light transition-colors">Emergency Care</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-star-blue-light transition-colors">About Us</Link></li>
              <li><Link href="/team" className="hover:text-star-blue-light transition-colors">Our Team</Link></li>
              <li><Link href="/news" className="hover:text-star-blue-light transition-colors">News & Blog</Link></li>
              <li><Link href="/contact" className="hover:text-star-blue-light transition-colors">Contact</Link></li>
              <li><Link href="/book" className="hover:text-star-blue-light transition-colors">Book Appointment</Link></li>
              <li><Link href="/portal" className="hover:text-star-blue-light transition-colors">Patient Portal</Link></li>
              <li><Link href="/faq" className="hover:text-star-blue-light transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-star-blue-light mt-1 flex-shrink-0" />
                <span>1 Plato Crescent<br />Wheelers Hill, VIC 3150</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-star-blue-light flex-shrink-0" />
                <a href="tel:+61395620675" className="hover:text-star-blue-light transition-colors">
                  (03) 9562 0675
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-star-blue-light flex-shrink-0" />
                <a href="mailto:info@starsmiles.com.au" className="hover:text-star-blue-light transition-colors">
                  info@starsmiles.com.au
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={20} className="text-star-blue-light mt-1 flex-shrink-0" />
                <div>
                  <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 1:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md">
            <h4 className="text-white font-semibold text-lg mb-3">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for dental tips and updates.</p>
            {subscribed ? (
              <p className="text-star-blue-light">Thanks for subscribing!</p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-star-blue"
                />
                <button
                  type="submit"
                  className="bg-star-orange hover:bg-star-orange-dark text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; {currentYear} Star Smiles Dental Centre. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-star-blue-light transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-star-blue-light transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
