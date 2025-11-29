'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface HistoryRecord {
  id: number
  patient_id: number
  appointment_id?: number
  visit_date: string
  service: string
  doctor: string
  notes?: string
  status: string
  created_at: string
}

export default function HistoryPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [history, setHistory] = useState<HistoryRecord[]>([])
  const [patientId, setPatientId] = useState<number | null>(null)

  useEffect(() => {
    const getUserAndHistory = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/portal/login')
      } else {
        setUser(user)

        // Get patient record
        const { data: patient } = await supabase
          .from('patients')
          .select('id, patient_id')
          .eq('email', user.email)
          .single()

        if (patient) {
          setPatientId(patient.patient_id)

          // Fetch patient history from patient_history table
          const { data: historyData } = await supabase
            .from('patient_history')
            .select('*')
            .eq('patient_id', patient.patient_id)
            .order('visit_date', { ascending: false })

          if (historyData) {
            setHistory(historyData)
          }
        }

        setLoading(false)
      }
    }
    getUserAndHistory()
  }, [router, supabase])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-star-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="text-green-600" size={20} />
      case 'cancelled':
        return <XCircle className="text-red-600" size={20} />
      default:
        return <AlertCircle className="text-yellow-600" size={20} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-yellow-100 text-yellow-700'
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
            <h1 className="text-2xl font-display font-bold text-gray-900">Visit History</h1>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        <div className="bg-white rounded-2xl shadow-sm">
          {history.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {history.map((record) => (
                <div key={record.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(record.status)}
                        <h3 className="text-lg font-semibold text-gray-900">{record.service}</h3>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>
                            {new Date(record.visit_date).toLocaleDateString('en-AU', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>

                        {record.doctor && (
                          <p className="text-gray-700">Provider: {record.doctor}</p>
                        )}

                        {record.notes && (
                          <p className="text-gray-600 mt-2">
                            <span className="font-medium">Notes:</span> {record.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="ml-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Calendar className="text-gray-300 mx-auto mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Visit History</h3>
              <p className="text-gray-600 mb-6">You don't have any past visits recorded yet.</p>
              <Link href="/book" className="btn-primary inline-flex items-center gap-2">
                Book Your First Appointment
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
