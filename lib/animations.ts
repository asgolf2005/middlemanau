// Advanced animation configurations for Framer Motion

export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
}

export const fadeInDown = {
  initial: { opacity: 0, y: -60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
}

export const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }
}

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3 }
}

export const hoverLift = {
  y: -10,
  transition: { duration: 0.3 }
}

export const hoverGlow = {
  boxShadow: '0 20px 50px rgba(59, 130, 246, 0.5)',
  transition: { duration: 0.3 }
}

// Card animations
export const cardHover = {
  scale: 1.02,
  y: -8,
  boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.3)',
  transition: { duration: 0.3, ease: 'easeOut' }
}

export const cardTap = {
  scale: 0.98,
  transition: { duration: 0.1 }
}

// Floating animation
export const floating = {
  y: [0, -20, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut'
  }
}

// Pulse animation
export const pulse = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut'
  }
}

// Rotation animation
export const rotate = {
  rotate: [0, 360],
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: 'linear'
  }
}

// Slide in from sides
export const slideInFromLeft = {
  initial: { x: '-100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
  transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }
}

export const slideInFromRight = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '100%', opacity: 0 },
  transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }
}

// 3D card tilt effect
export const cardTilt = {
  whileHover: {
    rotateY: 5,
    rotateX: 5,
    transition: { duration: 0.3 }
  }
}

// Magnetic button effect
export const magneticButton = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.95 },
  transition: { type: 'spring', stiffness: 400, damping: 17 }
}

// Gradient text animation
export const gradientText = {
  backgroundSize: '200% 200%',
  animation: 'gradient 3s ease infinite'
}

// Shimmer effect
export const shimmer = {
  backgroundSize: '200% 100%',
  animation: 'shimmer 2s linear infinite'
}

// Blob animation
export const blob = {
  animate: {
    scale: [1, 1.1, 1],
    rotate: [0, 5, -5, 0],
    borderRadius: ['60% 40% 30% 70%', '30% 60% 70% 40%', '60% 40% 30% 70%']
  },
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: 'easeInOut'
  }
}

// Page transition
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4 }
}

// Scroll reveal (use with useInView hook)
export const scrollReveal = {
  initial: { opacity: 0, y: 75 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }
}

// Counter animation
export const counterAnimation = (from: number, to: number) => ({
  initial: { value: from },
  animate: { value: to },
  transition: { duration: 2, ease: 'easeOut' }
})

// Elastic bounce
export const elasticBounce = {
  scale: [1, 1.2, 0.9, 1.1, 1],
  transition: {
    duration: 0.6,
    ease: 'easeInOut',
    times: [0, 0.2, 0.4, 0.6, 1]
  }
}

// Wave animation
export const wave = {
  rotate: [0, 14, -8, 14, -4, 10, 0],
  transition: {
    duration: 2.5,
    repeat: Infinity,
    ease: 'easeInOut'
  }
}
