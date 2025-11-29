'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import {
  User, Calendar, Clock, FileText, Settings, LogOut,
  Plus, ChevronRight, Phone, Mail, MapPin, Bell,
  CalendarDays, History, CreditCard, Heart
} from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface Appointment {
  id: string
  service: string
  provider: string
  date: string
  time: string
  status: string
  patient_name: string
  patient_email: string
  patient_phone: string
  notes?: string
  calendar_event_id?: string
}

interface PatientData {
  patient_id: number
  full_name: string
  phone: string
  total_appointments: number
  completed_appointments: number
  cancelled_appointments: number
}

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [patientData, setPatientData] = useState<PatientData | null>(null)

  useEffect(() => {
    const getUserAndData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/portal/login')
      } else {
        setUser(user)

        // Fetch patient data from patients table
        const { data: patient } = await supabase
          .from('patients')
          .select('*')
          .eq('email', user.email)
          .single()

        if (patient) {
          setPatientData(patient)
        }

        // Fetch appointments using the API endpoint
        try {
          const response = await fetch('/api/portal/appointments')
          const data = await response.json()

          if (data.appointments) {
            // Filter upcoming appointments only and limit to 3
            const upcoming = data.appointments
              .filter((apt: Appointment) =>
                apt.status !== 'cancelled' &&
                apt.status !== 'completed' &&
                new Date(apt.date + 'T00:00:00') >= new Date()
              )
              .slice(0, 3)

            setAppointments(upcoming)
          }
        } catch (error) {
          console.error('Failed to fetch appointments:', error)
        }

        setLoading(false)
      }
    }
    getUserAndData()
  }, [router, supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/portal/login')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-star-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const userName = patientData?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Patient'

  const quickActions = [
    { icon: Plus, label: 'Book Appointment', href: '/book', color: 'bg-star-orange' },
    { icon: CalendarDays, label: 'View Schedule', href: '/portal/appointments', color: 'bg-star-blue' },
    { icon: History, label: 'Visit History', href: '/portal/history', color: 'bg-star-blue-light' },
    { icon: FileText, label: 'My Records', href: '/portal/records', color: 'bg-star-blue-dark' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-display font-bold text-star-blue">
              Star Smiles
            </Link>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-star-blue relative">
                <Bell size={24} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-star-orange rounded-full" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-star-blue rounded-full flex items-center justify-center text-white font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="hidden md:block">
                  <p className="font-semibold text-gray-900">{userName}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                title="Sign Out"
              >
                <LogOut size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Welcome back, {userName}!
          </h1>
          <p className="text-gray-600">Manage your appointments and dental care all in one place.</p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className="text-white" size={24} />
              </div>
              <p className="font-semibold text-gray-900">{action.label}</p>
            </Link>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Appointments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
                <Link href="/portal/appointments" className="text-star-blue hover:text-star-blue-dark text-sm font-medium">
                  View All
                </Link>
              </div>

              {appointments.length > 0 ? (
                <div className="space-y-3">
                  {appointments.map((apt) => (
                    <Link
                      key={apt.id}
                      href="/portal/appointments"
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all hover:shadow-md group"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-star-blue/10 rounded-lg flex items-center justify-center group-hover:bg-star-blue/20 transition-colors">
                          <Calendar className="text-star-blue" size={24} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 group-hover:text-star-blue transition-colors">{apt.service}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="text-gray-400" size={14} />
                            <p className="text-sm text-gray-600">
                              {new Date(apt.date + 'T00:00:00').toLocaleDateString('en-AU', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric'
                              })} at {apt.time}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          apt.status === 'confirmed'
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : apt.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}>
                          {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                        </span>
                        <ChevronRight className="text-gray-400 group-hover:text-star-blue transition-colors" size={20} />
                      </div>
                    </Link>
                  ))}

                  {appointments.length >= 3 && (
                    <Link
                      href="/portal/appointments"
                      className="block text-center py-3 text-star-blue hover:text-star-blue-dark font-medium text-sm transition-colors"
                    >
                      View All Appointments →
                    </Link>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="text-gray-400" size={32} />
                  </div>
                  <p className="text-gray-600 mb-1 font-medium">No upcoming appointments</p>
                  <p className="text-gray-500 text-sm mb-6">Book your next dental visit to keep your smile healthy!</p>
                  <Link href="/book" className="btn-primary inline-flex items-center gap-2">
                    <Plus size={20} />
                    Book Appointment
                  </Link>
                </div>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Profile</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail size={18} />
                  <span className="text-sm">{user?.email}</span>
                </div>
                {patientData?.phone && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone size={18} />
                    <span className="text-sm">{patientData.phone}</span>
                  </div>
                )}
              </div>
              <Link
                href="/portal/settings"
                className="mt-4 w-full btn-secondary text-sm py-2 flex items-center justify-center gap-2"
              >
                <Settings size={18} />
                Edit Profile
              </Link>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-star-blue to-star-blue-dark rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
              <p className="text-white/80 text-sm mb-4">
                Contact us for any questions about your dental care.
              </p>
              <div className="space-y-3">
                <a href="tel:+61398030933" className="flex items-center gap-3 text-white/90 hover:text-white">
                  <Phone size={18} />
                  <span>(03) 9803 0933</span>
                </a>
                <div className="flex items-center gap-3 text-white/90">
                  <MapPin size={18} />
                  <span className="text-sm">Brandon Park SC, Wheelers Hill</span>
                </div>
              </div>
            </div>

            {/* Health Tips */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="text-star-orange" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">Dental Tip</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Remember to brush twice daily for 2 minutes and floss once a day to maintain optimal oral health!
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
