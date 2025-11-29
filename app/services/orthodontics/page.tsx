'use client'

import Link from 'next/link'
import { ArrowRight, Check, Clock, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export default function OrthodonticsPage() {
  const treatments = [
    {
      name: 'Traditional Metal Braces',
      description: 'Time-tested and highly effective for correcting complex alignment issues.',
      ideal: 'Complex cases, severe crowding, significant bite issues',
      duration: '18-24 months'
    },
    {
      name: 'Ceramic Braces',
      description: 'Clear or tooth-colored brackets that blend with your natural teeth.',
      ideal: 'Adults and teens wanting a discreet option',
      duration: '18-24 months'
    },
    {
      name: 'Clear Aligners',
      description: 'Removable, virtually invisible trays that gradually straighten teeth.',
      ideal: 'Mild to moderate alignment issues, adults',
      duration: '12-18 months'
    },
    {
      name: 'Retainers',
      description: 'Custom-made devices to maintain your beautiful new smile after treatment.',
      ideal: 'Post-orthodontic maintenance',
      duration: 'Ongoing use'
    }
  ]

  const issues = [
    'Crooked teeth',
    'Overcrowding',
    'Gaps between teeth',
    'Overbite',
    'Underbite',
    'Crossbite',
    'Open bite',
    'Misaligned jaw'
  ]

  const benefits = [
    { title: 'Improved Appearance', description: 'Achieve a straighter, more beautiful smile' },
    { title: 'Better Oral Health', description: 'Easier to clean and maintain straight teeth' },
    { title: 'Enhanced Function', description: 'Proper bite alignment for comfortable chewing' },
    { title: 'Increased Confidence', description: 'Feel proud to show off your smile' },
    { title: 'Long-term Results', description: 'Enjoy your new smile for life with proper care' },
    { title: 'Preventive Care', description: 'Reduce risk of future dental problems' }
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
              Teeth Straightening Solutions
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Orthodontics
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Straighten your teeth and achieve the perfect smile with our comprehensive orthodontic treatments. Options for every age and lifestyle.
            </p>
            <Link href="/book" className="bg-white text-slate-900 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg inline-flex items-center gap-2 shadow-xl transition-all hover:scale-105">
              Schedule Consultation <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>

        {/* Professional accent element */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-star-blue/20 to-transparent rounded-full blur-3xl" />
      </section>

      {/* Introduction */}
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
                A Straighter Smile at Any Age
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Orthodontic treatment isn't just for teenagers. Today's advanced orthodontic options make it easier than ever for adults to achieve the smile they've always wanted. At Star Smiles, we offer solutions tailored to your lifestyle and goals.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our orthodontic treatments correct misaligned teeth and jaws, improving not just aesthetics but also your oral health and function. Straight teeth are easier to clean, reducing the risk of cavities and gum disease.
              </p>
              <p className="text-lg text-gray-600">
                Whether you prefer traditional braces or modern clear aligners, our team will create a customized treatment plan to give you the best results in the shortest time possible.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-star-blue/5 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold mb-6">Conditions We Treat</h3>
                <div className="grid grid-cols-2 gap-4">
                  {issues.map(issue => (
                    <div key={issue} className="flex items-center gap-2">
                      <Check className="text-star-blue flex-shrink-0" size={18} />
                      <span className="text-gray-700">{issue}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Treatment Options */}
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
              Treatment Options
            </h2>
            <p className="text-xl text-gray-600">
              Choose the orthodontic solution that fits your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {treatments.map((treatment, index) => (
              <motion.div
                key={treatment.name}
                className="bg-white rounded-2xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-star-blue">{treatment.name}</h3>
                <p className="text-gray-600 mb-6">{treatment.description}</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Users size={20} className="text-star-blue mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Ideal for: </span>
                      <span className="text-gray-600">{treatment.ideal}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={20} className="text-star-blue mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Treatment time: </span>
                      <span className="text-gray-600">{treatment.duration}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
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
              Benefits of Orthodontic Treatment
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-star-blue/10 rounded-full flex items-center justify-center mb-4">
                  <Check className="text-star-blue" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
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
              Your Orthodontic Journey
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Consultation', desc: 'Assessment and treatment planning' },
                { step: '2', title: 'Fitting', desc: 'Braces or aligners are placed' },
                { step: '3', title: 'Adjustments', desc: 'Regular check-ups and progress' },
                { step: '4', title: 'Retention', desc: 'Maintain your new smile' }
              ].map((item, index) => (
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
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-star-blue to-star-blue-light rounded-3xl p-12 md:p-16 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Start Your Journey to Straighter Teeth
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Book your orthodontic consultation today and discover the best treatment option for your smile.
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
