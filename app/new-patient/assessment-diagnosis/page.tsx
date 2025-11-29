'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Search, Camera, FileText, Heart, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AssessmentDiagnosisPage() {
  const assessmentSteps = [
    {
      icon: <FileText size={32} />,
      title: 'Medical History Review',
      description: 'We\'ll discuss your medical history, current medications, and any dental concerns you may have.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Search size={32} />,
      title: 'Comprehensive Examination',
      description: 'Thorough examination of teeth, gums, jaw, and oral tissues to assess your overall dental health.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Camera size={32} />,
      title: 'Digital X-Rays',
      description: 'State-of-the-art digital radiography to detect issues not visible during visual examination.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <Heart size={32} />,
      title: 'Personalized Plan',
      description: 'Customized treatment plan based on your specific needs, goals, and budget.',
      color: 'from-orange-500 to-amber-500'
    }
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://starsmiles.com.au/wp-content/uploads/2023/11/dental-check-up.jpg"
            alt="Dental assessment"
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
              <Link href="/new-patient" className="hover:text-white">New Patient</Link>
              <ArrowRight size={16} />
              <span className="text-white">Assessment & Diagnosis</span>
            </nav>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              Assessment & Diagnosis
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              An aesthetic assessment ends with looking at the teeth. Before that, odd though it may sound, many other characteristics need to be taken into account, including the shape of your face, skin tone, and hair color.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Assessment Process */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Your First Visit Portfolio of Dental Cases
            </h2>
            <p className="text-xl text-gray-600">
              Our comprehensive assessment ensures we understand your complete dental health picture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {assessmentSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2"
              >
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

      {/* What We Examine */}
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
                Comprehensive Dental Examination
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Our thorough assessment goes beyond just your teeth to evaluate your complete oral health.
              </p>

              <div className="space-y-4">
                {[
                  'Teeth condition, alignment, and wear patterns',
                  'Gum health and signs of periodontal disease',
                  'Jaw joint (TMJ) function and bite alignment',
                  'Oral cancer screening and tissue examination',
                  'Existing dental work and restorations',
                  'Facial aesthetics and smile analysis',
                  'X-rays to detect hidden issues',
                  'Overall oral hygiene assessment'
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-3 bg-gray-50 rounded-xl p-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="text-star-blue flex-shrink-0" size={24} />
                    <span className="text-gray-700 font-medium">{item}</span>
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
                  alt="Dental examination"
                  width={800}
                  height={600}
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Aesthetic Assessment */}
      <section className="py-24 bg-star-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://starsmiles.com.au/wp-content/uploads/2023/12/Smile-2-1024x683.jpg"
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
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://starsmiles.com.au/wp-content/uploads/2023/12/DentalPatient-1024x768.jpg"
                  alt="Smile assessment"
                  width={800}
                  height={600}
                  className="w-full"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
                Smile Aesthetic Analysis
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Creating your perfect smile requires understanding more than just dental health. We consider your unique facial features and personal preferences.
              </p>

              <div className="space-y-4">
                {[
                  'Facial shape and symmetry',
                  'Skin tone and complexion',
                  'Hair color and style',
                  'Lip structure and smile line',
                  'Tooth color and translucency',
                  'Smile width and tooth proportions',
                  'Gum display and contours',
                  'Personal aesthetic goals'
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
                Ready for Your Assessment?
              </h2>
              <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
                Book your comprehensive dental assessment today and take the first step toward your healthiest, most beautiful smile.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book" className="bg-white text-star-orange hover:bg-star-blue hover:text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-3 text-lg shadow-lg">
                  Book Assessment
                  <ArrowRight size={20} />
                </Link>
                <Link href="/new-patient" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-star-orange font-bold py-5 px-10 rounded-xl border-2 border-white/30 transition-all duration-300 inline-flex items-center justify-center gap-3 text-lg">
                  New Patient Info
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
