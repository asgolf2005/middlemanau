'use client'

import { motion } from 'framer-motion'

export default function PrivacyPolicyPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-blue text-white py-16">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/90">
              Last updated: November 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <h2>Introduction</h2>
            <p>
              Star Smiles Dental Centre ("we", "our", "us") is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our practice or use our website.
            </p>

            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us, including:</p>
            <ul>
              <li>Name, date of birth, and contact details (address, phone number, email)</li>
              <li>Health fund and Medicare information</li>
              <li>Medical and dental history</li>
              <li>Treatment records and clinical notes</li>
              <li>X-rays, photographs, and diagnostic images</li>
              <li>Payment and billing information</li>
            </ul>

            <h3>Website Information</h3>
            <p>When you visit our website, we may automatically collect:</p>
            <ul>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>IP address and location data</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website or source</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use your personal information to:</p>
            <ul>
              <li>Provide dental care and treatment</li>
              <li>Manage appointments and communicate with you</li>
              <li>Process payments and health fund claims</li>
              <li>Maintain your dental records</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Improve our services and patient experience</li>
              <li>Send appointment reminders and relevant health information</li>
            </ul>

            <h2>Disclosure of Your Information</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Other healthcare providers involved in your care (with your consent)</li>
              <li>Dental laboratories for treatment purposes</li>
              <li>Health funds for claims processing</li>
              <li>Government agencies as required by law</li>
              <li>Our service providers who assist in operating our practice</li>
            </ul>
            <p>We will not sell, rent, or trade your personal information to third parties for marketing purposes.</p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>

            <h2>Your Rights</h2>
            <p>Under Australian Privacy Principles, you have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Opt out of marketing communications</li>
              <li>Lodge a complaint about our handling of your information</li>
            </ul>

            <h2>Retention of Information</h2>
            <p>
              We retain your dental records in accordance with Australian legal requirements, which typically require retention for a minimum of 7 years after the last consultation (or until a patient turns 25, whichever is longer).
            </p>

            <h2>Cookies</h2>
            <p>
              Our website uses cookies to enhance your browsing experience. You can control cookies through your browser settings, but disabling them may affect website functionality.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              We collect information about child patients from their parents or guardians. Parents/guardians are responsible for providing consent for their children's treatment and information collection.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>

            <h2>Contact Us</h2>
            <p>If you have questions about this Privacy Policy or wish to access your information, please contact us:</p>
            <ul>
              <li>Phone: (03) 9803 0933</li>
              <li>Email: info@starsmiles.com.au</li>
              <li>Address: Brandon Park Shopping Centre, Wheelers Hill, VIC 3150</li>
            </ul>

            <h2>Complaints</h2>
            <p>
              If you are not satisfied with how we have handled your personal information, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer">www.oaic.gov.au</a>.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
