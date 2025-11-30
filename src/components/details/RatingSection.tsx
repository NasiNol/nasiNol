// src/components/details/RatingSection.tsx
import { Star } from 'lucide-react'
import { inter } from '@/lib/fonts'

interface RatingSectionProps {
  rating: number
}

export default function RatingSection({ rating }: RatingSectionProps) {
  return (
    <>
      {/* Stars */}
      <div className="flex items-center justify-center space-x-[93px] mb-[26px]">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={60} className="text-[#F8A90C] fill-current" />
        ))}
      </div>

      {/* Rating Number */}
      <div className="flex justify-center mb-[36px]">
        <div className="px-[690px]">
          <p className={`text-[40px] font-normal text-[#000000] text-center ${inter.className}`}>
            {rating}
          </p>
        </div>
      </div>

      {/* Review Title */}
      <div className="flex justify-center mb-[42px]">
        <div className="px-[652px]">
          <h2 className={`text-[40px] font-normal text-[#000000] text-center ${inter.className}`}>
            Review
          </h2>
        </div>
      </div>
    </>
  )
}