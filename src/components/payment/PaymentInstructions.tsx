// src/components/payment/PaymentInstructions.tsx (UPDATE)
import { inter } from '@/lib/fonts'
import { PaymentMethod } from '@/types/payment'

interface PaymentInstructionsProps {
  paymentMethod: PaymentMethod
}

export default function PaymentInstructions({ paymentMethod }: PaymentInstructionsProps) {
  // Midtrans widget (untuk semua jenis pembayaran)
  if (paymentMethod.type === 'midtrans') {
    return (
      <div className="flex justify-center mb-[28px]">
        <div className="w-[1150px] h-[400px] bg-[#FFFFFF] rounded-[10px] p-6" style={{ boxShadow: '0 1px 8px rgba(0, 0, 0, 0.1)' }}>
          <div id="snap-container" className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500">Midtrans Payment Widget</p>
          </div>
        </div>
      </div>
    )
  }

  // Bank transfer UI
  if (paymentMethod.type === 'bank_transfer') {
    return (
      <>
        {/* Account Number */}
        <div className="text-center mb-[20px]">
          <h2 className={`text-[50px] font-medium text-[#000000] ${inter.className}`}>
            {paymentMethod.accountNumber}
          </h2>
        </div>

        {/* Bank Name */}
        <div className="flex justify-center mb-[48px]">
          <div className="w-[174px] h-[43px] bg-[#60A9E4] rounded-[20px] flex items-center justify-center">
            <span className={`text-[25px] font-bold text-[#FFFFFF] ${inter.className}`}>
              {paymentMethod.bankName}
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="flex justify-center mb-[28px]">
          <div className="w-[1150px] h-[350px] bg-[#FFFFFF] rounded-[10px] p-6" style={{ boxShadow: '0 1px 8px rgba(0, 0, 0, 0.1)' }}>
            <h3 className={`text-[25px] font-medium text-[#000000] mb-6 ${inter.className}`}>
              Cara Pembayaran
            </h3>
            <ul className={`text-[20px] font-normal text-[#000000] space-y-1 pl-5 leading-tight ${inter.className}`} style={{ listStyleType: 'none' }}>
              {paymentMethod.instructions.map((instruction, index) => (
                <li key={index} className="relative pl-4">
                  <span className="absolute left-0 text-[#43C3D1]">•</span>
                  {instruction}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  // QR/QRIS payment instructions (NEW)
  return (
    <div className="flex justify-center mb-[28px]">
      <div className="w-[1150px] h-[380px] bg-[#FFFFFF] rounded-[10px] p-6" style={{ boxShadow: '0 1px 8px rgba(0, 0, 0, 0.1)' }}>
        <h3 className={`text-[25px] font-medium text-[#000000] mb-6 ${inter.className}`}>
          Cara Pembayaran
        </h3>
        <ul className={`text-[20px] font-normal text-[#000000] space-y-1 pl-5 leading-tight ${inter.className}`} style={{ listStyleType: 'none' }}>
          {paymentMethod.instructions.map((instruction, index) => (
            <li key={index} className="relative pl-4">
              <span className="absolute left-0 text-[#43C3D1]">•</span>
              {instruction}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}