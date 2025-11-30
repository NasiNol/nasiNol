// src/app/payment/qr/page.tsx
"use client"

import Image from 'next/image'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import PaymentTimer from '@/components/payment/PaymentTimer'
import PaymentInstructions from '@/components/payment/PaymentInstructions'
import PaymentButton from '@/components/payment/PaymentButton'
import QRCodeDisplay from '@/components/payment/QRCodeDisplay'
import OrderReadyModal from '@/components/ui/order-ready-modal'
import { useQRPayment } from '@/hooks/useQRPayment'

export default function PaymentPage() {
  const {
    paymentMethod,
    isProcessing,
    isOrderModalOpen,
    setIsOrderModalOpen,
    handlePaymentComplete
  } = useQRPayment()

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
      
      {/* Ornament Left - TIDAK BERUBAH */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-full pointer-events-none z-1">
        <div className="absolute" style={{ left: '-250px', top: '300px' }}>
          <Image 
            src="/ornament-blur.png" 
            alt="Ornament Left" 
            width={800} 
            height={900}
            className="opacity-60 transform rotate-12"
          />
        </div>
      </div>

      {/* Ornament Right - TIDAK BERUBAH */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-full h-full pointer-events-none z-1">
        <div className="absolute" style={{ right: '-300px', top: '200px' }}>
          <Image 
            src="/ornament-blur.png" 
            alt="Ornament Right" 
            width={800} 
            height={950}
            className="opacity-80 transform -rotate-45"
          />
        </div>
      </div>
      
      <Header locationValue="bandung" />

      {/* Main Content - SEKARANG LEBIH BERSIH */}
      <div className="max-w-[1500px] mx-auto relative z-10 px-4 py-8">
        <div className="flex justify-center">
          <div className="w-full max-w-[1283px]">
            
            <PaymentTimer 
              initialTime={3600}
              onTimeUp={() => console.log('QR Payment timeout')}
            />
            
            <QRCodeDisplay 
              qrType={paymentMethod.type as 'qris'}
              qrData={paymentMethod.qrCode}
              paymentMethodName={paymentMethod.paymentMethodName || 'QRIS'}
            />
            
            <PaymentInstructions paymentMethod={paymentMethod} />
            
            <PaymentButton 
              isProcessing={isProcessing}
              onPaymentComplete={handlePaymentComplete}
              paymentType={paymentMethod.type}
            />

          </div>
        </div>
      </div>

      <Footer />

      <OrderReadyModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        orderNumber="NL001"
      />
      
    </div>
  )
}