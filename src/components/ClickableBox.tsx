import { useState, useEffect } from 'react'

interface Props {
  position: [number, number, number]
  label: string
  onSelect: (target: string) => void
  size?: [number, number, number] // ✅ Optional size prop
}

export default function ClickableBox({ position, label, onSelect, size = [0.3, 0.3, 0.3] }: Props) {
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hovered])

  return (
    <mesh
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        console.log('Clicked:', label)
        onSelect(label)
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={size} />
      <meshBasicMaterial
        transparent
      opacity={0}
       
      />
    </mesh>
  )
}
