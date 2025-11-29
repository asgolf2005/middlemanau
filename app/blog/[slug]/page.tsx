import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Tag, Facebook, Twitter, Linkedin } from 'lucide-react'
import { getPostBySlug, getRelatedPosts, blogPosts } from '@/lib/blog-data'
import ReactMarkdown from 'react-markdown'

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  const relatedPosts = getRelatedPosts(slug, 3)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-star-blue hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const shareUrl = `https://starsmiles.com.au/blog/${slug}`

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Blog
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-star-blue px-3 py-1 rounded-full text-sm font-semibold">
                {post.category}
              </span>
              {post.featured && (
                <span className="bg-star-orange px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-white/90 mb-6">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <User size={20} />
                </div>
                <div>
                  <p className="font-semibold text-white">{post.author}</p>
                  <p className="text-sm">{post.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={18} />
                <span>{new Date(post.publishedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={18} />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar - Share Buttons */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24 space-y-4">
                <p className="text-sm font-semibold text-gray-600 mb-2">Share</p>
                <div className="flex lg:flex-col gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook size={18} />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-sky-500 hover:bg-sky-600 text-white rounded-full flex items-center justify-center transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter size={18} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-700 hover:bg-blue-800 text-white rounded-full flex items-center justify-center transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <article className="prose prose-lg max-w-none
                prose-headings:font-display prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-a:text-star-blue prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-bold
                prose-ul:my-6 prose-li:my-2
                prose-img:rounded-2xl prose-img:shadow-xl
                prose-blockquote:border-l-4 prose-blockquote:border-star-blue prose-blockquote:pl-6 prose-blockquote:italic
              ">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </article>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag size={20} />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?search=${tag}`}
                      className="inline-flex items-center gap-1 bg-gray-100 hover:bg-star-blue hover:text-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-12 p-8 bg-gradient-to-r from-star-blue/10 to-star-blue-light/10 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">About the Author</h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-star-blue rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-900">{post.author}</p>
                    <p className="text-star-blue mb-2">{post.authorRole}</p>
                    <p className="text-gray-600">
                      {post.author === 'Dr. Nalini Prasad' && "Dr. Nalini Prasad is the Principal Dentist at Star Smiles with over 15 years of experience in general, cosmetic, and implant dentistry. She is passionate about helping patients achieve their dream smiles."}
                      {post.author === 'Dr. Nesrine Armanious' && "Dr. Nesrine Armanious specializes in family and preventive dentistry. With over 10 years of experience, she is dedicated to providing gentle, comprehensive care for patients of all ages."}
                      {post.author === 'Dr. Momina' && "Dr. Momina is a general dentist with a special interest in pediatric and cosmetic dentistry. She creates a welcoming environment for children and adults alike."}
                    </p>
                    <Link
                      href="/about/meet-our-team"
                      className="text-star-blue font-semibold hover:underline inline-flex items-center gap-1 mt-2"
                    >
                      Meet our team
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* CTA Box */}
              <div className="mt-12 bg-gradient-to-r from-star-blue to-star-blue-light rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-3">Ready to Take Action?</h3>
                <p className="text-white/90 mb-6">
                  Book your appointment at Star Smiles and let us help you achieve optimal oral health
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/book"
                    className="bg-white hover:bg-gray-100 text-star-blue font-bold py-3 px-8 rounded-xl transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Calendar size={20} />
                    Book Appointment
                  </Link>
                  <a
                    href="tel:+61395620675"
                    className="border-2 border-white hover:bg-white/10 text-white font-bold py-3 px-8 rounded-xl transition-colors inline-flex items-center justify-center gap-2"
                  >
                    Call (03) 9562 0675
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar - Table of Contents (placeholder for future enhancement) */}
            <div className="lg:col-span-3 order-3">
              <div className="lg:sticky lg:top-24">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
                  <div className="space-y-3">
                    <Link href="/book" className="block text-star-blue hover:underline text-sm">
                      → Book Appointment
                    </Link>
                    <Link href="/cost-calculator" className="block text-star-blue hover:underline text-sm">
                      → Cost Calculator
                    </Link>
                    <Link href="/services" className="block text-star-blue hover:underline text-sm">
                      → Our Services
                    </Link>
                    <Link href="/contact" className="block text-star-blue hover:underline text-sm">
                      → Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-display font-bold mb-8 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.slug}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <Clock size={14} />
                        {relatedPost.readTime}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-star-blue transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="mt-4 flex items-center text-star-blue font-semibold text-sm group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
