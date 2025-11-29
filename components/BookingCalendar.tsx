'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, User, Phone, Mail, CheckCircle, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'

interface TimeSlot {
  time: string
  available: boolean
}

interface BookingData {
  name: string
  email: string
  phone: string
  service: string
  date: Date | null
  time: string
  notes: string
  isNewPatient: boolean
}

const services = [
  { id: 'checkup', name: 'Dental Checkup & Cleaning', duration: '60 min', price: '$180' },
  { id: 'cosmetic', name: 'Cosmetic Consultation', duration: '45 min', price: '$150' },
  { id: 'implants', name: 'Dental Implant Consultation', duration: '60 min', price: '$200' },
  { id: 'invisalign', name: 'Invisalign Consultation', duration: '45 min', price: 'FREE' },
  { id: 'emergency', name: 'Emergency Appointment', duration: '30 min', price: '$220' },
  { id: 'children', name: 'Children\'s Dental Visit', duration: '45 min', price: '$160' },
]

const defaultTimeSlots: TimeSlot[] = [
  { time: '9:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '12:00 PM', available: true },
  { time: '1:00 PM', available: false },
  { time: '2:00 PM', available: true },
  { time: '3:00 PM', available: true },
  { time: '4:00 PM', available: true },
  { time: '5:00 PM', available: true },
]

export default function BookingCalendar() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>(defaultTimeSlots)
  const [loadingSlots, setLoadingSlots] = useState(false)

  const [bookingData, setBookingData] = useState<BookingData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: null,
    time: '',
    notes: '',
    isNewPatient: false,
  })

  // Fetch availability when date is selected
  useEffect(() => {
    if (bookingData.date && step === 3) {
      fetchAvailableSlots()
    }
  }, [bookingData.date, step])

  const fetchAvailableSlots = async () => {
    if (!bookingData.date) return

    setLoadingSlots(true)
    try {
      const dateStr = bookingData.date.toISOString().split('T')[0]
      const response = await fetch(`/api/availability?date=${dateStr}`)
      const data = await response.json()

      if (data.slots) {
        setAvailableSlots(data.slots)
      }
    } catch (error) {
      console.error('Failed to fetch availability:', error)
      // Use fallback default slots
      setAvailableSlots(defaultTimeSlots)
    } finally {
      setLoadingSlots(false)
    }
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: (Date | null)[] = []

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const isDateAvailable = (date: Date | null) => {
    if (!date) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const day = date.getDay()
    // Available Mon-Fri, Sat morning only
    return date >= today && (day >= 1 && day <= 6)
  }

  const handleDateSelect = (date: Date | null) => {
    if (date && isDateAvailable(date)) {
      setBookingData({ ...bookingData, date })
      setStep(3)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone,
          service: bookingData.service,
          date: bookingData.date?.toISOString().split('T')[0],
          time: bookingData.time,
          notes: bookingData.notes,
          isNewPatient: bookingData.isNewPatient,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit booking')
      }

      setSubmitted(true)
    } catch (error) {
      console.error('Booking error:', error)
      alert('Failed to submit booking. Please try again or call us at (03) 9562 0675.')
    } finally {
      setLoading(false)
    }
  }

  const days = getDaysInMonth(currentMonth)
  const monthName = currentMonth.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })

  if (submitted) {
    return (
      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-600" size={48} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
        <p className="text-lg text-gray-600 mb-6">
          Thank you, {bookingData.name}! We've sent a confirmation email to {bookingData.email}.
        </p>
        <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-left">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="text-star-blue" size={20} />
              <span className="font-medium">{bookingData.date?.toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-star-blue" size={20} />
              <span className="font-medium">{bookingData.time}</span>
            </div>
            <div className="flex items-center gap-3">
              <User className="text-star-blue" size={20} />
              <span className="font-medium">{services.find(s => s.id === bookingData.service)?.name}</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Our team will call you at {bookingData.phone} to confirm your appointment.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-star-blue hover:bg-star-blue-dark text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
        >
          Book Another Appointment
        </button>
      </motion.div>
    )
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
      {/* Progress Steps */}
      <div className="bg-gradient-to-r from-star-blue to-star-blue-light p-6">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step >= s ? 'bg-white text-star-blue' : 'bg-white/30 text-white'
              }`}>
                {s}
              </div>
              {s < 4 && (
                <div className={`w-12 md:w-20 h-1 mx-2 transition-all ${
                  step > s ? 'bg-white' : 'bg-white/30'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-4 text-white text-sm">
          {step === 1 && 'Select Service'}
          {step === 2 && 'Choose Date'}
          {step === 3 && 'Pick Time'}
          {step === 4 && 'Your Details'}
        </div>
      </div>

      <div className="p-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Select a Service</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setBookingData({ ...bookingData, service: service.id })
                      setStep(2)
                    }}
                    className={`p-6 rounded-2xl border-2 text-left transition-all hover:shadow-lg ${
                      bookingData.service === service.id
                        ? 'border-star-blue bg-star-blue/5'
                        : 'border-gray-200 hover:border-star-blue'
                    }`}
                  >
                    <h4 className="font-bold text-gray-900 mb-2">{service.name}</h4>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {service.duration}
                      </span>
                      <span className="font-bold text-star-blue">{service.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Select Date */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => setStep(1)} className="text-star-blue hover:text-star-blue-dark">
                  ← Back
                </button>
                <h3 className="text-2xl font-bold text-gray-900">Choose a Date</h3>
                <div className="w-16" />
              </div>

              <div className="max-w-lg mx-auto">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <h4 className="text-xl font-bold">{monthName}</h4>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                  {days.map((date, index) => {
                    const available = isDateAvailable(date)
                    const isSelected = date && bookingData.date &&
                      date.toDateString() === bookingData.date.toDateString()

                    return (
                      <button
                        key={index}
                        onClick={() => handleDateSelect(date)}
                        disabled={!available}
                        className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                          !date ? 'invisible' :
                          isSelected ? 'bg-star-blue text-white' :
                          available ? 'hover:bg-star-blue hover:text-white bg-gray-50' :
                          'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {date?.getDate()}
                      </button>
                    )
                  })}
                </div>

                <p className="text-sm text-gray-500 mt-4 text-center">
                  Available: Monday-Friday 9AM-6PM, Saturday 9AM-1PM
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 3: Select Time */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => setStep(2)} className="text-star-blue hover:text-star-blue-dark">
                  ← Back
                </button>
                <h3 className="text-2xl font-bold text-gray-900">Pick a Time</h3>
                <div className="w-16" />
              </div>

              <div className="max-w-md mx-auto">
                <p className="text-center text-gray-600 mb-6">
                  {bookingData.date?.toLocaleDateString('en-AU', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>

                {loadingSlots ? (
                  <div className="text-center py-12">
                    <Loader2 className="animate-spin mx-auto text-star-blue mb-3" size={32} />
                    <p className="text-gray-500">Loading available times...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => {
                          if (slot.available) {
                            setBookingData({ ...bookingData, time: slot.time })
                            setStep(4)
                          }
                        }}
                        disabled={!slot.available}
                        className={`py-3 px-4 rounded-xl font-medium transition-all ${
                          bookingData.time === slot.time
                            ? 'bg-star-blue text-white'
                            : slot.available
                            ? 'bg-gray-50 hover:bg-star-blue hover:text-white'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 4: Contact Details */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => setStep(3)} className="text-star-blue hover:text-star-blue-dark">
                  ← Back
                </button>
                <h3 className="text-2xl font-bold text-gray-900">Your Details</h3>
                <div className="w-16" />
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="max-w-md mx-auto space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-star-blue focus:border-transparent"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-star-blue focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-star-blue focus:border-transparent"
                    placeholder="0412 345 678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-star-blue focus:border-transparent"
                    placeholder="Any specific concerns or questions?"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={bookingData.isNewPatient}
                    onChange={(e) => setBookingData({ ...bookingData, isNewPatient: e.target.checked })}
                    className="mt-1 w-5 h-5 text-star-blue rounded focus:ring-star-blue"
                  />
                  <label className="text-sm text-gray-700">
                    I'm a new patient (We'll send you our new patient forms)
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-star-orange hover:bg-star-orange-dark text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Booking...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Confirm Booking
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By booking, you agree to our terms and privacy policy. We'll send you a confirmation email and SMS.
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
