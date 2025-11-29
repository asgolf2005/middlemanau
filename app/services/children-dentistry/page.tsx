'use client'

import Link from 'next/link'
import { ArrowRight, Check, Heart, Shield, Smile } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ChildrenDentistryPage() {
  const services = [
    {
      name: 'First Dental Visit',
      description: 'Gentle introduction to dental care for your child. We recommend the first visit by age 1 or when the first tooth appears.',
      icon: '👶'
    },
    {
      name: 'Regular Check-ups',
      description: 'Comprehensive examinations to monitor your child\'s dental development and catch any issues early.',
      icon: '🦷'
    },
    {
      name: 'Professional Cleanings',
      description: 'Gentle yet thorough cleanings to remove plaque and prevent cavities in a child-friendly environment.',
      icon: '✨'
    },
    {
      name: 'Fluoride Treatments',
      description: 'Protective treatments that strengthen tooth enamel and help prevent decay.',
      icon: '🛡️'
    },
    {
      name: 'Fissure Sealants',
      description: 'Protective coatings applied to molars to prevent cavities in hard-to-brush areas.',
      icon: '🔒'
    },
    {
      name: 'Tooth-Colored Fillings',
      description: 'If cavities do occur, we use safe, natural-looking materials to restore your child\'s teeth.',
      icon: '🎨'
    },
    {
      name: 'Habit Counseling',
      description: 'Guidance on thumb sucking, pacifier use, and other habits that may affect dental development.',
      icon: '💭'
    },
    {
      name: 'Emergency Care',
      description: 'Prompt treatment for dental injuries, toothaches, and other urgent issues in children.',
      icon: '🚑'
    }
  ]

  const ageGuide = [
    { age: '0-2 years', focus: 'First visit, teething support, cleaning guidance' },
    { age: '3-5 years', focus: 'Regular check-ups, fluoride, cavity prevention' },
    { age: '6-12 years', focus: 'Sealants, orthodontic assessment, permanent teeth care' },
    { age: '13+ years', focus: 'Orthodontics, wisdom teeth monitoring, adult care transition' }
  ]

  const tips = [
    'Start brushing as soon as the first tooth appears',
    'Use a pea-sized amount of fluoride toothpaste from age 2',
    'Help children brush until age 6-7',
    'Limit sugary snacks and drinks',
    'Make dental care fun with songs or games',
    'Visit the dentist every 6 months'
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
                <Smile size={18} />
                <span>Gentle Care for Little Smiles</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Children's Dentistry
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Creating positive dental experiences that build healthy habits for life. Our friendly team makes every visit fun and comfortable for your child.
            </p>
            <Link href="/book" className="bg-white text-slate-900 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg inline-flex items-center gap-2 shadow-xl transition-all hover:scale-105">
              Schedule Your Child's Visit <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>

        {/* Professional accent element */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-star-blue/20 to-transparent rounded-full blur-3xl" />
      </section>

      {/* Our Approach */}
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
                A Positive Start to Dental Health
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We believe that positive early dental experiences set the foundation for a lifetime of good oral health. Our child-friendly approach helps children feel comfortable and even excited about visiting the dentist.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our team is specially trained to work with children of all ages, from infants to teenagers. We take the time to explain procedures in age-appropriate language and use gentle techniques that minimize anxiety.
              </p>
              <p className="text-lg text-gray-600">
                At Star Smiles, we partner with parents to educate families on proper oral hygiene habits that will protect your child's smile throughout their life.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-star-blue/5 rounded-xl p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-star-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Gentle & Patient</h3>
                    <p className="text-gray-600">We take our time to ensure every child feels safe and comfortable</p>
                  </div>
                </div>
                <div className="bg-star-blue/5 rounded-xl p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-star-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Prevention Focused</h3>
                    <p className="text-gray-600">We emphasize preventive care to avoid future dental problems</p>
                  </div>
                </div>
                <div className="bg-star-blue/5 rounded-xl p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-star-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <Smile className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Fun Environment</h3>
                    <p className="text-gray-600">Our welcoming space makes dental visits enjoyable</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
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
              Our Pediatric Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive dental care tailored for children
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                className="bg-white rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Age Guide */}
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
              Dental Care by Age
            </h2>
            <p className="text-xl text-gray-600">
              What to expect at each stage of your child's dental development
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ageGuide.map((stage, index) => (
              <motion.div
                key={stage.age}
                className="bg-gradient-to-br from-star-blue to-star-blue-light rounded-xl p-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-3">{stage.age}</h3>
                <p className="text-white/90">{stage.focus}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips for Parents */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold mb-6">
                Tips for Parents
              </h2>
              <p className="text-xl text-gray-600">
                Help your child develop healthy dental habits at home
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tips.map((tip, index) => (
                <motion.div
                  key={tip}
                  className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Check className="text-star-blue flex-shrink-0" size={20} />
                  <span className="text-gray-700">{tip}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-star-blue to-star-blue-light rounded-3xl p-12 md:p-16 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Give Your Child the Gift of a Healthy Smile
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Book your child's dental appointment today and start them on the path to excellent oral health.
            </p>
            <Link href="/book" className="bg-white text-star-blue hover:bg-gray-100 font-semibold py-4 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2">
              Book Your Child's Visit
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
