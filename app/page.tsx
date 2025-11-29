'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Shield, Heart, Award, Clock, Users, Phone, CheckCircle, Sparkles, Calendar, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { imagePaths } from '@/lib/image-paths'
import GoogleReviews from '@/components/GoogleReviews'

export default function HomePage() {
  const services = [
    {
      title: 'General Dentistry',
      description: 'Comprehensive check-ups, cleanings, fillings, and preventive care for the whole family.',
      icon: '🦷',
      image: imagePaths.services.dentalCheckup,
      link: '/services/general-dentistry',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Cosmetic Dentistry',
      description: 'Teeth whitening, veneers, bonding, and smile makeovers for a confident smile.',
      icon: '✨',
      image: imagePaths.services.cosmetic,
      link: '/services/cosmetic-dentistry',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Dental Implants',
      description: 'Permanent tooth replacement that looks, feels, and functions like natural teeth.',
      icon: '🔩',
      image: imagePaths.services.implants,
      link: '/services/dental-implants',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Orthodontics',
      description: 'Traditional braces and clear aligners for beautifully straightened teeth.',
      icon: '😁',
      image: imagePaths.services.invisalign,
      link: '/services/orthodontics',
      color: 'from-orange-500 to-amber-500'
    },
    {
      title: "Children's Dentistry",
      description: 'Gentle, fun dental care designed specifically for kids of all ages.',
      icon: '👧',
      image: imagePaths.services.children,
      link: '/services/children-dentistry',
      color: 'from-rose-500 to-red-500'
    },
    {
      title: 'Emergency Care',
      description: 'Same-day treatment for dental emergencies, pain relief, and trauma.',
      icon: '🚑',
      image: imagePaths.services.emergency,
      link: '/services/emergency-care',
      color: 'from-red-500 to-rose-600'
    }
  ]

  const features = [
    { icon: Shield, title: '10+ Years', subtitle: 'Experience', description: 'Trusted care since 2013' },
    { icon: Users, title: '5,000+', subtitle: 'Happy Patients', description: 'And growing every day' },
    { icon: Award, title: 'Modern', subtitle: 'Technology', description: 'Latest dental equipment' },
    { icon: Heart, title: '4.9★', subtitle: 'Rating', description: 'Highly recommended' }
  ]

  const doctors = [
    {
      name: 'Dr. Nalini Prasad',
      role: 'Principal Dentist',
      specialties: 'Implants, Cosmetic & General Dentistry',
      experience: '15+ years experience',
      image: imagePaths.team.drNalini,
      link: '/team/dr-nalini-prasad'
    },
    {
      name: 'Dr. Nesrine Armanious',
      role: 'General Dentist',
      specialties: 'Family & Preventive Care',
      experience: '10+ years experience',
      image: imagePaths.team.drNesrine,
      link: '/team/dr-nesrine-armanious'
    },
    {
      name: 'Dr. Momina',
      role: 'General Dentist',
      specialties: 'Pediatric & Cosmetic Dentistry',
      experience: '8+ years experience',
      image: imagePaths.team.drMomina,
      link: '/team/dr-momina'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Patient since 2019',
      text: "Best dental experience I've ever had! The team is incredibly gentle and professional. My whole family now comes to Star Smiles.",
      rating: 5,
      image: imagePaths.testimonials.patient1
    },
    {
      name: 'James T.',
      role: 'Patient since 2020',
      text: 'Dr. Nalini and her team made my dental implant procedure completely pain-free. The results exceeded my expectations!',
      rating: 5,
      image: imagePaths.testimonials.patient2
    },
    {
      name: 'Emily C.',
      role: 'Patient since 2021',
      text: 'My kids actually look forward to their dental visits now! The staff is wonderful with children and makes everything fun.',
      rating: 5,
      image: imagePaths.testimonials.patient3
    }
  ]

  const whyChooseUs = [
    { icon: CheckCircle, text: 'Same-day emergency appointments' },
    { icon: CheckCircle, text: 'Interest-free payment plans available' },
    { icon: CheckCircle, text: 'All major health funds accepted' },
    { icon: CheckCircle, text: 'State-of-the-art sterilization' },
    { icon: CheckCircle, text: 'Comfortable, modern facilities' },
    { icon: CheckCircle, text: 'Free parking at Brandon Park' },
  ]

  return (
    <div className="overflow-hidden">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-star-blue via-star-blue-light to-star-blue text-white py-3 px-4 text-center text-sm animate-shimmer bg-[length:200%_100%]">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <Sparkles size={16} className="text-star-orange animate-pulse" />
          <span className="font-semibold">Making Beautiful Smiles a Reality</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Excellence in Family Dentistry Since 2013</span>
        </div>
      </div>

      {/* Hero Section - Full Width with Image */}
      <section className="relative min-h-[95vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={imagePaths.clinic.smilingDentists}
            alt="Star Smiles Dental Team"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-star-blue-dark/95 via-star-blue/85 to-star-blue/70" />
        </div>

        <div className="container-custom relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in-scale">
                <Award size={16} className="text-star-orange" />
                Excellence in Family Dentistry for Over 10 Years
              </span>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-4 leading-[1.1]">
                Making Beautiful
                <br />
                <span className="text-gradient-blue bg-clip-text text-transparent bg-gradient-to-r from-star-orange via-yellow-300 to-star-orange">Smiles</span> a Reality
              </h1>

              <p className="text-xl md:text-2xl text-white/95 mb-8 leading-relaxed max-w-xl font-medium">
                At Star Smiles Dental Centre, our focus is on prevention first and then cure.
                We help protect you and your family with personalized care and affordable treatments.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/book" className="group bg-star-orange hover:bg-star-orange-dark text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-3 text-lg shadow-2xl shadow-star-orange/30">
                  <Calendar size={22} />
                  Book Appointment
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:+61395620675" className="bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-star-blue font-semibold py-4 px-8 rounded-xl border-2 border-white/30 transition-all duration-300 inline-flex items-center justify-center gap-3 text-lg">
                  <Phone size={22} />
                  (03) 9562 0675
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {doctors.map((doc, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white/50 overflow-hidden relative">
                        <Image src={doc.image} alt={doc.name} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm ml-2">5,000+ Happy Patients</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={16} className="fill-star-orange text-star-orange" />
                  ))}
                  <span className="text-sm ml-1">4.9 Rating</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">Quick Booking</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                    <Clock className="text-star-orange" size={24} />
                    <div>
                      <p className="text-white font-medium">Opening Hours</p>
                      <p className="text-white/70 text-sm">Mon-Fri 9AM-6PM, Sat 9AM-2PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                    <MapPin className="text-star-orange" size={24} />
                    <div>
                      <p className="text-white font-medium">Location</p>
                      <p className="text-white/70 text-sm">Brandon Park SC, Wheelers Hill</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                    <Phone className="text-star-orange" size={24} />
                    <div>
                      <p className="text-white font-medium">24/7 AI Booking</p>
                      <p className="text-white/70 text-sm">Call anytime to book</p>
                    </div>
                  </div>
                </div>
                <Link href="/book" className="mt-6 w-full bg-white text-star-blue hover:bg-star-orange hover:text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                  Book Now
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Consolidated Trust & Stats Bar - Apple Style */}
      <section className="py-12 bg-gray-50/50">
        <div className="container-custom">
          <motion.div
            className="bg-white rounded-[24px] border border-gray-200 shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Key Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
              <div className="flex items-center justify-center gap-3 px-6 py-8">
                <div className="w-10 h-10 bg-star-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="text-star-blue" size={20} />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-gray-900">10+</p>
                  <p className="text-xs text-gray-600">Years Experience</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 px-6 py-8">
                <div className="w-10 h-10 bg-star-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="text-star-blue" size={20} />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-gray-900">5,000+</p>
                  <p className="text-xs text-gray-600">Happy Patients</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 px-6 py-8">
                <div className="w-10 h-10 bg-star-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="text-star-blue" size={20} />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-gray-900">Modern</p>
                  <p className="text-xs text-gray-600">Technology</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 px-6 py-8">
                <div className="w-10 h-10 bg-star-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="text-star-blue" size={20} />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-gray-900">4.9★</p>
                  <p className="text-xs text-gray-600">Patient Rating</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Subtle Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 px-6 py-5">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <CheckCircle size={16} className="text-green-600" />
                <span>HCF</span>
              </div>
              <div className="w-px h-4 bg-gray-300" />
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <CheckCircle size={16} className="text-green-600" />
                <span>Medibank</span>
              </div>
              <div className="w-px h-4 bg-gray-300" />
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <CheckCircle size={16} className="text-green-600" />
                <span>BUPA</span>
              </div>
              <div className="w-px h-4 bg-gray-300" />
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Award size={16} className="text-star-orange" />
                <span>ADA Member</span>
              </div>
              <div className="w-px h-4 bg-gray-300" />
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <CheckCircle size={16} className="text-green-600" />
                <span>AHPRA Registered</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={imagePaths.clinic.professionalDentist}
                  alt="Star Smiles Dental Centre"
                  width={700}
                  height={500}
                  className="w-full"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-star-blue rounded-2xl p-6 shadow-2xl max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-star-orange rounded-xl flex items-center justify-center">
                    <Award className="text-white" size={32} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">10+</p>
                    <p className="text-white/80">Years Experience</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-star-blue/10 text-star-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                About Us
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gray-900">
                Your Wheelers Hill Family Dentists
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                At Star Smiles Dental Centre, we believe in prevention first, then cure. Our experienced team is dedicated to providing personalized, gentle care for every member of your family.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Located in the heart of Brandon Park Shopping Centre, we've been serving the Wheelers Hill community for over 10 years with comprehensive dental services using the latest technology in a comfortable, modern environment.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-star-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-star-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Expert Team</h4>
                    <p className="text-gray-600 text-sm">Highly qualified & experienced dentists</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-star-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-star-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Modern Technology</h4>
                    <p className="text-gray-600 text-sm">State-of-the-art equipment & techniques</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-star-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-star-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Family Friendly</h4>
                    <p className="text-gray-600 text-sm">Caring environment for all ages</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-star-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-star-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Affordable Care</h4>
                    <p className="text-gray-600 text-sm">Flexible payment plans available</p>
                  </div>
                </div>
              </div>
              <Link href="/about" className="btn-primary inline-flex items-center gap-2">
                Learn More About Us
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-star-blue/10 text-star-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Our Services
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gray-900">
              Comprehensive Dental Care
            </h2>
            <p className="text-xl text-gray-600">
              From routine check-ups to advanced treatments, we offer a full range of dental services for your entire family.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                <Link href={service.link} className="group block h-full">
                  <div className="relative h-full bg-white rounded-[28px] overflow-hidden transition-all duration-700 ease-out group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] shadow-[0_2px_20px_-5px_rgba(0,0,0,0.08)]">

                    {/* Image section */}
                    <div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-white/40" />

                      {/* Simple icon badge */}
                      <div className="absolute bottom-6 left-6">
                        <div className="w-14 h-14 bg-white/95 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110">
                          <span className="text-3xl">{service.icon}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content section */}
                    <div className="p-8">
                      <h3 className="text-2xl font-semibold mb-3 text-gray-900 tracking-tight transition-colors duration-300 group-hover:text-star-blue">
                        {service.title}
                      </h3>

                      <p className="text-[17px] text-gray-600 mb-6 leading-relaxed font-normal">
                        {service.description}
                      </p>

                      {/* Minimal CTA */}
                      <div className="flex items-center text-star-blue font-medium text-[17px] transition-all duration-300 group-hover:gap-3 gap-2">
                        <span>Learn more</span>
                        <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Subtle bottom border accent on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-star-blue to-star-blue-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link href="/services" className="btn-primary inline-flex items-center gap-2 text-lg">
              View All Services
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Smile Transformations */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-star-orange/10 text-star-orange px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles size={16} className="inline mr-2" />
              Smile Transformations
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gray-900">
              Life-Changing Results
            </h2>
            <p className="text-xl text-gray-600">
              See how we've helped transform our patients' smiles and confidence with our comprehensive dental treatments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={imagePaths.transformations.alwaysSmile}
                    alt="Cosmetic smile transformation"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-star-orange text-white px-4 py-2 rounded-full text-sm font-bold">
                    Veneers
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Complete Smile Makeover</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Porcelain veneers transformed this patient's smile, correcting discoloration and alignment issues for a natural, confident look.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={imagePaths.transformations.dentalPatient}
                    alt="Happy patient with successful dental treatment"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-star-blue text-white px-4 py-2 rounded-full text-sm font-bold">
                    Implants
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Dental Implant Success</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Missing teeth replaced with permanent dental implants that look, feel, and function just like natural teeth.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={imagePaths.services.crowns}
                    alt="Professional orthodontic treatment"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    Orthodontics
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Straightened with Care</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Clear aligners and braces straightened teeth discreetly over 12 months, achieving a perfectly aligned, beautiful smile.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link href="/new-patient/portfolio" className="btn-primary inline-flex items-center gap-2 text-lg">
              View More Transformations
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-star-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src={imagePaths.clinic.happyPatients}
            alt="Happy patients"
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
              <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Why Star Smiles
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
                Your Comfort is Our Priority
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                We combine advanced technology with a gentle, caring approach to ensure every visit is a positive experience.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={item.text}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <item.icon className="text-star-orange flex-shrink-0" size={24} />
                    <span className="text-white font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={imagePaths.clinic.dentistsWithPatient}
                  alt="Dental treatment"
                  width={800}
                  height={600}
                  className="w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-star-blue-dark/50 to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-star-orange rounded-xl flex items-center justify-center">
                    <Star className="text-white" size={32} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">4.9</p>
                    <p className="text-gray-600">Patient Rating</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-star-blue/10 text-star-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Our Team
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gray-900">
              Meet Your Dental Experts
            </h2>
            <p className="text-xl text-gray-600">
              Our experienced team is dedicated to providing exceptional care in a warm, welcoming environment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Link href={doctor.link} className="group block">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                    <div className="relative h-80 overflow-hidden bg-gradient-to-br from-star-blue-light to-star-blue">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-star-blue-dark/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block bg-star-orange text-white text-sm px-3 py-1 rounded-full">
                          {doctor.experience}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-star-blue transition-colors">
                        {doctor.name}
                      </h3>
                      <p className="text-star-blue font-semibold mb-2">{doctor.role}</p>
                      <p className="text-gray-600">{doctor.specialties}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link href="/team" className="btn-secondary inline-flex items-center gap-2 text-lg">
              Meet Our Full Team
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-star-orange/10 text-star-orange px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gray-900">
              What Our Patients Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg border border-gray-100 relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute -top-4 left-8 text-6xl text-star-blue/20">"</div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-star-orange fill-star-orange" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden relative bg-gray-200">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-8 bg-gradient-to-r from-star-orange to-star-orange-dark">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Phone size={32} />
              </div>
              <div>
                <p className="text-lg font-medium opacity-90">Ready to book your appointment?</p>
                <p className="text-3xl font-bold">(03) 9562 0675</p>
              </div>
            </div>
            <Link href="/book" className="bg-white text-star-orange hover:bg-star-blue hover:text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 inline-flex items-center gap-3 text-lg shadow-lg">
              Book Online Now
              <ArrowRight size={22} />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <GoogleReviews showStats={true} maxReviews={3} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={imagePaths.transformations.smile}
            alt="Beautiful smile"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-star-blue-dark/95 to-star-blue/90" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                Ready for a Beautiful Smile?
              </h2>
              <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto">
                Join thousands of happy patients who trust Star Smiles for their dental care. Book your appointment today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book" className="bg-star-orange hover:bg-star-orange-dark text-white font-bold py-5 px-12 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-3 text-xl shadow-2xl shadow-star-orange/30">
                  <Calendar size={24} />
                  Book Appointment
                  <ArrowRight size={22} />
                </Link>
                <Link href="/contact" className="bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-star-blue font-bold py-5 px-12 rounded-xl border-2 border-white/30 transition-all duration-300 inline-flex items-center justify-center gap-3 text-xl">
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
