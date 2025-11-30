// src/components/details/ReviewsCarousel.tsx
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { inter } from '@/lib/fonts'

interface Review {
  id: number
  name: string
  rating: number
  comment: string
  timeAgo: string
  profileImage: string
}

interface ReviewsCarouselProps {
  reviews: Review[]
}

export default function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const getVisibleReviews = () => {
    const visibleCount = 4
    const result = []
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentReviewIndex + i) % reviews.length
      result.push(reviews[index])
    }
    return result
  }

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <Button 
        onClick={prevReview}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[60px] h-[60px] bg-[#1A467F] hover:bg-[#0F2D5C] rounded-full flex items-center justify-center z-10"
      >
        <ChevronLeft size={24} className="text-white" />
      </Button>

      <Button 
        onClick={nextReview}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[60px] h-[60px] bg-[#1A467F] hover:bg-[#0F2D5C] rounded-full flex items-center justify-center z-10"
      >
        <ChevronRight size={24} className="text-white" />
      </Button>

      {/* Reviews Container */}
      <div className="mx-[80px] overflow-hidden">
        <div className="flex space-x-6 transition-transform duration-500 ease-in-out">
          {getVisibleReviews().map((review, index) => (
            <div 
              key={`${review.id}-${index}`}
              className="w-[250px] h-[223px] bg-[#C0EBF0]/40 border border-[#BFBFBF] rounded-[50px] p-4 flex-shrink-0 relative"
            >
              {/* User Info */}
              <div className="flex items-center justify-between mb-[20px]">
                {/* Left Side - Profile & Name */}
                <div className="flex items-center mt-3">
                  <div className="w-[38px] h-[38px] rounded-full overflow-hidden mr-4">
                    <Image 
                      src={review.profileImage}
                      alt={review.name}
                      width={38}
                      height={38}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className={`text-[20px] font-normal text-[#000000] ${inter.className}`}>
                    {review.name}
                  </span>
                </div>

                {/* Right Side - Rating */}
                <div className="flex items-center pr-[12px]">
                  <Star size={13} className="text-[#F8A90C] fill-current mr-[5px]" />
                  <span className={`text-[13px] font-semibold text-[#4C4C4C] ${inter.className}`}>
                    {review.rating}
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <p className={`text-[20px] font-normal text-[#000000] mb-[67px] ${inter.className}`}>
                {review.comment}
              </p>

              {/* Time */}
              <p className={`text-[15px] font-normal text-[#4C4C4C] absolute bottom-2 left-27 ${inter.className}`}>
                {review.timeAgo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}