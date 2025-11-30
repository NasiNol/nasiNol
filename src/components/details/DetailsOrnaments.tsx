// src/components/details/DetailsOrnaments.tsx
import Image from 'next/image'

export default function DetailsOrnaments() {
  return (
    <>
      {/* Ornament Top Right */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-11">
        <div className="absolute" style={{ right: '-300px', top: '-180px' }}>
          <Image 
            src="/ornament-blur.png" 
            alt="Ornament" 
            width={900} 
            height={800}
            className="opacity-60"
          />
        </div>
      </div>

      {/* Ornament Bottom Left */}
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute" style={{ left: '-200px', bottom: '0px' }}>
          <Image 
            src="/ornament-blur.png" 
            alt="Ornament" 
            width={700} 
            height={600}
            className="opacity-60"
          />
        </div>
      </div>

      {/* Ornament Details Left */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-full pointer-events-none z-1">
        <div className="absolute" style={{ left: '-0px', top: '150px' }}>
          <Image 
            src="/ornament-details-kiri.png" 
            alt="Ornament Left" 
            width={500} 
            height={600}
            className="opacity-100"
          />
        </div>
      </div>

      {/* Ornament Details Right */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-full h-full pointer-events-none z-1">
        <div className="absolute" style={{ right: '-10px', top: '555px'}}>
          <Image 
            src="/ornament-details-kanan.png" 
            alt="Ornament Right" 
            width={300} 
            height={400}
            className="opacity-100"
          />
        </div>
      </div>
    </>
  )
}