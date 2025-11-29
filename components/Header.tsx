'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, MapPin, Clock, ChevronDown } from 'lucide-react'
import { imagePaths } from '@/lib/image-paths'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    {
      name: 'About Us',
      href: '/about',
      submenu: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Patients', href: '/about/our-patients' },
        { name: 'Our Facilities', href: '/about/our-facilities' },
        { name: 'Meet Our Team', href: '/about/meet-our-team' },
        { name: 'Clinic Tour', href: '/clinic-tour' },
      ]
    },
    {
      name: 'Services',
      href: '/services',
      submenu: [
        { name: 'General Dentistry', href: '/services/general-dentistry' },
        { name: 'Cosmetic Dentistry', href: '/services/cosmetic-dentistry' },
        { name: 'Dental Implants', href: '/services/dental-implants' },
        { name: 'Orthodontics', href: '/services/orthodontics' },
        { name: 'Children\'s Dentistry', href: '/services/children-dentistry' },
        { name: 'Emergency Care', href: '/services/emergency-care' },
      ]
    },
    {
      name: 'New Patient',
      href: '/new-patient',
      submenu: [
        { name: 'New Patient Information', href: '/new-patient' },
        { name: 'Assessment & Diagnosis', href: '/new-patient/assessment-diagnosis' },
        { name: 'Your First Visit', href: '/new-patient/first-visit' },
        { name: 'Portfolio of Cases', href: '/new-patient/portfolio' },
      ]
    },
    { name: 'Affordability', href: '/affordability' },
    { name: 'Cost Calculator', href: '/cost-calculator' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="bg-star-blue text-white py-2 hidden md:block">
        <div className="container-custom">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+61395620675" className="flex items-center gap-2 hover:text-star-blue-light transition-colors">
                <Phone size={16} />
                <span>(03) 9562 0675</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Wheelers Hill, VIC</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Mon-Fri: 9AM-6PM | Sat: 9AM-1PM</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/portal" className="hover:text-star-blue-light transition-colors">
                Patient Portal
              </Link>
              <Link href="/book" className="hover:text-star-blue-light transition-colors font-semibold">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect shadow-lg' : 'bg-white'
      }`}>
        <nav className="container-custom">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Image
                src={imagePaths.logo}
                alt="Star Smiles Dental Centre - Making Beautiful Smiles a Reality"
                width={220}
                height={66}
                className="h-16 w-auto object-contain transition-transform group-hover:scale-105"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-star-blue font-medium transition-colors py-2 flex items-center gap-1"
                  >
                    {item.name}
                    {item.submenu && <ChevronDown size={16} className={`transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.submenu && (
                    <div className={`absolute left-0 mt-0 w-56 transition-all duration-300 ${
                      activeDropdown === item.name ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                    }`}>
                      <div className="pt-2">
                        <div className="glass-effect rounded-lg shadow-xl overflow-hidden">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-3 text-gray-700 hover:bg-star-blue hover:text-white transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/portal" className="text-star-blue hover:text-star-blue-dark font-medium transition-colors">
                Portal
              </Link>
              <Link href="/book" className="btn-primary">
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-star-blue"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen border-t border-gray-200' : 'max-h-0'
        }`}>
          <div className="bg-white">
            <div className="container-custom py-4 space-y-2">
              {/* Mobile Contact Info */}
              <div className="pb-4 mb-4 border-b border-gray-200 space-y-2">
                <a href="tel:+61395620675" className="flex items-center gap-2 text-star-blue">
                  <Phone size={18} />
                  <span>(03) 9562 0675</span>
                </a>
              </div>

              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-3 text-gray-700 hover:text-star-blue font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="pl-4 space-y-2 mt-2 mb-4">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block py-2 text-sm text-gray-600 hover:text-star-blue"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 space-y-3">
                <Link
                  href="/portal"
                  className="block w-full btn-secondary text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Patient Portal
                </Link>
                <Link
                  href="/book"
                  className="block w-full btn-primary text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
