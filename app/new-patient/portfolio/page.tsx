'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PortfolioPage() {
  const cases = [
    {
      title: 'Dental Crowns',
      description: 'Restoring damaged teeth with natural-looking porcelain crowns that blend seamlessly with your smile.',
      image: 'https://starsmiles.com.au/wp-content/uploads/2023/12/Crowns-300x200.jpg',
      category: 'Restorative'
    },
    {
      title: 'Porcelain Veneers',
      description: 'Transform your smile with ultra-thin veneers that correct color, shape, and alignment issues.',
      image: 'https://starsmiles.com.au/wp-content/uploads/2023/12/Smile-2-1024x683.jpg',
      category: 'Cosmetic'
    },
    {
      title: 'White Fillings',
      description: 'Mercury-free, tooth-colored composite fillings that are virtually invisible and restore tooth structure.',
      image: 'https://starsmiles.com.au/wp-content/uploads/2023/12/LaserFillings-200x300.jpg',
      category: 'Restorative'
    },
    {
      title: 'Dental Implants',
      description: 'Permanent tooth replacement that looks, feels, and functions just like natural teeth.',
      image: 'https://starsmiles.com.au/wp-content/uploads/2023/11/new-teeth-for-patient.jpg',
      category: 'Implants'
    },
    {
      title: 'Orthodontics',
      description: 'Straighten your teeth with modern orthodontic solutions including clear aligners and braces.',
      image: 'https://starsmiles.com.au/wp-content/uploads/2023/12/Invisalign-300x200.jpg',
      category: 'Orthodontics'
    },
    {
      title: 'Smile Makeovers',
      description: 'Complete smile transformations combining multiple treatments for dramatic, life-changing results.',
      image: 'https://starsmiles.com.au/wp-content/uploads/2023/12/AlwaysSmile-1024x768.jpg',
      category: 'Cosmetic'
    }
  ]

  const implantExample = {
    title: 'Dental Implant Case Study',
    before: 'This patient was missing one of their front teeth, which significantly impacted their confidence and smile.',
    procedure: 'We replaced the missing tooth using a dental implant - a titanium post surgically placed into the jawbone that acts as an artificial tooth root.',
    after: 'The implant was topped with a custom-made porcelain crown that perfectly matches the surrounding teeth in color, shape, and translucency.',
    result: 'The final result is a natural-looking tooth that functions just like the original, restoring both aesthetics and confidence.'
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://starsmiles.com.au/wp-content/uploads/2023/12/DentalPatient-1024x768.jpg"
            alt="Portfolio of cases"
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
              <span className="text-white">Portfolio of Cases</span>
            </nav>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              Portfolio of Dental Cases
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              See real examples of the life-changing dental transformations we've achieved for our patients. Every smile tells a story of renewed confidence and improved oral health.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Gallery */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Our Treatment Gallery
            </h2>
            <p className="text-xl text-gray-600">
              Browse through our collection of successful dental treatments and smile transformations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((caseItem, index) => (
              <motion.div
                key={caseItem.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={caseItem.image}
                      alt={caseItem.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-star-blue text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {caseItem.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-star-blue transition-colors">
                      {caseItem.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {caseItem.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-star-blue/10 text-star-blue px-4 py-2 rounded-full font-semibold mb-6">
              <Sparkles size={20} />
              Featured Case Study
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              {implantExample.title}
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="https://starsmiles.com.au/wp-content/uploads/2023/11/new-teeth-for-patient.jpg"
                  alt="Dental implant result"
                  fill
                  className="object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col justify-center space-y-6"
              >
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-bold text-star-blue mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-star-blue rounded-full" />
                    Initial Situation
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{implantExample.before}</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-bold text-star-blue mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-star-blue rounded-full" />
                    Treatment Procedure
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{implantExample.procedure}</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-bold text-star-orange mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-star-orange rounded-full" />
                    Final Result
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{implantExample.after}</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-star-blue to-star-blue-light rounded-3xl p-10 text-white text-center"
            >
              <p className="text-xl md:text-2xl font-medium leading-relaxed">
                {implantExample.result}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How Dental Implants Work */}
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
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Understanding Dental Implants
            </h2>
            <p className="text-xl text-white/80">
              A step-by-step overview of how this procedure works
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '1',
                title: 'Titanium Post',
                description: 'A biocompatible titanium post is surgically placed into the jawbone, serving as the tooth root.'
              },
              {
                step: '2',
                title: 'Osseointegration',
                description: 'Over 3-6 months, the implant fuses with the bone in a process called osseointegration, creating a stable foundation.'
              },
              {
                step: '3',
                title: 'Crown Placement',
                description: 'A custom-made crown is attached to the implant, completing your new tooth that looks and functions naturally.'
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center"
              >
                <div className="w-16 h-16 bg-star-orange rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-white/80 leading-relaxed">{item.description}</p>
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
                Ready for Your Own Smile Transformation?
              </h2>
              <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
                Let us create a personalized treatment plan to help you achieve the smile of your dreams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book" className="bg-white text-star-orange hover:bg-star-blue hover:text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-3 text-lg shadow-lg">
                  Book Consultation
                  <ArrowRight size={20} />
                </Link>
                <Link href="/services" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-star-orange font-bold py-5 px-10 rounded-xl border-2 border-white/30 transition-all duration-300 inline-flex items-center justify-center gap-3 text-lg">
                  View All Services
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
