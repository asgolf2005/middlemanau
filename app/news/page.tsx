'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'

// Blog post data - in production this would come from Supabase
const blogPosts = [
  {
    id: 1,
    slug: 'importance-of-regular-dental-checkups',
    title: 'The Importance of Regular Dental Check-ups',
    excerpt: 'Regular dental check-ups are essential for maintaining optimal oral health. Learn why you should visit your dentist every 6 months.',
    category: 'Preventive Care',
    author: 'Dr. Nalini Prasad',
    date: '2024-11-15',
    readTime: '5 min read',
    image: '/images/blog/checkup.jpg',
    featured: true,
  },
  {
    id: 2,
    slug: 'teeth-whitening-options',
    title: 'Professional vs At-Home Teeth Whitening: Which is Right for You?',
    excerpt: 'Discover the pros and cons of professional dental whitening compared to over-the-counter options.',
    category: 'Cosmetic Dentistry',
    author: 'Dr. Momina',
    date: '2024-11-10',
    readTime: '4 min read',
    image: '/images/blog/whitening.jpg',
    featured: false,
  },
  {
    id: 3,
    slug: 'childrens-dental-health-tips',
    title: '10 Tips for Keeping Your Child\'s Teeth Healthy',
    excerpt: 'Help your children develop good oral hygiene habits with these practical tips from our pediatric dental experts.',
    category: 'Children\'s Dentistry',
    author: 'Dr. Momina',
    date: '2024-11-05',
    readTime: '6 min read',
    image: '/images/blog/kids-dental.jpg',
    featured: true,
  },
  {
    id: 4,
    slug: 'dental-implants-guide',
    title: 'Complete Guide to Dental Implants: What You Need to Know',
    excerpt: 'Everything you need to know about dental implants, from the procedure to recovery and long-term care.',
    category: 'Dental Implants',
    author: 'Dr. Nalini Prasad',
    date: '2024-10-28',
    readTime: '8 min read',
    image: '/images/blog/implants.jpg',
    featured: false,
  },
  {
    id: 5,
    slug: 'dealing-with-dental-anxiety',
    title: 'Overcoming Dental Anxiety: Tips for a Stress-Free Visit',
    excerpt: 'Dental anxiety is common but manageable. Learn strategies to help you feel more comfortable at the dentist.',
    category: 'Patient Care',
    author: 'Dr. Nesrine Armanious',
    date: '2024-10-20',
    readTime: '5 min read',
    image: '/images/blog/anxiety.jpg',
    featured: false,
  },
  {
    id: 6,
    slug: 'foods-for-healthy-teeth',
    title: 'Best and Worst Foods for Your Teeth',
    excerpt: 'Your diet plays a crucial role in your oral health. Discover which foods to embrace and which to avoid.',
    category: 'Preventive Care',
    author: 'Dr. Nesrine Armanious',
    date: '2024-10-15',
    readTime: '4 min read',
    image: '/images/blog/foods.jpg',
    featured: false,
  },
]

const categories = [
  'All',
  'Preventive Care',
  'Cosmetic Dentistry',
  'Children\'s Dentistry',
  'Dental Implants',
  'Patient Care',
]

export default function NewsPage() {
  const featuredPosts = blogPosts.filter(post => post.featured)
  const recentPosts = blogPosts.filter(post => !post.featured)

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
              Dental Health Blog
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Expert advice, tips, and insights from our dental team to help you maintain a healthy smile.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === 'All'
                    ? 'bg-star-blue text-white'
                    : 'bg-white text-gray-700 hover:bg-star-blue hover:text-white border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <Link href={`/news/${post.slug}`}>
                  <div className="aspect-video bg-gray-200 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute top-4 left-4 bg-star-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Tag size={14} />
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(post.date).toLocaleDateString('en-AU', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-star-blue">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.author}</span>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold mb-8">Recent Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <Link href={`/news/${post.slug}`} className="group">
                  <div className="aspect-video bg-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-star-blue/10 group-hover:bg-star-blue/20 transition-colors" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className="bg-star-blue/10 text-star-blue px-2 py-1 rounded text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 group-hover:text-star-blue transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{new Date(post.date).toLocaleDateString('en-AU', {
                        month: 'short',
                        day: 'numeric'
                      })}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-star-blue to-star-blue-dark rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Stay Informed
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest dental health tips and practice updates.
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-star-orange focus:outline-none"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
