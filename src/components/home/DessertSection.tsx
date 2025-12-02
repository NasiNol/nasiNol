// src/components/home/DessertSection.tsx
"use client"

import Image from 'next/image'
import Link from 'next/link'
import { inter } from '@/lib/fonts'
import { dessertFoods } from '@/data/mockFood'

export default function DessertSection() {
  // Custom drop shadow style - sama persis dengan RecommendedFoodsSection
  const dropShadowStyle = {
    textShadow: '0 0 4px rgba(0, 0, 0, 0.25)' // blur=4, spread=0, color=25%
  }

  const imageDropShadowStyle = {
    filter: 'drop-shadow(0 0 4px rgba(0, 0, 0, 0.25))' // untuk bintang.png
  }

  return (
    <section className="py-3 sm:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="mb-8">
          <h2 
            className={`font-semibold text-gray-900 ${inter.className}`}
            style={{ 
              fontSize: '23px',
              ...dropShadowStyle
            }}
          >
            Makanan Manis
          </h2>
        </div>

        {/* Food Grid - 1 row x 5 columns */}
        <div className="grid grid-cols-5 gap-x-[57px] max-w-[1424px] mx-auto">
          {dessertFoods.map((food) => (
            <Link 
              key={food.id}
              href={`/details?id=${food.id}`}
              className="relative group cursor-pointer"
              style={{ width: '220px', height: '213px' }}
            >
              {/* Card Container */}
              <div 
                className="relative w-full h-full overflow-hidden transition-shadow"
                style={{ 
                  borderRadius: '40px',
                  boxShadow: `
                    0 10px 25px rgba(0, 0, 0, 0.15), 
                    inset 0 -60px 40px rgba(0, 0, 0, 0.3)
                  `
                }}
              >
                
                {/* Background Image */}
                <Image 
                  src={food.image}
                  alt={food.name}
                  fill
                  className="object-cover scale-119"
                />

                {/* Distance Badge - Top Right dengan custom drop shadow */}
                <div className="absolute top-4 right-4 z-10">
                  <span 
                    className={`font-bold ${inter.className}`}
                    style={{ 
                      fontSize: '13px',
                      color: '#FFFFFF',
                      ...dropShadowStyle
                    }}
                  >
                    {food.distance}
                  </span>
                </div>

                {/* Content - Bottom */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  
                  {/* Left: Name & Price dengan custom drop shadow */}
                  <div className="absolute bottom-0 left-0 text-white">
                    <h3 
                      className={`font-bold mb-1 ${inter.className}`}
                      style={{ 
                        fontSize: '15px',
                        ...dropShadowStyle
                      }}
                    >
                      {food.name}
                    </h3>
                    <p 
                      className={`font-bold ${inter.className}`}
                      style={{ 
                        fontSize: '18px',
                        ...dropShadowStyle
                      }}
                    >
                      {food.price}
                    </p>
                  </div>

                  {/* Right: Restaurant & Rating */}
                  <div className="absolute bottom-0 right-0 text-right">
                    {/* Restaurant dengan custom drop shadow */}
                    <div 
                      className={`font-bold mb-1 ${inter.className}`}
                      style={{ 
                        fontSize: '13px',
                        color: '#FFFFFF',
                        ...dropShadowStyle
                      }}
                    >
                      {food.restaurant}
                    </div>

                    {/* Rating dengan bintang + custom drop shadow */}
                    <div className="flex items-center justify-end">
                      {/* Star Icon dengan drop shadow */}
                      <div className="pr-2">
                        <Image 
                          src="/bintang.png"
                          alt="Star"
                          width={13}
                          height={12}
                          className="w-[13px] h-[12px]"
                          style={imageDropShadowStyle}
                        />
                      </div>
                      
                      {/* Rating Text dengan custom drop shadow */}
                      <span 
                        className={`font-bold ${inter.className}`}
                        style={{ 
                          fontSize: '13px',
                          color: '#FFFFFF',
                          paddingTop: '1px',
                          paddingBottom: '1px',
                          ...dropShadowStyle
                        }}
                      >
                        {food.rating}
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}