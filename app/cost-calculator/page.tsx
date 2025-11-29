'use client'

import { motion } from 'framer-motion'
import { Calculator, DollarSign, CreditCard, TrendingDown } from 'lucide-react'
import TreatmentCalculator from '@/components/TreatmentCalculator'

export default function CostCalculatorPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-blue text-white py-16">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Calculator size={16} />
              Free Cost Estimate
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
              Treatment Cost Calculator
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Get an instant, transparent estimate for your dental treatment. Select your services and health insurance to see your costs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <TreatmentCalculator />
        </div>
      </section>

      {/* Payment Options */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Flexible Payment Options
            </h2>
            <p className="text-xl text-gray-600">
              We make quality dental care affordable for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gradient-to-br from-star-blue to-star-blue-light rounded-2xl p-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <CreditCard size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">HICAPS</h3>
              <p className="text-white/90 mb-6">
                Instant health fund claims processed on the spot. Accept all major health funds including BUPA, Medibank, HCF, and NIB.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span>
                  Instant rebates
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span>
                  All major funds
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span>
                  No paperwork
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-star-orange to-orange-600 rounded-2xl p-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <TrendingDown size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Interest-Free Plans</h3>
              <p className="text-white/90 mb-6">
                Spread the cost over 6, 12, 18, or 24 months with zero interest. Make dental care more affordable.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span>
                  0% interest
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span>
                  Up to 24 months
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span>
                  Easy approval
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <DollarSign size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Direct Payment</h3>
              <p className="text-white/90 mb-6">
                Pay via cash, credit card, debit card, or bank transfer. We accept all major payment methods.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span>
                  All cards accepted
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span>
                  Bank transfer
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span>
                  Secure payments
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl font-display font-bold text-center text-gray-900 mb-12">
            Pricing FAQs
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Are these prices accurate?
              </h3>
              <p className="text-gray-600">
                These are our standard prices as of 2024. Final costs may vary based on individual circumstances, treatment complexity, and specific requirements. We provide detailed written quotes after your consultation.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What health funds do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major Australian health funds including BUPA, Medibank, HCF, NIB, Australian Unity, and more. We have HICAPS for instant claims processing.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Do you offer payment plans?
              </h3>
              <p className="text-gray-600">
                Yes! We offer interest-free payment plans from 6 to 24 months, subject to approval. This makes larger treatments more affordable by spreading the cost over time.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Can I claim with my health insurance on the spot?
              </h3>
              <p className="text-gray-600">
                Absolutely! We have HICAPS terminals that allow you to claim instantly. You only pay the gap amount, and we process your rebate on the spot.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Are there any hidden fees?
              </h3>
              <p className="text-gray-600">
                No hidden fees, ever. We believe in transparent pricing. All costs are discussed upfront, and you'll receive a detailed written quote before any treatment begins.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What if I don't have health insurance?
              </h3>
              <p className="text-gray-600">
                No problem! We offer competitive pricing for all patients. You can still access our interest-free payment plans to make treatment more affordable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-blue text-white">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Start Your Treatment?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Book a consultation to discuss your treatment options and get a personalized quote
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/book"
                className="bg-white hover:bg-gray-100 text-star-blue font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                Book Consultation
              </a>
              <a
                href="tel:+61395620675"
                className="border-2 border-white hover:bg-white/10 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                Call (03) 9562 0675
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
