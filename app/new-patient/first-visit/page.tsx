'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, FileText, CreditCard, Calendar, MapPin, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

export default function FirstVisitPage() {
  const whatToBring = [
    {
      icon: <FileText size={32} />,
      title: 'Health Fund Card',
      description: 'If you have private health insurance, bring your card for instant HICAPS claims.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <CreditCard size={32} />,
      title: 'Payment Method',
      description: 'We accept cash, credit cards, EFTPOS, and offer payment plans.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <FileText size={32} />,
      title: 'Medical History',
      description: 'List of current medications and any relevant medical conditions.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <FileText size={32} />,
      title: 'Previous Records',
      description: 'Any dental records or X-rays from your previous dentist (if available).',
      color: 'from-orange-500 to-amber-500'
    }
  ]

  const whatToExpect = [
    {
      title: 'Arrival',
      time: '10 minutes before',
      description: 'Please arrive 10 minutes early to complete any necessary paperwork. Our friendly reception team will welcome you and help you get settled.'
    },
    {
      title: 'Medical History',
      time: '5-10 minutes',
      description: 'We\'ll review your medical history, current medications, allergies, and any dental concerns or anxieties you may have.'
    },
    {
      title: 'Examination',
      time: '20-30 minutes',
      description: 'Comprehensive oral examination including teeth, gums, jaw, and soft tissues. Digital X-rays may be taken if needed.'
    },
    {
      title: 'Discussion',
      time: '10-15 minutes',
      description: 'We\'ll explain our findings, discuss treatment options, answer your questions, and provide a customized care plan with transparent pricing.'
    }
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://starsmiles.com.au/wp-content/uploads/2023/12/DentalConsultation-1024x698.jpg"
            alt="First visit consultation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-star-blue-dark/95 via-star-blue/90 to-star-blue/80" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-3xl text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <nav className="flex items-center gap-2 text-sm mb-6 text-white/80">
              <Link href="/" className="hover:text-white">Home</Link>
              <ArrowRight size={16} />
              <Link href="/new-patient" className="hover:text-white">New Patient</Link>
              <ArrowRight size={16} />
              <span className="text-white">Your First Visit</span>
            </nav>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              Your First Visit
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              We understand that visiting a new dentist can feel overwhelming. Here's everything you need to know to make your first visit comfortable and stress-free.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What to Bring */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              What to Bring
            </h2>
            <p className="text-xl text-gray-600">
              Make sure you have these items for a smooth first visit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whatToBring.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              What to Expect During Your Visit
            </h2>
            <p className="text-xl text-gray-600">
              Your first appointment typically takes 45-60 minutes
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {whatToExpect.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                {/* Timeline line */}
                {index !== whatToExpect.length - 1 && (
                  <div className="absolute left-[15px] top-12 bottom-0 w-0.5 bg-star-blue-light" />
                )}

                {/* Timeline dot */}
                <div className="absolute left-0 top-0 w-8 h-8 bg-star-blue rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                    <span className="bg-star-blue/10 text-star-blue px-3 py-1 rounded-full text-sm font-semibold">
                      <Clock size={14} className="inline mr-1" />
                      {step.time}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100"
            >
              <h2 className="text-3xl font-display font-bold mb-8">
                <MapPin className="inline text-star-blue mb-1" size={32} /> Location & Hours
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Address</h3>
                  <p className="text-gray-600">
                    1 Plato Crescent<br />
                    Wheelers Hill, VIC 3150<br />
                    Australia
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Opening Hours</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-semibold">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-semibold">9:00 AM - 1:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-semibold text-red-600">Closed</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Contact</h3>
                  <div className="space-y-2">
                    <a href="tel:+61395620675" className="flex items-center gap-2 text-star-blue hover:text-star-blue-dark text-lg font-semibold">
                      <Phone size={20} />
                      (03) 9562 0675
                    </a>
                  </div>
                </div>

                <div className="pt-6">
                  <p className="text-sm text-gray-500 mb-4">Free parking available on-site</p>
                  <Link href="/contact" className="inline-flex items-center gap-2 text-star-blue hover:text-star-blue-dark font-semibold">
                    Get Directions
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100"
            >
              <h2 className="text-3xl font-display font-bold mb-8">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {[
                  {
                    q: 'How long will my first visit take?',
                    a: 'Your first appointment typically takes 45-60 minutes, allowing time for a comprehensive examination and consultation.'
                  },
                  {
                    q: 'Will I need treatment on my first visit?',
                    a: 'Usually the first visit is for assessment only. Any necessary treatment will be discussed and scheduled for a follow-up appointment.'
                  },
                  {
                    q: 'Do you accept my health fund?',
                    a: 'We accept all major Australian health funds and offer HICAPS for instant claiming at our practice.'
                  },
                  {
                    q: 'What if I have dental anxiety?',
                    a: 'Please let us know! We specialize in gentle, anxiety-free dentistry and will work at your pace to ensure your comfort.'
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container-custom">
          <motion.div
            className="bg-gradient-to-r from-star-orange to-star-orange-dark rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Ready to Book Your First Visit?
              </h2>
              <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
                Take the first step toward a healthier, brighter smile. Book your appointment today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book" className="bg-white text-star-orange hover:bg-star-blue hover:text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-3 text-lg shadow-lg">
                  <Calendar size={22} />
                  Book Now
                  <ArrowRight size={20} />
                </Link>
                <a href="tel:+61395620675" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-star-orange font-bold py-5 px-10 rounded-xl border-2 border-white/30 transition-all duration-300 inline-flex items-center justify-center gap-3 text-lg">
                  <Phone size={22} />
                  Call Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
