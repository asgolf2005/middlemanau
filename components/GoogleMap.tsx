'use client'

import { useState } from 'react'
import { MapPin, Navigation, Phone, Clock, ExternalLink, Route, Loader2, Car, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface GoogleMapProps {
  width?: string
  height?: string
  showInfo?: boolean
}

interface DistanceInfo {
  distance: number // in kilometers
  duration: number // in minutes
  userLocation: {
    lat: number
    lng: number
  }
}

export default function GoogleMap({
  width = '100%',
  height = '450px',
  showInfo = true
}: GoogleMapProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [distanceInfo, setDistanceInfo] = useState<DistanceInfo | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)

  const address = '1 Plato Crescent, Wheelers Hill VIC 3150, Australia'
  const encodedAddress = encodeURIComponent(address)

  // Practice location coordinates
  const practiceLocation = {
    lat: -37.9025,
    lng: 145.1833
  }

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`

  // Get directions URL - if user has shared location, include origin
  const getDirectionsUrl = () => {
    if (distanceInfo?.userLocation) {
      return `https://www.google.com/maps/dir/${distanceInfo.userLocation.lat},${distanceInfo.userLocation.lng}/${encodedAddress}`
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
  }

  // Embed URL for Google Maps
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.8341234567!2d145.1833!3d-37.9025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad63f1234567890%3A0x1234567890abcdef!2s1%20Plato%20Crescent%2C%20Wheelers%20Hill%20VIC%203150!5e0!3m2!1sen!2sau!4v1234567890123!5m2!1sen!2sau`

  // Calculate distance using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c
    return distance
  }

  // Estimate driving time based on distance (rough approximation)
  const estimateDrivingTime = (distanceKm: number): number => {
    // Assume average speed of 40 km/h for urban driving
    const averageSpeed = 40
    return Math.round((distanceKm / averageSpeed) * 60)
  }

  // Get user's location and calculate distance
  const handleCalculateDistance = () => {
    setIsCalculating(true)
    setLocationError(null)

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser')
      setIsCalculating(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude
        const userLng = position.coords.longitude

        const distance = calculateDistance(
          userLat,
          userLng,
          practiceLocation.lat,
          practiceLocation.lng
        )

        const duration = estimateDrivingTime(distance)

        setDistanceInfo({
          distance,
          duration,
          userLocation: {
            lat: userLat,
            lng: userLng
          }
        })

        setIsCalculating(false)
      },
      (error) => {
        let errorMessage = 'Unable to get your location'
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Please allow location access to calculate distance'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out'
            break
        }
        setLocationError(errorMessage)
        setIsCalculating(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  }

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
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">Get Directions</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Free parking available at Brandon Park Shopping Centre
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleCalculateDistance}
                    disabled={isCalculating}
                    className="bg-star-orange hover:bg-star-orange/90 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCalculating ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Route size={16} />
                        Calculate Distance
                      </>
                    )}
                  </button>
                  <a
                    href={getDirectionsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-star-blue hover:bg-star-blue-dark text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Navigation size={16} />
                    Open in Maps
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Distance Results */}
      <AnimatePresence>
        {distanceInfo && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-star-orange to-star-orange/80 rounded-2xl p-6 shadow-xl text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Route size={24} />
                </div>
                <h3 className="text-2xl font-bold">Distance to Star Smiles</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <MapPin size={32} className="text-white/90" />
                    <div>
                      <p className="text-white/80 text-sm">Distance</p>
                      <p className="text-3xl font-bold">
                        {distanceInfo.distance < 1
                          ? `${Math.round(distanceInfo.distance * 1000)} m`
                          : `${distanceInfo.distance.toFixed(1)} km`
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <Car size={32} className="text-white/90" />
                    <div>
                      <p className="text-white/80 text-sm">Estimated Drive Time</p>
                      <p className="text-3xl font-bold">
                        {distanceInfo.duration < 60
                          ? `${distanceInfo.duration} min`
                          : `${Math.floor(distanceInfo.duration / 60)}h ${distanceInfo.duration % 60}m`
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-white/80 text-sm mt-4 italic">
                * Distance is calculated as straight-line. Actual driving distance may vary. Click "Open in Maps" for turn-by-turn directions.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Location Error */}
      <AnimatePresence>
        {locationError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6"
          >
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-red-800 font-semibold">Location Access Required</p>
                <p className="text-red-700 text-sm mt-1">{locationError}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
