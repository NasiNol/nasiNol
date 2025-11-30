// src/components/details/RestaurantInfo.tsx
import { inter } from '@/lib/fonts'

interface RestaurantInfoProps {
  distance: string
  name: string
}

export default function RestaurantInfo({ distance, name }: RestaurantInfoProps) {
  return (
    <div className="space-y-[8px] mb-[149px]">
      <div className="ml-[56px]">
        <p className={`text-[32px] font-normal text-[#000000] ${inter.className}`}>
          {distance}
        </p>
      </div>
      
      <div className="ml-[56px]">
        <p className={`text-[32px] font-normal text-[#000000] ${inter.className}`}>
          {name}
        </p>
      </div>
    </div>
  )
}