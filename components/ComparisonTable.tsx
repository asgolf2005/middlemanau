'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

interface ComparisonFeature {
  feature: string
  starSmiles: boolean
  others: boolean
  highlight?: boolean
}

interface ComparisonTableProps {
  title?: string
  description?: string
  features: ComparisonFeature[]
}

export default function ComparisonTable({
  title = "Why Choose Star Smiles?",
  description = "See how we compare to other dental practices",
  features
}: ComparisonTableProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {title && (
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gray-900">
            {title}
          </h2>
          {description && (
            <p className="text-xl text-gray-600">{description}</p>
          )}
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-3 gap-4 bg-gradient-to-r from-star-blue to-star-blue-light p-6 text-white">
          <div className="text-sm font-medium">Features</div>
          <div className="text-center">
            <div className="text-lg font-bold">Star Smiles</div>
            <div className="text-sm opacity-90">Dental Centre</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">Others</div>
            <div className="text-sm opacity-90">Typical Clinics</div>
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-200">
          {features.map((item, index) => (
            <motion.div
              key={index}
              className={`grid grid-cols-3 gap-4 p-6 items-center ${
                item.highlight ? 'bg-star-blue/5' : ''
              }`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`text-gray-900 font-medium ${item.highlight ? 'text-star-blue' : ''}`}>
                {item.feature}
                {item.highlight && (
                  <div className="text-xs text-star-orange font-normal mt-1">
                    ⭐ Premium Feature
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                {item.starSmiles ? (
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="text-green-600" size={24} strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <X className="text-red-600" size={24} strokeWidth={3} />
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                {item.others ? (
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="text-green-600" size={24} strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <X className="text-red-600" size={24} strokeWidth={3} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-star-orange to-star-orange-dark p-8 text-center text-white">
          <p className="text-lg font-semibold mb-4">
            Experience the Star Smiles difference today
          </p>
          <button className="bg-white text-star-orange hover:bg-gray-100 font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
            Book Your Appointment
          </button>
        </div>
      </div>
    </div>
  )
}
