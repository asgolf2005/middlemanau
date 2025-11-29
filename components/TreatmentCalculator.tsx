'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, DollarSign, CreditCard, Calendar, CheckCircle, AlertCircle, Info, Heart } from 'lucide-react'

interface Treatment {
  id: string
  name: string
  category: string
  basePrice: number
  duration: string
  icon: string
}

interface HealthFund {
  id: string
  name: string
  coverage: {
    general: number
    major: number
    orthodontics: number
  }
}

const treatments: Treatment[] = [
  // General Dentistry
  { id: 'checkup', name: 'Check-up & Clean', category: 'general', basePrice: 180, duration: '60 min', icon: '🦷' },
  { id: 'filling', name: 'Dental Filling (per tooth)', category: 'general', basePrice: 200, duration: '45 min', icon: '🦷' },
  { id: 'rootcanal', name: 'Root Canal Treatment', category: 'major', basePrice: 1500, duration: '90 min', icon: '🦷' },
  { id: 'extraction', name: 'Tooth Extraction (simple)', category: 'major', basePrice: 250, duration: '30 min', icon: '🦷' },
  { id: 'extraction-complex', name: 'Tooth Extraction (complex)', category: 'major', basePrice: 450, duration: '60 min', icon: '🦷' },
  { id: 'crown', name: 'Dental Crown', category: 'major', basePrice: 1800, duration: '120 min', icon: '👑' },
  { id: 'bridge', name: 'Dental Bridge (3 units)', category: 'major', basePrice: 4500, duration: '180 min', icon: '🌉' },

  // Cosmetic Dentistry
  { id: 'whitening', name: 'Teeth Whitening (in-office)', category: 'cosmetic', basePrice: 600, duration: '90 min', icon: '✨' },
  { id: 'whitening-home', name: 'Take-Home Whitening Kit', category: 'cosmetic', basePrice: 450, duration: 'N/A', icon: '✨' },
  { id: 'veneer', name: 'Porcelain Veneer (per tooth)', category: 'cosmetic', basePrice: 1600, duration: '120 min', icon: '💎' },
  { id: 'bonding', name: 'Composite Bonding (per tooth)', category: 'cosmetic', basePrice: 400, duration: '60 min', icon: '✨' },

  // Dental Implants
  { id: 'implant-single', name: 'Single Dental Implant', category: 'major', basePrice: 3500, duration: '120 min', icon: '🦷' },
  { id: 'implant-multiple', name: 'Multiple Implants (3-4)', category: 'major', basePrice: 12000, duration: '240 min', icon: '🦷' },
  { id: 'all-on-4', name: 'All-on-4 Full Arch', category: 'major', basePrice: 20000, duration: '300 min', icon: '🦷' },

  // Orthodontics
  { id: 'invisalign', name: 'Invisalign (full treatment)', category: 'orthodontics', basePrice: 7500, duration: '12-18 months', icon: '😁' },
  { id: 'braces-metal', name: 'Metal Braces', category: 'orthodontics', basePrice: 6500, duration: '18-24 months', icon: '😁' },
  { id: 'braces-ceramic', name: 'Ceramic Braces', category: 'orthodontics', basePrice: 8000, duration: '18-24 months', icon: '😁' },
  { id: 'retainer', name: 'Retainer (set)', category: 'orthodontics', basePrice: 600, duration: 'N/A', icon: '😁' },

  // Children's Dentistry
  { id: 'kids-checkup', name: 'Children\'s Check-up', category: 'general', basePrice: 160, duration: '45 min', icon: '👶' },
  { id: 'kids-fluoride', name: 'Fluoride Treatment', category: 'general', basePrice: 80, duration: '15 min', icon: '👶' },
  { id: 'fissure-sealant', name: 'Fissure Sealant (per tooth)', category: 'general', basePrice: 60, duration: '15 min', icon: '👶' },

  // Emergency
  { id: 'emergency', name: 'Emergency Consultation', category: 'general', basePrice: 220, duration: '30 min', icon: '🚨' },
]

const healthFunds: HealthFund[] = [
  {
    id: 'none',
    name: 'No Health Insurance',
    coverage: { general: 0, major: 0, orthodontics: 0 }
  },
  {
    id: 'bupa-basic',
    name: 'BUPA Basic',
    coverage: { general: 60, major: 40, orthodontics: 0 }
  },
  {
    id: 'bupa-top',
    name: 'BUPA Top Extras',
    coverage: { general: 80, major: 60, orthodontics: 50 }
  },
  {
    id: 'medibank-basic',
    name: 'Medibank Basic',
    coverage: { general: 55, major: 35, orthodontics: 0 }
  },
  {
    id: 'medibank-top',
    name: 'Medibank Top',
    coverage: { general: 85, major: 65, orthodontics: 60 }
  },
  {
    id: 'hcf-basic',
    name: 'HCF Basic',
    coverage: { general: 60, major: 40, orthodontics: 0 }
  },
  {
    id: 'hcf-top',
    name: 'HCF Top Cover',
    coverage: { general: 80, major: 60, orthodontics: 55 }
  },
  {
    id: 'nib-basic',
    name: 'NIB Starter',
    coverage: { general: 50, major: 30, orthodontics: 0 }
  },
  {
    id: 'nib-top',
    name: 'NIB Top Extras',
    coverage: { general: 75, major: 55, orthodontics: 50 }
  },
]

export default function TreatmentCalculator() {
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([])
  const [selectedFund, setSelectedFund] = useState<string>('none')
  const [showPaymentPlan, setShowPaymentPlan] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', name: 'All Treatments', icon: '🦷' },
    { id: 'general', name: 'General', icon: '🦷' },
    { id: 'cosmetic', name: 'Cosmetic', icon: '✨' },
    { id: 'major', name: 'Major', icon: '👑' },
    { id: 'orthodontics', name: 'Orthodontics', icon: '😁' },
  ]

  const filteredTreatments = selectedCategory === 'all'
    ? treatments
    : treatments.filter(t => t.category === selectedCategory)

  const toggleTreatment = (treatmentId: string) => {
    setSelectedTreatments(prev =>
      prev.includes(treatmentId)
        ? prev.filter(id => id !== treatmentId)
        : [...prev, treatmentId]
    )
  }

  const calculateTotal = () => {
    const selectedTreatmentObjects = treatments.filter(t => selectedTreatments.includes(t.id))
    const subtotal = selectedTreatmentObjects.reduce((sum, t) => sum + t.basePrice, 0)

    const fund = healthFunds.find(f => f.id === selectedFund)
    if (!fund || fund.id === 'none') {
      return {
        subtotal,
        insuranceCoverage: 0,
        gapPayment: subtotal,
        perMonth: subtotal / 12
      }
    }

    // Calculate weighted coverage based on treatment categories
    let totalCoverage = 0
    selectedTreatmentObjects.forEach(treatment => {
      const coveragePercent = fund.coverage[treatment.category as keyof typeof fund.coverage] || 0
      totalCoverage += (treatment.basePrice * coveragePercent) / 100
    })

    return {
      subtotal,
      insuranceCoverage: totalCoverage,
      gapPayment: subtotal - totalCoverage,
      perMonth: (subtotal - totalCoverage) / 12
    }
  }

  const totals = calculateTotal()

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-2 bg-star-blue/10 text-star-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Calculator size={18} />
          Treatment Cost Calculator
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gray-900">
          Estimate Your Treatment Cost
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Select your treatments and health insurance to get an instant cost estimate. All prices include GST.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Treatment Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Filter */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Heart className="text-star-blue" size={20} />
              Select Treatment Category
            </h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-star-blue text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Treatment List */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="text-star-blue" size={20} />
              Available Treatments
            </h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {filteredTreatments.map((treatment) => {
                const isSelected = selectedTreatments.includes(treatment.id)
                return (
                  <motion.button
                    key={treatment.id}
                    onClick={() => toggleTreatment(treatment.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      isSelected
                        ? 'border-star-blue bg-star-blue/5'
                        : 'border-gray-200 hover:border-star-blue/50 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                          isSelected ? 'bg-star-blue text-white' : 'bg-gray-100'
                        }`}>
                          {isSelected ? '✓' : treatment.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{treatment.name}</h4>
                          <p className="text-sm text-gray-500">{treatment.duration}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-star-blue">
                          ${treatment.basePrice.toLocaleString()}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          treatment.category === 'general' ? 'bg-blue-100 text-blue-700' :
                          treatment.category === 'cosmetic' ? 'bg-purple-100 text-purple-700' :
                          treatment.category === 'major' ? 'bg-orange-100 text-orange-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {treatment.category}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Health Insurance Selection */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="text-star-blue" size={20} />
              Your Health Insurance
            </h3>
            <select
              value={selectedFund}
              onChange={(e) => setSelectedFund(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-star-blue focus:outline-none font-medium"
            >
              {healthFunds.map((fund) => (
                <option key={fund.id} value={fund.id}>
                  {fund.name}
                  {fund.id !== 'none' && ` (General: ${fund.coverage.general}%, Major: ${fund.coverage.major}%)`}
                </option>
              ))}
            </select>
            <div className="mt-3 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
              <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-blue-900">
                Coverage percentages are estimates. Your actual rebate may vary based on your policy limits and waiting periods.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Cost Summary (Sticky) */}
        <div className="lg:col-span-1">
          <motion.div
            className="bg-gradient-to-br from-star-blue to-star-blue-dark rounded-2xl shadow-2xl p-6 text-white sticky top-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <DollarSign size={24} />
              Cost Summary
            </h3>

            {selectedTreatments.length === 0 ? (
              <div className="text-center py-12">
                <Calculator size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-white/80">Select treatments to see cost estimate</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Selected Treatments */}
                <div>
                  <h4 className="text-sm font-semibold text-white/80 mb-3">Selected Treatments ({selectedTreatments.length})</h4>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {treatments
                      .filter(t => selectedTreatments.includes(t.id))
                      .map((treatment) => (
                        <div key={treatment.id} className="flex justify-between items-center text-sm">
                          <span className="text-white/90">{treatment.name}</span>
                          <span className="font-bold">${treatment.basePrice.toLocaleString()}</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="border-t border-white/20 pt-4 space-y-3">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Subtotal</span>
                    <span className="text-2xl font-bold">${totals.subtotal.toLocaleString()}</span>
                  </div>

                  {/* Insurance Coverage */}
                  {totals.insuranceCoverage > 0 && (
                    <div className="flex justify-between items-center text-green-300">
                      <span>Insurance Coverage</span>
                      <span className="font-bold">-${totals.insuranceCoverage.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Gap Payment */}
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold">Your Gap Payment</span>
                      <span className="text-3xl font-bold">${totals.gapPayment.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-white/70">Total amount you pay</p>
                  </div>

                  {/* Payment Plan */}
                  <motion.button
                    onClick={() => setShowPaymentPlan(!showPaymentPlan)}
                    className="w-full bg-white/20 hover:bg-white/30 rounded-xl p-3 flex items-center justify-between transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center gap-2">
                      <Calendar size={18} />
                      Payment Plan
                    </span>
                    <motion.span
                      animate={{ rotate: showPaymentPlan ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ▼
                    </motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {showPaymentPlan && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-white/10 rounded-xl p-4 space-y-2"
                      >
                        <div className="flex justify-between">
                          <span>6 months</span>
                          <span className="font-bold">${(totals.gapPayment / 6).toFixed(2)}/month</span>
                        </div>
                        <div className="flex justify-between">
                          <span>12 months</span>
                          <span className="font-bold">${(totals.gapPayment / 12).toFixed(2)}/month</span>
                        </div>
                        <div className="flex justify-between">
                          <span>18 months</span>
                          <span className="font-bold">${(totals.gapPayment / 18).toFixed(2)}/month</span>
                        </div>
                        <div className="flex justify-between">
                          <span>24 months</span>
                          <span className="font-bold">${(totals.gapPayment / 24).toFixed(2)}/month</span>
                        </div>
                        <p className="text-xs text-white/60 mt-3">
                          Interest-free payment plans available. Subject to approval.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 pt-4">
                  <a
                    href="/book"
                    className="block w-full bg-white hover:bg-gray-100 text-star-blue font-bold py-3 px-6 rounded-xl text-center transition-colors"
                  >
                    Book Consultation
                  </a>
                  <a
                    href="tel:+61395620675"
                    className="block w-full border-2 border-white/30 hover:bg-white/10 text-white font-bold py-3 px-6 rounded-xl text-center transition-colors"
                  >
                    Call (03) 9562 0675
                  </a>
                </div>

                {/* Disclaimer */}
                <div className="pt-4 border-t border-white/20">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="flex-shrink-0 mt-0.5" size={16} />
                    <p className="text-xs text-white/70">
                      This is an estimate only. Final costs may vary based on individual circumstances and treatment complexity. A consultation is required for accurate pricing.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Additional Info Section */}
      <motion.div
        className="mt-12 bg-gradient-to-r from-star-blue/10 to-star-blue-light/10 rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Star Smiles?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-star-blue flex-shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Interest-Free Payment Plans</h4>
                <p className="text-sm text-gray-600">Flexible financing options up to 24 months</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-star-blue flex-shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">HICAPS Available</h4>
                <p className="text-sm text-gray-600">Instant health fund claims on the spot</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-star-blue flex-shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">No Hidden Fees</h4>
                <p className="text-sm text-gray-600">Transparent pricing with detailed quotes</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
