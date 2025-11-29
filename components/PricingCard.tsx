'use client'

import { motion } from 'framer-motion'
import { Check, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingCardProps {
  title: string
  description: string
  price: string
  priceDescription?: string
  features: PricingFeature[]
  popular?: boolean
  ctaText?: string
  ctaLink?: string
  color?: 'blue' | 'orange' | 'purple'
}

export default function PricingCard({
  title,
  description,
  price,
  priceDescription = 'Starting from',
  features,
  popular = false,
  ctaText = 'Book Consultation',
  ctaLink = '/book',
  color = 'blue'
}: PricingCardProps) {
  const colorClasses = {
    blue: {
      gradient: 'from-star-blue to-star-blue-light',
      badge: 'bg-star-blue/10 text-star-blue',
      button: 'bg-star-blue hover:bg-star-blue-dark',
      border: 'border-star-blue'
    },
    orange: {
      gradient: 'from-star-orange to-star-orange-dark',
      badge: 'bg-star-orange/10 text-star-orange',
      button: 'bg-star-orange hover:bg-star-orange-dark',
      border: 'border-star-orange'
    },
    purple: {
      gradient: 'from-purple-500 to-purple-700',
      badge: 'bg-purple-100 text-purple-700',
      button: 'bg-purple-600 hover:bg-purple-700',
      border: 'border-purple-500'
    }
  }

  const colors = colorClasses[color]

  return (
    <motion.div
      className={`relative bg-white rounded-3xl shadow-xl overflow-hidden ${
        popular ? `border-4 ${colors.border}` : 'border border-gray-200'
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className={`bg-gradient-to-r ${colors.gradient} text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2`}>
            <Star size={16} className="fill-current" />
            Most Popular
          </div>
        </div>
      )}

      <div className={`bg-gradient-to-br ${colors.gradient} p-8 text-white`}>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-white/90 text-sm mb-6">{description}</p>

        <div className="mb-2">
          <span className="text-sm font-medium opacity-90">{priceDescription}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold">{price}</span>
        </div>
      </div>

      <div className="p-8">
        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              {feature.included ? (
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="text-green-600" size={16} strokeWidth={3} />
                </div>
              ) : (
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gray-400 text-xs">—</span>
                </div>
              )}
              <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        <Link
          href={ctaLink}
          className={`block w-full ${colors.button} text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] text-center flex items-center justify-center gap-2 shadow-lg`}
        >
          {ctaText}
          <ArrowRight size={20} />
        </Link>

        <p className="text-center text-xs text-gray-500 mt-4">
          * Health fund rebates may apply
        </p>
      </div>
    </motion.div>
  )
}
