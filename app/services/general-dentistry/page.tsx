'use client'

import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { motion } from 'framer-motion'

export default function GeneralDentistryPage() {
  const services = [
    { name: 'Dental Examinations', description: 'Comprehensive oral health assessments' },
    { name: 'Professional Cleanings', description: 'Remove plaque and tartar buildup' },
    { name: 'Tooth-Colored Fillings', description: 'Natural-looking cavity treatments' },
    { name: 'Root Canal Therapy', description: 'Save infected or damaged teeth' },
    { name: 'Tooth Extractions', description: 'Safe removal of problematic teeth' },
    { name: 'Gum Disease Treatment', description: 'Prevent and treat periodontal issues' },
    { name: 'Dental X-Rays', description: 'Advanced diagnostic imaging' },
    { name: 'Fluoride Treatments', description: 'Strengthen and protect teeth' }
  ]

  return (
    <div>
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 overflow-hidden">
        {/* Subtle professional overlay pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container-custom relative z-10">
          <motion.div className="max-w-3xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
              Professional Dental Care
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Comprehensive General Dentistry
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Expert dental care for the whole family. Prevention-focused treatments delivered with precision and care to maintain your optimal oral health.
            </p>
            <Link href="/book" className="bg-white text-slate-900 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg inline-flex items-center gap-2 shadow-xl transition-all hover:scale-105">
              Schedule Consultation <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>

        {/* Professional accent element */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-star-blue/20 to-transparent rounded-full blur-3xl" />
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-4xl font-display font-bold mb-6">Preventive Care First</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Star Smiles, our focus is on prevention first and then cure. We help protect you and your family from dental problems through regular check-ups, professional cleanings, and patient education.
              </p>
              <p className="text-lg text-gray-600">
                Our comprehensive general dentistry services ensure that your teeth and gums stay healthy, preventing costly and painful dental issues before they develop.
              </p>
            </div>
            <div className="bg-star-blue/5 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-4">Why Regular Visits Matter</h3>
              <ul className="space-y-3">
                {['Early detection of cavities', 'Prevention of gum disease', 'Oral cancer screening', 'Professional plaque removal', 'Personalized care advice'].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="text-star-blue" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                className="bg-white rounded-xl p-6 shadow-lg card-hover border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-3">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-star-blue to-star-blue-light rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-display font-bold mb-6">Schedule Your Check-up Today</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Don't wait for dental problems to develop. Book your preventive care appointment now.
            </p>
            <Link href="/book" className="bg-white text-star-blue hover:bg-gray-100 font-semibold py-4 px-10 rounded-lg inline-flex items-center gap-2">
              Book Now <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
