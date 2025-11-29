'use client'

import Link from 'next/link'
import { ArrowRight, Check, Sparkles, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CosmeticDentistryPage() {
  const services = [
    {
      name: 'Teeth Whitening',
      description: 'Professional-grade whitening treatments that can brighten your teeth by several shades in a single visit.',
      features: ['In-office whitening', 'Take-home kits', 'Long-lasting results', 'Safe and effective']
    },
    {
      name: 'Porcelain Veneers',
      description: 'Custom-made thin shells that cover the front of your teeth to improve appearance, color, and shape.',
      features: ['Natural appearance', 'Stain resistant', 'Durable', 'Minimal tooth preparation']
    },
    {
      name: 'Dental Bonding',
      description: 'Tooth-colored resin applied to repair chips, cracks, gaps, and discoloration.',
      features: ['Same-day treatment', 'Affordable', 'Minimally invasive', 'Natural look']
    },
    {
      name: 'Smile Makeovers',
      description: 'Comprehensive treatment plans combining multiple procedures to transform your entire smile.',
      features: ['Personalized planning', 'Full transformation', 'Coordinated treatment', 'Stunning results']
    }
  ]

  const benefits = [
    'Boost your self-confidence',
    'Enhance your professional image',
    'Look years younger',
    'Improve oral health',
    'Long-lasting results',
    'Natural-looking aesthetics'
  ]

  const beforeAfter = [
    { treatment: 'Teeth Whitening', improvement: 'Up to 8 shades whiter' },
    { treatment: 'Porcelain Veneers', improvement: 'Complete smile transformation' },
    { treatment: 'Dental Bonding', improvement: 'Seamless repairs' },
    { treatment: 'Gum Contouring', improvement: 'Perfect smile proportions' }
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 overflow-hidden">
        {/* Subtle professional overlay pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
              <div className="flex items-center gap-2">
                <Sparkles size={18} />
                <span>Transform Your Smile</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Comprehensive Cosmetic Dentistry
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Achieve the beautiful, confident smile you've always wanted with our advanced cosmetic dental treatments. From subtle enhancements to complete smile makeovers.
            </p>
            <Link href="/book" className="bg-white text-slate-900 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg inline-flex items-center gap-2 shadow-xl transition-all hover:scale-105">
              Schedule Consultation <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>

        {/* Professional accent element */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-star-blue/20 to-transparent rounded-full blur-3xl" />
      </section>

      {/* Why Cosmetic Dentistry */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold mb-6">
                Your Smile, Your Confidence
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Your smile is often the first thing people notice about you. Cosmetic dentistry goes beyond aesthetics – it's about helping you feel confident in every social and professional situation.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                At Star Smiles, we combine artistry with advanced dental technology to create natural-looking results that enhance your unique features. Every treatment is personalized to complement your facial structure and skin tone.
              </p>
              <p className="text-lg text-gray-600">
                Whether you're looking to brighten your smile, repair imperfections, or achieve a complete transformation, our experienced cosmetic dentists will guide you toward your ideal smile.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Star className="text-star-blue" size={28} />
                  Benefits of Cosmetic Dentistry
                </h3>
                <ul className="space-y-4">
                  {benefits.map(benefit => (
                    <li key={benefit} className="flex items-center gap-3">
                      <Check className="text-star-blue flex-shrink-0" size={20} />
                      <span className="text-gray-700 text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Our Cosmetic Services
            </h2>
            <p className="text-xl text-gray-600">
              Discover our range of treatments designed to enhance your smile
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                className="bg-white rounded-2xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-star-blue">{service.name}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="grid grid-cols-2 gap-3">
                  {service.features.map(feature => (
                    <li key={feature} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-star-blue rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Real Results
            </h2>
            <p className="text-xl text-gray-600">
              See what our cosmetic treatments can achieve
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {beforeAfter.map((item, index) => (
              <motion.div
                key={item.treatment}
                className="bg-gradient-to-br from-star-blue to-star-blue-light rounded-xl p-6 text-white text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold mb-2">{item.treatment}</h4>
                <p className="text-white/90 text-sm">{item.improvement}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-star-blue to-star-blue-light rounded-3xl p-12 md:p-16 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready for Your Dream Smile?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Book your cosmetic consultation today and discover the possibilities for your perfect smile.
            </p>
            <Link href="/book" className="bg-white text-star-blue hover:bg-gray-100 font-semibold py-4 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2">
              Book Your Consultation
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
