// src/components/home/HomeOrnaments.tsx
"use client"

import Image from 'next/image'

interface HomeOrnamentsProps {
  showLeft?: boolean
  showRight?: boolean
  showCenter?: boolean // TAMBAH: prop untuk ornament tengah
}

export default function HomeOrnaments({
  showLeft = true,
  showRight = true,
  showCenter = true // TAMBAH: default true
}: HomeOrnamentsProps) {
  return (
    <>
      {/* Home Left Ornament - Custom positioning untuk homepage */}
      {showLeft && (
        <div 
          className="absolute pointer-events-none"
          style={{ 
            zIndex: 7,
            left: '-260px',
            top: '-100px',
            width: '600px',
            height: '700px'
          }}
        >
          <Image 
            src="/ornament-blur.png" 
            alt="Home Ornament Left" 
            width={1000} 
            height={1000}
            className="opacity-50 transform rotate-12"
          />
        </div>
      )}

      {/* TAMBAH: Home Center Ornament - Di tengah HeroSection */}
      {showCenter && (
        <div 
          className="absolute pointer-events-none"
          style={{ 
            zIndex: 7,
            left: '50%',
            top: '100px',                    // Posisi vertikal tengah hero
            transform: 'translateX(-50%)',   // Center horizontal
            width: '800px',
            height: '800px'
          }}
        >
          <Image 
            src="/ornament-blur.png" 
            alt="Home Ornament Center" 
            width={1000} 
            height={1000}
            className="opacity-50 transform rotate-45" // Opacity lebih rendah agar tidak ganggu
          />
        </div>
      )}

      {/* Home Right Ornament - Custom positioning untuk homepage */}
      {showRight && (
        <div 
          className="absolute pointer-events-none"
          style={{ 
            zIndex: 7,
            right: '-250px',
            top: '-60px',
            width: '650px',
            height: '800px'
          }}
        >
          <Image 
            src="/ornament-blur.png" 
            alt="Home Ornament Right" 
            width={1000} 
            height={1000}
            className="opacity-50 transform rotate-12"
          />
        </div>
      )}
    </>
  )
}