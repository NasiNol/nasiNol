// src/app/cart/page.tsx - MINIMAL CHANGES
"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Trash2, Minus, Plus } from 'lucide-react'
import { inter } from '@/lib/fonts'
import Header from '@/components/Layout/Header'  // IMPORT HEADER
import Footer from '@/components/Layout/Footer'  // IMPORT FOOTER

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Ayam Goreng",
      restaurant: "KFC",
      price: 20000,
      quantity: 1,
      image: "/ayamgoreng-checkout.png"
    },
    {
      id: 2,
      name: "Ayam Goreng", 
      restaurant: "KFC",
      price: 20000,
      quantity: 1,
      image: "/ayamgoreng-checkout.png"
    },
    {
      id: 3,
      name: "Ayam Goreng",
      restaurant: "KFC", 
      price: 20000,
      quantity: 1,
      image: "/ayamgoreng-checkout.png"
    }
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) return
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header - REPLACED */}
      <Header locationValue="semarang" />

      {/* Main Content - TIDAK BERUBAH SAMA SEKALI */}
      <div className="max-w-[1500px] mx-auto px-[57.84px] pt-[43.9px] pb-[25px] relative z-20">
        {/* Title */}
        <h1 className={`text-[40px] font-bold text-[#000000] mb-[25px] ${inter.className}`}>
          Keranjang Belanjaan
        </h1>

        {/* Cart Items List */}
        <div className="space-y-[18px]">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-[20px] border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                {/* Left Section - Image and Details */}
                <div className="flex items-center space-x-6">
                  <div className="w-[118px] h-[113px] rounded-[20px] flex-shrink-0 overflow-hidden">
                    <Image 
                      src={item.image}
                      alt={item.name}
                      width={118} 
                      height={113}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center space-y-2">
                    <h3 className={`text-[30px] font-medium text-[#000000] ${inter.className}`}>
                      {item.name}
                    </h3>
                    <p className={`text-[20px] font-medium text-[#000000] ${inter.className}`}>
                      {item.restaurant}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center mt-4">
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-[24px] h-[24px] bg-[#60A9E4] border-[#60A9E4] text-white hover:bg-[#4A90E2] rounded-full flex items-center justify-center p-0"
                      >
                        <Minus size={12} className="text-white" />
                      </Button>
                      
                      <div className="px-[8px]">
                        <span className={`text-[28px] font-normal text-[#000000] ${inter.className}`}>
                          {item.quantity}
                        </span>
                      </div>
                      
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-[27.7px] h-[27.7px] bg-[#60A9E4] border-[#60A9E4] text-white hover:bg-[#4A90E2] rounded-full flex items-center justify-center p-0"
                      >
                        <Plus size={12} className="text-white" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right Section - Price and Actions */}
                <div className="flex flex-col items-end space-y-[13px] pr-[23px]">
                  <span className={`text-[30px] font-semibold text-[#000000] ${inter.className}`}>
                    {(item.price / 1000).toFixed(0)}K
                  </span>
                  
                  <div className="flex items-center space-x-[10px]">
                    {/* Trash Button */}
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="w-[32px] h-[32px] bg-[#60A9E4] border-[#60A9E4] hover:bg-[#4A90E2] rounded-[16px] flex items-center justify-center p-0"
                    >
                      <Trash2 size={16} className="text-[#FFFFFF]" />
                    </Button>
                    
                    {/* Order Button */}
                    <Link href="/checkout">
                      <Button 
                        variant="outline"
                        className="w-[114px] h-[33px] bg-[#60A9E4] border-[#60A9E4] text-white hover:bg-[#4A90E2] text-[18px] font-bold rounded-[15px] flex items-center justify-center"
                      >
                        Pesan
                      </Button>
                    </Link>
                  </div>
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