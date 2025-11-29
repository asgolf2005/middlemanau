'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Clock, Phone, Award, Shield, Heart, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import ImageGallery from '@/components/ImageGallery'
import VideoSection from '@/components/VideoSection'
import { imagePaths } from '@/lib/image-paths'

export default function ClinicTourPage() {
  const galleryImages = [
    {
      src: imagePaths.clinic.professionalDentist,
      alt: 'Modern dental treatment room',
      title: 'State-of-the-Art Treatment Rooms',
      description: 'Equipped with the latest dental technology for your comfort and care'
    },
    {
      src: imagePaths.clinic.smilingDentists,
      alt: 'Our professional dental team',
      title: 'Expert Dental Team',
      description: 'Experienced professionals dedicated to your oral health'
    },
    {
      src: imagePaths.clinic.dentistsWithPatient,
      alt: 'Patient receiving dental care',
      title: 'Personalized Care',
      description: 'Individual attention for every patient'
    },
    {
      src: imagePaths.clinic.happyPatients,
      alt: 'Happy patients with dentist',
      title: 'Comfortable Environment',
      description: 'A welcoming atmosphere that puts you at ease'
    },
    {
      src: imagePaths.services.dentalCheckup,
      alt: 'Dental examination',
      title: 'Comprehensive Examinations',
      description: 'Thorough checkups using advanced diagnostic tools'
    },
    {
      src: imagePaths.services.children,
      alt: 'Children\'s dentistry',
      title: 'Family-Friendly Facilities',
      description: 'Special care areas designed for children and families'
    }
  ]

  const features = [
    {
      icon: Award,
      title: 'Modern Equipment',
      description: 'Latest technology including digital X-rays, intraoral cameras, and laser dentistry'
    },
    {
      icon: Shield,
      title: 'Sterilization Standards',
      description: 'Hospital-grade sterilization and infection control protocols'
    },
    {
      icon: Heart,
      title: 'Comfort First',
      description: 'Comfortable chairs, entertainment systems, and anxiety-free environment'
    },
    {
      icon: Sparkles,
      title: 'Clean & Modern',
      description: 'Spotless, contemporary design with calming aesthetics'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={imagePaths.clinic.professionalDentist}
            alt="Star Smiles Dental Centre"
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
              <span className="text-white">Clinic Tour</span>
            </nav>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              Welcome to Star Smiles Dental Centre
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Take a virtual tour of our modern, state-of-the-art dental clinic in Wheelers Hill.
              See where we create beautiful smiles every day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-star-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="text-star-blue" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Location</h3>
                <p className="text-gray-600">1 Plato Crescent, Brandon Park Shopping Centre</p>
                <p className="text-gray-600">Wheelers Hill, VIC 3150</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-star-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="text-star-blue" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Opening Hours</h3>
                <p className="text-gray-600">Mon-Fri: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-star-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="text-star-blue" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Contact Us</h3>
                <a href="tel:+61395620675" className="text-star-blue hover:text-star-blue-dark font-semibold block">
                  (03) 9562 0675
                </a>
                <a href="mailto:info@starsmiles.com.au" className="text-gray-600 hover:text-star-blue">
                  info@starsmiles.com.au
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              World-Class Dental Facilities
            </h2>
            <p className="text-xl text-gray-600">
              Our clinic is designed with your comfort and safety in mind, featuring the latest dental technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-star-blue to-star-blue-light rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Photo Gallery
            </h2>
            <p className="text-xl text-gray-600">
              Explore our modern facilities and see where we create beautiful smiles
            </p>
          </motion.div>

          <ImageGallery images={galleryImages} columns={3} />
        </div>
      </section>

      {/* Virtual Tour Video Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom max-w-5xl">
          <VideoSection
            videoUrl="/videos/clinic-tour.mp4"
            posterImage={imagePaths.clinic.smilingDentists}
            title="Virtual Clinic Tour"
            description="Take a guided video tour of our dental clinic and meet our team"
          />
          <div className="mt-8 text-center text-gray-600">
            <p className="text-sm">
              Note: Virtual tour video coming soon. Visit us in person for a complete tour!
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-star-blue to-star-blue-light">
        <div className="container-custom">
          <motion.div
            className="text-center text-white max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Visit Us?
            </h2>
            <p className="text-xl mb-10 text-white/90">
              Schedule your appointment today and experience our exceptional dental care firsthand
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book"
                className="bg-star-orange hover:bg-star-orange-dark text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-3 text-lg shadow-2xl"
              >
                Book Appointment
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-star-blue font-bold py-5 px-10 rounded-xl border-2 border-white/30 transition-all duration-300 inline-flex items-center justify-center gap-3 text-lg"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
