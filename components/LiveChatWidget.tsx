'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, User, Bot, Phone, Calendar, HelpCircle, Sparkles } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const FAQData = {
  hours: {
    question: "What are your opening hours?",
    answer: "We're open Monday-Friday 9AM-6PM, Saturday 9AM-1PM, and closed Sunday. Need an appointment outside these hours? Let me know!"
  },
  location: {
    question: "Where are you located?",
    answer: "We're at 1 Plato Crescent, Brandon Park Shopping Centre, Wheelers Hill, VIC 3150. Free parking available!"
  },
  insurance: {
    question: "Do you accept health insurance?",
    answer: "Yes! We accept all major health funds including HCF, Medibank, BUPA, and more. We also offer HICAPS for instant claims."
  },
  emergency: {
    question: "Do you handle dental emergencies?",
    answer: "Absolutely! We provide same-day emergency appointments. Call us at (03) 9562 0675 for urgent care."
  },
  cost: {
    question: "How much does a checkup cost?",
    answer: "A comprehensive checkup starts from $180. We offer payment plans and accept all major health funds. Want to see our treatment cost calculator?"
  },
  newpatient: {
    question: "I'm a new patient, what should I bring?",
    answer: "Great! Please bring your ID, health fund card (if applicable), and any recent X-rays. We'll send you new patient forms via email before your visit."
  },
  booking: {
    question: "How can I book an appointment?",
    answer: "You can book instantly online, call us at (03) 9562 0675, or I can help you book right now! What works best for you?"
  },
  services: {
    question: "What services do you offer?",
    answer: "We offer General Dentistry, Cosmetic Dentistry, Dental Implants, Orthodontics (including Invisalign), Children's Dentistry, and Emergency Care. What are you interested in?"
  }
}

const quickSuggestions = [
  "Book appointment",
  "Opening hours",
  "Location & parking",
  "Health insurance",
  "Treatment costs",
  "Emergency care",
  "New patient info"
]

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your Star Smiles AI assistant 👋 How can I help you today?",
      timestamp: new Date(),
      suggestions: quickSuggestions
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = async (userMessage: string): Promise<{ content: string, suggestions?: string[] }> => {
    try {
      // Add user message to chat history
      const updatedHistory: ChatMessage[] = [
        ...chatHistory,
        { role: 'user', content: userMessage }
      ]

      // Call OpenAI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedHistory })
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()

      // Update chat history with assistant response
      setChatHistory([
        ...updatedHistory,
        { role: 'assistant', content: data.message }
      ])

      // Dynamic suggestions based on context
      let suggestions: string[] = []
      const lower = data.message.toLowerCase()

      if (lower.includes('book') || lower.includes('appointment')) {
        suggestions = ["Book online now", "Check availability", "Call us"]
      } else if (lower.includes('emergency') || lower.includes('urgent')) {
        suggestions = ["Call (03) 9562 0675", "Book emergency", "View location"]
      } else if (lower.includes('cost') || lower.includes('price')) {
        suggestions = ["View pricing", "Payment plans", "Insurance info"]
      } else {
        suggestions = ["Book appointment", "Our services", "Contact us"]
      }

      return {
        content: data.message,
        suggestions
      }
    } catch (error) {
      console.error('Chat error:', error)
      return {
        content: "I apologize, I'm having trouble connecting right now. Please call us at (03) 9562 0675 or try again in a moment.",
        suggestions: ["Call (03) 9562 0675", "Try again", "Book online"]
      }
    }
  }

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim()
    if (!messageText) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // Show typing indicator
    setIsTyping(true)

    // Get AI response
    const response = await getBotResponse(messageText)
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: response.content,
      timestamp: new Date(),
      suggestions: response.suggestions
    }
    setMessages(prev => [...prev, botMessage])
    setIsTyping(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-star-blue to-star-blue-light text-white rounded-full shadow-2xl hover:shadow-star-blue/50 transition-all flex items-center justify-center group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={28} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-star-orange rounded-full animate-pulse" />

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Chat with us! 💬
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-star-blue to-star-blue-light p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Star Smiles AI</h3>
                  <p className="text-xs text-white/80">Online • Instant replies</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="text-white" size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div key={message.id}>
                  <div className={`flex items-start gap-2 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' ? 'bg-star-blue' : 'bg-white border-2 border-star-blue'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="text-white" size={16} />
                      ) : (
                        <Bot className="text-star-blue" size={16} />
                      )}
                    </div>
                    <div className={`max-w-[75%] ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`px-4 py-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-star-blue text-white'
                          : 'bg-white text-gray-800 shadow-sm'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 px-1">
                        {message.timestamp.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  {/* Suggestions */}
                  {message.type === 'bot' && message.suggestions && (
                    <div className="flex flex-wrap gap-2 mt-3 ml-10">
                      {message.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(suggestion)}
                          className="px-3 py-1.5 bg-white hover:bg-star-blue hover:text-white text-star-blue text-xs font-medium rounded-full border border-star-blue/20 transition-all"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 bg-white border-2 border-star-blue rounded-full flex items-center justify-center">
                    <Bot className="text-star-blue" size={16} />
                  </div>
                  <div className="px-4 py-3 bg-white rounded-2xl shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-star-blue focus:border-transparent text-sm"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 bg-star-blue hover:bg-star-blue-dark text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500">
                <button onClick={() => handleSendMessage("Call us")} className="hover:text-star-blue flex items-center gap-1">
                  <Phone size={12} />
                  Call
                </button>
                <button onClick={() => handleSendMessage("Book appointment")} className="hover:text-star-blue flex items-center gap-1">
                  <Calendar size={12} />
                  Book
                </button>
                <button onClick={() => handleSendMessage("FAQ")} className="hover:text-star-blue flex items-center gap-1">
                  <HelpCircle size={12} />
                  FAQ
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
