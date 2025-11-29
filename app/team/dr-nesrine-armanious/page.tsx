'use client'

import Link from 'next/link'
import { ArrowRight, ArrowLeft, GraduationCap, Award, Heart, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export default function DrNesrineArmaniousPage() {
  const qualifications = [
    'Bachelor of Dental Surgery (BDS)',
    'Member, Australian Dental Association',
    'Certificate in Restorative Dentistry',
    'Continuing Education in Family Dentistry',
    'Advanced Training in Preventive Care'
  ]

  const specialties = [
    'General Dentistry',
    'Family Dentistry',
    'Preventive Care',
    'Restorative Dentistry',
    'Dental Fillings',
    'Patient Education'
  ]

  const philosophy = [
    'Every patient deserves personalized care',
    'Education empowers better oral health',
    'Building trust through gentle treatment',
    'Family-centered approach to dentistry',
    'Comprehensive care for all ages'
  ]

  return (
    <div>
      {/* Hero */}
      <section className="gradient-blue text-white py-24">
        <div className="container-custom">
          <Link href="/team" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} />
            Back to Team
          </Link>
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <p className="text-star-accent mb-2">General Dentist</p>
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                Dr. Nesrine Armanious
              </h1>
              <p className="text-xl text-white/90 mb-6">
                BDS
              </p>
              <p className="text-lg text-white/80 mb-8">
                Dr. Nesrine brings over 10 years of experience in family dentistry, with a passion for preventive care and helping patients of all ages achieve optimal oral health.
              </p>
              <Link href="/book" className="btn-primary bg-white text-star-blue hover:bg-gray-100 inline-flex items-center gap-2">
                Book with Dr. Nesrine
                <ArrowRight size={20} />
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 rounded-full bg-white/20 flex items-center justify-center">
                <Users size={120} className="text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold mb-6">About Dr. Nesrine</h2>
              <p className="text-lg text-gray-600 mb-6">
                Dr. Nesrine Armanious joined Star Smiles Dental Centre with a commitment to providing gentle, comprehensive dental care for families. Her approach combines clinical expertise with a warm, caring manner that puts patients at ease.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                She believes strongly in the power of preventive dentistry and patient education. By taking time to explain treatments and home care techniques, she empowers patients to take control of their oral health and prevent problems before they start.
              </p>
              <p className="text-lg text-gray-600">
                Dr. Nesrine has a particular interest in family dentistry, enjoying the opportunity to care for patients across generations and building lasting relationships with the families she serves.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="text-star-blue" size={28} />
                  <h3 className="text-xl font-semibold">Qualifications</h3>
                </div>
                <ul className="space-y-2">
                  {qualifications.map(qual => (
                    <li key={qual} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-star-blue rounded-full"></div>
                      {qual}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="text-star-blue" size={28} />
                  <h3 className="text-xl font-semibold">Experience</h3>
                </div>
                <p className="text-3xl font-bold text-star-blue mb-2">10+ Years</p>
                <p className="text-gray-600">Specializing in family dentistry</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-6">Areas of Expertise</h2>
            <p className="text-xl text-gray-600">Focused on family and preventive care</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {specialties.map((specialty, index) => (
              <motion.div
                key={specialty}
                className="bg-white rounded-xl p-4 text-center shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <p className="text-star-blue font-medium">{specialty}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Heart className="text-star-blue mx-auto mb-4" size={48} />
              <h2 className="text-4xl font-display font-bold mb-6">Treatment Philosophy</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {philosophy.map((item, index) => (
                <motion.div
                  key={item}
                  className="bg-star-blue/5 rounded-xl p-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <p className="text-lg text-gray-700">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-star-blue to-star-blue-light rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-display font-bold mb-6">
              Book an Appointment with Dr. Nesrine
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Experience gentle, family-focused dental care. Schedule your visit today.
            </p>
            <Link href="/book" className="bg-white text-star-blue hover:bg-gray-100 font-semibold py-4 px-10 rounded-lg transition-all duration-300 inline-flex items-center gap-2">
              Book Appointment
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
