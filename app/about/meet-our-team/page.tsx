'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Award, GraduationCap, Heart, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function MeetOurTeamPage() {
  const team = [
    {
      name: 'Dr. Nalini Prasad',
      title: 'Principal Dentist',
      image: 'https://starsmiles.com.au/wp-content/uploads/2023/11/Dr.Nalini-Prasad.jpg',
      qualifications: [
        'BDS (Otago) New Zealand',
        'Member ADA (Australia)',
        'Member GDC (UK)',
        'Member AADFA',
        'Member IAAD'
      ],
      bio: 'Dr. Nalini Prasad is a graduate of University of Otago, School of Dental Science, New Zealand. With extensive experience in general and cosmetic dentistry, Dr. Prasad is dedicated to providing the highest quality dental care in a comfortable and caring environment. Her passion for dentistry and commitment to continuous education ensures patients receive the most advanced treatments available.',
      specialties: ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Smile Makeovers']
    },
    {
      name: 'Dr. Nesrine Armanious',
      title: 'General Dentist',
      image: 'https://starsmiles.com.au/wp-content/uploads/elementor/thumbs/Dr.Nesrine-Armanious-qfpyuux9xl9a1z82ozxuzh56j0t4ksr4kria0b7xes.jpeg',
      qualifications: [
        'BDSc',
        'Member ADA (Australia)',
        'Member IAAD'
      ],
      bio: 'Dr. Nesrine Armanious brings a wealth of knowledge and a gentle touch to Star Smiles. Her patient-centered approach and attention to detail ensure every patient receives personalized care tailored to their unique needs. Dr. Armanious is particularly passionate about preventive dentistry and helping patients maintain healthy smiles for life.',
      specialties: ['General Dentistry', 'Preventive Care', 'Children\'s Dentistry', 'Tooth-Colored Fillings']
    },
    {
      name: 'Dr. Momina',
      title: 'General Dentist',
      image: 'https://starsmiles.com.au/wp-content/uploads/2023/11/Dr.Momina-225x300.jpg',
      qualifications: [
        'BDS',
        'Member ADA (Australia)'
      ],
      bio: 'Dr. Momina is known for her warm personality and exceptional clinical skills. She takes the time to understand each patient\'s concerns and explains treatment options in a clear, easy-to-understand manner. Her gentle approach helps even the most anxious patients feel comfortable and confident about their dental care.',
      specialties: ['General Dentistry', 'Cosmetic Procedures', 'Orthodontics', 'Emergency Care']
    }
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://starsmiles.com.au/wp-content/uploads/2023/11/smiling-dentists-standing-with-arms-crossed-1024x682.jpg"
            alt="Our dental team"
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
              <span className="text-white">Meet Our Team</span>
            </nav>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              Meet Our Expert Team
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Our experienced dentists are dedicated to providing exceptional care with compassion, expertise, and the latest dental techniques.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Introduction */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Star Smiles Dental Team
            </h2>
            <p className="text-xl text-gray-600">
              Our team of highly qualified dentists brings together decades of experience, advanced training, and a genuine passion for creating beautiful, healthy smiles.
            </p>
          </div>

          {/* Team Members */}
          <div className="space-y-24">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-star-blue to-star-blue-light rounded-full flex items-center justify-center">
                        <Award className="text-white" size={24} />
                      </div>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
                          {member.name}
                        </h3>
                        <p className="text-xl text-star-blue font-semibold">{member.title}</p>
                      </div>
                    </div>

                    {/* Qualifications */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <GraduationCap className="text-star-blue" size={20} />
                        <h4 className="font-bold text-gray-900">Qualifications</h4>
                      </div>
                      <ul className="space-y-2">
                        {member.qualifications.map((qual) => (
                          <li key={qual} className="text-gray-600 flex items-center gap-2">
                            <Star size={14} className="text-star-orange" />
                            {qual}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {member.bio}
                    </p>

                    {/* Specialties */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Heart className="text-star-orange" size={20} />
                        <h4 className="font-bold text-gray-900">Specialties</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="bg-star-blue/10 text-star-blue px-4 py-2 rounded-full text-sm font-medium"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-24 bg-star-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://starsmiles.com.au/wp-content/uploads/2023/11/smiling-dentists-standing-in-dental-clinic-1024x682.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Our Team Values
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Excellence',
                description: 'Committed to the highest standards of dental care',
                icon: <Award size={32} />
              },
              {
                title: 'Compassion',
                description: 'Treating every patient with kindness and empathy',
                icon: <Heart size={32} />
              },
              {
                title: 'Integrity',
                description: 'Honest, transparent communication always',
                icon: <Star size={32} />
              },
              {
                title: 'Innovation',
                description: 'Embracing the latest dental technologies',
                icon: <GraduationCap size={32} />
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center"
              >
                <div className="w-16 h-16 bg-star-orange rounded-full flex items-center justify-center text-white mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-white/80">{value.description}</p>
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
                Ready to Meet Your Dentist?
              </h2>
              <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
                Book an appointment today and experience the Star Smiles difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book" className="bg-white text-star-orange hover:bg-star-blue hover:text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-3 text-lg shadow-lg">
                  Book Appointment
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
