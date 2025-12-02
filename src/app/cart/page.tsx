// src/app/cart/page.tsx
"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Trash2, Minus, Plus } from 'lucide-react'
import { inter } from '@/lib/fonts'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import { useCart } from '@/contexts/CartContext'

export default function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Header locationValue="semarang" />

      <div className="max-w-[1500px] mx-auto px-[57.84px] pt-[43.9px] pb-[25px] relative z-20">
        <h1 className={`text-[40px] font-bold text-[#000000] mb-[25px] ${inter.className}`}>
          Keranjang Belanjaan
        </h1>

        {/* Show message if cart is empty */}
        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className={`text-[24px] text-gray-500 ${inter.className}`}>
              Keranjang masih kosong
            </p>
            <Link href="/homepage">
              <Button className="mt-4 bg-[#60A9E4] hover:bg-[#4A90E2] text-white">
                Mulai Belanja
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-[18px]">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-[20px] border border-gray-200 p-6">
                <div className="flex items-center justify-between">
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
                      
                      <div className="flex items-center mt-4">
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
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
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-[27.7px] h-[27.7px] bg-[#60A9E4] border-[#60A9E4] text-white hover:bg-[#4A90E2] rounded-full flex items-center justify-center p-0"
                        >
                          <Plus size={12} className="text-white" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-[13px] pr-[23px]">
                    <span className={`text-[30px] font-semibold text-[#000000] ${inter.className}`}>
                      {(item.price / 1000).toFixed(0)}K
                    </span>
                    
                    <div className="flex items-center space-x-[10px]">
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="w-[32px] h-[32px] bg-[#60A9E4] border-[#60A9E4] hover:bg-[#4A90E2] rounded-[16px] flex items-center justify-center p-0"
                      >
                        <Trash2 size={16} className="text-[#FFFFFF]" />
                      </Button>
                      
                      <Link href={`/checkout?id=${item.id}&quantity=${item.quantity}`}>
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
        )}
      </div>

      <Footer />
    </div>
  )
}