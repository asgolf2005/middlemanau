'use client'

import Link from 'next/link'
import { ArrowRight, Phone, AlertTriangle, Clock, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

export default function EmergencyCarePage() {
  const emergencies = [
    {
      condition: 'Severe Toothache',
      description: 'Intense, persistent tooth pain that may indicate infection or decay',
      immediate: 'Rinse with warm salt water, take over-the-counter pain relief',
      icon: '🦷'
    },
    {
      condition: 'Knocked-Out Tooth',
      description: 'Complete displacement of a tooth from its socket',
      immediate: 'Handle by crown only, keep moist in milk, see dentist within 30 minutes',
      icon: '⚡'
    },
    {
      condition: 'Broken or Cracked Tooth',
      description: 'Tooth fracture from trauma or biting hard objects',
      immediate: 'Rinse mouth, apply cold compress, save any pieces',
      icon: '💔'
    },
    {
      condition: 'Lost Crown or Filling',
      description: 'Restoration has come loose or fallen out',
      immediate: 'Keep the crown, avoid chewing on that side',
      icon: '👑'
    },
    {
      condition: 'Dental Abscess',
      description: 'Painful, swollen infection at tooth root or gum',
      immediate: 'Rinse with salt water, seek immediate care - do not ignore',
      icon: '🔴'
    },
    {
      condition: 'Soft Tissue Injury',
      description: 'Cuts or lacerations to lips, tongue, or cheeks',
      immediate: 'Apply pressure with clean cloth, use cold compress',
      icon: '🩹'
    }
  ]

  const whatToDo = [
    { step: '1', title: 'Stay Calm', desc: 'Take a deep breath and assess the situation' },
    { step: '2', title: 'Call Us', desc: 'Contact our emergency line immediately' },
    { step: '3', title: 'First Aid', desc: 'Follow our guidance for immediate care' },
    { step: '4', title: 'Come In', desc: 'Visit us for professional treatment' }
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
                <AlertTriangle size={18} />
                <span>Same-Day Emergency Appointments</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Emergency Dental Care
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Dental emergencies don't wait, and neither do we. Our team provides prompt, compassionate care when you need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+61398030933" className="bg-white text-slate-900 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg inline-flex items-center justify-center gap-2 shadow-xl transition-all hover:scale-105">
                <Phone size={20} />
                Call Now: (03) 9803 0933
              </a>
              <Link href="/book" className="bg-white/10 text-white hover:bg-white/20 border-2 border-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2">
                Book Emergency Visit
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Professional accent element */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-red-600/20 to-transparent rounded-full blur-3xl" />
      </section>

      {/* Emergency Contact Banner */}
      <section className="bg-red-600 py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-white">
              <Phone size={32} />
              <div>
                <p className="font-semibold text-lg">Dental Emergency? Call us immediately</p>
                <p className="text-white/90">We offer same-day emergency appointments</p>
              </div>
            </div>
            <a href="tel:+61398030933" className="bg-white text-red-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors text-lg">
              (03) 9803 0933
            </a>
          </div>
        </div>
      </section>

      {/* What To Do */}
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
              What To Do in a Dental Emergency
            </h2>
            <p className="text-xl text-gray-600">
              Quick action can save your tooth and reduce complications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {whatToDo.map((item, index) => (
              <motion.div
                key={item.step}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-star-blue rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Emergencies */}
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
              Common Dental Emergencies
            </h2>
            <p className="text-xl text-gray-600">
              Learn how to handle these situations before you reach our clinic
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencies.map((emergency, index) => (
              <motion.div
                key={emergency.condition}
                className="bg-white rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{emergency.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-star-blue">{emergency.condition}</h3>
                <p className="text-gray-600 mb-4">{emergency.description}</p>
                <div className="bg-star-blue/5 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700">
                    <span className="text-star-blue">Immediate action: </span>
                    {emergency.immediate}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us for Emergencies */}
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
                Why Choose Star Smiles for Emergency Care
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                When dental emergencies strike, you need a team that responds quickly and treats effectively. Our experienced dentists handle emergencies with skill and compassion.
              </p>
              <ul className="space-y-4">
                {[
                  'Same-day emergency appointments available',
                  'Experienced team trained in emergency procedures',
                  'Modern equipment for accurate diagnosis',
                  'Compassionate care for anxious patients',
                  'Pain management is our priority',
                  'Follow-up care to ensure complete recovery'
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <Shield className="text-star-blue mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-star-blue to-star-blue-light rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Emergency Hours</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Clock size={24} />
                    <div>
                      <p className="font-semibold">Monday - Friday</p>
                      <p className="text-white/80">9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Clock size={24} />
                    <div>
                      <p className="font-semibold">Saturday</p>
                      <p className="text-white/80">9:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/20">
                  <p className="mb-4">For after-hours emergencies:</p>
                  <a href="tel:+61398030933" className="text-2xl font-bold hover:text-white/90 transition-colors">
                    (03) 9803 0933
                  </a>
                  <p className="text-sm text-white/70 mt-2">Leave a message and we'll return your call ASAP</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prevention Tips */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold text-center mb-12">
              Preventing Dental Emergencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { tip: 'Wear a mouthguard during sports', desc: 'Protect your teeth from impact injuries' },
                { tip: 'Don\'t chew ice or hard objects', desc: 'Avoid cracking or chipping your teeth' },
                { tip: 'Use scissors, not teeth', desc: 'Never use teeth to open packages' },
                { tip: 'Maintain regular check-ups', desc: 'Catch problems before they become emergencies' },
                { tip: 'Address dental issues promptly', desc: 'Small problems can become big emergencies' },
                { tip: 'Practice good oral hygiene', desc: 'Healthy teeth are more resistant to damage' }
              ].map((item, index) => (
                <motion.div
                  key={item.tip}
                  className="bg-white rounded-lg p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold text-star-blue mb-2">{item.tip}</h4>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-star-blue to-star-blue-light rounded-3xl p-12 md:p-16 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Don't Wait - Get Help Now
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              If you're experiencing a dental emergency, contact us immediately. We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+61398030933" className="bg-white text-star-blue hover:bg-gray-100 font-semibold py-4 px-10 rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2">
                <Phone size={20} />
                Call Now
              </a>
              <Link href="/book" className="bg-white/10 text-white hover:bg-white/20 font-semibold py-4 px-10 rounded-lg border-2 border-white transition-all duration-300 inline-flex items-center justify-center gap-2">
                Book Emergency Visit
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
