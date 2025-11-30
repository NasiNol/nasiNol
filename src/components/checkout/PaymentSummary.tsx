// src/components/checkout/PaymentSummary.tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface PaymentSummaryProps {
  subtotal: number
  tax: number
  total: number
  onPayment: () => void
}

export default function PaymentSummary({ 
  subtotal, 
  tax, 
  total, 
  onPayment 
}: PaymentSummaryProps) {
  
  const formatCurrency = (amount: number) => {
    return `Rp${amount.toLocaleString('id-ID')}`
  }

  return (
    <div className="flex-[1]">
      <div className="sticky top-4">
        {/* Title Outside Card */}
        <h2 className="text-[25px] font-semibold text-[#000000] mb-6">Ringkasan Pembayaran</h2>
        
        {/* Card with Gray Background - Only for Subtotal, Pajak, Total, Button */}
        <Card className="bg-[#F4F4F4] w-[390px] h-[380px]">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-[20px] font-medium text-[#484848]">Subtotal</span>
                <span className="text-[20px] font-medium text-[#484848]">{formatCurrency(subtotal)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-[20px] font-medium text-[#484848]">Pajak</span>
                <span className="text-[20px] font-medium text-[#484848]">{formatCurrency(tax)}</span>
              </div>
              
              <hr className="my-4 border-gray-300" />
              
              <div className="flex justify-between">
                <span className="text-[25px] font-bold text-[#484848]">Total</span>
                <span className="text-[25px] font-bold text-[#484848]">{formatCurrency(total)}</span>
              </div>
              
              <Button 
                onClick={onPayment}
                className="w-full mt-[100px] bg-[#60A9E4] hover:bg-[#4A90E2] text-white h-12 text-lg font-semibold"
              >
                Bayar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}