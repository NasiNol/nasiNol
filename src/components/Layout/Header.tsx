// src/components/Layout/Header.tsx
"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ShoppingCart, MapPin } from 'lucide-react'
import { poppins } from '@/lib/fonts'
import NotificationBell from '@/components/ui/notification-bell'

interface HeaderProps {
  showPesanan?: boolean
  showCart?: boolean
  showNotification?: boolean
  showLocation?: boolean
  showLogin?: boolean
  locationValue?: string
  className?: string
  containerClassName?: string
}

export default function Header({
  showPesanan = true,
  showCart = true,
  showNotification = true,
  showLocation = true,
  showLogin = true,
  locationValue = "semarang",
  className = "relative z-50 pt-[29px]", // UBAH: z-10 jadi z-50
  containerClassName = "max-w-[1500px] mx-auto px-[57.84px]"
}: HeaderProps) {
  return (
    <header className={className}>
      <div className={containerClassName}>
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={42} 
                height={47}
                className="w-[51.18px] h-[55.79px]"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* Pesanan text as button */}
            {showPesanan && (
              <Link href="/orders">
                <button className="text-[18px] font-black text-[#11A5D7] hover:text-[#0F8FC7] transition-colors cursor-pointer bg-transparent border-none outline-none" style={{ fontFamily: 'Inter' }}>
                  Pesanan
                </button>
              </Link>
            )}
            
            {/* Cart icon */}
            {showCart && (
              <Link href="/cart">
                <Button variant="outline" size="icon" className="bg-[#60A9E4] border-[#60A9E4] hover:bg-[#4A90E2] w-[41px] h-[41px] flex items-center justify-center">
                  <ShoppingCart size={20} strokeWidth={3.4} className="text-white" />
                </Button>
              </Link>
            )}
            
            {/* Notification icon */}
            {showNotification && <NotificationBell />}
            
            {/* Location Select */}
            {showLocation && (
              <Select defaultValue={locationValue}>
                <SelectTrigger className={`w-[163px] h-[41px] border-[#60A9E4] text-black text-[18px] font-normal ${poppins.className}`}>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-black" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bandung" className={`${poppins.className} text-[18px] font-normal`}>
                    Bandung
                  </SelectItem>
                  <SelectItem value="jakarta" className={`${poppins.className} text-[18px] font-normal`}>
                    Jakarta
                  </SelectItem>
                  <SelectItem value="semarang" className={`${poppins.className} text-[18px] font-normal`}>
                    Semarang
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
            
            {/* Login Button */}
            {showLogin && (
              <Link href="/signin">
                <Button 
                  variant="default" 
                  size="sm" 
                  className={`bg-[#60A9E4] hover:bg-[#4A90E2] text-[18px] font-bold text-white w-[119px] h-[41px] rounded-lg flex items-center justify-center ${poppins.className}`}
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}