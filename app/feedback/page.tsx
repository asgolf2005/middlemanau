'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Send, CheckCircle, Loader2, Sparkles } from 'lucide-react'

export default function FeedbackPage() {
  const searchParams = useSearchParams()
  const [appointmentId, setAppointmentId] = useState<string | null>(null)
  const [patientName, setPatientName] = useState<string | null>(null)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comments, setComments] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Get appointment ID and patient name from URL params
    const aptId = searchParams.get('apt')
    const name = searchParams.get('name')
    setAppointmentId(aptId)
    setPatientName(name)
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      setError('Please select a rating')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Send to N8N webhook
      const response = await fetch('/api/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointmentId,
          patientName,
          rating,
          comments,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit feedback')
      }

      setIsSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again or contact us directly.')
      console.error('Feedback submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const ratingLabels = [
    'Poor',
    'Fair',
    'Good',
    'Very Good',
    'Excellent'
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-star-blue-light via-white to-star-orange/10 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          </motion.div>

          <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Thank You!
          </h1>

          <p className="text-gray-600 mb-6">
            Your feedback has been received and is very valuable to us.
          </p>

          {rating >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 p-6 bg-gradient-to-r from-star-orange to-star-orange/80 rounded-2xl text-white"
            >
              <Sparkles className="w-8 h-8 mx-auto mb-3" />
              <p className="font-semibold mb-2">
                Check your SMS for a special offer!
              </p>
              <p className="text-sm text-white/90">
                We've sent you a $10 discount coupon for your next visit 🎉
              </p>
            </motion.div>
          )}

          <motion.a
            href="/"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-block mt-8 text-star-blue hover:text-star-blue-dark font-semibold"
          >
            Return to Home
          </motion.a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-star-blue-light via-white to-star-orange/10 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-star-blue to-star-blue-dark p-8 text-white text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            How Was Your Visit?
          </h1>
          <p className="text-white/90">
            {patientName ? `Hi ${patientName}, we'd` : "We'd"} love to hear about your experience at Star Smiles
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          {/* Rating */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4 text-center">
              Rate Your Experience
            </label>

            <div className="flex justify-center gap-3 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-12 h-12 md:w-16 md:h-16 transition-all ${
                      star <= (hoveredRating || rating)
                        ? 'fill-star-orange text-star-orange'
                        : 'text-gray-300'
                    }`}
                  />
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {(rating > 0 || hoveredRating > 0) && (
                <motion.p
                  key={hoveredRating || rating}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center text-2xl font-semibold text-star-blue"
                >
                  {ratingLabels[(hoveredRating || rating) - 1]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Comments */}
          <div className="mb-6">
            <label htmlFor="comments" className="block text-lg font-semibold text-gray-900 mb-3">
              Tell Us More <span className="text-gray-400 font-normal text-sm">(Optional)</span>
            </label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="What did you like? How can we improve?"
              rows={5}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-star-blue focus:ring-2 focus:ring-star-blue/20 outline-none transition-all resize-none"
            />
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || rating === 0}
            whileHover={{ scale: rating === 0 ? 1 : 1.02 }}
            whileTap={{ scale: rating === 0 ? 1 : 0.98 }}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
              rating === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-star-orange to-star-orange/90 text-white hover:shadow-lg'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Feedback
              </>
            )}
          </motion.button>

          {/* Privacy Note */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Your feedback helps us serve you better. Thank you for choosing Star Smiles! ⭐
          </p>
        </form>
      </motion.div>
    </div>
  )
}
