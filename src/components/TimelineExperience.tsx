"use client"

import { useState, useEffect, useRef } from "react"

interface ExperienceItem {
  role: string
  company: string
  duration: string
  description: string
  logo: string
  color: string
}

const experienceData: ExperienceItem[] = [
  {
    role: "Frontend Intern",
    company: "Revoliq",
    duration: "May 2024 – Aug 2024",
    description: "Built a React + Three.js-based smart cart interface with Firebase and MongoDB.",
    logo: "🚀",
    color: "from-blue-400 to-cyan-400",
  },
  {
    role: "Core Team Member",
    company: "Developer Student Club",
    duration: "Jan 2024 – Present",
    description: "Organized workshops and mentored juniors in web & IoT projects.",
    logo: "👥",
    color: "from-purple-400 to-pink-400",
  },
]

export default function TimelineExperience() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...prev, index])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500" />

      {/* Timeline items */}
      <div className="space-y-12">
        {experienceData.map((item, index) => (
          <div
           ref={(el) => {
  itemRefs.current[index] = el
}}

            data-index={index}
            className={`relative flex items-start gap-8 transition-all duration-1000 ${
              visibleItems.includes(index) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
            style={{ transitionDelay: `${index * 0.2}s` }}
          >
            {/* Timeline node */}
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center border-4 border-black shadow-lg shadow-cyan-500/50">
                <span className="text-2xl">{item.logo}</span>
              </div>

              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping" />
            </div>

            {/* Content card */}
            <div className="flex-1 group">
              <div
                className="relative p-6 rounded-xl border border-cyan-400/30 backdrop-blur-md
                           bg-gradient-to-br from-white/10 to-white/5
                           hover:from-white/20 hover:to-white/10
                           transition-all duration-500 hover:scale-[1.02]
                           hover:shadow-2xl hover:shadow-cyan-500/25"
              >
                {/* Company logo area */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3
                      className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.color} mb-1`}
                    >
                      {item.role}
                    </h3>
                    <p className="text-cyan-400 font-semibold text-lg">{item.company}</p>
                    <p className="text-gray-400 text-sm">{item.duration}</p>
                  </div>

                  {/* Animated badge */}
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50">
                    <span className="text-cyan-400 text-xs font-bold">ACTIVE</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-4">{item.description}</p>

                {/* Tech stack indicators */}
                <div className="flex gap-2">
                  {["React", "Three.js", "Firebase"].map((tech, techIndex) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-400/30"
                      style={{ animationDelay: `${techIndex * 0.1}s` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Scanning line */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
