// src/components/home/HeroSection.tsx
"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { inter } from '@/lib/fonts'
import HomeOrnaments from './HomeOrnaments'

export default function HeroSection() {
  return (
    <>
      {/* Home Ornaments - Custom untuk homepage dengan positioning yang tepat */}
      <HomeOrnaments />

      {/* Background Layer - z-5 */}
      <div 
        className="absolute bg-[#F2F2EB] -mt-[98px] mx-auto z-5"
        style={{ 
          width: '1350px',        
          height: '690px',
          top: '98px'
        }}
      />

      {/* Content Layer - z-30 */}
      <section 
        className="relative -mt-[98px] pt-[29px] mx-auto z-30"
        style={{ 
          width: '1350px',        
          height: '690px'      
        }}
      >
        
        {/* Search Bar */}
        <div className="px-8 pt-25 mb-4 relative">  {/* HAPUS: z-30 karena parent sudah z-30 */}
          <div className="max-w-[500px] mx-auto">
            <div className="relative">
              <Input 
                placeholder=""
                className="w-full h-[50px] pl-6 pr-16 rounded-full border-2 border-[#60A9E4] bg-white shadow-sm focus:border-[#4A90E2] text-base"
              />
              <div className="absolute right-2 top-1 bottom-1">
                <Button 
                  size="icon"
                  className="bg-[#60A9E4] hover:bg-[#4A90E2] rounded-full w-[42px] h-[42px] shadow-md"
                >
                  <Search size={20} className="text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="px-16 -mt-25 h-full flex items-center relative">  {/* HAPUS: z-30 */}
          <div className="flex flex-col lg:flex-row items-center lg:items-center space-y-8 lg:space-y-0 lg:space-x-12 w-full">
            
            {/* Left Content */}
            <div className="flex-1 text-left">
              
              {/* Smart Choice Text */}
              <div className="mb-1">
                <p className={`text-gray-700 text-[16px] ${inter.className}`}>
                  Smart Choice for <span className="text-[#43C3D1] font-medium">Sustainable</span> Taste
                </p>
              </div>

              {/* Main Heading dengan padding 10px */}
              <div className="pt-[10px] mb-1">
                <h1 className={`text-[32px] lg:text-[40px] xl:text-[48px] font-bold text-black leading-tight ${inter.className}`}>
                  Pengalaman Baru<br />
                  Belanja Kuliner Online
                </h1>
              </div>

              {/* Subtitle */}
              <p className={`text-gray-700 text-[13px] lg:text-[15px] mb-8 lg:mb-10 max-w-[500px] leading-relaxed ${inter.className}`}>
                Makanan restoran berkualitas dengan harga hemat dan berkontribusi
                dalam mengurangi pemborosan makanan di lingkungan sekitar.
              </p>

              {/* CTA Button */}
              <Link href="/cart">
                <Button 
                  className={`bg-[#60A9E4] hover:bg-[#4A90E2] text-white px-8 py-4 rounded-full text-[16px] font-semibold shadow-lg hover:shadow-xl transition-all ${inter.className}`}
                >
                  Pesan →
                </Button>
              </Link>
            </div>

            {/* Right Content - Delivery Guy + Reviews Badge */}
            <div className="flex-1 relative">
              <div className="relative">
                
                {/* Delivery Guy Image */}
                <div className="relative w-[450px] h-[550px] mx-auto">  {/* HAPUS: z-30 */}
                  <Image 
                    src="/delivery.png"
                    alt="Delivery Guy"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Reviews Badge */}
                <div className="absolute top-[130px] -right-[-400px]">  {/* HAPUS: z-30 */}
                  <p className={`text-gray-700 font-medium text-[14px] mb-3 ${inter.className}`}>
                    Review Pelanggan
                  </p>

                  <div className="flex -space-x-2 mb-4">
                    <div className="w-[32px] h-[32px] rounded-full bg-gradient-to-r from-blue-400 to-blue-500 border-2 border-white"></div>
                    <div className="w-[32px] h-[32px] rounded-full bg-gradient-to-r from-green-400 to-green-500 border-2 border-white"></div>
                    <div className="w-[32px] h-[32px] rounded-full bg-gradient-to-r from-purple-400 to-purple-500 border-2 border-white"></div>
                    <div className="w-[32px] h-[32px] rounded-full bg-gradient-to-r from-pink-400 to-pink-500 border-2 border-white"></div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <span className="text-yellow-400 text-[20px]">★</span>
                      <span className={`text-gray-900 font-bold text-[18px] ml-1 ${inter.className}`}>4.8</span>
                    </div>
                    <span className={`text-gray-500 text-[14px] ${inter.className}`}>10k Review</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}