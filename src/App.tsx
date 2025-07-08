"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import Room from "./components/Room"
import Overlay from "./components/Overlay"
import { useEffect, useRef, useState } from "react"

export default function App() {
  const [section, setSection] = useState("")
  const contentRef = useRef<HTMLDivElement>(null)

  const handleCloseOverlay = () => {
    setSection("")
  }

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node
      // Close if clicked outside content
      if (section && contentRef.current && !contentRef.current.contains(target)) {
        setSection("")
      }
    }

    document.addEventListener("mousedown", handleClick, true)
    return () => document.removeEventListener("mousedown", handleClick, true)
  }, [section])

  return (
    <div className="fixed inset-0 w-full h-full bg-black">
      <Canvas shadows camera={{ position: [0, 1, 5], fov: 60 }} eventPrefix="client">
        {/* Enhanced lighting setup */}
        <Environment preset="night" />
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} maxPolarAngle={Math.PI / 2} />

        <Room onSelect={setSection} isAnySectonOpen={!!section} />
      </Canvas>

      {/* Enhanced overlay with new component */}
      {section && (
        <div ref={contentRef}>
          <Overlay section={section} onClose={handleCloseOverlay} />
        </div>
      )}
    </div>
  )
}
