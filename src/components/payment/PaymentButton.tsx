// src/components/payment/PaymentButton.tsx (UPDATE)
import { inter } from '@/lib/fonts'

interface PaymentButtonProps {
  isProcessing: boolean
  onPaymentComplete: () => void
  paymentType: 'bank_transfer' | 'midtrans' | 'qris' | 'gopay' | 'ovo' | 'shopeepay'
}

export default function PaymentButton({ isProcessing, onPaymentComplete, paymentType }: PaymentButtonProps) {
  // Untuk Midtrans, button tidak perlu (auto-process via webhook)
  if (paymentType === 'midtrans') {
    return (
      <div className="flex justify-center">
        <div className="w-[1150px] h-[60px] rounded-[10px] flex items-center justify-center bg-gray-200" style={{ boxShadow: '0 1px 8px rgba(0, 0, 0, 0.1)' }}>
          <span className={`text-[20px] font-medium text-[#666666] ${inter.className}`}>
            Menunggu konfirmasi pembayaran...
          </span>
        </div>
      </div>
    )
  }

  // Manual payment button (untuk bank transfer dan QR)
  return (
    <div className="flex justify-center">
      <div 
        onClick={onPaymentComplete}
        className={`w-[1150px] h-[60px] rounded-[10px] flex items-center justify-center cursor-pointer transition-colors ${
          isProcessing 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-[#66DE7C] hover:bg-[#5BC970]'
        }`}
        style={{ boxShadow: '0 1px 8px rgba(0, 0, 0, 0.1)' }}
      >
        <span className={`text-[30px] font-bold text-[#FFFFFF] ${inter.className}`}>
          {isProcessing ? 'Memproses...' : 'Pembayaran Selesai'}
        </span>
      </div>
    </div>
  )
}