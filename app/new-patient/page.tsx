'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ClipboardList, Calendar, FileText, Heart, Shield, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NewPatientPage() {
  const steps = [
    {
      icon: <Calendar size={32} />,
      title: 'Book Your Appointment',
      description: 'Schedule your first visit at a time that suits you. We offer flexible appointments including evenings and Saturdays.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <FileText size={32} />,
      title: 'Complete Your Forms',
      description: 'Fill out our new patient forms online or arrive early to complete them at the clinic.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <ClipboardList size={32} />,
      title: 'Comprehensive Assessment',
      description: 'We\'ll conduct a thorough examination and discuss your dental health goals and concerns.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <Heart size={32} />,
      title: 'Personalized Care Plan',
      description: 'Receive a customized treatment plan tailored to your unique needs and budget.',
      color: 'from-orange-500 to-amber-500'
    }
  ]

  const resources = [
    {
      title: 'Assessment & Diagnosis',
      description: 'Learn about our comprehensive examination process and what to expect',
      link: '/new-patient/assessment-diagnosis',
      image: 'https://starsmiles.com.au/wp-content/uploads/2023/11/dental-check-up.jpg'
    },
    {
      title: 'Your First Visit',
      description: 'Everything you need to know to prepare for your first appointment',
      link: '/new-patient/first-visit',
      image: 'https://starsmiles.com.au/wp-content/uploads/2023/12/DentalConsultation-1024x698.jpg'
    },
    {
      title: 'Portfolio of Cases',
      description: 'See real examples of treatments we\'ve provided to our patients',
      link: '/new-patient/portfolio',
      image: 'https://starsmiles.com.au/wp-content/uploads/2023/12/Smile-2-1024x683.jpg'
    }
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://starsmiles.com.au/wp-content/uploads/2023/11/happy-patient-and-dentists-768x512.jpg"
            alt="Welcome new patients"
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
              <span className="text-white">New Patient</span>
            </nav>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              Welcome to Star Smiles
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
              We have tried to present a comprehensive and user-friendly overview for all of our valued patients. Please use the navigation to find lots of useful information about the patient journey and facilities at Star Smiles Dental Centre.
            </p>
            <Link href="/book" className="inline-flex items-center gap-3 bg-star-orange hover:bg-star-orange-dark text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg">
              Book Your First Visit
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Getting Started Steps */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Getting Started is Easy
            </h2>
            <p className="text-xl text-gray-600">
              Your journey to a healthier smile begins with these simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2 relative"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-star-orange rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {index + 1}
                </div>

                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Why New Patients Choose Star Smiles
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                At Star Smiles Dental Clinic, our focus is on prevention first and then cure. We help protect you and your family from dental problems, saving you time, money, and discomfort.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <Heart size={20} />, text: 'Gentle, patient-centered approach' },
                  { icon: <Shield size={20} />, text: 'Experienced, qualified dentists' },
                  { icon: <Clock size={20} />, text: 'Flexible appointment times' },
                  { icon: <ClipboardList size={20} />, text: 'Comprehensive treatment plans' },
                  { icon: <FileText size={20} />, text: 'Transparent pricing and payment options' },
                  { icon: <Calendar size={20} />, text: 'Creating amazing smiles for over 10 years' }
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    className="flex items-center gap-3 bg-gray-50 rounded-xl p-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-star-blue flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-gray-700 font-medium">{item.text}</span>
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

      {/* Resources */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              New Patient Resources
            </h2>
            <p className="text-xl text-gray-600">
              Learn more about what to expect during your first visit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={resource.link} className="group block h-full">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full border border-gray-100 group-hover:-translate-y-2">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={resource.image}
                        alt={resource.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-star-blue-dark/80 to-transparent" />
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-star-blue transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {resource.description}
                      </p>
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
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
                Book your first appointment today and discover why families trust Star Smiles for their dental care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book" className="bg-white text-star-orange hover:bg-star-blue hover:text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-3 text-lg shadow-lg">
                  <Calendar size={22} />
                  Book Appointment
                  <ArrowRight size={20} />
                </Link>
                <a href="tel:+61395620675" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-star-orange font-bold py-5 px-10 rounded-xl border-2 border-white/30 transition-all duration-300 inline-flex items-center justify-center gap-3 text-lg">
                  Call (03) 9562 0675
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
