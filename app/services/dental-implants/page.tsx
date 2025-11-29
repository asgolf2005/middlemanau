'use client'

import Link from 'next/link'
import { ArrowRight, Check, Clock, Shield, Award } from 'lucide-react'
import { motion } from 'framer-motion'

export default function DentalImplantsPage() {
  const benefits = [
    'Natural look and feel',
    'Permanent tooth replacement',
    'Prevents bone loss',
    'Preserves facial structure',
    'Improved chewing ability',
    'Enhanced speech',
    'No slipping or clicking',
    'Easy maintenance',
    'Long-lasting solution',
    'Boosts confidence'
  ]

  const process = [
    {
      step: '1',
      title: 'Initial Consultation',
      description: 'Comprehensive examination, 3D imaging, and personalized treatment planning.'
    },
    {
      step: '2',
      title: 'Implant Placement',
      description: 'Surgical placement of titanium implant into the jawbone under local anesthesia.'
    },
    {
      step: '3',
      title: 'Healing Period',
      description: 'Osseointegration process where the implant fuses with the bone (3-6 months).'
    },
    {
      step: '4',
      title: 'Abutment Placement',
      description: 'Connecting piece is attached to the implant to support the final crown.'
    },
    {
      step: '5',
      title: 'Crown Placement',
      description: 'Custom-made crown is attached, completing your new permanent tooth.'
    }
  ]

  const faqs = [
    {
      question: 'How long do dental implants last?',
      answer: 'With proper care and maintenance, dental implants can last 25 years or even a lifetime. They have a success rate of over 95%.'
    },
    {
      question: 'Is the dental implant procedure painful?',
      answer: 'The procedure is performed under local anesthesia, so you won\'t feel pain during treatment. Post-operative discomfort is typically manageable with over-the-counter pain medication.'
    },
    {
      question: 'How much do dental implants cost?',
      answer: 'Cost varies based on the number of implants needed and complexity of the case. We offer flexible payment plans and can provide a detailed cost estimate during your consultation.'
    },
    {
      question: 'Am I a candidate for dental implants?',
      answer: 'Most adults in good general health with sufficient jawbone density are candidates. We\'ll assess your suitability during a comprehensive consultation.'
    }
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
              Advanced Tooth Replacement
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Dental Implants
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Permanent tooth replacement solutions that look, feel, and function like natural teeth. Restore your smile and confidence with advanced implant dentistry.
            </p>
            <Link href="/book" className="bg-white text-slate-900 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg inline-flex items-center gap-2 shadow-xl transition-all hover:scale-105">
              Schedule Consultation <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>

        {/* Professional accent element */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-star-blue/20 to-transparent rounded-full blur-3xl" />
      </section>

      {/* What Are Dental Implants */}
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
                What Are Dental Implants?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Dental implants are titanium posts that are surgically placed into your jawbone to serve as artificial tooth roots. They provide a strong foundation for permanent or removable replacement teeth that are made to match your natural teeth.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Unlike dentures or bridges, dental implants integrate with your jawbone through a process called osseointegration, providing unmatched stability and preventing bone loss that typically occurs after tooth loss.
              </p>
              <p className="text-lg text-gray-600">
                At Star Smiles, we use state-of-the-art technology and proven techniques to ensure the highest success rates and optimal patient outcomes.
              </p>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-star-blue-light to-star-blue rounded-3xl p-12 text-white">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <Clock className="mb-4" size={40} />
                    <h3 className="text-2xl font-bold mb-2">3-6 Months</h3>
                    <p className="text-white/80">Healing Time</p>
                  </div>
                  <div>
                    <Shield className="mb-4" size={40} />
                    <h3 className="text-2xl font-bold mb-2">95%+</h3>
                    <p className="text-white/80">Success Rate</p>
                  </div>
                  <div>
                    <Award className="mb-4" size={40} />
                    <h3 className="text-2xl font-bold mb-2">25+ Years</h3>
                    <p className="text-white/80">Lifespan</p>
                  </div>
                  <div>
                    <Check className="mb-4" size={40} />
                    <h3 className="text-2xl font-bold mb-2">100%</h3>
                    <p className="text-white/80">Natural Feel</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
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
              Benefits of Dental Implants
            </h2>
            <p className="text-xl text-gray-600">
              Discover why dental implants are the gold standard for tooth replacement
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                className="flex items-center gap-3 bg-white p-6 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="w-8 h-8 bg-star-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={20} className="text-white" />
                </div>
                <span className="text-lg text-gray-700">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Process */}
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
              The Implant Process
            </h2>
            <p className="text-xl text-gray-600">
              A step-by-step guide to your dental implant journey
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                className="flex gap-6 items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-star-blue text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-lg text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
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
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                className="bg-white rounded-xl p-8 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-4 text-star-blue">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-star-blue to-star-blue-light rounded-3xl p-12 md:p-16 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Restore Your Smile?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Schedule your dental implant consultation today and take the first step toward a complete, confident smile.
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
