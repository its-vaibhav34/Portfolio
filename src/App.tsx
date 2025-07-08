import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Room from './components/Room'
import Overlay from './components/Overlay'
import { useEffect, useRef, useState } from 'react'

export default function App() {
  const [section, setSection] = useState('')
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node
      // Close if clicked outside content
      if (section && contentRef.current && !contentRef.current.contains(target)) {
        setSection('')
      }
    }

    document.addEventListener('mousedown', handleClick, true)
    return () => document.removeEventListener('mousedown', handleClick, true)
  }, [section])

  return (
    <div className="fixed inset-0 w-full h-full z-0">
      <Canvas
        shadows
        camera={{ position: [0, 1, 5], fov: 60 }}
        eventPrefix="client"
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
        <Room onSelect={setSection} />
      </Canvas>

      {/* Fullscreen overlay wrapper */}
      {section && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div ref={contentRef}>
            <Overlay section={section} />
          </div>
        </div>
      )}
    </div>
  )
}
