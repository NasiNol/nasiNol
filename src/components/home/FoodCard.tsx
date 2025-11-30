// src/components/home/FoodCard.tsx
"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin } from 'lucide-react'
import { Food } from '@/types/food'
import { inter } from '@/lib/fonts'

interface FoodCardProps {
  food: Food
  className?: string
}

export default function FoodCard({ food, className = "" }: FoodCardProps) {
  return (
    <Link href={`/details?id=${food.id}`}>
      <div className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group ${className}`}>
        {/* Food Image */}
        <div className="relative w-full h-32 sm:h-40 lg:h-48 overflow-hidden">
          <Image 
            src={food.image}
            alt={food.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Distance Badge */}
          <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
            {food.distance}
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
            <Star size={12} className="text-yellow-400 fill-current" />
            <span className="text-xs font-medium text-gray-800">{food.rating}</span>
          </div>
        </div>

        {/* Food Info */}
        <div className="p-3 sm:p-4">
          <h3 className={`font-medium text-gray-900 text-sm sm:text-base mb-1 truncate ${inter.className}`}>
            {food.name}
          </h3>
          
          <p className={`text-xs sm:text-sm text-gray-500 mb-2 ${inter.className}`}>
            {food.restaurant}
          </p>

          {/* Price and Reviews */}
          <div className="flex items-center justify-between">
            <span className={`font-bold text-gray-900 text-sm sm:text-base ${inter.className}`}>
              {(food.price / 1000).toFixed(0)}K
            </span>
            <span className={`text-xs text-gray-400 ${inter.className}`}>
              ({food.reviewCount} Review)
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}