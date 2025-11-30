// src/app/orders/page.tsx
"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Instagram, Youtube, Bell, ShoppingCart, MapPin } from 'lucide-react'
import { poppins, inter } from '@/lib/fonts'
import NotificationBell from '@/components/ui/notification-bell'
import Header from '@/components/Layout/Header'  // IMPORT HEADER
import Footer from '@/components/Layout/Footer'  // IMPORT FOOTER

export default function OrdersPage() {
  const orders = [
    {
      id: 1,
      name: "Ayam Goreng",
      restaurant: "KFC", 
      date: "10/12/2025 - 23:00",
      quantity: "1x",
      status: "selesai", // "selesai" atau "proses"
      image: "/ayamgoreng-checkout.png"
    },
    {
      id: 2,
      name: "Ayam Goreng",
      restaurant: "KFC",
      date: "10/12/2025 - 23:00", 
      quantity: "1x",
      status: "proses",
      image: "/ayamgoreng-checkout.png"
    },
    {
      id: 3,
      name: "Ayam Goreng",
      restaurant: "KFC",
      date: "10/12/2025 - 23:00",
      quantity: "1x", 
      status: "selesai",
      image: "/ayamgoreng-checkout.png"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header - REPLACED */}
      <Header locationValue="semarang" />

      {/* Main Content - TIDAK BERUBAH SAMA SEKALI */}
      <div className="max-w-[1500px] mx-auto px-[57.84px] pt-[43.9px] pb-[25px] relative z-20">
        {/* Title */}
        <h1 className={`text-[40px] font-bold text-[#000000] mb-[25px] ${inter.className}`}>
          Pesanan
        </h1>

        {/* Orders List */}
        <div className="space-y-[18px]">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-[20px] border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                {/* Left Section - Image and Details */}
                <div className="flex items-center space-x-6">
                  <div className="w-[118px] h-[113px] rounded-[20px] flex-shrink-0 overflow-hidden">
                    <Image 
                      src={order.image}
                      alt={order.name}
                      width={118} 
                      height={113}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center space-y-2">
                    <h3 className={`text-[30px] font-medium text-[#000000] ${inter.className}`}>
                      {order.name}
                    </h3>
                    <p className={`text-[20px] font-medium text-[#000000] ${inter.className}`}>
                      {order.restaurant}
                    </p>
                    <p className={`text-[20px] font-normal text-[#000000] ${inter.className}`}>
                      {order.date}
                    </p>
                  </div>
                </div>

                {/* Right Section - Quantity and Status */}
                <div className="flex items-center space-x-8">
                  <span className={`text-[30px] font-semibold text-[#000000] ${inter.className}`}>
                    {order.quantity}
                  </span>
                  <Button 
                    variant="outline"
                    className={`
                      ${order.status === 'selesai' 
                        ? 'bg-[#66DE7C] border-[#66DE7C] text-white hover:bg-[#5BC970]' 
                        : 'bg-[#60A9E4] border-[#60A9E4] text-white hover:bg-[#4A90E2]'
                      }
                      text-[18px] font-bold px-6 py-2 rounded-[15px] ${inter.className}
                    `}
                  >
                    {order.status === 'selesai' ? 'Selesai' : 'Proses'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer - REPLACED */}
      <Footer />
    </div>
  )
}