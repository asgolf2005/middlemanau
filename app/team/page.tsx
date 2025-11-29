'use client'

import Link from 'next/link'
import { ArrowRight, Users, GraduationCap, Award } from 'lucide-react'
import { motion } from 'framer-motion'

export default function TeamPage() {
  const doctors = [
    {
      name: 'Dr. Nalini Prasad',
      role: 'Principal Dentist & Practice Owner',
      qualifications: 'BDS, MDS',
      specialties: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Preventive Care'],
      experience: '15+ years',
      bio: 'Dr. Nalini Prasad is the principal dentist and founder of Star Smiles Dental Centre. With over 15 years of experience, she is dedicated to providing excellence in family dentistry with a focus on patient comfort and comprehensive care.',
      link: '/team/dr-nalini-prasad'
    },
    {
      name: 'Dr. Nesrine Armanious',
      role: 'General Dentist',
      qualifications: 'BDS',
      specialties: ['General Dentistry', 'Family Dentistry', 'Preventive Care', 'Restorative Dentistry'],
      experience: '10+ years',
      bio: 'Dr. Nesrine brings a gentle touch and comprehensive approach to general dentistry. She is passionate about helping families achieve optimal oral health through preventive care and patient education.',
      link: '/team/dr-nesrine-armanious'
    },
    {
      name: 'Dr. Momina',
      role: 'General Dentist',
      qualifications: 'BDS',
      specialties: ['Pediatric Dentistry', 'Cosmetic Dentistry', 'General Dentistry', 'Orthodontics'],
      experience: '8+ years',
      bio: 'Dr. Momina specializes in creating comfortable dental experiences for patients of all ages. She has a particular interest in pediatric dentistry and cosmetic treatments.',
      link: '/team/dr-momina'
    }
  ]

  return (
    <div>
      {/* Hero */}
      <section className="gradient-blue text-white py-24">
        <div className="container-custom">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Meet Our Expert Team
            </h1>
            <p className="text-xl text-white/90">
              Experienced dental professionals dedicated to your oral health and creating beautiful, healthy smiles for the whole family.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={doctor.link}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-xl card-hover h-full">
                    {/* Image Placeholder */}
                    <div className="h-96 bg-gradient-to-br from-star-blue-light to-star-blue flex items-center justify-center">
                      <div className="w-40 h-40 rounded-full bg-white/20 flex items-center justify-center">
                        <Users size={80} className="text-white" />
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <h2 className="text-2xl font-semibold mb-2">{doctor.name}</h2>
                      <p className="text-star-blue font-semibold mb-2">{doctor.role}</p>
                      <p className="text-gray-600 mb-4">{doctor.qualifications}</p>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <GraduationCap size={16} className="text-star-blue" />
                          <span>{doctor.experience} experience</span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-gray-600 line-clamp-3">{doctor.bio}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {doctor.specialties.slice(0, 3).map(specialty => (
                          <span key={specialty} className="px-3 py-1 bg-star-blue/10 text-star-blue rounded-full text-sm">
                            {specialty}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center text-star-blue font-semibold">
                        View Full Profile
                        <ArrowRight size={20} className="ml-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-center mb-12">Why Choose Star Smiles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-star-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert Qualifications</h3>
                <p className="text-gray-600">Highly qualified dental professionals with advanced training and certifications</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-star-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Patient-Centered Care</h3>
                <p className="text-gray-600">Your comfort and satisfaction are our top priorities</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-star-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Continuous Learning</h3>
                <p className="text-gray-600">Staying current with the latest techniques and technologies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-star-blue to-star-blue-light rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-display font-bold mb-6">Ready to Meet Our Team?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Schedule your appointment today and experience the Star Smiles difference.
            </p>
            <Link href="/book" className="bg-white text-star-blue hover:bg-gray-100 font-semibold py-4 px-10 rounded-lg inline-flex items-center gap-2">
              Book Appointment <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
