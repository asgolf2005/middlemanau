'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, User, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'

// This would come from Supabase in production
const blogPosts: Record<string, {
  title: string
  content: string
  category: string
  author: string
  authorRole: string
  date: string
  readTime: string
}> = {
  'importance-of-regular-dental-checkups': {
    title: 'The Importance of Regular Dental Check-ups',
    category: 'Preventive Care',
    author: 'Dr. Nalini Prasad',
    authorRole: 'Principal Dentist',
    date: '2024-11-15',
    readTime: '5 min read',
    content: `
      <p>Regular dental check-ups are the cornerstone of maintaining good oral health. At Star Smiles Dental Centre, we recommend visiting your dentist every six months for a routine examination and professional cleaning. But why is this so important?</p>

      <h2>Early Detection of Problems</h2>
      <p>Many dental issues, such as cavities, gum disease, and oral cancer, develop silently without causing noticeable symptoms in their early stages. Regular check-ups allow your dentist to identify these problems before they become serious, painful, and expensive to treat.</p>

      <h2>Professional Cleaning</h2>
      <p>Even with diligent brushing and flossing, plaque and tartar can build up in hard-to-reach areas of your mouth. Professional cleanings remove this buildup, helping to prevent tooth decay and gum disease. Your dental hygienist can also polish your teeth, removing surface stains and leaving your smile looking its best.</p>

      <h2>Personalized Oral Health Advice</h2>
      <p>Every mouth is unique, and your dentist can provide tailored advice based on your specific needs. Whether it's recommendations for oral hygiene products, tips for addressing sensitive teeth, or guidance on dietary choices that affect your oral health, your regular visits are an opportunity to get expert advice.</p>

      <h2>Maintaining Overall Health</h2>
      <p>Your oral health is closely connected to your overall health. Research has linked poor oral health to various systemic conditions, including heart disease, diabetes, and respiratory infections. By maintaining good oral hygiene and attending regular check-ups, you're investing in your whole-body health.</p>

      <h2>Cost Savings in the Long Run</h2>
      <p>Prevention is always better (and cheaper) than cure. The cost of regular check-ups and cleanings is far less than the expense of treating advanced dental problems. By catching issues early, you can often avoid costly procedures like root canals, extractions, or dental implants.</p>

      <h2>Book Your Check-up Today</h2>
      <p>Don't wait until you have a problem to visit the dentist. At Star Smiles Dental Centre, our friendly team is dedicated to making your dental visits comfortable and stress-free. Contact us today to schedule your next check-up.</p>
    `
  },
  'teeth-whitening-options': {
    title: 'Professional vs At-Home Teeth Whitening: Which is Right for You?',
    category: 'Cosmetic Dentistry',
    author: 'Dr. Momina',
    authorRole: 'General Dentist',
    date: '2024-11-10',
    readTime: '4 min read',
    content: `
      <p>A bright, white smile can boost your confidence and make a great first impression. With so many teeth whitening options available, it can be challenging to know which approach is best for you. Let's compare professional dental whitening with at-home alternatives.</p>

      <h2>Professional In-Office Whitening</h2>
      <p>Professional whitening treatments performed at your dentist's office use higher-concentration bleaching agents that can dramatically whiten your teeth in just one visit. These treatments are supervised by dental professionals, ensuring safety and effectiveness.</p>

      <h3>Advantages:</h3>
      <ul>
        <li>Dramatic results in a single visit (up to 8 shades whiter)</li>
        <li>Professionally supervised for safety</li>
        <li>Custom treatment based on your specific needs</li>
        <li>Even whitening results</li>
        <li>Gum protection during treatment</li>
      </ul>

      <h2>At-Home Options</h2>
      <p>At-home whitening products include over-the-counter strips, trays, and toothpastes, as well as take-home kits provided by your dentist.</p>

      <h3>Dentist-Provided Take-Home Kits:</h3>
      <ul>
        <li>Custom-fitted trays for even application</li>
        <li>Professional-strength whitening gel</li>
        <li>Gradual whitening over 1-2 weeks</li>
        <li>Guidance from your dental team</li>
      </ul>

      <h3>Over-the-Counter Products:</h3>
      <ul>
        <li>Most affordable option</li>
        <li>Convenient and accessible</li>
        <li>Lower concentration of bleaching agents</li>
        <li>Results vary and may take longer</li>
      </ul>

      <h2>Which Option is Right for You?</h2>
      <p>The best whitening option depends on your goals, timeline, and budget. For the fastest, most dramatic results, professional in-office whitening is ideal. If you prefer a more gradual approach, a take-home kit from your dentist offers professional results at your own pace.</p>

      <p>Before whitening, it's important to have a dental check-up to ensure your teeth and gums are healthy. Some people may not be suitable candidates for whitening, and your dentist can advise on the best approach for your individual situation.</p>

      <p>Ready to brighten your smile? Contact Star Smiles Dental Centre to discuss your teeth whitening options.</p>
    `
  },
  'childrens-dental-health-tips': {
    title: '10 Tips for Keeping Your Child\'s Teeth Healthy',
    category: 'Children\'s Dentistry',
    author: 'Dr. Momina',
    authorRole: 'General Dentist',
    date: '2024-11-05',
    readTime: '6 min read',
    content: `
      <p>Establishing good oral hygiene habits early in life sets the foundation for a lifetime of healthy smiles. Here are our top 10 tips for keeping your child's teeth healthy.</p>

      <h2>1. Start Early</h2>
      <p>Begin cleaning your baby's mouth even before teeth emerge. Use a soft, damp cloth to wipe the gums after feeding. Once teeth appear, start using an age-appropriate toothbrush.</p>

      <h2>2. Use the Right Amount of Toothpaste</h2>
      <p>For children under 3, use a smear of fluoride toothpaste (about the size of a grain of rice). For children 3-6 years, use a pea-sized amount. Teach them to spit out the toothpaste rather than swallow it.</p>

      <h2>3. Brush Twice Daily</h2>
      <p>Help your child brush their teeth for two minutes, twice a day—once in the morning and once before bed. Make it a fun routine with songs or timers.</p>

      <h2>4. Supervise Brushing</h2>
      <p>Children often lack the dexterity to brush effectively on their own until around age 7-8. Supervise their brushing and help them reach all surfaces of their teeth.</p>

      <h2>5. Don't Forget to Floss</h2>
      <p>Once your child has two teeth that touch, start flossing between them daily. Floss picks designed for children can make this easier.</p>

      <h2>6. Limit Sugary Foods and Drinks</h2>
      <p>Sugar feeds the bacteria that cause tooth decay. Limit sugary snacks and drinks, and encourage water as the drink of choice between meals.</p>

      <h2>7. Avoid Putting Baby to Bed with a Bottle</h2>
      <p>Putting your baby to bed with a bottle of milk, formula, or juice can lead to "bottle tooth decay." If your child needs a bottle to settle, fill it with water only.</p>

      <h2>8. Make Dental Visits Positive</h2>
      <p>Schedule your child's first dental visit by their first birthday or when their first tooth appears. Keep dental visits positive and avoid using dental appointments as a threat.</p>

      <h2>9. Consider Dental Sealants</h2>
      <p>Dental sealants are protective coatings applied to the chewing surfaces of back teeth, where cavities often develop. Ask your dentist if sealants are right for your child.</p>

      <h2>10. Be a Role Model</h2>
      <p>Children learn by example. Let them see you brushing and flossing your own teeth, and they'll be more likely to embrace these habits themselves.</p>

      <p>At Star Smiles Dental Centre, we love seeing our young patients and helping them develop positive associations with dental care. Book a check-up for your child today!</p>
    `
  },
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link href="/news" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <section className="gradient-blue text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Link href="/news" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={20} />
              Back to Blog
            </Link>
            <div className="flex items-center gap-3 text-white/80 mb-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-sm">
                <Calendar size={14} />
                {new Date(post.date).toLocaleDateString('en-AU', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1 text-sm">
                <Clock size={14} />
                {post.readTime}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <User size={24} />
              </div>
              <div>
                <p className="font-semibold">{post.author}</p>
                <p className="text-white/80 text-sm">{post.authorRole}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-gray-600 font-medium">Share this article:</p>
                <div className="flex items-center gap-3">
                  <button className="p-3 bg-[#1877F2] text-white rounded-full hover:opacity-90 transition-opacity">
                    <Facebook size={20} />
                  </button>
                  <button className="p-3 bg-[#1DA1F2] text-white rounded-full hover:opacity-90 transition-opacity">
                    <Twitter size={20} />
                  </button>
                  <button className="p-3 bg-[#0A66C2] text-white rounded-full hover:opacity-90 transition-opacity">
                    <Linkedin size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-display font-bold mb-4">Ready to Take Care of Your Smile?</h3>
              <p className="text-gray-600 mb-6">Book an appointment with our experienced dental team today.</p>
              <Link href="/book" className="btn-primary inline-flex items-center gap-2">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
