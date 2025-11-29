'use client'

import { useState } from 'react'
import { MapPin, Navigation, Phone, Clock, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

interface GoogleMapProps {
  width?: string
  height?: string
  showInfo?: boolean
}

export default function GoogleMap({
  width = '100%',
  height = '450px',
  showInfo = true
}: GoogleMapProps) {
  const [isLoading, setIsLoading] = useState(true)

  const address = '1 Plato Crescent, Wheelers Hill VIC 3150, Australia'
  const encodedAddress = encodeURIComponent(address)
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`

  // Embed URL for Google Maps
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.8341234567!2d145.1833!3d-37.9025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad63f1234567890%3A0x1234567890abcdef!2s1%20Plato%20Crescent%2C%20Wheelers%20Hill%20VIC%203150!5e0!3m2!1sen!2sau!4v1234567890123!5m2!1sen!2sau`

  return (
    <div className="w-full">
      {showInfo && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-star-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="text-star-blue" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Our Location</h3>
                <p className="text-gray-600 text-sm mb-3">
                  1 Plato Crescent<br />
                  Brandon Park Shopping Centre<br />
                  Wheelers Hill, VIC 3150
                </p>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-star-blue text-sm font-semibold hover:underline inline-flex items-center gap-1"
                >
                  View on Google Maps
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-star-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="text-star-blue" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Opening Hours</h3>
                <div className="text-gray-600 text-sm space-y-1">
                  <div className="flex justify-between gap-4">
                    <span>Mon - Fri:</span>
                    <span className="font-semibold">9AM - 6PM</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Saturday:</span>
                    <span className="font-semibold">9AM - 1PM</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Sunday:</span>
                    <span className="font-semibold text-red-600">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-star-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Navigation className="text-star-blue" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Get Directions</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Free parking available at Brandon Park Shopping Centre
                </p>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-star-blue hover:bg-star-blue-dark text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors inline-flex items-center gap-2"
                >
                  <Navigation size={16} />
                  Get Directions
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{ width, height }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: showInfo ? 0.4 : 0 }}
      >
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">
              <MapPin size={48} className="animate-bounce" />
            </div>
          </div>
        )}
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIsLoading(false)}
          className="w-full h-full"
        />
      </motion.div>

      {/* Parking Info */}
      <motion.div
        className="mt-6 bg-gradient-to-r from-blue-50 to-star-blue/10 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: showInfo ? 0.5 : 0.1 }}
      >
        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <MapPin className="text-star-blue" size={20} />
          Parking & Access
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="mb-2"><strong>🅿️ Free Parking:</strong> Ample free parking available at Brandon Park Shopping Centre</p>
            <p className="mb-2"><strong>♿ Accessibility:</strong> Wheelchair accessible entrance and facilities</p>
          </div>
          <div>
            <p className="mb-2"><strong>🚌 Public Transport:</strong> Bus stops nearby with routes 733, 736, 737</p>
            <p className="mb-2"><strong>🏬 Shopping Centre:</strong> Located within Brandon Park for your convenience</p>
          </div>
        </div>
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        className="mt-6 bg-gradient-to-r from-star-blue to-star-blue-light rounded-2xl p-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: showInfo ? 0.6 : 0.2 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-xl font-bold mb-2">Need Help Finding Us?</h4>
            <p className="text-white/90">Call us for directions or any questions about your visit</p>
          </div>
          <a
            href="tel:+61395620675"
            className="bg-white hover:bg-gray-100 text-star-blue font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 whitespace-nowrap"
          >
            <Phone size={20} />
            (03) 9562 0675
          </a>
        </div>
      </motion.div>
    </div>
  )
}
