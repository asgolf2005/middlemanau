'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, Award, CheckCircle, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import { imagePaths } from '@/lib/image-paths'

export default function TransformationsPage() {
  const transformations = [
    {
      id: 1,
      title: 'Complete Smile Makeover with Veneers',
      description: 'This patient wanted to improve the color and shape of their teeth. We used porcelain veneers to create a natural, beautiful smile.',
      treatment: 'Porcelain Veneers',
      duration: '2 visits over 3 weeks',
      beforeImage: imagePaths.transformations.smile,
      afterImage: imagePaths.transformations.smile,
    },
    {
      id: 2,
      title: 'Dental Implant Restoration',
      description: 'Missing front tooth replaced with a dental implant and custom crown, restoring both function and aesthetics.',
      treatment: 'Dental Implants & Crown',
      duration: '3-6 months',
      beforeImage: imagePaths.services.implants,
      afterImage: imagePaths.services.implants,
    },
    {
      id: 3,
      title: 'Invisalign Orthodontic Treatment',
      description: 'Crooked and crowded teeth straightened using clear aligners over 12 months for a perfectly aligned smile.',
      treatment: 'Invisalign Clear Aligners',
      duration: '12 months',
      beforeImage: imagePaths.services.invisalign,
      afterImage: imagePaths.services.invisalign,
    },
  ]

  const treatmentTypes = [
    {
      icon: Sparkles,
      name: 'Cosmetic Dentistry',
      procedures: ['Veneers', 'Teeth Whitening', 'Bonding', 'Smile Makeovers']
    },
    {
      icon: Award,
      name: 'Restorative',
      procedures: ['Dental Implants', 'Crowns', 'Bridges', 'Fillings']
    },
    {
      icon: CheckCircle,
      name: 'Orthodontics',
      procedures: ['Invisalign', 'Braces', 'Retainers', 'Aligners']
    },
  ]

  const stats = [
    { number: '1,200+', label: 'Smile Transformations', icon: Sparkles },
    { number: '98%', label: 'Patient Satisfaction', icon: Star },
    { number: '500+', label: 'Implants Placed', icon: Award },
    { number: '300+', label: 'Invisalign Cases', icon: CheckCircle },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={imagePaths.transformations.alwaysSmile}
            alt="Smile Transformations"
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
              <span className="text-white">Smile Transformations</span>
            </nav>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} />
              Real Patient Results
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              Life-Changing Smile Transformations
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              See the incredible results we've achieved for our patients. Every smile tells a story
              of renewed confidence and improved oral health.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-star-blue to-star-blue-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-white" size={28} />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Sliders */}
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
              Interactive Before & After Gallery
            </h2>
            <p className="text-xl text-gray-600">
              Drag the slider to see the amazing transformations we've created
            </p>
          </motion.div>

          <div className="space-y-24">
            {transformations.map((transformation, index) => (
              <motion.div
                key={transformation.id}
                className="max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="grid lg:grid-cols-2 gap-8 items-center mb-8">
                  <div className={index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}>
                    <BeforeAfterSlider
                      beforeImage={transformation.beforeImage}
                      afterImage={transformation.afterImage}
                      alt={transformation.title}
                    />
                  </div>
                  <div className={index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}>
                    <div className="inline-block bg-star-blue/10 text-star-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      {transformation.treatment}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {transformation.title}
                    </h3>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {transformation.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span>{transformation.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Types */}
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
              Transformations We Offer
            </h2>
            <p className="text-xl text-gray-600">
              From cosmetic enhancements to full restorations, we have the expertise to transform your smile
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {treatmentTypes.map((type, index) => (
              <motion.div
                key={type.name}
                className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-star-blue to-star-blue-light rounded-2xl flex items-center justify-center mb-6">
                  <type.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{type.name}</h3>
                <ul className="space-y-2">
                  {type.procedures.map((procedure) => (
                    <li key={procedure} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle size={18} className="text-star-blue flex-shrink-0" />
                      <span>{procedure}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-star-blue">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Star className="w-16 h-16 mx-auto mb-6 text-star-orange" />
              <blockquote className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed">
                "I never thought I could smile with confidence again. Dr. Nalini and her team gave me
                the smile of my dreams. The transformation has changed my life!"
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden relative bg-white/20">
                  <Image
                    src={imagePaths.testimonials.patient1}
                    alt="Sarah M."
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">Sarah M.</p>
                  <p className="text-white/80">Porcelain Veneers Patient</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-star-orange to-star-orange-dark">
        <div className="container-custom">
          <motion.div
            className="text-center text-white max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready for Your Own Transformation?
            </h2>
            <p className="text-xl mb-10 text-white/90">
              Let's create your dream smile together. Book a consultation to discuss your goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book"
                className="bg-white text-star-orange hover:bg-star-blue hover:text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-3 text-lg shadow-2xl"
              >
                Book Consultation
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/services"
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-star-orange font-bold py-5 px-10 rounded-xl border-2 border-white/30 transition-all duration-300 inline-flex items-center justify-center gap-3 text-lg"
              >
                View All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
