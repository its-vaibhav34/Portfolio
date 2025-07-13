"use client"

import { personalInfo } from "../data"
import GlitchText from "./GlitchText" // Import the GlitchText component

export default function HeroSection() {
  return (
    <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
      <GlitchText text="HI, I'M" className="text-white mb-4" />
      <GlitchText
        text={personalInfo.name.toUpperCase()}
        className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-4"
      />
      <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
        {personalInfo.bio}
      </p>
    </div>
  )
}
