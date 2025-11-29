'use client'

import Link from 'next/link'
import { ArrowRight, Heart, Shield, Users, Award, Star, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'Your comfort, health, and satisfaction are at the heart of everything we do.'
    },
    {
      icon: Shield,
      title: 'Trust & Integrity',
      description: 'We build lasting relationships through honest, transparent communication.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We pursue the highest standards in dental care and service quality.'
    },
    {
      icon: Users,
      title: 'Family-Focused',
      description: 'We treat patients of all ages, providing comprehensive care for the whole family.'
    }
  ]

  const stats = [
    { number: '10+', label: 'Years Serving Wheelers Hill' },
    { number: '5000+', label: 'Happy Patients' },
    { number: '3', label: 'Expert Dentists' },
    { number: '4.9', label: 'Average Rating', icon: Star }
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

        {/* Floating animated blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-star-blue/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-star-orange/20 rounded-full blur-3xl animate-blob animation-delay-400" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-800" />

        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
              Our Story & Values
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
              About Star Smiles
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Excellence in Family Dentistry. Creating amazing smiles for over 10 years in Wheelers Hill.
            </p>
          </motion.div>
        </div>

        {/* Professional accent element */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-star-blue/20 to-transparent rounded-full blur-3xl" />
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Star Smiles Dental Centre was founded with a simple mission: to provide exceptional dental care in a warm, welcoming environment. Since opening our doors in Wheelers Hill over a decade ago, we've been proud to serve the local community with comprehensive dental services.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Led by Dr. Nalini Prasad, our practice has grown from a single practitioner to a team of three experienced dentists, each bringing their unique expertise and passion for dentistry. We've built our reputation on a foundation of clinical excellence, advanced technology, and genuine care for our patients.
              </p>
              <p className="text-lg text-gray-600">
                At Star Smiles, our focus is on prevention first and then cure. We help protect you and your family from dental problems through education, regular check-ups, and personalized treatment plans that prioritize your long-term oral health.
              </p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-star-blue-light to-star-blue rounded-3xl p-12 text-white">
                <div className="grid grid-cols-2 gap-8">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-4xl font-bold mb-2 flex items-center gap-2">
                        {stat.number}
                        {stat.icon && <stat.icon size={32} fill="currentColor" />}
                      </div>
                      <div className="text-white/80">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide our practice every day
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white rounded-2xl p-8 shadow-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-star-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Why Choose Star Smiles
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Experienced Team',
                description: 'Our dentists bring decades of combined experience and continuously update their skills with the latest techniques and technologies.'
              },
              {
                title: 'Modern Technology',
                description: 'We invest in advanced dental equipment and digital technology to provide accurate diagnoses and comfortable treatments.'
              },
              {
                title: 'Flexible Appointments',
                description: 'We offer extended hours and Saturday appointments to accommodate your busy schedule, including same-day emergency care.'
              },
              {
                title: 'Comfortable Environment',
                description: 'Our modern, welcoming clinic is designed to make you feel relaxed and at ease throughout your visit.'
              },
              {
                title: 'Comprehensive Services',
                description: 'From routine check-ups to complex procedures, we offer a full range of dental services under one roof.'
              },
              {
                title: 'Affordable Care',
                description: 'We accept all health funds, offer payment plans, and provide transparent pricing with no hidden fees.'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-star-blue">{item.title}</h3>
                <p className="text-gray-600 text-lg">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-star-blue to-star-blue-light rounded-3xl p-12 md:p-16 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Experience the Star Smiles Difference
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join our family of satisfied patients. Book your appointment today and discover why families trust us for their dental care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book" className="bg-white text-star-blue hover:bg-gray-100 font-semibold py-4 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2">
                Book Appointment
                <ArrowRight size={20} />
              </Link>
              <Link href="/team" className="bg-white/10 text-white hover:bg-white/20 font-semibold py-4 px-10 rounded-lg border-2 border-white transition-all duration-300 inline-flex items-center justify-center gap-2">
                Meet Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
