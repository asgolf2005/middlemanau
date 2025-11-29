'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, DollarSign, CreditCard, Heart, CheckCircle, Calendar, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AffordabilityPage() {
  const paymentOptions = [
    {
      icon: <CreditCard size={32} />,
      title: 'Payment Plans',
      description: 'Flexible payment plans available to spread the cost of your treatment over time with no hidden fees.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Shield size={32} />,
      title: 'Health Fund Claims',
      description: 'HICAPS on-site for instant health fund claims. We accept all major Australian health funds.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <DollarSign size={32} />,
      title: 'Affordable Pricing',
      description: 'Competitive pricing without compromising on quality. Transparent quotes with no surprise costs.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Heart size={32} />,
      title: 'No One Denied',
      description: 'We believe everyone deserves quality dental care. We\'ll work with you to find a payment solution.',
      color: 'from-orange-500 to-amber-500'
    }
  ]

  const healthFunds = [
    'Bupa', 'Medibank', 'HCF', 'NIB', 'Australian Unity',
    'GMHBA', 'HBF', 'Defence Health', 'Teachers Health', 'Peoplecare'
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://starsmiles.com.au/wp-content/uploads/2023/12/AlwaysSmile-1024x768.jpg"
            alt="Affordable dental care"
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
              <span className="text-white">Affordability</span>
            </nav>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              Quality Dental Care Within Your Budget
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              At Star Smiles, we believe that no one should be denied treatment. We offer flexible payment options to make dental care accessible to everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Flexible Payment Solutions
            </h2>
            <p className="text-xl text-gray-600">
              We always discuss costs as part of your examination and treatment planning, ensuring complete transparency and no surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {paymentOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {option.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {option.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {option.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Funds */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              All Major Health Funds Accepted
            </h2>
            <p className="text-xl text-gray-600">
              Process your claim instantly with HICAPS. We're happy to talk to your health insurance provider about your coverage.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {healthFunds.map((fund, index) => (
              <motion.div
                key={fund}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 flex items-center justify-center text-center font-semibold text-gray-700 border border-gray-200 hover:border-star-blue hover:shadow-lg transition-all"
              >
                {fund}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Transparent Pricing, No Surprises
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We provide detailed treatment plans with clear cost breakdowns before any work begins.
              </p>

              <div className="space-y-4">
                {[
                  'Itemized quotes for all procedures',
                  'Health fund benefit estimates',
                  'Payment plan options discussed upfront',
                  'No hidden fees or surprise charges',
                  'Preventive care to avoid costly treatments',
                  'Comprehensive follow-up included'
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-md"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="text-star-blue flex-shrink-0" size={24} />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://starsmiles.com.au/wp-content/uploads/2023/12/DentalConsultation-1024x698.jpg"
                  alt="Dental consultation"
                  width={800}
                  height={600}
                  className="w-full"
                />
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
                Ready to Discuss Your Options?
              </h2>
              <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
                Book a consultation to discuss your treatment needs and find the payment plan that works for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book" className="bg-white text-star-orange hover:bg-star-blue hover:text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-3 text-lg shadow-lg">
                  <Calendar size={22} />
                  Book Consultation
                  <ArrowRight size={20} />
                </Link>
                <Link href="/contact" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-star-orange font-bold py-5 px-10 rounded-xl border-2 border-white/30 transition-all duration-300 inline-flex items-center justify-center gap-3 text-lg">
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
