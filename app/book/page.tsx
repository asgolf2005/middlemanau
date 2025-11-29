'use client'

import { useState } from 'react'
import { Phone, Calendar, Clock, Check, User, Mail, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import BookingCalendar from '@/components/BookingCalendar'

export default function BookPage() {
  const [showCalendar, setShowCalendar] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const services = [
    'General Check-up',
    'Dental Cleaning',
    'Cosmetic Dentistry',
    'Dental Implants',
    'Orthodontics',
    'Children\'s Dentistry',
    'Emergency Care',
    'Other'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send to n8n webhook in the correct format
      const response = await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tool_name: 'book_dental_appointment',
          full_name: formData.name,
          phone: formData.phone,
          email: formData.email,
          dob: '', // Not collected on simple form
          provider: 'dr_nalini', // Default provider
          date: formData.preferredDate,
          start: formData.preferredTime,
          reason_for_visit: formData.service,
          notes: formData.message || '',
          source: 'website_simple_form'
        })
      })

      if (response.ok) {
        setIsSuccess(true)
        setTimeout(() => setIsSuccess(false), 5000)
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          preferredDate: '',
          preferredTime: '',
          message: ''
        })
      } else {
        console.error('Booking submission failed:', response.statusText)
        alert('There was an error submitting your booking. Please call us at (03) 9562 0675.')
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('There was an error submitting your booking. Please call us at (03) 9562 0675.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 overflow-hidden">
        {/* Subtle professional overlay pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Floating blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-star-blue/20 rounded-full animate-blob blur-3xl" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-star-orange/20 rounded-full animate-blob animation-delay-400 blur-3xl" />

        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
              <div className="flex items-center gap-2 justify-center">
                <Calendar size={18} />
                <span>Easy Appointment Scheduling</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Book Your Appointment
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Choose your preferred booking method below
            </p>
          </motion.div>
        </div>

        {/* Professional accent element */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-star-blue/20 to-transparent rounded-full blur-3xl" />
      </section>

      {/* Interactive Booking Calendar */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-star-blue/10 text-star-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Calendar size={16} />
              Recommended
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gray-900">
              Book Online Instantly
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select your service, choose a date and time, and we'll confirm your appointment immediately
            </p>
          </motion.div>

          <BookingCalendar />
        </div>
      </section>

      {/* Alternative Booking Methods */}
      <section className="section-padding">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Other Ways to Book</h2>
            <p className="text-gray-600">Prefer to book by phone or form? We've got you covered</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* AI Phone Booking */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-star-blue to-star-blue-light rounded-3xl p-8 text-white"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-display font-bold">Call to Book</h2>
                  <p className="text-white/80">Speak with our AI assistant</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Check size={20} />
                  <span>24/7 availability</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check size={20} />
                  <span>Instant appointment confirmation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check size={20} />
                  <span>Book, reschedule, or cancel</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check size={20} />
                  <span>Natural conversation</span>
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <p className="text-sm text-white/80 mb-4">Call our AI booking assistant:</p>
                <a 
                  href="tel:+61398030933" 
                  className="text-4xl font-bold block mb-6 hover:text-white/90 transition-colors"
                >
                  (03) 9803 0933
                </a>
                <p className="text-sm text-white/70">
                  Our AI assistant can help you book appointments, answer questions, and provide information about our services.
                </p>
              </div>

              {/* TODO: Add ElevenLabs widget here */}
              <div className="mt-6 p-4 bg-white/10 rounded-xl text-sm text-white/70 text-center">
                Or click to use web-based voice booking →<br/>
                <span className="text-xs">(ElevenLabs widget integration)</span>
              </div>
            </motion.div>

            {/* Web Form Booking */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-star-blue/10 rounded-full flex items-center justify-center">
                    <Calendar size={32} className="text-star-blue" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-display font-bold text-gray-900">Online Form</h2>
                    <p className="text-gray-600">Fill out the form below</p>
                  </div>
                </div>

                {isSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-800">
                    <Check className="text-green-600" />
                    <span>Booking request submitted! We'll contact you shortly.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User size={16} className="inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-star-blue focus:border-transparent"
                      placeholder="John Smith"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Mail size={16} className="inline mr-2" />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-star-blue focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Phone size={16} className="inline mr-2" />
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-star-blue focus:border-transparent"
                        placeholder="04XX XXX XXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Service Required *
                    </label>
                    <select
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-star-blue focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      {services.map(service => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Calendar size={16} className="inline mr-2" />
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-star-blue focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Clock size={16} className="inline mr-2" />
                        Preferred Time
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-star-blue focus:border-transparent"
                      >
                        <option value="">Select time</option>
                        <option value="morning">Morning (9AM-12PM)</option>
                        <option value="afternoon">Afternoon (12PM-3PM)</option>
                        <option value="evening">Evening (3PM-6PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <MessageSquare size={16} className="inline mr-2" />
                      Additional Information
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-star-blue focus:border-transparent"
                      placeholder="Any specific concerns or questions?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Request Appointment'}
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    We'll contact you within 24 hours to confirm your appointment
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12">What to Expect</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-star-blue rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Book</h3>
                <p className="text-gray-600">Choose your preferred booking method and select your appointment time</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-star-blue rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Confirm</h3>
                <p className="text-gray-600">Receive confirmation via SMS and email with appointment details</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-star-blue rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Visit</h3>
                <p className="text-gray-600">Arrive for your appointment and receive excellent dental care</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
