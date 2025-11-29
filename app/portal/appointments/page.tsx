'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Calendar, Clock, Phone, Mail, X, CheckCircle, AlertCircle, Plus, ArrowLeft } from 'lucide-react'

interface Appointment {
  id: string
  service: string
  date: string
  time: string
  status: string
  patient_name: string
  patient_email: string
  patient_phone: string
  notes?: string
  created_at: string
}

export default function AppointmentsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState<string | null>(null)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/portal/login')
        return
      }

      const response = await fetch('/api/portal/appointments')
      const data = await response.json()

      if (data.appointments) {
        setAppointments(data.appointments)
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (appointmentId: string, appointmentDetails: string) => {
    if (!confirm(`Are you sure you want to cancel this appointment?\n\n${appointmentDetails}\n\nThis action cannot be undone.`)) {
      return
    }

    setCancelling(appointmentId)
    try {
      const response = await fetch(`/api/portal/appointments?id=${appointmentId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (response.ok) {
        // Show success message
        alert('✅ Appointment cancelled successfully!\n\nYou will receive a confirmation email shortly.\n\nA cancellation notification has been sent to the clinic.')
        fetchAppointments()
      } else {
        throw new Error(data.error || 'Failed to cancel appointment')
      }
    } catch (error) {
      console.error('Cancel error:', error)
      alert('❌ Failed to cancel appointment.\n\nPlease call us at (03) 9562 0675 to cancel.')
    } finally {
      setCancelling(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200'
      case 'completed': return 'bg-gray-100 text-gray-700 border-gray-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle size={16} />
      case 'pending': return <Clock size={16} />
      case 'cancelled': return <X size={16} />
      default: return <AlertCircle size={16} />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-star-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    )
  }

  const upcomingAppointments = appointments.filter(apt =>
    apt.status !== 'cancelled' && apt.status !== 'completed' && new Date(apt.date + 'T00:00:00') >= new Date()
  )

  const pastAppointments = appointments.filter(apt =>
    apt.status === 'completed' || apt.status === 'cancelled' || new Date(apt.date + 'T00:00:00') < new Date()
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/portal/dashboard"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={24} />
              </Link>
              <div>
                <h1 className="text-3xl font-display font-bold text-gray-900">My Appointments</h1>
                <p className="text-gray-600 mt-1">View and manage your dental appointments</p>
              </div>
            </div>
            <Link href="/book" className="btn-primary flex items-center gap-2">
              <Plus size={20} />
              Book New Appointment
            </Link>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Upcoming Appointments */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Appointments</h2>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map((apt, index) => (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Appointment Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{apt.service}</h3>
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(apt.status)}`}>
                            {getStatusIcon(apt.status)}
                            {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 text-gray-700">
                          <div className="w-10 h-10 bg-star-blue/10 rounded-lg flex items-center justify-center">
                            <Calendar className="text-star-blue" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-semibold">
                              {new Date(apt.date + 'T00:00:00').toLocaleDateString('en-AU', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-700">
                          <div className="w-10 h-10 bg-star-blue/10 rounded-lg flex items-center justify-center">
                            <Clock className="text-star-blue" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Time</p>
                            <p className="font-semibold">{apt.time}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-700">
                          <div className="w-10 h-10 bg-star-blue/10 rounded-lg flex items-center justify-center">
                            <Phone className="text-star-blue" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-semibold">{apt.patient_phone}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-700">
                          <div className="w-10 h-10 bg-star-blue/10 rounded-lg flex items-center justify-center">
                            <Mail className="text-star-blue" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-semibold truncate">{apt.patient_email}</p>
                          </div>
                        </div>
                      </div>

                      {apt.notes && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                          <p className="text-sm font-semibold text-gray-700 mb-1">Notes:</p>
                          <p className="text-gray-600">{apt.notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    {apt.status !== 'cancelled' && (
                      <div className="flex lg:flex-col gap-2">
                        <button
                          onClick={() => handleCancel(
                            apt.id,
                            `${apt.service}\n${new Date(apt.date + 'T00:00:00').toLocaleDateString('en-AU', { weekday: 'long', month: 'long', day: 'numeric' })}\nat ${apt.time}`
                          )}
                          disabled={cancelling === apt.id}
                          className="flex-1 lg:flex-none px-6 py-3 text-red-600 hover:bg-red-50 border-2 border-red-300 rounded-xl transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md flex items-center justify-center gap-2"
                        >
                          {cancelling === apt.id ? (
                            <>
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                              Cancelling...
                            </>
                          ) : (
                            <>
                              <X size={18} />
                              Cancel Appointment
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-gray-400" size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No upcoming appointments</h3>
              <p className="text-gray-600 mb-6">Book your next dental visit to keep your smile healthy!</p>
              <Link href="/book" className="btn-primary inline-flex items-center gap-2">
                <Plus size={20} />
                Book Appointment
              </Link>
            </motion.div>
          )}
        </section>

        {/* Past Appointments */}
        {pastAppointments.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Past Appointments</h2>
            <div className="space-y-3">
              {pastAppointments.map((apt, index) => (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 opacity-75 hover:opacity-100 transition-opacity"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-gray-900">{apt.service}</h4>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(apt.status)}`}>
                          {getStatusIcon(apt.status)}
                          {apt.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(apt.date + 'T00:00:00').toLocaleDateString('en-AU', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {apt.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Card */}
        <div className="mt-12 bg-gradient-to-br from-star-blue to-star-blue-dark rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Need to make changes?</h3>
          <p className="text-white/90 mb-6">
            Contact us to reschedule or for any questions about your appointments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+61395620675"
              className="btn-white inline-flex items-center gap-2"
            >
              <Phone size={20} />
              Call (03) 9562 0675
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-colors font-semibold"
            >
              Send Message
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
