'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, Shield, Zap, Monitor, Wind, Coffee } from 'lucide-react'
import { motion } from 'framer-motion'

export default function OurFacilitiesPage() {
  const facilities = [
    {
      icon: <Sparkles size={32} />,
      title: 'State-of-the-Art Equipment',
      description: 'We invest in the latest dental technology to provide accurate diagnoses and effective treatments with minimal discomfort.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Shield size={32} />,
      title: 'Infection Control',
      description: 'Strict sterilization protocols and infection control measures ensure the highest standards of safety and hygiene.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <Zap size={32} />,
      title: 'Digital X-Ray Technology',
      description: 'Advanced digital radiography reduces radiation exposure by up to 90% while providing instant, high-quality images.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Monitor size={32} />,
      title: 'Intraoral Cameras',
      description: 'See what we see! High-definition cameras allow you to view your teeth on screen and understand your treatment better.',
      color: 'from-orange-500 to-amber-500'
    },
    {
      icon: <Wind size={32} />,
      title: 'Clean Air System',
      description: 'Advanced air filtration and ventilation systems maintain fresh, clean air throughout our practice.',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: <Coffee size={32} />,
      title: 'Comfortable Environment',
      description: 'Modern, welcoming reception area with comfortable seating, magazines, and refreshments to help you relax.',
      color: 'from-rose-500 to-red-500'
    }
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://starsmiles.com.au/wp-content/uploads/2023/12/DentalChair-300x200.jpg"
            alt="Our facilities"
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
              <span className="text-white">Our Facilities</span>
            </nav>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              Modern Facilities, Advanced Technology
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Our state-of-the-art dental clinic combines cutting-edge technology with a warm, welcoming atmosphere to provide the best possible care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Top-Notch Dental Facility You Can Rely On
            </h2>
            <p className="text-xl text-gray-600">
              At Star Smiles Dental Centre, we hold in high regard our commitment to providing pain-free dentistry. Our relaxed and friendly approach is combined with a vast array of the most up-to-date dental techniques and equipment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${facility.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {facility.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {facility.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {facility.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              A Glimpse Inside Our Clinic
            </h2>
            <p className="text-xl text-gray-600">
              See our modern, clean, and welcoming facility
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                src: 'https://starsmiles.com.au/wp-content/uploads/2023/12/DentalChair-300x200.jpg',
                alt: 'Treatment room'
              },
              {
                src: 'https://starsmiles.com.au/wp-content/uploads/2023/12/Clean-300x200.jpg',
                alt: 'Clean facility'
              },
              {
                src: 'https://starsmiles.com.au/wp-content/uploads/2023/11/smiling-dentists-standing-with-arms-crossed-1024x682.jpg',
                alt: 'Our team'
              },
              {
                src: 'https://starsmiles.com.au/wp-content/uploads/2023/11/two-dentists-working-with-patient-1024x684.jpg',
                alt: 'Treatment in progress'
              },
              {
                src: 'https://starsmiles.com.au/wp-content/uploads/2023/12/DentalConsultation-1024x698.jpg',
                alt: 'Consultation area'
              },
              {
                src: 'https://starsmiles.com.au/wp-content/uploads/2023/11/smiling-dentists-standing-in-dental-clinic-1024x682.jpg',
                alt: 'Clinic interior'
              }
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Standards */}
      <section className="py-24 bg-star-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://starsmiles.com.au/wp-content/uploads/2023/11/professional-dentist-at-his-clinic.jpg"
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
                Your Safety Is Our Priority
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                We maintain the highest standards of infection control and follow all regulatory guidelines to ensure your safety.
              </p>

              <div className="space-y-4">
                {[
                  'Autoclave sterilization of all instruments',
                  'Disposable items used where appropriate',
                  'Regular equipment maintenance and calibration',
                  'Staff trained in latest safety protocols',
                  'COVID-safe practices implemented',
                  'Compliance with Australian dental standards'
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Shield className="text-star-orange flex-shrink-0" size={24} />
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
                  src="https://starsmiles.com.au/wp-content/uploads/2023/11/annual-check-up-1024x684.jpg"
                  alt="Safety standards"
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
                Experience Our Modern Facility
              </h2>
              <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
                Visit Star Smiles and see for yourself why patients love our state-of-the-art clinic.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book" className="bg-white text-star-orange hover:bg-star-blue hover:text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-3 text-lg shadow-lg">
                  Book a Visit
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
