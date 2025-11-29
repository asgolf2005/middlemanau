'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  alt: string
  title?: string
  description?: string
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  alt,
  title,
  description
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percentage = (x / rect.width) * 100
    setSliderPosition(percentage)
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [isDragging])

  return (
    <div className="space-y-4">
      {title && (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      )}

      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* After Image (Full) */}
        <div className="absolute inset-0">
          <Image
            src={afterImage}
            alt={`${alt} - After`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
            After
          </div>
        </div>

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={beforeImage}
            alt={`${alt} - Before`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 left-4 bg-gray-700 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
            Before
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%` }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center cursor-ew-resize"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={20} className="text-gray-700 -ml-1" />
            <ChevronRight size={20} className="text-gray-700 -mr-1" />
          </motion.div>
        </div>

        {/* Instruction Overlay (shows on first load) */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <div className="bg-white/90 px-6 py-3 rounded-full text-sm font-semibold text-gray-900">
            ← Drag to compare →
          </div>
        </motion.div>
      </div>

      {/* Quick Jump Buttons */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setSliderPosition(0)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            sliderPosition < 25
              ? 'bg-gray-700 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Before
        </button>
        <button
          onClick={() => setSliderPosition(50)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            sliderPosition >= 25 && sliderPosition <= 75
              ? 'bg-star-blue text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          50/50
        </button>
        <button
          onClick={() => setSliderPosition(100)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            sliderPosition > 75
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          After
        </button>
      </div>
    </div>
  )
}
