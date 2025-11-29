import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ClientLayout from '@/components/ClientLayout'

export const metadata: Metadata = {
  metadataBase: new URL('https://starsmiles.com.au'),
  title: {
    default: 'Dental Clinic Wheelers Hill | Best Dentist in Melbourne - Star Smiles Dental Centre',
    template: '%s | Star Smiles Dental Centre'
  },
  description: 'Looking for the best dental clinic in Wheelers Hill with professional and qualified dentists? Star Smiles Dental Centre offers comprehensive family dentistry. Book an appointment today!',
  keywords: ['dentist wheelers hill', 'dental clinic wheelers hill', 'cosmetic dentistry melbourne', 'dental implants', 'orthodontics', 'family dentistry', 'teeth whitening', 'emergency dentist', 'brandon park dentist'],
  authors: [{ name: 'Star Smiles Dental Centre' }],
  creator: 'Star Smiles Dental Centre',
  publisher: 'Star Smiles Dental Centre',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Star Smiles Dental Centre | Best Dentist in Wheelers Hill',
    description: 'Professional dental clinic in Wheelers Hill offering comprehensive family dentistry, cosmetic treatments, and dental implants. Making Beautiful Smiles a Reality!',
    url: 'https://starsmiles.com.au',
    siteName: 'Star Smiles Dental Centre',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Star Smiles Dental Centre - Making Beautiful Smiles a Reality',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Star Smiles Dental Centre | Wheelers Hill Dentist',
    description: 'Making Beautiful Smiles a Reality. Professional dental care in Wheelers Hill, VIC.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://starsmiles.com.au',
  },
}

// Schema.org structured data for Local Business
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: 'Star Smiles Dental Centre',
  image: 'https://starsmiles.com.au/images/logo.jpg',
  '@id': 'https://starsmiles.com.au',
  url: 'https://starsmiles.com.au',
  telephone: '+61395620675',
  email: 'info@starsmiles.com.au',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1 Plato Crescent, Brandon Park Shopping Centre',
    addressLocality: 'Wheelers Hill',
    addressRegion: 'VIC',
    postalCode: '3150',
    addressCountry: 'AU'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -37.9025,
    longitude: 145.1855
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '13:00'
    }
  ],
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '150'
  },
  sameAs: [
    'https://www.facebook.com/starsmilesdental',
    'https://www.instagram.com/starsmilesdental'
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Dental Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'General Dentistry',
          description: 'Comprehensive dental check-ups, cleanings, and preventive care'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Cosmetic Dentistry',
          description: 'Teeth whitening, veneers, and smile makeovers'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Dental Implants',
          description: 'Permanent tooth replacement solutions'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Orthodontics',
          description: 'Braces and clear aligners for straighter teeth'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Childrens Dentistry',
          description: 'Gentle dental care for children of all ages'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Emergency Dental Care',
          description: 'Same-day emergency dental treatment'
        }
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ClientLayout />
      </body>
    </html>
  )
}
