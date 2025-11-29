'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function TermsOfServicePage() {
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
              Terms of Service
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
            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using the Star Smiles Dental Centre website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2>Our Services</h2>
            <p>
              Star Smiles Dental Centre provides dental care services at our Wheelers Hill location. Our website allows you to:
            </p>
            <ul>
              <li>Learn about our dental services</li>
              <li>Request appointments online</li>
              <li>Access the patient portal</li>
              <li>Contact our team</li>
              <li>Read dental health information</li>
            </ul>

            <h2>Appointment Booking</h2>
            <h3>Online Booking Requests</h3>
            <p>
              Appointment requests made through our website are requests only and are not confirmed until you receive confirmation from our team. We will contact you to confirm your appointment time.
            </p>

            <h3>Cancellation Policy</h3>
            <p>
              We require at least 24 hours' notice for appointment cancellations. Repeated missed appointments or late cancellations may result in a cancellation fee or require a deposit for future bookings.
            </p>

            <h3>Late Arrivals</h3>
            <p>
              If you arrive late for your appointment, we may need to reschedule to ensure we can provide you with adequate care and avoid delays for other patients.
            </p>

            <h2>Patient Portal</h2>
            <p>
              Access to our patient portal requires registration. You are responsible for:
            </p>
            <ul>
              <li>Maintaining the confidentiality of your login credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Ensuring your contact information is accurate and up to date</li>
            </ul>

            <h2>Payment Terms</h2>
            <h3>Payment</h3>
            <p>
              Payment is due at the time of service unless other arrangements have been made. We accept cash, EFTPOS, and major credit cards.
            </p>

            <h3>Health Fund Claims</h3>
            <p>
              We offer HICAPS for on-the-spot health fund claims. The gap payment is your responsibility and must be paid at the time of service.
            </p>

            <h3>Payment Plans</h3>
            <p>
              Payment plans may be available for eligible patients and treatments. Terms and conditions apply. Please speak with our team for more information.
            </p>

            <h2>Website Use</h2>
            <h3>Intellectual Property</h3>
            <p>
              All content on this website, including text, graphics, logos, and images, is the property of Star Smiles Dental Centre and is protected by copyright laws. You may not reproduce, distribute, or use our content without permission.
            </p>

            <h3>Accuracy of Information</h3>
            <p>
              While we strive to provide accurate and up-to-date information, the content on our website is for general information purposes only and should not be considered medical advice. Always consult with a qualified dental professional for personalized advice.
            </p>

            <h3>Links to Third-Party Sites</h3>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the content or practices of these sites.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Star Smiles Dental Centre shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our website or services.
            </p>

            <h2>Dental Treatment Consent</h2>
            <p>
              Specific treatment consent will be obtained separately before any dental procedures. This includes:
            </p>
            <ul>
              <li>Explanation of the proposed treatment</li>
              <li>Discussion of risks and alternatives</li>
              <li>Estimated costs</li>
              <li>Your opportunity to ask questions</li>
            </ul>

            <h2>Privacy</h2>
            <p>
              Your use of our services is also governed by our <Link href="/privacy" className="text-star-blue hover:text-star-blue-dark">Privacy Policy</Link>. By using our services, you consent to the collection and use of your information as described therein.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will be effective when posted on our website. Your continued use of our services after changes are posted constitutes acceptance of the modified terms.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms of Service are governed by the laws of Victoria, Australia. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts of Victoria.
            </p>

            <h2>Contact Us</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
            <ul>
              <li>Phone: (03) 9803 0933</li>
              <li>Email: info@starsmiles.com.au</li>
              <li>Address: Brandon Park Shopping Centre, Wheelers Hill, VIC 3150</li>
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
