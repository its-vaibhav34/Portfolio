"use client"

import { Html } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import type { Group } from "three"

interface FloatingTooltipProps {
  position: [number, number, number]
  text: string
  icon: string
  visible: boolean
}

export default function FloatingTooltip({ position, text, icon, visible }: FloatingTooltipProps) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  if (!visible) return null

  return (
    <group ref={groupRef} position={position}>
      <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-xl scale-150 animate-pulse" />

          {/* Main tooltip - standardized size */}
          <div
            className="relative px-6 py-3 rounded-full backdrop-blur-md border border-cyan-400/50
                       bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white
                       shadow-lg shadow-cyan-500/25 animate-float w-48 h-12 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))",
              boxShadow: "0 0 30px rgba(6, 182, 212, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
              fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg animate-bounce">{icon}</span>
              <span className="text-sm font-semibold tracking-wide whitespace-nowrap overflow-hidden text-ellipsis">
                {text}
              </span>
            </div>

            {/* Scanning line effect */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}
