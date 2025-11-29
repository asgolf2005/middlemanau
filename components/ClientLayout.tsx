'use client'

import dynamic from 'next/dynamic'

// Lazy load chat widget - not critical for initial page load
const LiveChatWidget = dynamic(() => import('./LiveChatWidget'), {
  ssr: false, // Don't render on server
  loading: () => null, // No loading indicator needed
})

export default function ClientLayout() {
  return (
    <>
      <LiveChatWidget />
    </>
  )
}
