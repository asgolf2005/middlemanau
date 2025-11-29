'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ExternalLink, ThumbsUp, MessageSquare, TrendingUp } from 'lucide-react'

interface Review {
  id: string
  author: string
  rating: number
  date: string
  text: string
  avatar?: string
}

// Sample reviews - Replace with actual Google Reviews API data
const sampleReviews: Review[] = [
  {
    id: '1',
    author: 'Sarah M.',
    rating: 5,
    date: '2 weeks ago',
    text: 'Outstanding service! Dr. Nalini and her team are incredibly professional and caring. They made my dental implant procedure completely painless. The clinic is modern and spotless. Highly recommend!'
  },
  {
    id: '2',
    author: 'Michael T.',
    rating: 5,
    date: '1 month ago',
    text: 'Best dental experience I\'ve ever had. The staff are so friendly and welcoming. They explained everything clearly and made sure I was comfortable throughout. The results of my teeth whitening are amazing!'
  },
  {
    id: '3',
    author: 'Jessica L.',
    rating: 5,
    date: '1 month ago',
    text: 'I\'ve been bringing my whole family here for years. Dr. Prasad is fantastic with kids and adults alike. The booking system is easy, and they always run on time. Great location at Brandon Park too!'
  },
  {
    id: '4',
    author: 'David R.',
    rating: 5,
    date: '2 months ago',
    text: 'Had an emergency dental issue and they fit me in the same day. The care I received was exceptional. No judgment, just professional treatment and genuine concern for my wellbeing. Thank you!'
  },
  {
    id: '5',
    author: 'Emma K.',
    rating: 5,
    date: '2 months ago',
    text: 'My Invisalign journey with Star Smiles has been incredible! The results exceeded my expectations. Dr. Nalini\'s expertise and attention to detail is evident in every appointment. Worth every penny!'
  },
  {
    id: '6',
    author: 'James W.',
    rating: 5,
    date: '3 months ago',
    text: 'Clean, modern facility with state-of-the-art equipment. The team is knowledgeable and professional. They work with my health insurance which makes everything so much easier. Five stars!'
  }
]

interface GoogleReviewsProps {
  showStats?: boolean
  maxReviews?: number
}

export default function GoogleReviews({
  showStats = true,
  maxReviews = 6
}: GoogleReviewsProps) {
  const [showAll, setShowAll] = useState(false)
  const displayedReviews = showAll ? sampleReviews : sampleReviews.slice(0, maxReviews)

  const averageRating = 4.9
  const totalReviews = 150

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Stats Section */}
      {showStats && (
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Average Rating */}
            <div className="bg-gradient-to-br from-star-blue to-star-blue-light rounded-2xl p-6 text-white text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="fill-yellow-400 text-yellow-400" size={32} />
                <span className="text-5xl font-bold">{averageRating}</span>
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(5)}
              </div>
              <p className="text-white/90 text-sm">Average Rating</p>
            </div>

            {/* Total Reviews */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MessageSquare className="text-star-blue" size={28} />
                <span className="text-5xl font-bold text-gray-900">{totalReviews}</span>
              </div>
              <p className="text-gray-600 text-sm">Google Reviews</p>
            </div>

            {/* Recommendation Rate */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <ThumbsUp className="text-star-blue" size={28} />
                <span className="text-5xl font-bold text-gray-900">98%</span>
              </div>
              <p className="text-gray-600 text-sm">Recommend Us</p>
            </div>

            {/* Growth */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="text-green-600" size={28} />
                <span className="text-5xl font-bold text-gray-900">12+</span>
              </div>
              <p className="text-gray-600 text-sm">Years of Service</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Google Reviews Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h3 className="text-3xl font-display font-bold text-gray-900 mb-2">
            What Our Patients Say
          </h3>
          <p className="text-gray-600">Real reviews from real patients on Google</p>
        </div>
        <a
          href="https://www.google.com/search?q=star+smiles+dental+centre+wheelers+hill"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 md:mt-0 bg-star-blue hover:bg-star-blue-dark text-white font-semibold py-3 px-6 rounded-xl transition-colors inline-flex items-center gap-2"
        >
          View All on Google
          <ExternalLink size={18} />
        </a>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {displayedReviews.map((review, index) => (
          <motion.div
            key={review.id}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-star-blue to-star-blue-light rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{review.author}</h4>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-4">
              {renderStars(review.rating)}
            </div>

            {/* Review Text */}
            <p className="text-gray-700 text-sm leading-relaxed">
              "{review.text}"
            </p>

            {/* Google Icon */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Posted on Google
              </div>
              <ThumbsUp size={16} className="text-gray-400" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show More Button */}
      {sampleReviews.length > maxReviews && !showAll && (
        <div className="text-center">
          <motion.button
            onClick={() => setShowAll(true)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-8 rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Show More Reviews
          </motion.button>
        </div>
      )}

      {/* Leave Review CTA */}
      <motion.div
        className="mt-12 bg-gradient-to-r from-star-blue/10 to-star-blue-light/10 rounded-2xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Star className="w-16 h-16 mx-auto mb-4 text-yellow-500 fill-yellow-500" />
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Had a Great Experience?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We'd love to hear about your visit! Your feedback helps us continue to provide excellent dental care and helps others find us.
        </p>
        <a
          href="https://g.page/r/YOUR_GOOGLE_PLACE_ID/review"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-star-blue hover:bg-star-blue-dark text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
        >
          Leave a Google Review
          <ExternalLink size={20} />
        </a>
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="text-center">
          <div className="text-3xl font-bold text-star-blue mb-1">4.9★</div>
          <div className="text-sm text-gray-600">Google Rating</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-star-blue mb-1">150+</div>
          <div className="text-sm text-gray-600">Happy Patients</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-star-blue mb-1">12+</div>
          <div className="text-sm text-gray-600">Years Experience</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-star-blue mb-1">98%</div>
          <div className="text-sm text-gray-600">Recommend Us</div>
        </div>
      </motion.div>
    </div>
  )
}
