'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Heart, Shield, Clock, Users, Award, Smile } from 'lucide-react'
import { motion } from 'framer-motion'

export default function OurPatientsPage() {
  const benefits = [
    {
      icon: <Heart size={32} />,
      title: 'Patient-Centered Care',
      description: 'Your comfort and wellbeing are our top priorities. We listen to your concerns and tailor treatments to your unique needs.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: <Shield size={32} />,
      title: 'Gentle & Pain-Free',
      description: 'We use the latest techniques and technology to ensure your dental experience is as comfortable and pain-free as possible.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Clock size={32} />,
      title: 'Flexible Scheduling',
      description: 'Convenient appointment times including early mornings, evenings, and Saturdays to fit your busy lifestyle.',
      color: 'from-orange-500 to-amber-500'
    },
    {
      icon: <Users size={32} />,
      title: 'Family-Friendly',
      description: 'We welcome patients of all ages, from children to seniors, providing comprehensive care for the whole family.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Award size={32} />,
      title: 'Quality Guarantee',
      description: 'We stand behind our work with quality guarantees and follow-up care to ensure your complete satisfaction.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <Smile size={32} />,
      title: 'Anxiety-Free Environment',
      description: 'Our warm, welcoming atmosphere and caring staff help ease dental anxiety and make every visit pleasant.',
      color: 'from-rose-500 to-red-500'
    }
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://starsmiles.com.au/wp-content/uploads/2023/11/happy-patient-and-dentists-768x512.jpg"
            alt="Happy patients"
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
              <Link href="/about" className="hover:text-white">About Us</Link>
              <ArrowRight size={16} />
              <span className="text-white">Our Patients</span>
            </nav>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              Our Patients Come First
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              At Star Smiles, we're committed to providing exceptional dental care in a comfortable, welcoming environment where every patient feels valued.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Patient Benefits */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Why Patients Choose Us
            </h2>
            <p className="text-xl text-gray-600">
              We've been creating amazing smiles for over 10 years by putting our patients first in everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Testimonials */}
      <section className="py-24 bg-star-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://starsmiles.com.au/wp-content/uploads/2023/11/two-dentists-working-with-patient-1024x684.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              What Our Patients Say
            </h2>
            <p className="text-xl text-white/80">
              Real stories from real patients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah M.',
                image: 'https://starsmiles.com.au/wp-content/uploads/2023/11/testimonial-N8572T7.jpg',
                text: 'The team at Star Smiles made me feel so comfortable. I was nervous about my first visit, but they were so gentle and professional. Highly recommend!'
              },
              {
                name: 'John D.',
                image: 'https://starsmiles.com.au/wp-content/uploads/2023/11/testimonial-83S5W35.jpg',
                text: 'Best dental experience I\'ve ever had! The staff are friendly, the facility is modern and clean, and Dr. Prasad is exceptional. Worth every visit!'
              },
              {
                name: 'Emily R.',
                image: 'https://starsmiles.com.au/wp-content/uploads/2023/11/testimonial-M6NJPEF.png',
                text: 'Star Smiles transformed my smile and my confidence! The cosmetic work they did was beyond my expectations. Thank you to the entire team!'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">{testimonial.name}</p>
                    <div className="flex gap-1 text-star-orange">
                      {'★★★★★'}
                    </div>
                  </div>
                </div>
                <p className="text-white/90 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
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
                Become Part of Our Family
              </h2>
              <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
                Join thousands of satisfied patients who trust Star Smiles for their dental care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book" className="bg-white text-star-orange hover:bg-star-blue hover:text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-3 text-lg shadow-lg">
                  Book Your Visit
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
