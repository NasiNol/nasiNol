// src/components/payment/QRCodeDisplay.tsx
import Image from 'next/image'
import { inter } from '@/lib/fonts'

interface QRCodeDisplayProps {
  qrType: 'qris' | 'gopay' | 'ovo' | 'shopeepay' | 'midtrans'
  qrData?: string
  paymentMethodName: string
}

export default function QRCodeDisplay({ qrType, qrData, paymentMethodName }: QRCodeDisplayProps) {
  // Future: Dynamic QR dari Midtrans API
  const qrImageSrc = qrData || '/qr-dummy.png'

  return (
    <>
      {/* QR Code Container */}
      <div className="flex justify-center mb-[5px]">
          {qrType === 'midtrans' && !qrData ? (
            // Loading state untuk Midtrans QR generation
            <div className="w-[250px] h-[250px] flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#60A9E4]"></div>
            </div>
          ) : (
            <Image 
              src={qrImageSrc}
              alt="QR Code Payment" 
              width={250} 
              height={250}
              className="w-[250px] h-[250px]"
            />
          )}
      </div>

      {/* Payment Method Name */}
      <div className="flex justify-center mb-[48px]">
        <div className="w-[440px] h-[43px] bg-[#60A9E4] rounded-[20px] flex items-center justify-center">
          <span className={`text-[25px] font-bold text-[#FFFFFF] ${inter.className}`}>
            {paymentMethodName}
          </span>
        </div>
      </div>
    </>
  )
}