'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { motion } from 'framer-motion'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  showSkeleton?: boolean
  skeletonClassName?: string
  animateOnLoad?: boolean
}

export default function OptimizedImage({
  showSkeleton = true,
  skeletonClassName = '',
  animateOnLoad = true,
  className = '',
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <svg
            className="w-12 h-12 mx-auto text-gray-400 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm text-gray-500">Image unavailable</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {showSkeleton && isLoading && (
        <div
          className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] ${skeletonClassName}`}
        />
      )}
      {animateOnLoad ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            {...props}
            className={className}
            onLoad={handleLoad}
            onError={handleError}
            loading={props.priority ? undefined : 'lazy'}
          />
        </motion.div>
      ) : (
        <Image
          {...props}
          className={className}
          onLoad={handleLoad}
          onError={handleError}
          loading={props.priority ? undefined : 'lazy'}
        />
      )}
    </div>
  )
}
