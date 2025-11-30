// src/components/ui/order-ready-modal.tsx
"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { inter } from '@/lib/fonts'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'

interface OrderReadyModalProps {
  isOpen: boolean
  onClose: () => void
  orderNumber?: string
}

export default function OrderReadyModal({ 
  isOpen, 
  onClose, 
  orderNumber = "NL001" 
}: OrderReadyModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      // Slight delay for smooth animation
      setTimeout(() => setIsVisible(true), 50)
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300) // Wait for slide-down animation
  }

  const handleOkeyClick = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
      router.push('/orders') // Redirect to orders page
    }, 300)
  }

  if (!isOpen) return null

  const modalContent = (
    <>
      {/* Background Overlay */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? 'opacity-50' : 'opacity-0'
        }`}
        style={{ zIndex: 999998 }}
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div 
        className="fixed inset-0 flex items-center justify-center z-[999999] p-4"
      >
        <div 
          className={`w-[524px] h-[339px] bg-white rounded-[20px] p-8 flex flex-col items-center justify-center relative transform transition-all duration-300 ease-out ${
            isVisible 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-full opacity-0 scale-95'
          }`}
          style={{ 
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            zIndex: 1000000
          }}
          onClick={(e) => e.stopPropagation()} // Prevent close when clicking modal content
        >
          {/* Shopping Bag Icon */}
          <div className="mb-6">
            <Image 
              src="/tasbelanja.png" 
              alt="Tas Belanja" 
              width={120} 
              height={120}
              className="w-[120px] h-[120px] object-contain"
            />
          </div>

          {/* Title */}
          <h2 className={`text-[32px] font-semibold text-black text-center mb-8 ${inter.className}`}>
            Pesanan siap untuk diambil
          </h2>

          {/* OKEY Button */}
          <Button
            onClick={handleOkeyClick}
            className={`w-[200px] h-[50px] bg-[#60A9E4] hover:bg-[#4A90E2] rounded-[25px] text-[20px] font-bold text-white transition-colors ${inter.className}`}
          >
            OKEY
          </Button>
        </div>
      </div>
    </>
  )

  // Render modal at body level using portal
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body)
  }

  return null
}