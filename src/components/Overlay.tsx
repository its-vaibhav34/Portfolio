"use client"

import { useState, useEffect } from "react"
import { sections } from "./data"
import LoadingShimmer from "./LoadingShimmer"
import SkillLogos from "./SkillLogos"
import TimelineExperience from "./TimelineExperience"

interface Props {
  section: string
  onClose: () => void
}

type Project = {
  title: string
  description: string
  link: string
  tech: string[]
  status: string
}

type Contact = {
  email: string
  linkedin: string
  github: string
}

type Certificate = {
  title: string
  issuer: string
  link: string
  date: string
}

type Experience = {
  role: string
  company: string
  duration: string
  description: string
}

type Achievement = {
  title: string
  date: string
  description: string
  impact: string
}

export default function Overlay({ section, onClose }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (section) {
      setIsLoading(true)
      setIsVisible(false)

      const loadTimer = setTimeout(() => {
        setIsLoading(false)
        setIsVisible(true)
      }, 800)

      return () => clearTimeout(loadTimer)
    }
  }, [section])

  if (!section) return null

  const content = sections[section as keyof typeof sections]

  // Type guards
  const isProjects = (arr: unknown): arr is Project[] =>
    Array.isArray(arr) &&
    arr.every(
      (item) => typeof item === "object" && item !== null && "title" in item && "description" in item && "link" in item,
    )

  const isSkills = (arr: unknown): arr is string[] =>
    Array.isArray(arr) && arr.every((item) => typeof item === "string")

  const isContact = (obj: unknown): obj is Contact =>
    typeof obj === "object" && obj !== null && "email" in obj && "linkedin" in obj && "github" in obj

  const isCertificates = (arr: unknown): arr is Certificate[] =>
    Array.isArray(arr) &&
    arr.every(
      (item) => typeof item === "object" && item !== null && "title" in item && "issuer" in item && "link" in item,
    )

  const isExperience = (arr: unknown): arr is Experience[] =>
    Array.isArray(arr) &&
    arr.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "role" in item &&
        "company" in item &&
        "duration" in item &&
        "description" in item,
    )

  const isAchievements = (arr: unknown): arr is Achievement[] =>
    Array.isArray(arr) &&
    arr.every(
      (item) => typeof item === "object" && item !== null && "title" in item && "date" in item && "description" in item,
    )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Enhanced backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto" onClick={onClose} />

      {/* Main overlay */}
      <div
        className={`
          pointer-events-auto relative max-w-6xl mx-4 w-full max-h-[85vh] overflow-y-auto
          rounded-2xl border border-cyan-400/30 shadow-2xl
          transition-all duration-700 ease-out
          ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.9), rgba(6,182,212,0.1))",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 50px rgba(6,182,212,0.3), inset 0 1px 0 rgba(6,182,212,0.2)",
        }}
      >
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-cyan-400/50 via-blue-500/50 to-purple-500/50 opacity-50 animate-pulse" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full 
                     bg-gradient-to-r from-red-500/20 to-red-600/20 
                     hover:from-red-500/40 hover:to-red-600/40
                     border border-red-500/50 text-red-400 hover:text-red-300
                     flex items-center justify-center transition-all duration-200
                     hover:scale-110 hover:shadow-lg hover:shadow-red-500/25"
        >
          ✕
        </button>

        <div className="p-8">
          {/* Futuristic Header */}
          <div className="mb-8 text-center">
            <div className="relative inline-block">
              <h2
                className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                           from-cyan-400 via-blue-400 to-purple-400 mb-4 uppercase tracking-wider"
              >
                {section}
              </h2>

              {/* Glitch effect lines */}
              <div className="absolute inset-0 text-5xl font-bold text-cyan-400/20 uppercase tracking-wider animate-glitch">
                {section}
              </div>
            </div>

            {/* Animated underline */}
            <div className="flex justify-center">
              <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Loading state */}
          {isLoading ? (
            <LoadingShimmer />
          ) : (
            <div
              className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              {/* Projects Section */}
              {section === "projects" && isProjects(content) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {content.map((proj, i) => (
                    <div
                      key={i}
                      className="group relative overflow-hidden rounded-xl border border-cyan-400/30 
                                 bg-gradient-to-br from-black/50 to-cyan-900/20
                                 hover:from-black/70 hover:to-cyan-900/40
                                 transition-all duration-500 hover:scale-105
                                 hover:shadow-2xl hover:shadow-cyan-500/25"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      {/* Project header */}
                      <div className="p-6 border-b border-cyan-400/20">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-2xl font-bold text-cyan-400">{proj.title}</h3>
                          <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/50">
                            LIVE
                          </span>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{proj.description}</p>
                      </div>

                      {/* Tech stack */}
                      <div className="p-4 border-b border-cyan-400/20">
                        <div className="flex flex-wrap gap-2">
                          {["React", "TypeScript", "Firebase"].map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs rounded bg-gradient-to-r from-cyan-500/20 to-blue-500/20 
                                         text-cyan-400 border border-cyan-400/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="p-6">
                        <div className="flex gap-3">
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500
                                       text-white font-medium text-center transition-all duration-200
                                       hover:from-cyan-400 hover:to-blue-400 hover:scale-105
                                       hover:shadow-lg hover:shadow-cyan-500/50"
                          >
                            VIEW PROJECT →
                          </a>
                          <button className="px-4 py-3 rounded-lg border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 transition-colors">
                            ⭐
                          </button>
                        </div>
                      </div>

                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              )}

              {/* Skills Section with Logos */}
              {section === "skills" && isSkills(content) && <SkillLogos />}

              {/* Experience Section with Timeline */}
              {section === "experience" && isExperience(content) && <TimelineExperience />}

              {/* Contact Section */}
              {section === "contact" && isContact(content) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      label: "Email",
                      value: content.email,
                      href: `mailto:${content.email}`,
                      icon: "📧",
                      color: "from-red-400 to-pink-400",
                    },
                    {
                      label: "LinkedIn",
                      value: "Connect",
                      href: content.linkedin,
                      icon: "💼",
                      color: "from-blue-400 to-cyan-400",
                    },
                    {
                      label: "GitHub",
                      value: "Follow",
                      href: content.github,
                      icon: "🐙",
                      color: "from-gray-400 to-gray-600",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group relative p-6 rounded-xl border border-cyan-400/30 
                                 bg-gradient-to-br from-black/50 to-cyan-900/20
                                 hover:from-black/70 hover:to-cyan-900/40
                                 transition-all duration-500 hover:scale-105"
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
                          {item.icon}
                        </div>
                        <h3
                          className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.color} mb-2`}
                        >
                          {item.label}
                        </h3>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500
                                     text-white font-medium transition-all duration-200
                                     hover:from-cyan-400 hover:to-blue-400 hover:scale-105"
                        >
                          {item.value}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* About Section */}
              {section === "about" && typeof content === "string" && (
                <div className="text-center max-w-3xl mx-auto">
                  <div
                    className="relative p-8 rounded-xl border border-cyan-400/30 
                                 bg-gradient-to-br from-black/50 to-cyan-900/20"
                  >
                    <p className="text-xl leading-relaxed text-gray-300 mb-6">{content}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 mt-8">
                      {[
                        { label: "Projects", value: "15+", icon: "🚀" },
                        { label: "Experience", value: "2+ Years", icon: "⏱️" },
                        { label: "Technologies", value: "10+", icon: "⚡" },
                      ].map((stat, i) => (
                        <div key={i} className="text-center">
                          <div className="text-3xl mb-2">{stat.icon}</div>
                          <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                          <div className="text-gray-400 text-sm">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Certificates Section */}
              {section === "certificates" && isCertificates(content) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {content.map((cert, i) => (
                    <div
                      key={i}
                      className="group relative p-6 rounded-xl border border-cyan-400/30 
                                 bg-gradient-to-br from-black/50 to-cyan-900/20
                                 hover:from-black/70 hover:to-cyan-900/40
                                 transition-all duration-500 hover:scale-105"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center text-2xl">
                          🏅
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-cyan-400 mb-2">{cert.title}</h3>
                          <p className="text-gray-400 mb-3">Issued by {cert.issuer}</p>
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            View Certificate →
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Achievements Section */}
              {section === "achievements" && isAchievements(content) && (
                <div className="space-y-6">
                  {content.map((ach, i) => (
                    <div
                      key={i}
                      className="group relative p-6 rounded-xl border border-cyan-400/30 
                                 bg-gradient-to-br from-black/50 to-cyan-900/20
                                 hover:from-black/70 hover:to-cyan-900/40
                                 transition-all duration-500 hover:scale-[1.02]"
                    >
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center text-3xl">
                          🏆
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-yellow-400 mb-2">{ach.title}</h3>
                          <p className="text-cyan-400 font-medium mb-3">{ach.date}</p>
                          <p className="text-gray-300 leading-relaxed">{ach.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
