"use client"

import { useState } from "react"
import { sections } from "../data"

interface ContactData {
  email: string
  linkedin: string
  github: string
  twitter?: string
  phone?: string
  location?: string
  availability?: string
}

export default function ContactSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const contact = sections.contact as ContactData

  const contactMethods = [
    {
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: "📧",
      color: "from-red-400 to-pink-400",
      description: "Drop me a line anytime",
    },
    {
      label: "LinkedIn",
      value: "Connect with me",
      href: contact.linkedin,
      icon: "💼",
      color: "from-blue-400 to-cyan-400",
      description: "Let's build our network",
    },
    {
      label: "GitHub",
      value: "Follow my work",
      href: contact.github,
      icon: "🐙",
      color: "from-gray-400 to-gray-600",
      description: "Check out my repositories",
    },
    ...(contact.twitter
      ? [
          {
            label: "Twitter",
            value: "Follow me",
            href: contact.twitter,
            icon: "🐦",
            color: "from-sky-400 to-blue-400",
            description: "Latest updates and thoughts",
          },
        ]
      : []),
    ...(contact.phone
      ? [
          {
            label: "Phone",
            value: "Call me",
            href: `tel:${contact.phone}`,
            icon: "📱",
            color: "from-green-400 to-emerald-400",
            description: "Direct communication",
          },
        ]
      : []),
  ]

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Optimized circuit background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 800">
          {[...Array(15)].map((_, i) => (
            <g key={i}>
              <rect
                x={Math.random() * 1000}
                y={Math.random() * 800}
                width="2"
                height="20"
                fill="currentColor"
                className="text-cyan-400 animate-pulse"
              />
              <rect
                x={Math.random() * 1000}
                y={Math.random() * 800}
                width="20"
                height="2"
                fill="currentColor"
                className="text-cyan-400 animate-pulse"
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        {/* Contact methods */}
        <div className="space-y-8">
          <div className="text-center lg:text-left mb-8">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
              Let's Connect
            </h3>
            <p className="text-gray-300 text-lg">Ready to bring your ideas to life? Let's talk!</p>
            {contact.availability && (
              <div className="mt-4 inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/50">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
                <span className="text-green-400 text-sm font-semibold">{contact.availability}</span>
              </div>
            )}
          </div>

          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className="relative p-8 rounded-2xl border border-cyan-400/30 backdrop-blur-xl
                           bg-gradient-to-br from-black/60 to-cyan-900/20
                           hover:from-black/80 hover:to-cyan-900/40
                           transition-all duration-300 hover:scale-105 cursor-pointer
                           hover:shadow-xl hover:shadow-cyan-500/25"
              >
                <div className="flex items-center gap-6">
                  <div className="text-6xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    {method.icon}
                  </div>

                  <div className="flex-1">
                    <h4
                      className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${method.color} mb-2`}
                    >
                      {method.label}
                    </h4>
                    <p className="text-gray-400 mb-3">{method.description}</p>
                    <a
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500
                                 text-white font-medium transition-all duration-200
                                 hover:from-cyan-400 hover:to-blue-400 hover:scale-105
                                 hover:shadow-lg hover:shadow-cyan-500/50"
                    >
                      {method.value} →
                    </a>
                  </div>
                </div>

                {hoveredCard === index && (
                  <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/50 animate-pulse" />
                )}
              </div>
            </div>
          ))}

          {/* Location info */}
          {contact.location && (
            <div className="p-6 rounded-xl border border-cyan-400/30 bg-gradient-to-br from-black/60 to-cyan-900/20">
              <div className="flex items-center gap-4">
                <span className="text-4xl">📍</span>
                <div>
                  <h4 className="text-cyan-400 font-semibold text-lg">Location</h4>
                  <p className="text-gray-300">{contact.location}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact form */}
        <div className="relative">
          <div
            className="relative p-8 rounded-2xl border border-cyan-400/30 backdrop-blur-xl
                       bg-gradient-to-br from-black/60 to-cyan-900/20"
          >
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-8 text-center">
              Send Message
            </h3>

            <form className="space-y-6" action="https://formsubmit.co/vaibhav13467@gmail.com" method="POST">
              <div className="relative group">
                <input
                  type="text"
                  name="name" required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 rounded-xl border border-cyan-400/30 
                             bg-black/50 text-white placeholder-gray-400
                             focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50
                             transition-all duration-300"
                />
              </div>

              <div className="relative group">
                <input
                  type="email"
                  placeholder="Your Email"
                  name="email" required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 rounded-xl border border-cyan-400/30 
                             bg-black/50 text-white placeholder-gray-400
                             focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50
                             transition-all duration-300"
                />
              </div>

              <div className="relative group">
                <textarea
                  placeholder="Your Message"
                  name="message" required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-6 py-4 rounded-xl border border-cyan-400/30 
                             bg-black/50 text-white placeholder-gray-400 resize-none
                             focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50
                             transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                className="w-full group relative overflow-hidden py-4 px-8 rounded-xl
                           bg-gradient-to-r from-cyan-500 to-blue-500
                           hover:from-cyan-400 hover:to-blue-400
                           text-white font-bold transition-all duration-300
                           hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
              >
                <span className="relative z-10">Send Message →</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
