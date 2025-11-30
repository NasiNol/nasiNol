// src/components/details/ProductDisplay.tsx
import Image from 'next/image'

interface ProductDisplayProps {
  image: string
  name: string
}

export default function ProductDisplay({ image, name }: ProductDisplayProps) {
  return (
    <div>
      <div className="w-[450px] h-[430px] rounded-lg flex-shrink-0 overflow-hidden mb-[62px]">
        <Image 
          src={image}
          alt={name}
          width={479} 
          height={459}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}