'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Calendar, FileText, Download, Filter } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface Appointment {
  id: number
  patient_id: number
  service: string
  doctor: string
  date: string
  time: string
  status: string
  notes?: string
  created_at: string
}

export default function RecordsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filter, setFilter] = useState<'all' | 'completed' | 'upcoming' | 'cancelled'>('all')
  const [patientName, setPatientName] = useState('')

  useEffect(() => {
    const getUserAndRecords = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/portal/login')
      } else {
        setUser(user)

        // Get patient record
        const { data: patient } = await supabase
          .from('patients')
          .select('*')
          .eq('email', user.email)
          .single()

        if (patient) {
          setPatientName(patient.full_name)

          // Fetch all appointments from appointments table
          const { data: appointmentsData } = await supabase
            .from('appointments')
            .select('*')
            .eq('patient_id', patient.patient_id)
            .order('date', { ascending: false })

          if (appointmentsData) {
            setAppointments(appointmentsData)
          }
        }

        setLoading(false)
      }
    }
    getUserAndRecords()
  }, [router, supabase])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-star-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const getFilteredAppointments = () => {
    const today = new Date().toISOString().split('T')[0]

    switch (filter) {
      case 'completed':
        return appointments.filter(apt => apt.status === 'completed')
      case 'upcoming':
        return appointments.filter(apt => apt.date >= today && apt.status !== 'cancelled')
      case 'cancelled':
        return appointments.filter(apt => apt.status === 'cancelled')
      default:
        return appointments
    }
  }

  const filteredAppointments = getFilteredAppointments()

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'confirmed':
        return 'bg-blue-100 text-blue-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            <Link href="/portal/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-display font-bold text-gray-900">My Records</h1>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Total Appointments</p>
            <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {appointments.filter(a => a.status === 'completed').length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Upcoming</p>
            <p className="text-2xl font-bold text-blue-600">
              {appointments.filter(a => a.date >= new Date().toISOString().split('T')[0] && a.status !== 'cancelled').length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Cancelled</p>
            <p className="text-2xl font-bold text-red-600">
              {appointments.filter(a => a.status === 'cancelled').length}
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={20} className="text-gray-600" />
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-star-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'upcoming'
                  ? 'bg-star-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'completed'
                  ? 'bg-star-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter('cancelled')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'cancelled'
                  ? 'bg-star-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancelled
            </button>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-2xl shadow-sm">
          {filteredAppointments.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredAppointments.map((apt) => (
                <div key={apt.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="text-star-blue" size={20} />
                        <h3 className="text-lg font-semibold text-gray-900">{apt.service}</h3>
                      </div>

                      <div className="space-y-1 text-sm text-gray-600 ml-8">
                        <p>
                          <span className="font-medium">Date:</span>{' '}
                          {new Date(apt.date).toLocaleDateString('en-AU', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <p>
                          <span className="font-medium">Time:</span> {apt.time}
                        </p>
                        {apt.doctor && (
                          <p>
                            <span className="font-medium">Provider:</span> {apt.doctor}
                          </p>
                        )}
                        {apt.notes && (
                          <p className="text-gray-600 mt-2">
                            <span className="font-medium">Notes:</span> {apt.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="ml-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                        {apt.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FileText className="text-gray-300 mx-auto mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Records Found</h3>
              <p className="text-gray-600 mb-6">
                {filter === 'all'
                  ? "You don't have any appointment records yet."
                  : `No ${filter} appointments found.`}
              </p>
              <Link href="/book" className="btn-primary inline-flex items-center gap-2">
                Book an Appointment
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
