// src/types/payment.ts (UPDATE)
export interface PaymentMethod {
  type: 'bank_transfer' | 'midtrans' | 'qris' | 'gopay' | 'ovo' | 'shopeepay'
  accountNumber?: string
  bankName?: string
  qrCode?: string
  paymentMethodName?: string
  instructions: string[]
}

export interface PaymentState {
  isProcessing: boolean
  timeLeft: number
  isComplete: boolean
}