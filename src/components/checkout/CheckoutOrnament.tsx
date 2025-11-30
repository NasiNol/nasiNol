// src/components/checkout/CheckoutOrnament.tsx
import Image from 'next/image'

export default function CheckoutOrnament() {
  return (
    <div className="absolute top-0 right-0 w-screen h-full pointer-events-none z-10 overflow-hidden">
      <div className="absolute" style={{ right: '-350px', top: '20px', maxWidth: '100vw' }}>
        <Image 
          src="/ornament-blur.png" 
          alt="Ornament" 
          width={982} 
          height={865}
          className="max-w-none"
          style={{ clipPath: 'inset(0 0 0 0)' }}
        />
      </div>
    </div>
  )
}