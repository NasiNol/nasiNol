// src/components/Layout/Ornaments.tsx
"use client"

import Image from 'next/image'

interface OrnamentsProps {
  showLeft?: boolean
  showRight?: boolean
  leftStyle?: React.CSSProperties
  rightStyle?: React.CSSProperties
}

export default function Ornaments({
  showLeft = true,
  showRight = true,
  leftStyle = { left: '-250px', top: '200px' },
  rightStyle = { right: '-300px', top: '100px' }
}: OrnamentsProps) {
  return (
    <>
      {/* Ornament Left - UBAH: fixed jadi absolute agar tidak ngikut scroll */}
      {showLeft && (
        <div 
          className="absolute left-0 top-0 w-full h-full pointer-events-none" // UBAH: fixed jadi absolute
          style={{ zIndex: 7 }}  
        >
          <div className="absolute" style={leftStyle}>
            <Image 
              src="/ornament-blur.png" 
              alt="Ornament Left" 
              width={800} 
              height={900}
              className="opacity-60 transform rotate-12"
            />
          </div>
        </div>
      )}

      {/* Ornament Right */}
      {showRight && (
        <div 
          className="absolute right-0 top-0 w-full h-full pointer-events-none" // UBAH: fixed jadi absolute
          style={{ zIndex: 7 }}  
        >
          <div className="absolute" style={rightStyle}>
            <Image 
              src="/ornament-blur.png" 
              alt="Ornament Right" 
              width={800} 
              height={950}
              className="opacity-80 transform -rotate-45"
            />
          </div>
        </div>
      )}
    </>
  )
}