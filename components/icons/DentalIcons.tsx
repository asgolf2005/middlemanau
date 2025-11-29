import React from 'react'

interface IconProps {
  size?: number
  className?: string
  color?: string
}

export const ToothIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2C9.5 2 7.5 3.5 6.5 5.5C5.5 7.5 5 10 5 12C5 14 5.5 16 6 17.5C6.5 19 7 20 7.5 20.5C8 21 8.5 21.5 9 21.5C9.5 21.5 10 21 10.5 20C11 19 11.5 17.5 12 16C12.5 17.5 13 19 13.5 20C14 21 14.5 21.5 15 21.5C15.5 21.5 16 21 16.5 20.5C17 20 17.5 19 18 17.5C18.5 16 19 14 19 12C19 10 18.5 7.5 17.5 5.5C16.5 3.5 14.5 2 12 2Z"
      fill={color}
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const ToothBraceIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2C9.5 2 7.5 3.5 6.5 5.5C5.5 7.5 5 10 5 12C5 14 5.5 16 6 17.5C6.5 19 7 20 7.5 20.5C8 21 8.5 21.5 9 21.5C9.5 21.5 10 21 10.5 20C11 19 11.5 17.5 12 16C12.5 17.5 13 19 13.5 20C14 21 14.5 21.5 15 21.5C15.5 21.5 16 21 16.5 20.5C17 20 17.5 19 18 17.5C18.5 16 19 14 19 12C19 10 18.5 7.5 17.5 5.5C16.5 3.5 14.5 2 12 2Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1="5" y1="8" x2="19" y2="8" stroke={color} strokeWidth="2" />
    <line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2" />
    <line x1="5" y1="16" x2="19" y2="16" stroke={color} strokeWidth="2" />
    <circle cx="8" cy="8" r="1.5" fill={color} />
    <circle cx="12" cy="8" r="1.5" fill={color} />
    <circle cx="16" cy="8" r="1.5" fill={color} />
    <circle cx="8" cy="12" r="1.5" fill={color} />
    <circle cx="12" cy="12" r="1.5" fill={color} />
    <circle cx="16" cy="12" r="1.5" fill={color} />
    <circle cx="8" cy="16" r="1.5" fill={color} />
    <circle cx="12" cy="16" r="1.5" fill={color} />
    <circle cx="16" cy="16" r="1.5" fill={color} />
  </svg>
)

export const ToothImplantIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2C9.5 2 7.5 3.5 6.5 5.5C5.5 7.5 5 10 5 12C5 14 5.5 16 6 17.5C6.5 19 7 20 7.5 20.5C8 21 8.5 21.5 9 21.5C9.5 21.5 10 21 10.5 20C11 19 11.5 17.5 12 16C12.5 17.5 13 19 13.5 20C14 21 14.5 21.5 15 21.5C15.5 21.5 16 21 16.5 20.5C17 20 17.5 19 18 17.5C18.5 16 19 14 19 12C19 10 18.5 7.5 17.5 5.5C16.5 3.5 14.5 2 12 2Z"
      fill={color}
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1="12" y1="22" x2="12" y2="2" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="8" r="2" fill="white" />
  </svg>
)

export const ToothCleanIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2C9.5 2 7.5 3.5 6.5 5.5C5.5 7.5 5 10 5 12C5 14 5.5 16 6 17.5C6.5 19 7 20 7.5 20.5C8 21 8.5 21.5 9 21.5C9.5 21.5 10 21 10.5 20C11 19 11.5 17.5 12 16C12.5 17.5 13 19 13.5 20C14 21 14.5 21.5 15 21.5C15.5 21.5 16 21 16.5 20.5C17 20 17.5 19 18 17.5C18.5 16 19 14 19 12C19 10 18.5 7.5 17.5 5.5C16.5 3.5 14.5 2 12 2Z"
      fill={color}
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 10C8 10 9 8 10 8C11 8 11 9 12 9C13 9 13 8 14 8C15 8 16 10 16 10"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="9" cy="13" r="0.8" fill="white" />
    <circle cx="15" cy="13" r="0.8" fill="white" />
    <path d="M9 15C9 15 10 16 12 16C14 16 15 15 15 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const DentalChairIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="4" y="12" width="12" height="8" rx="2" stroke={color} strokeWidth="2" fill="none" />
    <path d="M6 12V8C6 6 7 4 9 4H11" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M16 16L18 20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M4 16L2 20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="18" cy="6" r="2" fill={color} />
    <path d="M18 8V12" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const SmileIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="9" cy="10" r="1.5" fill={color} />
    <circle cx="15" cy="10" r="1.5" fill={color} />
    <path
      d="M7 14C7 14 9 17 12 17C15 17 17 14 17 14"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

export const DentalMirrorIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="8" cy="8" r="5" stroke={color} strokeWidth="2" fill="none" />
    <path d="M11 11L20 20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="8" cy="8" r="3" fill={color} opacity="0.2" />
  </svg>
)
