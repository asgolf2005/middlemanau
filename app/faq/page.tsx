'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Phone, MessageSquare } from 'lucide-react'

const faqCategories = [
  {
    name: 'General',
    questions: [
      {
        q: 'What are your opening hours?',
        a: 'We are open Monday to Friday from 9:00 AM to 6:00 PM, and Saturday from 9:00 AM to 2:00 PM. We are closed on Sundays and public holidays.'
      },
      {
        q: 'Where are you located?',
        a: 'We are located in Brandon Park Shopping Centre, Wheelers Hill, VIC 3150. Free parking is available in the shopping centre car park.'
      },
      {
        q: 'Do I need a referral to see you?',
        a: 'No referral is needed to visit Star Smiles Dental Centre. New patients are always welcome, and you can book an appointment directly through our website or by calling us.'
      },
      {
        q: 'Do you treat children?',
        a: 'Yes! We love treating patients of all ages, including children. Our team is experienced in pediatric dentistry and creating positive dental experiences for young patients.'
      },
    ]
  },
  {
    name: 'Appointments',
    questions: [
      {
        q: 'How do I book an appointment?',
        a: 'You can book an appointment by calling us at (03) 9803 0933, using our online booking form, or through our AI phone assistant which is available 24/7.'
      },
      {
        q: 'What should I bring to my first appointment?',
        a: 'Please bring your Medicare card, health fund card (if applicable), any relevant medical records, and a list of medications you are currently taking.'
      },
      {
        q: 'Can I book same-day appointments?',
        a: 'We do our best to accommodate same-day appointments, especially for dental emergencies. Please call us as early as possible, and we will try to fit you in.'
      },
      {
        q: 'What is your cancellation policy?',
        a: 'We ask for at least 24 hours notice if you need to cancel or reschedule your appointment. This allows us to offer the time slot to other patients who may need care.'
      },
    ]
  },
  {
    name: 'Payments & Insurance',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept cash, EFTPOS, Visa, Mastercard, and American Express. We also offer HICAPS for on-the-spot health fund claims.'
      },
      {
        q: 'Do you accept health insurance?',
        a: 'Yes, we accept all major health funds. With our HICAPS facility, you can claim your rebate on the spot and only pay the gap amount.'
      },
      {
        q: 'Do you offer payment plans?',
        a: 'Yes, we offer interest-free payment plans for eligible patients. Please speak to our team about the options available for your treatment.'
      },
      {
        q: 'How much does a check-up cost?',
        a: 'The cost of a check-up varies depending on the treatment required. We provide transparent pricing and will always discuss costs with you before proceeding with any treatment.'
      },
    ]
  },
  {
    name: 'Treatments',
    questions: [
      {
        q: 'Do you offer emergency dental services?',
        a: 'Yes, we provide emergency dental care for patients experiencing severe pain, trauma, or other urgent dental issues. Call us immediately, and we will prioritize your care.'
      },
      {
        q: 'Is teeth whitening safe?',
        a: 'Professional teeth whitening is a safe and effective way to brighten your smile when performed under dental supervision. We will assess your suitability and recommend the best option for you.'
      },
      {
        q: 'How long do dental implants last?',
        a: 'With proper care and maintenance, dental implants can last a lifetime. They are designed to be a permanent solution for missing teeth and have a very high success rate.'
      },
      {
        q: 'Do you offer sedation for anxious patients?',
        a: 'We understand dental anxiety and offer various options to help patients feel comfortable, including gentle techniques and a calm environment. Please discuss your concerns with us before your appointment.'
      },
    ]
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null)

  const toggleQuestion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id)
  }

  return (
    <div>
      {/* Hero */}
      <section className="gradient-blue text-white py-16">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Find answers to common questions about our dental services
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          {faqCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-display font-bold mb-6 text-star-blue">
                {category.name}
              </h2>
              <div className="space-y-4">
                {category.questions.map((item, qIndex) => {
                  const id = `${catIndex}-${qIndex}`
                  const isOpen = openIndex === id

                  return (
                    <div
                      key={id}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(id)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900">{item.q}</span>
                        <ChevronDown
                          className={`text-star-blue transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          size={20}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-6 pb-4 text-gray-600">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6">Still Have Questions?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Our friendly team is here to help. Get in touch and we'll be happy to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary inline-flex items-center justify-center gap-2">
                <MessageSquare size={20} />
                Contact Us
              </Link>
              <a href="tel:+61398030933" className="btn-secondary inline-flex items-center justify-center gap-2">
                <Phone size={20} />
                (03) 9803 0933
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
