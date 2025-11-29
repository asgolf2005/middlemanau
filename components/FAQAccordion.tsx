'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

export interface FAQItem {
  question: string
  answer: string
  category?: string
}

interface FAQAccordionProps {
  faqs: FAQItem[]
  title?: string
  description?: string
  allowMultipleOpen?: boolean
}

export default function FAQAccordion({
  faqs,
  title = "Frequently Asked Questions",
  description = "Find answers to common questions about our dental services",
  allowMultipleOpen = false
}: FAQAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([])

  const toggleFAQ = (index: number) => {
    if (allowMultipleOpen) {
      setOpenIndexes(prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      )
    } else {
      setOpenIndexes(prev =>
        prev.includes(index) ? [] : [index]
      )
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {title && (
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-star-blue/10 text-star-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <HelpCircle size={18} />
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gray-900">
            {title}
          </h2>
          {description && (
            <p className="text-xl text-gray-600">{description}</p>
          )}
        </div>
      )}

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndexes.includes(index)

          return (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 pr-4">
                  {faq.category && (
                    <span className="inline-block bg-star-blue/10 text-star-blue text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      {faq.category}
                    </span>
                  )}
                  <h3 className={`text-lg font-bold transition-colors ${
                    isOpen ? 'text-star-blue' : 'text-gray-900'
                  }`}>
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown
                    className={`transition-colors ${
                      isOpen ? 'text-star-blue' : 'text-gray-400'
                    }`}
                    size={24}
                  />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-star-blue/10 to-star-blue-light/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our friendly team is here to help. Contact us for personalized answers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+61395620675"
              className="bg-star-blue hover:bg-star-blue-dark text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              Call Us: (03) 9562 0675
            </a>
            <a
              href="/contact"
              className="bg-white hover:bg-gray-50 text-star-blue font-bold py-3 px-8 rounded-xl border-2 border-star-blue transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
