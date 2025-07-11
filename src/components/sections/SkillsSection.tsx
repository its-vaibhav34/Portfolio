"use client"

import { useState, useEffect, useRef } from "react"
import { sections } from "../data"

interface Skill {
  name: string
  icon: string
  color: string
  category: string
}

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [visibleSkills, setVisibleSkills] = useState<number[]>([])
  const skillRefs = useRef<(HTMLDivElement | null)[]>([])

  const skills = sections.skills as Skill[]
  const categories = ["All", ...Array.from(new Set(skills.map((skill) => skill.category)))]
  const filteredSkills =
    selectedCategory === "All" ? skills : skills.filter((skill) => skill.category === selectedCategory)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleSkills((prev) => [...prev, index])
            }, index * 100) // Reduced delay for smoother performance
          }
        })
      },
      { threshold: 0.3 },
    )

    skillRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [filteredSkills])

  return (
    <div className="relative">
      {/* Optimized background - reduced particles for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 800 600">
          {[...Array(8)].map((_, i) => (
            <g key={i}>
              <circle
                cx={Math.random() * 800}
                cy={Math.random() * 600}
                r="2"
                fill="currentColor"
                className="text-cyan-400 animate-pulse"
              />
              <line
                x1={Math.random() * 800}
                y1={Math.random() * 600}
                x2={Math.random() * 800}
                y2={Math.random() * 600}
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-cyan-400/30"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-full border-2 transition-all duration-300 hover:scale-105 ${
              selectedCategory === category
                ? "border-cyan-400 bg-cyan-400/20 text-cyan-400 shadow-lg shadow-cyan-400/25"
                : "border-cyan-400/30 text-gray-400 hover:border-cyan-400/60 hover:text-cyan-400"
            }`}
          >
            <span className="font-semibold tracking-wide">{category}</span>
          </button>
        ))}
      </div>

      {/* Skills grid - optimized layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredSkills.map((skill, index) => (
          <div
            key={skill.name}
            ref={(el) => {
  skillRefs.current[index] = el
}}

            data-index={index}
            className={`group relative transition-all duration-500 ${
              visibleSkills.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Simplified skill card for better performance */}
            <div
              className="relative p-6 rounded-2xl border border-cyan-400/30 backdrop-blur-xl
                         bg-gradient-to-br from-black/60 to-cyan-900/20
                         hover:from-black/80 hover:to-cyan-900/40
                         transition-all duration-300 hover:scale-105 hover:-translate-y-2
                         cursor-pointer hover:shadow-xl hover:shadow-cyan-500/25"
            >
              {/* Skill icon */}
              <div className="text-center mb-4">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <h3 className={`text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r ${skill.color}`}>
                  {skill.name}
                </h3>
              </div>

              {/* Category badge */}
              <div className="text-center">
                <span
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 
                                 text-cyan-400 text-xs font-semibold border border-cyan-400/30"
                >
                  {skill.category}
                </span>
              </div>

              {/* Simplified hover effect */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
