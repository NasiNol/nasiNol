// src/components/home/FeaturesSection.tsx
"use client"

import Image from 'next/image'
import { inter } from '@/lib/fonts'

const features = [
  {
    icon: '/kualitas-terjamin.png',
    title: 'Kualitas Terjamin',
    description: 'Siap untuk dimakan'
  },
  {
    icon: '/transaksi-aman.png',
    title: 'Transaksi Aman',
    description: 'Keamanan terjamin'
  },
  {
    icon: '/customer-support.png',
    title: 'Customer Support',
    description: 'Selalu siap bantu'
  },
  {
    icon: '/harga-hemat.png',
    title: 'Harga Hemat',
    description: 'Lebih tanpa mahal'
  }
]

export default function FeaturesSection() {
  return (
    <section className="py-4 relative z-20" style={{ marginTop: '-60px' }}> {/* FIXED: gunakan inline style untuk -60px */}
      <div className="flex justify-center">
        {/* Features Container - Fixed 1124x79 */}
        <div 
          className="bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between px-8"
          style={{ 
            width: '1124px', 
            height: '79px' 
          }}
        >
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex items-center space-x-3"
            >
              {/* Icon dari PNG */}
              <div className="w-12 h-12 flex items-center justify-center">
                <Image 
                  src={feature.icon}
                  alt={feature.title}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
              </div>
              
              {/* Text */}
              <div>
                <h3 className={`font-semibold text-gray-900 text-sm ${inter.className}`}>
                  {feature.title}
                </h3>
                <p className={`text-gray-500 text-xs ${inter.className}`}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}