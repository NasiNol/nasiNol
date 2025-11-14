"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Instagram, MessageCircle, Youtube, ChevronDown, Bell, ShoppingCart, MapPin } from 'lucide-react'
import { poppins } from '@/lib/fonts'

export default function CheckoutPage() {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={180} 
                height={50} 
                className="h-8 w-auto"
              />
            </div>
            <div className="flex items-center space-x-4">
              {/* Pesanan text - terpisah */}
              <span className="text-[18px] font-black text-[#11A5D7]" style={{ fontFamily: 'Inter' }}>
                Pesanan
              </span>
              
              {/* Cart icon - terpisah */}
              <Button variant="outline" size="icon" className="bg-[#43C3D1] border-[#43C3D1] hover:bg-[#11A5D7]">
                <ShoppingCart size={20} className="text-white" />
              </Button>
              
              {/* Notification icon */}
              <Button variant="outline" size="icon" className="bg-[#43C3D1] border-[#43C3D1] hover:bg-[#11A5D7]">
                <Bell size={20} className="text-white" />
              </Button>
              
              {/* Location Select - Bandung sebagai select */}
              <Select defaultValue="bandung">
                <SelectTrigger className={`w-auto min-w-[140px] border-gray-300 ${poppins.className}`}>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-gray-600" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bandung" className={poppins.className}>
                    Bandung
                  </SelectItem>
                  <SelectItem value="jakarta" className={poppins.className}>
                    Jakarta
                  </SelectItem>
                  <SelectItem value="surabaya" className={poppins.className}>
                    Surabaya
                  </SelectItem>
                </SelectContent>
              </Select>
              
              {/* Login Button */}
              <Button 
                variant="default" 
                size="sm" 
                className={`bg-[#43C3D1] hover:bg-[#11A5D7] text-[18px] font-bold text-white px-6 py-2 rounded-lg ${poppins.className}`}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section - Product & Form */}
          <div className="space-y-8">
            {/* Product Item */}
            <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Ayam Goreng</h3>
                <div className="flex items-center mt-1">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Edit</span>
                </div>
              </div>
              <div className="text-lg font-medium text-gray-900">x{quantity}</div>
            </div>

            {/* Order Information */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Informasi Pesanan</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama <span className="text-red-500">*</span>
                    </label>
                    <Input placeholder="Nama Pemesan" className="w-full" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nomor Telefon <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <div className="flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md">
                        <Image src="/id-flag.png" alt="ID" width={20} height={14} className="mr-2" />
                        <span className="text-sm text-gray-600">+62</span>
                      </div>
                      <Input placeholder="82309871432" className="flex-1 rounded-l-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input placeholder="abc@gmail.com" className="w-full" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Metode Pembayaran</label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Metode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="transfer">Transfer Bank</SelectItem>
                        <SelectItem value="ewallet">E-Wallet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section - Payment Summary */}
          <div>
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Ringkasan Pembayaran</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">Rp20,000</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pajak</span>
                    <span className="font-medium">Rp1,350</span>
                  </div>
                  
                  <hr className="my-4" />
                  
                  <div className="flex justify-between text-base font-semibold">
                    <span>Total</span>
                    <span>Rp21,350</span>
                  </div>
                  
                  <Button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white">
                    Bayar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="w-full">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[193px] flex items-center">
            <div className="w-full grid grid-cols-12 gap-4">
              
              {/* Left - Contact Us (span 3 columns) */}
              <div className="col-span-3">
                <h3 className="font-bold text-[#0F0F0F] mb-3 text-[32px]">Contact Us:</h3>
                <div className="space-y-1 text-[20px] font-normal text-[#0F0F0F]">
                  <p>Support: Admin</p>
                  <p>Email Address: abcy@gmail.com</p>
                </div>
              </div>

              {/* Center - Social Media & Copyright (span 6 columns) */}
              <div className="col-span-6 flex flex-col items-center justify-center">
                <div className="flex space-x-4 mb-3">
                  <Instagram size={32} className="text-[#0F0F0F]" />
                  <svg className="w-[30px] h-[30px] text-[#0F0F0F]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04.01z"/>
                  </svg>
                  <Youtube size={36} className="text-[#0F0F0F]" />
                </div>
                <p className="text-[20px] font-normal text-[#0F0F0F]">Copyright © NasiNol</p>
              </div>

              {/* Right - Policies (span 3 columns) */}
              <div className="col-span-3 flex flex-col items-end justify-center">
                <div className="text-right space-y-1 text-[20px] font-normal text-[#0F0F0F]">
                  <p>Privacy Policy</p>
                  <p>Cookie Policy</p>
                  <p>Terms & Conditions</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}