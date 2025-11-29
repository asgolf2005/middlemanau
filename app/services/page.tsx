'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, Phone, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ServicesPage() {
  const services = [
    {
      title: 'General Dentistry',
      description: 'Comprehensive dental care including check-ups, cleanings, fillings, root canals, and preventive treatments for optimal oral health.',
      icon: '🦷',
      image: 'https://starsmiles.com.au/wp-content/uploads/2023/11/dental-check-up.jpg',
      link: '/services/general-dentistry',
      color: 'from-blue-500 to-cyan-500',
      features: ['Regular Check-ups', 'Professional Cleanings', 'Fillings & Restorations', 'Root Canal Therapy']
    },
    {
      title: 'Cosmetic Dentistry',
      description: 'Enhance your smile with teeth whitening, veneers, crowns, bonding, and other aesthetic treatments for a confident, beautiful smile.',
      icon: '✨',
      image: 'https://starsmiles.com.au/wp-content/uploads/2023/12/Smile-2-1024x683.jpg',
      link: '/services/cosmetic-dentistry',
      color: 'from-purple-500 to-pink-500',
      features: ['Teeth Whitening', 'Porcelain Veneers', 'Dental Crowns', 'Smile Makeovers']
    },
    {
      title: 'Dental Implants',
      description: 'Permanent tooth replacement solutions that look, feel, and function like natural teeth, restoring your smile and confidence.',
      icon: '🔩',
      image: 'https://starsmiles.com.au/wp-content/uploads/2023/11/new-teeth-for-patient.jpg',
      link: '/services/dental-implants',
      color: 'from-emerald-500 to-teal-500',
      features: ['Single Implants', 'Multiple Implants', 'All-on-4 Solutions', 'Implant-Supported Dentures']
    },
    {
      title: 'Orthodontics',
      description: 'Straighten your teeth and correct bite issues with traditional braces, clear aligners, and modern orthodontic solutions.',
      icon: '😁',
      image: 'https://starsmiles.com.au/wp-content/uploads/2023/12/Invisalign-300x200.jpg',
      link: '/services/orthodontics',
      color: 'from-orange-500 to-amber-500',
      features: ['Traditional Braces', 'Clear Aligners', 'Retainers', 'Bite Correction']
    },
    {
      title: "Children's Dentistry",
      description: "Gentle, specialized care for your child's developing smile in a friendly, comfortable environment that builds lifelong healthy habits.",
      icon: '👧',
      image: 'https://starsmiles.com.au/wp-content/uploads/2023/11/low-angle-view-of-dentists-examining-teeth-of-little-boy-at-dentist-office.jpg',
      link: '/services/children-dentistry',
      color: 'from-rose-500 to-red-400',
      features: ['Pediatric Check-ups', 'Fluoride Treatments', 'Fissure Sealants', 'Early Intervention']
    },
    {
      title: 'Emergency Dental Care',
      description: 'Prompt, compassionate treatment for dental emergencies including severe pain, trauma, infections, and urgent dental needs.',
      icon: '🚑',
      image: 'https://starsmiles.com.au/wp-content/uploads/2023/12/RootCanel-300x202.jpg',
      link: '/services/emergency-care',
      color: 'from-red-500 to-rose-600',
      features: ['Same-Day Appointments', 'Pain Relief', 'Trauma Treatment', 'Urgent Care']
    }
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://starsmiles.com.au/wp-content/uploads/2023/11/smiling-dentists-standing-with-arms-crossed-1024x682.jpg"
            alt="Dental services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-star-blue-dark/95 via-star-blue/90 to-star-blue/80" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Comprehensive Care
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 text-white">
              Our Dental Services
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              From preventive care to advanced treatments, we offer comprehensive dental solutions for the whole family.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={service.link} className="group block h-full">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full border border-gray-100 group-hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-70 group-hover:opacity-80 transition-opacity`} />
                      <div className="absolute bottom-6 left-6">
                        <span className="text-6xl">{service.icon}</span>
                      </div>
                      <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-white font-semibold text-sm">View Details →</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 group-hover:text-star-blue transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <CheckCircle size={18} className="text-star-blue flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center text-star-blue font-semibold text-lg group-hover:text-star-orange transition-colors">
                        Learn More
                        <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-24 bg-star-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://starsmiles.com.au/wp-content/uploads/2023/11/happy-patient-and-dentists-768x512.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
                Why Choose Star Smiles?
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                We combine expert care with modern technology to deliver outstanding results for every patient.
              </p>

              <div className="space-y-4">
                {[
                  'Experienced team with 10+ years in dentistry',
                  'State-of-the-art equipment and techniques',
                  'Comfortable, anxiety-free environment',
                  'Flexible payment plans available',
                  'All major health funds accepted',
                  'Convenient location with free parking'
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="text-star-orange flex-shrink-0" size={24} />
                    <span className="text-white font-medium">{item}</span>
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
                  src="https://starsmiles.com.au/wp-content/uploads/2023/11/two-dentists-working-with-patient-1024x684.jpg"
                  alt="Dental care"
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
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
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
                Not Sure Which Service You Need?
              </h2>
              <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
                Book a consultation and our expert team will assess your needs and recommend the best treatment plan for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book" className="bg-white text-star-orange hover:bg-star-blue hover:text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-3 text-lg shadow-lg">
                  <Calendar size={22} />
                  Book Consultation
                  <ArrowRight size={20} />
                </Link>
                <a href="tel:+61398030933" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-star-orange font-bold py-5 px-10 rounded-xl border-2 border-white/30 transition-all duration-300 inline-flex items-center justify-center gap-3 text-lg">
                  <Phone size={22} />
                  (03) 9803 0933
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
